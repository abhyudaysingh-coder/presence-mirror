import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://abeoxpjdzzrvgpdirves.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZW94cGpkenpydmdwZGlydmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTQxMjMsImV4cCI6MjA4ODgzMDEyM30.ZKMaEDXgGVCycsMppXkbhUlRy3_7QEh6PdlFFHL3W34";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
