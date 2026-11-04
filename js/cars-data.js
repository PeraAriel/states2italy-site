/* ============================================================
   STATES2ITALY — catalogo veicoli
   ------------------------------------------------------------
   Questo file funge da "database" lato client.

   MIGRAZIONE A UN DATABASE REALE:
   - Ogni oggetto in CARS corrisponde a una riga della tabella
     `cars` (colonne: id, slug, name, year, engine, km, country,
     price, status, description).
   - Le foto vanno nella tabella `car_photos` (car_id, url, sort).
   - Per passare a un backend basta sostituire le funzioni in
     js/cars-store.js con chiamate fetch() alle vostre API:
       GET /api/cars        -> elenco (come getCars())
       GET /api/cars/:slug  -> dettaglio (come getCarBySlug())
   ============================================================ */

const CARS = [
  {
    id: 1,
    slug: "porsche-911-carrera-993",
    name: "Porsche 911 Carrera (993)",
    year: 1995,
    engine: "3.6 Flat-6 air-cooled · 272 CV",
    km: 86400,
    country: "California, USA",
    price: "Su richiesta",
    status: "Disponibile",
    description:
      "L'ultima 911 raffreddata ad aria. Esemplare unico proprietario, " +
      "tagliandi documentati Porsche, matching numbers. Vernice Riviera Blue " +
      "originale, interni in pelle nera senza difetti.",
    photos: [
      "assets/img/cars/porsche-993-1.jpg",
      "assets/img/cars/porsche-993-2.jpg",
      "assets/img/cars/porsche-993-3.jpg"
    ]
  },
  {
    id: 2,
    slug: "chevrolet-corvette-c6",
    name: "Chevrolet Corvette C6",
    year: 2007,
    engine: "V8 6.0 LS2 · 404 CV",
    km: 52300,
    country: "Texas, USA",
    price: "Su richiesta",
    status: "Disponibile",
    description:
      "Corvette C6 con cambio manuale a 6 rapporti e pacchetto Z51. " +
      "Sempre in garage climatizzato, mai pista. Gomme nuove e batteria " +
      "sostituita a giugno 2026.",
    photos: [
      "assets/img/cars/corvette-c6-1.jpg",
      "assets/img/cars/corvette-c6-2.jpg",
      "assets/img/cars/corvette-c6-3.jpg"
    ]
  },
  {
    id: 3,
    slug: "dodge-viper-srt10",
    name: "Dodge Viper SRT-10",
    year: 2006,
    engine: "V10 8.3 · 517 CV",
    km: 31800,
    country: "Florida, USA",
    price: "Su richiesta",
    status: "In arrivo",
    description:
      "Dieci cilindri di pura analogia americana. Scarico laterale " +
      "originale, nessuna modifica. Libretto service completo e due set " +
      "di chiavi. Una delle ultime SRT-10 prima del restyling.",
    photos: [
      "assets/img/cars/dodge-viper-1.jpg",
      "assets/img/cars/dodge-viper-2.jpg",
      "assets/img/cars/dodge-viper-3.jpg"
    ]
  },
  {
    id: 4,
    slug: "ford-gt",
    name: "Ford GT",
    year: 2005,
    engine: "V8 5.4 Supercharged · 558 CV",
    km: 18900,
    country: "Michigan, USA",
    price: "Su richiesta",
    status: "Disponibile",
    description:
      "L'erede della leggenda di Le Mans. Primo anno di produzione, " +
      "tutti gli optional factory inclusi. Manutenzione eseguita solo " +
      "presso Ford GT certified shop. Da collezione.",
    photos: [
      "assets/img/cars/ford-gt-1.jpg",
      "assets/img/cars/ford-gt-2.jpg",
      "assets/img/cars/ford-gt-3.jpg"
    ]
  },
  {
    id: 5,
    slug: "shelby-gt500",
    name: "Ford Mustang Shelby GT500",
    year: 2021,
    engine: "V8 5.2 Predator · 771 CV",
    km: 12400,
    country: "Nevada, USA",
    price: "Su richiesta",
    status: "Disponibile",
    description:
      "La Mustang più potente di sempre. Cambio doppia frizione Tremec " +
      "a 7 rapporti, pacchetto Carbon Fiber Track Pack. Praticamente " +
      "nuova, ancora in garanzia ufficiale USA.",
    photos: [
      "assets/img/cars/shelby-gt500-1.jpg",
      "assets/img/cars/shelby-gt500-2.jpg",
      "assets/img/cars/shelby-gt500-3.jpg"
    ]
  },
  {
    id: 6,
    slug: "harley-davidson-sportster-iron-883",
    name: "Harley-Davidson Sportster Iron 883",
    year: 2022,
    engine: "V-Twin Evolution 883 cc · 52 CV",
    km: 2400,
    country: "Wisconsin, USA",
    price: "Su richiesta",
    status: "Disponibile",
    description:
      "Il V-Twin di Milwaukee nel suo formato più essenziale: serbatoio " +
      "peanut, scarico nero e sound inconfondibile. Esemplare in ottime " +
      "condizioni, tagliandi documentati. Foto da concessionario a scopo illustrativo.",
    photos: [
      "assets/img/moto/harley-davidson-sportster-iron-883.jpg",
      "assets/img/moto/harley-davidson-sportster-xl883.jpg",
      "assets/img/moto/harley-davidson-sportster-1200.jpg"
    ]
  },
  {
    id: 7,
    slug: "buell-rr1000-battletwin",
    name: "Buell RR1000 Battletwin",
    year: 1987,
    engine: "V-Twin 1000 cc · 75 CV",
    km: 5800,
    country: "Wisconsin, USA",
    price: "Su richiesta",
    status: "Disponibile",
    description:
      "Rarità americana degli anni '80: la Buell da record, con la carenatura " +
      "integrale e il telaio che l'hanno resa un cult. Esemplare conservato, " +
      "documenti in regola. Foto da concessionario a scopo illustrativo.",
    photos: [
      "assets/img/moto/buell-rr1000-battletwin-1.jpg",
      "assets/img/moto/buell-rr1000-battletwin-2.jpg"
    ]
  }
];
