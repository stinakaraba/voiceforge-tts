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
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tts', ttsRoutes);

// Voices endpoint (convenience - also available via tts routes)
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

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
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
