/* ============================================================
   STATES2ITALY — configurazione Supabase
   ============================================================
   Le credenziali sono caricate da variabili d'ambiente (.env).
   
   La chiave anon è pensata per stare nel browser: la sicurezza
   è garantita dalle policy RLS definite in supabase/schema.sql.
   NON inserire mai qui la chiave "service_role".
   Lasciando i valori vuoti il sito usa js/cars-data.js.
   ============================================================ */

window.SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || "",
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ""
};
