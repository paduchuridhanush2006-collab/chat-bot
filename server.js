require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch'); // node 18+ has global fetch
const multer = require('multer');
const upload = multer();
const app = express();
app.use(express.json());


// ✅ Serve the public folder
app.use(express.static('public'));

const ELEVEN_KEY = process.env.ELEVEN_API_KEY;
if(!ELEVEN_KEY){
  console.error('Set ELEVEN_API_KEY environment variable');
  process.exit(1);
}

app.get('/', (req, res) => {
  // This will now serve index.html automatically
  res.sendFile(__dirname + '/public/index.html');
});

// Simple TTS proxy
app.post('/api/eleven/tts', async (req, res) => {
  try{
    const {voice, text, stability} = req.body;
    const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'xi-api-key': ELEVEN_KEY
      },
      body: JSON.stringify({
        text, voice_settings: {stability: parseFloat(stability || 0.75)}
      })
    });
    const arrayBuffer = await resp.arrayBuffer();
    res.set('Content-Type','audio/mpeg');
    res.send(Buffer.from(arrayBuffer));
  }catch(e){
    console.error(e);
    res.status(500).json({error:e.message});
  }
});

// List voices proxy
app.get('/api/eleven/voices', async (req,res)=>{
  const r = await fetch('https://api.elevenlabs.io/v1/voices',{headers:{'xi-api-key':ELEVEN_KEY}});
  const data = await r.json();
  res.json(data);
});

// Basic voice file upload proxy (for cloning) - multipart form
app.post('/api/eleven/clone', upload.single('file'), async (req,res)=>{
  res.status(501).json({error:'Implement cloning per Eleven Labs docs; this is a proxy example.'});
});

app.listen(3000,()=>console.log('Proxy listening :3000'));
