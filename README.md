# 🚨 AapadaSetu — AI-Powered Emergency Resource System

**Team EmergencyCoders · FS-VI-T038 · GEU B.Tech CSE**

> Devang Saklani · Mansi Rawat · Sakshi Kaintura · Vinayak Sharma

---

## ⚡ Quick Start (VS Code)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [VS Code](https://code.visualstudio.com/)

### Steps

**1. Open this folder in VS Code**
```
File → Open Folder → select `aapada-flow`
```

**2. Open the Terminal in VS Code**
```
Terminal → New Terminal  (or Ctrl + `)
```

**3. Install dependencies**
```bash
npm install
```

**4. Start the dev server**
```bash
npm run dev
```

**5. Open in browser**
```
http://localhost:5173
```

That's it! 🎉

---

## 📁 Project Structure

```
aapada-flow/
├── index.html          ← HTML entry point
├── package.json        ← Dependencies
├── vite.config.js      ← Vite config
├── README.md           ← This file
└── src/
    ├── main.jsx        ← React mount point
    └── App.jsx         ← ENTIRE APP (single file)
```

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Language | JavaScript (JSX) |
| Styling | Inline styles + injected CSS |
| AI Engine | Offline fallback + local Ollama chat |
| Storage | Browser localStorage / IndexedDB |
| Fonts | Google Fonts (Rajdhani + DM Sans) |

## ✨ Features

- ✅ **100% Offline-first** — works without internet
- 🤖 **AI resource ranking** — Haversine distance + multi-factor scoring
- 🌐 **10 Indian languages** — EN, HI, UR, MR, KN, TE, TA, BN, GU, MNI
- 🗺️ **SVG resource map** — no external map API needed
- 🩹 **First Aid guides** — 8 categories, fully offline
- 📢 **Emergency reporting** — submit and track reports
- 🆘 **SOS button** — one-tap emergency alert
- 🤖 **Offline AI chatbot** — powered by local logic
- 🖥️ **Free local LLM option** — Ollama via local `/api/chat`

## 📞 Emergency Numbers (India)

| Service | Number |
|---------|--------|
| Police | 100 |
| Fire | 101 |
| Ambulance | 102 |
| All Emergencies | **112** |
| SDRF | 1070 |
| NDRF | 9711077372 |

---

## 🔧 Other Commands

```bash
npm run build    # Build for production
npm run preview  # Preview production build
```

## Ollama Setup

Install and run Ollama locally, then pull a model:

```bash
ollama pull llama3.2:3b
ollama serve
```

Then start the app with:

```bash
npm run dev
```

Optional environment variables:

```bash
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:3b
```
