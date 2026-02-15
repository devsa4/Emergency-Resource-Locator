const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const CACHE_FILE = path.join(__dirname, 'rss_cache.json');
const RSS_URL = 'https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml';

app.use(cors());

/**
 * Root Route
 */
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #f1f5f9; min-height: 100vh;">
            <h1 style="color: #002855;">ERSS API Bridge (Stable Fetch)</h1>
            <p>Connection: ${RSS_URL}</p>
            <div style="margin-top: 20px;">
                <a href="/fetch-alerts" style="background: #002855; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Live XML Feed</a>
            </div>
        </div>
    `);
});

/**
 * Robust Fetch logic using Native Fetch API
 */
app.get('/fetch-alerts', async (req, res) => {
    let cache = { etag: null, data: null };

    // Load Cache
    if (fs.existsSync(CACHE_FILE)) {
        try {
            cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
        } catch (e) { console.error("Cache read error"); }
    }

    try {
        console.log(`[Request] Querying NDMA Sachet via Native Fetch...`);
        
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'Accept': 'application/xml, text/xml, */*'
        };

        if (cache.etag) {
            headers['If-None-Match'] = cache.etag;
        }

        const response = await fetch(RSS_URL, { 
            method: 'GET',
            headers: headers,
            // Native fetch handles decompression automatically
        });

        // CASE A: 304 Not Modified
        if (response.status === 304) {
            console.log('NDMA Status: 304 (Unchanged). Serving Cache.');
            res.set('Content-Type', 'text/plain');
            return res.send(cache.data);
        }

        // CASE B: 200 OK (or other)
        const newData = await response.text();
        const newEtag = response.headers.get('etag');

        if (response.ok && newData.includes('<')) {
            console.log('NDMA Status: 200 (New Data). Updating Cache.');
            const newCache = { etag: newEtag, data: newData };
            fs.writeFileSync(CACHE_FILE, JSON.stringify(newCache, null, 2));
            
           res.set('Content-Type', 'text/plain');
            return res.send(newData);
        } else {
            throw new Error(`Invalid response or XML content. Status: ${response.status}`);
        }

    } catch (error) {
        console.error('Fetch Error:', error.message);
        // Emergency Fallback to Cache
        if (cache.data) {
            console.log('Serving emergency cache due to network error.');
            res.set('Content-Type', 'text/plain');
            return res.send(cache.data);
        }
        res.status(500).send('<error>NDMA Connection Failed</error>');
    }
});

app.listen(PORT, () => console.log(`🚀 Stable Backend running at http://localhost:${PORT}`));