
# VoxForge — Eleven Labs Style TTS App

This project is a full-stack application that provides a beautiful frontend and secure backend proxy to interact with the [Eleven Labs Text-to-Speech API](https://api.elevenlabs.io/).

## Features
- 🎙️ Generate high-quality speech from text using Eleven Labs API.
- 🎚️ Adjustable stability and voice selection.
- 🎨 Modern animated UI/UX.
- 🔒 Secure backend proxy to protect your API key.
- 📂 Voice cloning (upload audio samples for custom voices).
- 📱 Responsive design with advanced animations.

---

## Project Structure
```
project-root/
│
├── public/
│   └── index.html        # Frontend UI
│
├── server.js             # Express backend proxy server
├── .env                   # Environment variables (API key)
└── README.md              # Project documentation
```

---

## Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/voxforge-elevenlabs.git
cd voxforge-elevenlabs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory with the following content:
```
ELEVEN_KEY=your_eleven_labs_api_key_here
```

> ⚠️ **Important:** Do **NOT** share this file or commit it to GitHub.

### 4. Start the Proxy Server
```bash
node server.js
```

The server will run at:
```
http://localhost:3000
```

---

## Usage

1. Open your browser and go to:  
   `http://localhost:3000`

2. Enter text in the textarea.

3. Select a voice from the dropdown.

4. Adjust stability if needed.

5. Click **Synthesize** to generate speech.

6. Play or download the generated audio.

---

## API Endpoints

| Method | Endpoint              | Description |
|--------|----------------------|-------------|
| GET    | `/api/eleven/voices` | Fetch list of available voices |
| POST   | `/api/eleven/tts`    | Generate speech from text |
| POST   | `/api/eleven/clone`  | Upload sample audio for voice cloning |

Example request for `/api/eleven/tts`:
```json
{
  "voice": "VOICE_ID",
  "text": "Hello world!",
  "stability": 0.75
}
```

---

## Dependencies
- [Express](https://expressjs.com/) — Web server framework.
- [node-fetch](https://www.npmjs.com/package/node-fetch) — Fetch API for Node.js.
- [Multer](https://www.npmjs.com/package/multer) — File uploads middleware.
- [dotenv](https://www.npmjs.com/package/dotenv) — Load environment variables.

Install them with:
```bash
npm install express node-fetch@2 multer dotenv
```

---

## Security Notes
- Never expose your Eleven Labs API key in the frontend.
- Always use the provided backend proxy for requests.
- Do not commit `.env` to version control.

---

## Troubleshooting

### `fetch is not a function`
Install `node-fetch`:
```bash
npm install node-fetch@2
```
And require it in `server.js`:
```js
const fetch = require('node-fetch');
```

### `Cannot GET /`
Ensure you added this line to serve static files:
```js
app.use(express.static('public'));
```

### Voices not loading
- Check that your Eleven Labs API key is valid.
- Test directly in the browser:
  `http://localhost:3000/api/eleven/voices`

---

## License
MIT License © 2025 VoxForge
