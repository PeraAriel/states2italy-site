/* ============================================================
   STATES2ITALY — vetrina (render da data layer)
   ============================================================ */

(async function () {
  "use strict";

  const grid = document.querySelector("[data-cars-grid]");
  if (!grid) return;

  // Loader con logo mentre i dati arrivano da Supabase
  grid.innerHTML = `
    <div class="cars-loader" role="status" aria-label="Caricamento vetrina">
      <div class="cars-loader-logo">
        <img src="assets/img/logo.png" alt="" />
        <span class="cars-loader-ring"></span>
      </div>
    </div>`;

  // Il loader resta visibile almeno 1 secondo, così l'animazione
  // si vede anche quando Supabase risponde quasi subito
  const [cars] = await Promise.all([
    CarsStore.getCars(),
    new Promise((r) => setTimeout(r, 1000))
  ]);
  const isHome = grid.classList.contains("grid-cars-home");

  // In homepage solo 3 veicoli selezionati; la pagina vetrina li mostra tutti
  const HOME_SLUGS = ["porsche-911-carrera-993", "ford-gt", "shelby-gt500"];
  const list = isHome ? cars.filter((c) => HOME_SLUGS.includes(c.slug)) : cars;

  const renderCard = (car, noReveal) => `
      <a class="car-card${noReveal ? "" : " reveal"}" href="auto.html?auto=${encodeURIComponent(car.slug)}">
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
      </a>`;

  if (isHome) {
    // Homepage: i 3 veicoli selezionati in un carosello a scorrimento
    // laterale (da sinistra a destra), uno alla volta, con scheda larga.
    const slidesHtml = list
      .map(
        (c) => `
      <div class="car-slide">
        <a class="car-feature" href="auto.html?auto=${encodeURIComponent(c.slug)}">
          <div class="feature-media">
            <img src="${c.photos[0]}" alt="${c.name}" loading="lazy" />
            <span class="car-status">${c.status}</span>
          </div>
          <div class="feature-body">
            <p class="kicker">In vetrina</p>
            <h3>${c.name}</h3>
            <dl class="feature-specs">
              <div><dt>Anno</dt><dd>${c.year}</dd></div>
              <div><dt>Motore</dt><dd>${c.engine}</dd></div>
              <div><dt>Chilometri</dt><dd>${CarsStore.formatKm(c.km)}</dd></div>
              <div><dt>Provenienza</dt><dd>${c.country}</dd></div>
            </dl>
            <div class="feature-foot">
              <span class="feature-price">${c.price}</span>
              <span class="feature-cta">Scopri di pi&ugrave; &#8250;</span>
            </div>
          </div>
        </a>
      </div>`
      )
      .join("");
    grid.innerHTML = `<div class="cars-slider">${slidesHtml}</div><div class="cars-dots"></div>`;

    const slideEls = Array.from(grid.querySelectorAll(".car-slide"));
    const dotsWrap = grid.querySelector(".cars-dots");
    let cur = 0;

    const dots = slideEls.map((_, i) => {
      const b = document.createElement("button");
      b.className = "dot";
      b.type = "button";
      b.setAttribute("aria-label", "Vai al veicolo " + (i + 1));
      b.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(b);
      return b;
    });

    function goTo(n, user) {
      const prevEl = slideEls[cur];
      const prevDot = dots[cur];
      cur = (n + slideEls.length) % slideEls.length;
      if (slideEls[cur] === prevEl) return;
      prevEl.classList.remove("is-active");
      prevEl.classList.add("is-leaving");
      prevDot.classList.remove("is-active");
      slideEls[cur].classList.add("is-active");
      dots[cur].classList.add("is-active");
      // A fine corsa riporta la slide uscita a sinistra SENZA animazione,
      // altrimenti la si vedrebbe riattraversare lo schermo al contrario
      setTimeout(() => {
        prevEl.style.transition = "none";
        prevEl.classList.remove("is-leaving");
        void prevEl.offsetWidth; // forza il reflow
        prevEl.style.transition = "";
      }, 650);
      if (user) restart();
    }

    const SLIDE_EVERY_MS = 5000;
    let t;
    function restart() {
      clearInterval(t);
      t = setInterval(() => goTo(cur + 1), SLIDE_EVERY_MS);
    }

    slideEls[0].classList.add("is-active", "is-first");
    dots[0].classList.add("is-active");
    restart();
    grid.addEventListener("mouseenter", () => clearInterval(t));
    grid.addEventListener("mouseleave", restart);
  } else {
    grid.innerHTML = list.map((c) => renderCard(c, false)).join("");
  }

  // Notifica reveal.js che ci sono nuovi .reveal da osservare
  document.dispatchEvent(new CustomEvent("states2italy:rendered"));
})();
