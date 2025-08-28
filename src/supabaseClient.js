// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

/**
 * -----------------------------------------------------------------------------
 * HOW THIS WORKS:
 *
 * 1. ON NETLIFY (PRODUCTION):
 *    - During the build process, Netlify finds the Environment Variables you set
 *      (REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY).
 *    - It replaces `process.env.REACT_APP_SUPABASE_URL` with your actual URL string.
 *    - Because the first part of the `||` (OR) is now a valid string, that value is used.
 *    - The fallback keys are completely ignored.
 *
 * 2. ON YOUR LOCAL MACHINE (DEVELOPMENT):
 *    - When you run `npm start`, Create React App does NOT see the Netlify
 *      environment variables. `process.env.REACT_APP_SUPABASE_URL` is `undefined`.
 *    - Because the first part of the `||` (OR) is `undefined` (which is "falsy"),
 *      JavaScript moves to the second part.
 *    - It uses your hardcoded fallback keys. This is what allows you to develop locally.
 * -----------------------------------------------------------------------------
 */

// Use the environment variables from Netlify if they exist.
// Otherwise, fall back to the hardcoded keys for local development.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY; 

// IMPORTANT: You MUST replace the placeholder above with your actual, real Supabase anon key.
// If you don't, your local development will fail.

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);