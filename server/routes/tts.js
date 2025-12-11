const express = require('express');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Inworld.ai TTS API configuration
const INWORLD_API_URL = 'https://api.inworld.ai/tts/v1/voice';

// Available voices from Inworld.ai TTS
const VOICES = [
  { id: 'Ashley', name: 'Ashley', description: 'Warm, natural female' },
  { id: 'Dennis', name: 'Dennis', description: 'Smooth, calm male' },
  { id: 'Alex', name: 'Alex', description: 'Energetic, expressive male' },
  { id: 'Emma', name: 'Emma', description: 'Friendly, professional female' },
  { id: 'James', name: 'James', description: 'Deep, authoritative male' },
  { id: 'Sophia', name: 'Sophia', description: 'Soft, gentle female' },
];

const VALID_VOICE_IDS = VOICES.map(v => v.id);
const MAX_CHARACTERS = 5000; // Inworld supports longer text

/**
 * GET /api/voices
 * Get list of available voices (public endpoint)
 */
router.get('/voices', (req, res) => {
  res.json({ voices: VOICES });
});

/**
 * POST /api/tts/generate
 * Generate audio from text using Inworld.ai TTS
 * Requires authentication
 */
router.post('/generate', requireAuth, async (req, res) => {
  try {
    const { text, voice = 'Ashley' } = req.body;

    // Validate text input
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        error: 'Text is required' 
      });
    }

    const trimmedText = text.trim();

    if (trimmedText.length === 0) {
      return res.status(400).json({ 
        error: 'Text cannot be empty' 
      });
    }

    if (trimmedText.length > MAX_CHARACTERS) {
      return res.status(400).json({ 
        error: `Text exceeds maximum length of ${MAX_CHARACTERS} characters` 
      });
    }

    // Validate voice
    if (!VALID_VOICE_IDS.includes(voice)) {
      return res.status(400).json({ 
        error: `Invalid voice. Choose from: ${VALID_VOICE_IDS.join(', ')}` 
      });
    }

    // Check for API key
    if (!process.env.INWORLD_API_KEY) {
      console.error('INWORLD_API_KEY is not configured');
      return res.status(500).json({ 
        error: 'TTS service is not configured. Please contact support.' 
      });
    }

    console.log(`Generating audio for user ${req.user.id}: ${trimmedText.substring(0, 50)}...`);

    // Call Inworld.ai TTS API
    const response = await fetch(INWORLD_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${process.env.INWORLD_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: trimmedText,
        voiceId: voice,
        modelId: 'inworld-tts-1',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Inworld API error:', response.status, errorText);
      
      if (response.status === 429) {
        return res.status(429).json({ 
          error: 'Rate limit exceeded. Please try again in a moment.' 
        });
      }

      if (response.status === 401) {
        return res.status(500).json({ 
          error: 'API configuration error. Please contact support.' 
        });
      }

      throw new Error(`Inworld API error: ${response.status}`);
    }

    const result = await response.json();
    
    // Decode the base64 audio content
    const audioBuffer = Buffer.from(result.audioContent, 'base64');

    // Generate filename based on text preview
    const textPreview = trimmedText
      .substring(0, 30)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
    const filename = `voiceforge_${voice.toLowerCase()}_${textPreview}.mp3`;

    // Set headers for audio download
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-cache',
    });

    // Send the audio file
    res.send(audioBuffer);

    console.log(`Audio generated successfully: ${filename} (${audioBuffer.length} bytes)`);
  } catch (error) {
    console.error('TTS generation error:', error);
    
    res.status(500).json({ 
      error: 'Failed to generate audio. Please try again.' 
    });
  }
});

module.exports = router;
