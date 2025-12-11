const { createClient } = require('@supabase/supabase-js');

// Supabase client for server-side operations
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Supabase client with anon key (for verifying user tokens)
const supabaseAuth = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = { supabase, supabaseAuth };
