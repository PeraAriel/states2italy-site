# states2italy-site

**La tua prossima auto è oltreoceano** 🚗✈️

Non importiamo solo auto. Un marketplace innovativo per l'importazione di veicoli dagli Stati Uniti in Italia.

## 🔐 Setup Credenziali Supabase

### Per lo Sviluppo Locale

1. **Copia il file di template:**
   ```bash
   cp .env.example .env
   ```

2. **Compila le credenziali Supabase:**
   - Accedi a [Supabase Dashboard](https://app.supabase.com)
   - Vai a **Project Settings > API**
   - Copia `Project URL` e `anon` (public key)
   - Incolla in `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_your_public_key_here
   ```

3. **NON committare il file `.env`:**
   - È automaticamente ignorato da `.gitignore`
   - Contiene credenziali sensibili per lo sviluppo locale

### ⚠️ Sicurezza

- ✅ Le credenziali sono caricate da variabili d'ambiente
- ✅ Il file `.env` è escluso dal version control
- ✅ La storia git è stata ripulita dalle credenziali esposte
- ✅ Solo `.env.example` è committato (senza credenziali reali)

### Per il Deployment in Produzione

In ambienti di produzione (Vercel, Netlify, etc.), configura le variabili d'ambiente direttamente nel pannello di controllo:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📁 Struttura del Progetto

```
states2italy-site/
├── index.html              # Homepage
├── auto.html              # Dettaglio veicolo
├── vetrina.html           # Vetrina/Catalogo
├── privacy.html           # Privacy Policy
├── termini.html           # Termini di Servizio
├── css/                   # Stili
├── js/
│   ├── supabase-config.js # Configurazione Supabase (sicura)
│   └── cars-data.js       # Dati fallback
├── assets/                # Immagini e risorse
├── supabase/              # Schema DB e migrations
├── .env                   # Variabili d'ambiente (NON committare)
├── .env.example           # Template (.gitignore)
└── .gitignore             # Esclusioni Git
```

---

Built with ❤️ for Italians who dream big.
