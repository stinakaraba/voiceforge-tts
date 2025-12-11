const express = require('express');
const { supabaseAuth } = require('../config/supabase');

const router = express.Router();

/**
 * POST /api/auth/signup
 * Create a new user account
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters' 
      });
    }

    // Create user with Supabase Auth
    const { data, error } = await supabaseAuth.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if email confirmation is required (session will be null)
    if (!data.session) {
      return res.status(201).json({
        message: 'Account created! Please check your email to confirm your account.',
        user: {
          id: data.user?.id,
          email: data.user?.email,
        },
        session: null,
        confirmationRequired: true,
      });
    }

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
      session: data.session,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

/**
 * POST /api/auth/login
 * Sign in an existing user
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({
      message: 'Logged in successfully',
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
      session: data.session,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

/**
 * POST /api/auth/logout
 * Sign out the current user
 */
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      // Note: Supabase handles token invalidation on client side
      // Server-side logout is mainly for cleanup
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Failed to log out' });
  }
});

module.exports = router;
