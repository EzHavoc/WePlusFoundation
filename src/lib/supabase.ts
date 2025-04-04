import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL or API Key is missing! Check your .env file.");
}

// Initialize Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test connection (Ensure the table name exists in your database)
async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("your_actual_table").select("*");
    if (error) throw error;
    console.log("TEST RESPONSE:", data);
  } catch (error) {
    console.error("Supabase Connection Error:", error);
  }
}

// Call test function only in development mode
if (import.meta.env.MODE === 'development') {
  testSupabaseConnection();
}
