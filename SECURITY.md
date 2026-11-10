# Sicurezza

## Protezione del database

Il database del catalogo veicoli è configurato secondo il principio del minimo privilegio:

- **Lettura pubblica** — il sito può unicamente consultare il catalogo, come è giusto che sia per una vetrina pubblica.
- **Scrittura riservata** — l'inserimento e la modifica dei dati sono possibili esclusivamente dalla console di amministrazione, protetta da autenticazione. Nessuna operazione di scrittura è consentita dal sito pubblico.
- **Accesso a livello di riga** — ogni tabella applica regole di accesso granulari, verificate dal database stesso a ogni richiesta e non aggirabili dal lato client.

## Gestione delle credenziali

- Nel codice pubblico del sito è presente unicamente la chiave pensata per l'esposizione nel browser, che da sola consente la sola lettura del catalogo.
- Le credenziali con privilegi elevati non fanno parte del repository né del codice distribuito agli utenti.
- Le chiavi sensibili possono essere rigenerate in qualsiasi momento dalla console di amministrazione, senza impatto sul funzionamento del sito.

## Segnalazione di vulnerabilità

Se ritieni di aver individuato un problema di sicurezza, ti chiediamo di segnalarcelo in modo responsabile all'indirizzo **states2italy@gmail.com**, evitando la divulgazione pubblica fino alla risoluzione.
