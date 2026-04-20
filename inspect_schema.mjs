import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnokwqpnsefkfuepbopp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxub2t3cXBuc2Vma2Z1ZXBib3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1ODgxMzUsImV4cCI6MjA5MjE2NDEzNX0.kVrL3fe-swEfnnJO9hOsRKDSF1ZI96kPTB4DYDBczN4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log("Checking membership_applications schema...");
  const { data, error } = await supabase
    .from('membership_applications')
    .select('*')
    .limit(1);

  if (error) {
    if (error.message.includes('column')) {
       console.log("Got column error as expected. Trying to find columns via RPC or introspection...");
    } else {
       console.log("Error:", error);
    }
  }

  // Try to use PostgREST introspection if possible, but we don't have direct access.
  // We can try to guess or use the error message which might list columns if we do a bad select.
  const { error: badSelectError } = await supabase
    .from('membership_applications')
    .select('*, non_existent_column');

  console.log("Bad select error (might list columns):", badSelectError?.message);
}

main();
