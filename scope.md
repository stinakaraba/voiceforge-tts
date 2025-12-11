# Text-to-Speech Generator - Project Scope

## Overview
A web application that converts text into natural-sounding audio using AI-powered text-to-speech technology. Users can create accounts, input text, select from various AI voices, and download high-quality MP3 files.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| TTS API | **Inworld.ai TTS API** |
| Authentication | Supabase Auth |
| Deployment | Railway |

---

## Core Features

### 1. User Authentication
- Sign up with email/password
- Sign in / Sign out
- Password reset functionality
- Protected routes (must be logged in to generate audio)

### 2. Text-to-Speech Generation
- Text input area (textarea for pasting/typing text)
- Voice selection dropdown (multiple AI voices to choose from)
- Generate button to create audio
- Character limit display (API limits)
- Loading state during generation

### 3. Audio Playback & Download
- In-browser audio player to preview generated audio
- Download button for MP3 file
- Clear file naming convention

### 4. Generation History
- List of user's previous generations
- Display: text snippet, voice used, date created
- Re-download past audio files
- Delete unwanted generations

---

## Database Schema

### Users Table
- Managed by Supabase Auth (built-in)

### Generations Table
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to auth.users |
| text_input | TEXT | Original text submitted |
| voice_id | VARCHAR | Voice identifier used |
| audio_url | TEXT | URL/path to stored audio file |
| created_at | TIMESTAMP | When generation was created |

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Sign in user
- `POST /api/auth/logout` - Sign out user

### Text-to-Speech
- `POST /api/tts/generate` - Generate audio from text
  - Request: `{ text, voiceId }`
  - Response: `{ audioUrl, generationId }`

### Generations
- `GET /api/generations` - Get user's generation history
- `GET /api/generations/:id` - Get specific generation
- `DELETE /api/generations/:id` - Delete a generation

### Voices
- `GET /api/voices` - Get available voice options

---

## User Flow

1. **Landing** → User arrives at homepage
2. **Sign Up/Login** → User creates account or signs in
3. **Dashboard** → User sees text input area and voice selector
4. **Generate** → User enters text, selects voice, clicks generate
5. **Preview** → Audio player appears with generated speech
6. **Download** → User downloads MP3 file
7. **History** → User can view/manage past generations

---

## Voice Options (Inworld.ai TTS)

| Voice | Description |
|-------|-------------|
| Ashley | Warm, natural female |
| Dennis | Smooth, calm male |
| Alex | Energetic, expressive male |
| Emma | Friendly, professional female |
| James | Deep, authoritative male |
| Sophia | Soft, gentle female |

---

## Pages / Views

1. **Landing Page** - App introduction, sign up/login buttons
2. **Login Page** - Email/password form
3. **Sign Up Page** - Registration form
4. **Dashboard** - Main TTS interface (text input, voice select, generate)
5. **History Page** - List of past generations

---

## Security Considerations

- API keys stored in environment variables (never exposed to frontend)
- Supabase Row Level Security (RLS) for database access
- Rate limiting on TTS endpoint to prevent abuse
- Input validation and sanitization
- CORS configuration for frontend/backend communication

---

## Out of Scope (v1)

- Social sharing features
- Team/organization accounts
- Custom voice training
- Batch processing multiple files
- Audio editing/effects
- Payment/subscription system
- Mobile app

---

## Success Metrics

- User can successfully create an account
- User can generate audio from text
- User can download generated MP3 files
- User can view their generation history
- App deploys successfully on Railway

---

## File Structure (Planned)

```
/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
│
├── server/                 # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
├── scope.md
└── README.md
```

---

## Environment Variables Needed

### Backend
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_KEY` - Supabase service role key
- `INWORLD_API_KEY` - Inworld.ai API key (Base64-encoded)
- `PORT` - Server port

### Frontend
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_SUPABASE_URL` - Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY` - Supabase anon key

