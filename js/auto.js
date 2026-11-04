/* ============================================================
   STATES2ITALY — pagina dettaglio auto
   Legge ?auto=<slug> e renderizza scheda + galleria.
   ============================================================ */

(function () {
  "use strict";

  const root = document.querySelector("[data-car-detail]");
  if (!root) return;

  const slug = new URLSearchParams(location.search).get("auto");
  const car = slug ? CarsStore.getCarBySlug(slug) : null;

  if (!car) {
    root.innerHTML = `
      <div class="wrap car-missing">
        <p class="kicker">Vetrina</p>
        <h1 class="section-title">Auto non trovata.</h1>
        <p class="lead" style="margin-top: 16px;">
          Il veicolo richiesto non è più in vetrina o il link non è corretto.
        </p>
        <a class="btn" href="vetrina.html">Torna alla vetrina</a>
      </div>`;
    return;
  }

  document.title = `${car.name} — States2Italy`;

  root.innerHTML = `
    <div class="wrap">
      <a class="car-back" href="vetrina.html">&#8249; Torna alla vetrina</a>

      <div class="car-detail">
        <div class="car-gallery reveal" data-gallery>
          <div class="gallery-main">
            <img src="${car.photos[0]}" alt="${car.name}" />
          </div>
          <div class="gallery-thumbs">
            ${car.photos
              .map(
                (p, i) => `
              <button class="thumb${i === 0 ? " is-active" : ""}" type="button"
                      aria-label="Foto ${i + 1} di ${car.photos.length}">
                <img src="${p}" alt="" loading="lazy" />
              </button>`
              )
              .join("")}
          </div>
        </div>

        <div class="car-sheet reveal">
          <header class="car-head">
            <p class="kicker">${car.status}</p>
            <h1 class="car-title">${car.name}</h1>
            <p class="car-price">${car.price}</p>
          </header>

          <section class="car-panel">
            <h2 class="car-panel-title">Scheda tecnica</h2>
            <dl class="spec-list">
              <div class="spec"><dt>Anno</dt><dd>${car.year}</dd></div>
              <div class="spec"><dt>Motore</dt><dd>${car.engine}</dd></div>
              <div class="spec"><dt>Chilometri</dt><dd>${CarsStore.formatKm(car.km)}</dd></div>
              <div class="spec"><dt>Provenienza</dt><dd>${car.country}</dd></div>
            </dl>
          </section>

          <section class="car-panel">
            <h2 class="car-panel-title">Descrizione</h2>
            <p class="car-desc">${car.description}</p>
          </section>

          <a class="btn" href="vetrina.html#contatti">${car.status === "Solo esposizione" ? "Richiedi informazioni" : "Richiedi questa auto"}</a>
        </div>
      </div>
    </div>`;

  // Galleria: click sulle miniature
  const main = root.querySelector(".gallery-main img");
  const thumbs = Array.from(root.querySelectorAll(".thumb"));
  thumbs.forEach((t, i) => {
    t.addEventListener("click", () => {
      main.src = car.photos[i];
      thumbs.forEach((x, j) => x.classList.toggle("is-active", j === i));
    });
  });

  // Notifica reveal.js che il contenuto è pronto
  document.dispatchEvent(new CustomEvent("states2italy:rendered"));
})();
