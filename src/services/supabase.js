import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://dwxllzuqsyrlsysbppgl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3eGxsenVxc3lybHN5c2JwcGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NjIyOTgsImV4cCI6MjAzNDEzODI5OH0.nAxXJOF3qrXLZWX1by7TheAUPPi10xPHFJGvA6QsaFs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
