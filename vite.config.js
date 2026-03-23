import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function ollamaProxy(env) {
  const handler = async (req, res) => {
    if (req.method !== 'POST' || req.url !== '/api/chat') return false

    try {
      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      const raw = Buffer.concat(chunks).toString('utf8') || '{}'
      const body = JSON.parse(raw)
      const baseUrl = env.OLLAMA_BASE_URL || 'http://localhost:11434'
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 60000)

      const upstream = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: body.model || env.OLLAMA_MODEL || 'llama3.2:1b',
          stream: false,
          messages: body.messages || [],
        }),
      })

      clearTimeout(timeout)
      const text = await upstream.text()
      res.statusCode = upstream.status
      res.setHeader('Content-Type', 'application/json')
      res.end(text)
      return true
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Proxy failed' }))
      return true
    }
  }

  return {
    name: 'ollama-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        handler(req, res).then((handled) => {
          if (!handled) next()
        })
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        handler(req, res).then((handled) => {
          if (!handled) next()
        })
      })
    },
  }
}

function resourceProxy() {
  const handler = async (req, res) => {
    if (req.method !== 'POST' || req.url !== '/api/resources') return false

    try {
      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      const raw = Buffer.concat(chunks).toString('utf8') || '{}'
      const body = JSON.parse(raw)
      const lat = Number(body.lat)
      const lng = Number(body.lng)
      const radius = Math.min(Number(body.radius) || 30000, 50000)

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Missing or invalid lat/lng' }))
        return true
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30000)
      const query = `
[out:json][timeout:25];
(
  nwr(around:${radius},${lat},${lng})[amenity~"hospital|clinic"];
  nwr(around:${radius},${lat},${lng})[amenity="shelter"];
  nwr(around:${radius},${lat},${lng})[social_facility="shelter"];
  nwr(around:${radius},${lat},${lng})[emergency="assembly_point"];
  nwr(around:${radius},${lat},${lng})[office="ngo"];
);
out center tags;
      `.trim()

      const upstream = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        signal: controller.signal,
        body: query,
      })

      clearTimeout(timeout)
      const text = await upstream.text()
      res.statusCode = upstream.status
      res.setHeader('Content-Type', 'application/json')
      res.end(text)
      return true
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Resource proxy failed' }))
      return true
    }
  }

  return {
    name: 'resource-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        handler(req, res).then((handled) => {
          if (!handled) next()
        })
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        handler(req, res).then((handled) => {
          if (!handled) next()
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), ollamaProxy(env), resourceProxy()],
  }
})
