// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Use the environment variables if they exist (on Netlify),
// otherwise, fall back to the hardcoded keys (for local development).
const supabaseUrl = 'https://snlmeqdnbjmgcyoasndk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNubG1lcWRuYmptZ2N5b2FzbmRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzY5ODIsImV4cCI6MjA3MTcxMjk4Mn0.ONquE46F5a_XiEoJpgzVsClYBRBpCMHeGP72fGV3sQA';

// IMPORTANT: Make sure you replace the placeholders above with your actual keys
// so that your local development still works!

export const supabase = createClient(supabaseUrl, supabaseAnonKey);