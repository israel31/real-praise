// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// This code now reads from your .env file locally,
// and from the Environment Variables you set in the Netlify UI when deployed.
// There are no hardcoded keys here.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);