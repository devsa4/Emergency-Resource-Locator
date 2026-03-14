const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { translate } = require('@vitalets/google-translate-api');

const app = express();
const PORT = 5000;
const RSS_URL = 'https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml';

app.use(cors());

// Supported Language Mapping
const langMap = {
  'en': 'en', 'hi': 'hi', 'gu': 'gu', 'ur': 'ur', 
  'mr': 'mr', 'ta': 'ta', 'kn': 'kn', 'ne': 'ne', 'pa': 'pa'
};

async function translateFeed(xml, langCode) {
    if (langCode === 'en' || !langMap[langCode]) return xml;
    
    try {
        const titleRegex = /<title>(.*?)<\/title>/g;
        const matches = [...xml.matchAll(titleRegex)];
        let translatedXml = xml;

        // Translate the first 6 items (Title is most critical for alerts)
        for (let i = 0; i < Math.min(matches.length, 7); i++) {
            const fullMatch = matches[i][0];
            const text = matches[i][1];

            if (text.includes("CDATA") || text === "NDMA - Sachet") continue;

            const res = await translate(text, { to: langMap[langCode] });
            translatedXml = translatedXml.replace(fullMatch, `<title>${res.text}</title>`);
        }
        return translatedXml;
    } catch (e) {
        console.error("Translation logic failed:", e.message);
        return xml;
    }
}

app.get('/fetch-alerts', async (req, res) => {
    const targetLang = req.query.lang || 'en';
    try {
        const response = await fetch(RSS_URL);
        const xmlData = await response.text();
        
        const finalXml = await translateFeed(xmlData, targetLang);
        res.set('Content-Type', 'text/plain');
        res.send(finalXml);
    } catch (err) {
        res.status(500).send("Error");
    }
});

app.listen(PORT, () => console.log(`🚀 Scraper Active on Port ${PORT}`));