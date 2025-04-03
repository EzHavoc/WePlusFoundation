import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL or API Key is missing! Check your .env file.");
}

// Initialize Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: {
    headers: {
      apikey: SUPABASE_ANON_KEY, // Ensure API key is included
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    }
  }
});

// Test connection
supabase.from("your_table").select("*")
  .then(({ data, error }) => {
    console.log("TEST RESPONSE:", data, error);
  })
  .catch(console.error);
