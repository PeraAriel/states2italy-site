/* ============================================================
   STATES2ITALY — vetrina (render da data layer)
   ============================================================ */

(function () {
  "use strict";

  const grid = document.querySelector("[data-cars-grid]");
  if (!grid) return;

  const cars = CarsStore.getCars();

  grid.innerHTML = cars
    .map(
      (car) => `
      <a class="car-card reveal" href="auto.html?auto=${encodeURIComponent(car.slug)}">
        <div class="car-media">
          <img src="${car.photos[0]}" alt="${car.name}" loading="lazy" />
          <span class="car-status">${car.status}</span>
        </div>
        <div class="car-info">
          <div>
            <h3>${car.name}</h3>
            <span class="year">${car.year} · ${car.engine.split("·")[0].trim()}</span>
          </div>
          <span class="price">${car.price}</span>
        </div>
        <ul class="car-specs">
          <li>${CarsStore.formatKm(car.km)}</li>
          <li class="spec-hl">Stati Uniti</li>
        </ul>
      </a>`
    )
    .join("");

  // Notifica reveal.js che ci sono nuovi .reveal da osservare
  document.dispatchEvent(new CustomEvent("states2italy:rendered"));
})();
