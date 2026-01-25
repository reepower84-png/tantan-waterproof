import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

// Create Supabase client only if URL is valid
let supabase: SupabaseClient;

if (supabaseUrl && supabaseUrl.startsWith("http")) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Dummy client for build time - will be properly initialized at runtime
  supabase = createClient("https://placeholder.supabase.co", "placeholder");
}

export { supabase };

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: "대기중" | "연락완료" | "상담완료";
  created_at: string;
}
