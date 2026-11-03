/* ============================================================
   STATES2ITALY — data layer
   ------------------------------------------------------------
   Astrae l'accesso ai dati dei veicoli. Oggi legge da
   js/cars-data.js (array CARS); domani basterà riscrivere
   queste funzioni con fetch() verso il vostro backend/database
   senza toccare le pagine.
   ============================================================ */

const CarsStore = (function () {
  "use strict";

  function getCars() {
    return CARS.slice();
  }

  function getCarBySlug(slug) {
    return CARS.find((c) => c.slug === slug) || null;
  }

  function formatKm(km) {
    return km.toLocaleString("it-IT") + " km";
  }

  return { getCars, getCarBySlug, formatKm };
})();
