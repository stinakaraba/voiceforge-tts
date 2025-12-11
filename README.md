# 🎙️ VoiceForge - AI Text-to-Speech Generator

Transform your text into beautiful AI-generated audio in seconds. Powered by **Inworld.ai**.

## Features

- ✅ User authentication (signup/login)
- ✅ 6 unique AI voices to choose from
- ✅ High-quality HD audio generation
- ✅ Sub-250ms latency (feels instant!)
- ✅ Instant preview and download
- ✅ Clean, responsive UI

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL + Auth) |
| TTS | **Inworld.ai TTS API** |
| Frontend | Vanilla HTML/CSS/JS |

## Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- An Inworld.ai API key

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to initialize
3. Go to **Settings → API** to get your keys:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` key → `SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_KEY`

### 3. Get Inworld.ai API Key

1. Go to [inworld.ai](https://inworld.ai) and create an account
2. Navigate to **Settings → API Keys**
3. Create a new **Runtime API key**
4. Copy the **Base64-encoded** credentials → `INWORLD_API_KEY`

### 4. Configure Environment

Create a `.env` file in the `server` folder:

```bash
cd server
touch .env
```

Add your keys to `.env`:

```
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Inworld.ai API Key (Base64-encoded)
INWORLD_API_KEY=your-base64-api-key-here

# Server Configuration
PORT=3000
```

### 5. Install Dependencies

```bash
cd server
npm install
```

### 6. Start the Server

```bash
npm start
```

Or with auto-reload during development:

```bash
npm run dev
```

### 7. Open the App

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Sign Up** - Create an account with email/password
2. **Enter Text** - Paste or type your text (up to 5000 characters)
3. **Pick a Voice** - Choose from 6 AI voices:
   - **Ashley** - Warm, natural female
   - **Dennis** - Smooth, calm male
   - **Alex** - Energetic, expressive male
   - **Emma** - Friendly, professional female
   - **James** - Deep, authoritative male
   - **Sophia** - Soft, gentle female
4. **Generate** - Click the button and wait a few seconds
5. **Download** - Preview and download your MP3

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/logout` | Sign out |
| POST | `/api/tts/generate` | Generate audio (auth required) |
| GET | `/api/voices` | List available voices |
| GET | `/api/health` | Health check |

### Example: Generate Audio

```bash
curl -X POST http://localhost:3000/api/tts/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"text": "Hello world!", "voice": "Ashley"}' \
  --output audio.mp3
```

## Project Structure

```
/
├── server/
│   ├── index.js           # Express app entry
│   ├── config/
│   │   └── supabase.js    # Supabase client setup
│   ├── middleware/
│   │   └── auth.js        # JWT verification
│   ├── routes/
│   │   ├── auth.js        # Auth endpoints
│   │   └── tts.js         # TTS endpoints (Inworld.ai)
│   ├── .env               # Environment variables
│   └── package.json
│
├── public/
│   └── index.html         # Frontend UI
│
├── scope.md               # Full project scope
├── mvp.md                 # MVP specification
├── design.md              # UI design mockups
└── README.md              # This file
```

## Cost Estimates

- **Supabase** - Free tier includes 500MB database, 50K monthly active users
- **Inworld.ai TTS** - Check [inworld.ai/pricing](https://inworld.ai/pricing) for current rates
  - Generally competitive pricing with generous free tier

## Why Inworld.ai?

- 🚀 **Sub-250ms latency** - Feels instant
- 🎭 **Expressive voices** - Natural, human-like speech
- 🌍 **12 languages** - English, Spanish, French, Korean, and more
- 🎤 **Voice cloning** - Create custom voices (coming soon to VoiceForge)

## Troubleshooting

### "Invalid or expired token"
- Your session may have expired. Log out and log back in.

### "Rate limit exceeded"
- Inworld has rate limits. Wait a moment and try again.

### Audio not playing
- Check browser console for errors
- Ensure the text isn't empty

### Server won't start
- Make sure all environment variables are set
- Check that Node.js 18+ is installed
- Verify your Inworld API key is Base64-encoded

## Next Steps (v1.1)

- [ ] Generation history saved to database
- [ ] Audio file storage in Supabase Storage
- [ ] Voice cloning integration
- [ ] Rate limiting
- [ ] Deploy to Railway

## License

MIT
