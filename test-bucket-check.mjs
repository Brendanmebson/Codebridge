import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnokwqpnsefkfuepbopp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxub2t3cXBuc2Vma2Z1ZXBib3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1ODgxMzUsImV4cCI6MjA5MjE2NDEzNX0.kVrL3fe-swEfnnJO9hOsRKDSF1ZI96kPTB4DYDBczN4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data: bucket, error: bucketError } = await supabase.storage.getBucket('member_documents');
  console.log("Bucket get result:", bucket);
  console.log("Bucket get error:", bucketError);
}

main();
