/* ============================================================
   STATES2ITALY — data layer
   ------------------------------------------------------------
   Legge i veicoli da Supabase (API REST PostgREST) se
   js/supabase-config.js è compilato; in caso contrario, o se la
   richiesta fallisce, usa il catalogo locale js/cars-data.js.
   Le funzioni sono asincrone.
   ============================================================ */

const CarsStore = (function () {
  "use strict";

  const cfg = window.SUPABASE_CONFIG || {};
  const enabled = Boolean(cfg.url && cfg.anonKey);

  async function query(path) {
    const res = await fetch(cfg.url.replace(/\/$/, "") + "/rest/v1/" + path, {
      headers: { apikey: cfg.anonKey, Authorization: "Bearer " + cfg.anonKey }
    });
    if (!res.ok) throw new Error("Supabase " + res.status);
    return res.json();
  }

  function fromRow(row) {
    const photos = (row.car_photos || [])
      .slice()
      .sort((a, b) => a.sort - b.sort)
      .map((p) => p.url);
    return Object.assign({}, row, { photos });
  }

  const SELECT = "select=*,car_photos(url,sort)";

  async function getCars() {
    if (enabled) {
      try {
        return (await query("cars?" + SELECT + "&order=id")).map(fromRow);
      } catch (e) {
        console.warn("Supabase non raggiungibile, uso il catalogo locale.", e);
      }
    }
    return CARS.slice();
  }

  async function getCarBySlug(slug) {
    if (enabled) {
      try {
        const rows = await query(
          "cars?" + SELECT + "&slug=eq." + encodeURIComponent(slug) + "&limit=1"
        );
        return rows.length ? fromRow(rows[0]) : null;
      } catch (e) {
        console.warn("Supabase non raggiungibile, uso il catalogo locale.", e);
      }
    }
    return CARS.find((c) => c.slug === slug) || null;
  }

  function formatKm(km) {
    return km.toLocaleString("it-IT") + " km";
  }

  return { getCars, getCarBySlug, formatKm };
})();
