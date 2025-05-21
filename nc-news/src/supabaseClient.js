import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://htqzngoizyfaccakyxof.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0cXpuZ29penlmYWNjYWt5eG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTM5MDUsImV4cCI6MjA2MTY4OTkwNX0.EnFIkJz7ORUgDayvXgkN0eHHXc4gc3nmrtI5Q1xlWCc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
