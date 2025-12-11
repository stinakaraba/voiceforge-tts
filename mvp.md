# Text-to-Speech MVP - Backend Focus

## The Magic Moment
**User creates account → pastes text → downloads AI audio in under 30 seconds**

---

## Tech Stack (Simplified)

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL + Auth) |
| TTS | **Inworld.ai TTS API** |
| Frontend | Minimal HTML/CSS (just enough to demo) |

---

## MVP Features (Backend Only)

### 1. Authentication (Supabase handles the heavy lifting)
- Sign up with email/password
- Sign in / Sign out
- Middleware to protect TTS endpoint

### 2. Text-to-Speech Generation ⭐ (The Magic)
- Accept text input (up to 5000 characters)
- Call Inworld.ai TTS API with selected voice
- Return audio file directly for download
- **No storage needed for MVP** - generate and stream
- Sub-250ms latency for instant feel!

### 3. Voice Selection
- Hardcoded list of 6 Inworld.ai voices
- Default to "Ashley" if none selected

---

## API Endpoints (Just 4!)

```
POST /api/auth/signup     → Create account
POST /api/auth/login      → Sign in
POST /api/tts/generate    → Generate & download audio ⭐
GET  /api/voices          → List available voices
```

---

## The Core Endpoint

### `POST /api/tts/generate`

**Request:**
```json
{
  "text": "Hello, this is my AI-generated voice!",
  "voice": "nova"
}
```

**Response:**
- Content-Type: `audio/mpeg`
- Direct MP3 file download (streamed from OpenAI)

**That's it.** No database writes, no file storage, no history. Just pure text → audio magic.

---

## Database Schema (MVP)

### Users
- Handled entirely by Supabase Auth
- No custom user table needed for MVP

### Generations Table
- **Skip for MVP** - add in v1.1 when we want history

---

## File Structure (Minimal)

```
/
├── server/
│   ├── index.js              # Express app entry
│   ├── routes/
│   │   ├── auth.js           # Signup/login routes
│   │   └── tts.js            # TTS generation route
│   ├── middleware/
│   │   └── auth.js           # Verify Supabase JWT
│   ├── config/
│   │   └── supabase.js       # Supabase client setup
│   ├── package.json
│   └── .env
│
├── public/
│   └── index.html            # Simple demo page
│
├── mvp.md
└── README.md
```

---

## Environment Variables

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
INWORLD_API_KEY=your_base64_encoded_inworld_key
PORT=3000
```

---

## MVP User Flow

```
1. User opens simple HTML page
2. User signs up (email/password) → Supabase creates account
3. User logs in → Gets JWT token
4. User pastes text, picks voice, clicks "Generate"
5. Backend calls Inworld.ai TTS API
6. Audio streams back → Browser auto-downloads MP3
7. ✨ Magic ✨ (sub-250ms latency!)
```

---

## What We're NOT Building (Yet)

- ❌ React frontend (simple HTML is enough to demo)
- ❌ Generation history (no database writes)
- ❌ Audio file storage (stream directly)
- ❌ User profiles
- ❌ Rate limiting (trust users for now)
- ❌ Pretty UI (function over form)

---

## Success Criteria

- [ ] User can create account via API
- [ ] User can log in and receive token
- [ ] Authenticated user can generate audio from text
- [ ] Audio downloads as playable MP3
- [ ] Total time from paste → download < 30 seconds

---

## Next Steps After MVP

1. Add generation history (save to database)
2. Store audio files in Supabase Storage
3. Build proper React frontend
4. Add rate limiting
5. Deploy to Railway

---

## Why This MVP Works

1. **Minimal surface area** - 4 endpoints, ~200 lines of backend code
2. **Supabase does auth** - No password hashing, JWT handling, etc.
3. **No storage complexity** - Stream audio directly, don't store
4. **Instant gratification** - User hears their AI voice immediately (sub-250ms!)
5. **Proves the concept** - If this works, everything else is polish
6. **Inworld.ai** - High-quality voices, fast response, great developer experience

