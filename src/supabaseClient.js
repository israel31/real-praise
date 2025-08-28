// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Use the environment variables if they exist (on Netlify),
// otherwise, fall back to the hardcoded keys (for local development).
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_ORIGINAL_SUPABASE_URL_HERE';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_ORIGINAL_SUPABASE_ANON_KEY_HERE';

// IMPORTANT: Make sure you replace the placeholders above with your actual keys
// so that your local development still works!

export const supabase = createClient(supabaseUrl, supabaseAnonKey);