# States2Italy

Sito vetrina per l'importazione di auto e moto dagli Stati Uniti verso l'Italia, con servizio chiavi in mano.

## Autore e architettura

Progetto ideato e sviluppato da **Ariel Pera**, autore e architetto del sito.

L'architettura è volutamente essenziale: un sito statico (HTML, CSS, JavaScript senza framework) che legge il catalogo veicoli da un database **Supabase** tramite API REST. Un data layer dedicato (`js/cars-store.js`) isola l'accesso ai dati: se il database non è raggiungibile, il sito ripiega automaticamente su un catalogo locale, senza interruzioni per l'utente.

## Struttura

- `index.html` — homepage con carosello hero e vetrina in evidenza
- `vetrina.html` — catalogo completo dei veicoli
- `auto.html` — scheda dettaglio del singolo veicolo
- `js/cars-store.js` — data layer (Supabase con fallback locale)
- `js/contact-modal.js` — pannello contatti con animazioni
- `supabase/` — schema e dati iniziali del database

## Sicurezza

Il database è protetto in lettura pubblica e scrittura riservata: il sito può solo leggere il catalogo, mentre le modifiche ai dati sono possibili esclusivamente dalla console di amministrazione. Nel codice pubblico è presente unicamente la chiave pensata per l'esposizione nel browser; le credenziali privilegiate restano fuori dal repository.
