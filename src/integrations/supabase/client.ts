import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jyvqqymnffkrmqrbfjus.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dnFxeW1uZmZrcm1xcmJmanVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2ODg3NTIsImV4cCI6MjA1NzI2NDc1Mn0.dXL5Waf8Z0sXkZHAFiYvcKNqFmrBFj9l4P-_nT6wn-Y";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
