/* ============================================================
   STATES2ITALY — configurazione Supabase
   ------------------------------------------------------------
   Inserire Project URL e chiave "anon" (public) da
   Supabase > Project Settings > API.
   La chiave anon è pensata per stare nel browser: la sicurezza
   è garantita dalle policy RLS definite in supabase/schema.sql.
   NON inserire mai qui la chiave "service_role".
   Lasciando i valori vuoti il sito usa js/cars-data.js.
   ============================================================ */

window.SUPABASE_CONFIG = {
  url: "https://zzikyjklsbmmgqspdoer.supabase.co",
  anonKey: "sb_publishable_bcrLXC4XKzWrS-mRldg7qg_FI-5gFuM"
};
