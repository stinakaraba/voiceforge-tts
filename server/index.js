require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const ttsRoutes = require('./routes/tts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging (helpful for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes FIRST (before static files)
app.use('/api/auth', authRoutes);
app.use('/api/tts', ttsRoutes);

// Voices endpoint
app.get('/api/voices', (req, res) => {
  const voices = [
    { id: 'Ashley', name: 'Ashley', description: 'Warm, natural female' },
    { id: 'Dennis', name: 'Dennis', description: 'Smooth, calm male' },
    { id: 'Alex', name: 'Alex', description: 'Energetic, expressive male' },
    { id: 'Emma', name: 'Emma', description: 'Friendly, professional female' },
    { id: 'James', name: 'James', description: 'Deep, authoritative male' },
    { id: 'Sophia', name: 'Sophia', description: 'Soft, gentle female' },
  ];
  res.json({ voices });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'VoiceForge API'
  });
});

// Serve static files from public folder AFTER API routes
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for any non-API route (SPA fallback)
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🎙️  VoiceForge API Server
  ========================
  Server running on: http://localhost:${PORT}
  
  Endpoints:
  - POST /api/auth/signup   - Create account
  - POST /api/auth/login    - Sign in
  - POST /api/tts/generate  - Generate audio (auth required)
  - GET  /api/voices        - List voices
  - GET  /api/health        - Health check
  
  Open http://localhost:${PORT} in your browser to use the app.
  `);
});
