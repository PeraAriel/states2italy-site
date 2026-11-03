/* ============================================================
   STATES2ITALY — carousel
   ============================================================ */

(function () {
  "use strict";

  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".slide"));
  const dotsWrap = carousel.querySelector(".carousel-dots");
  const toggleBtn = carousel.querySelector(".carousel-toggle");
  const TRANSITION_MS = 350; // come la transizione CSS .slide
  const MAX_SLIDE_MS = 6000; // fallback se il video non finisce

  let index = 0;
  let previous = -1;
  let lastGoAt = 0;
  let paused = false;     // pausa automatica (hover/focus)
  let userPaused = false; // pausa manuale dal bottone
  let timer = null;

  // Quando il video attivo finisce, si passa al video successivo
  slides.forEach((s, i) => {
    const v = s.querySelector("video");
    if (!v) return;
    v.loop = false;
    v.addEventListener("ended", () => {
      if (i === index && !paused && !userPaused) next();
    });
    v.addEventListener("error", () => {
      if (i === index && !paused && !userPaused) next();
    });
  });

  // Dots
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.className = "dot";
    b.type = "button";
    b.setAttribute("aria-label", "Vai alla slide " + (i + 1));
    b.addEventListener("click", () => go(i));
    dotsWrap.appendChild(b);
    return b;
  });

  function render() {
    slides.forEach((s, i) => {
      const active = i === index;
      s.classList.toggle("is-active", active);
      s.classList.toggle("is-leaving", i === previous);
      const v = s.querySelector("video");
      if (v) {
        if (active) {
          if (!userPaused) v.play().catch(() => {});
        } else {
          v.pause();
        }
      }
    });
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));

    // Riavvolge la slide uscente solo a transizione finita, così la
    // prossima volta è già ferma sul primo frame e parte senza scatti
    if (previous >= 0 && previous !== index) {
      const prevSlide = slides[previous];
      const pv = prevSlide.querySelector("video");
      setTimeout(() => {
        prevSlide.classList.remove("is-leaving");
        if (pv) pv.currentTime = 0;
      }, TRANSITION_MS);
    }
    previous = -1;
  }

  function go(n) {
    const now = Date.now();
    if (now - lastGoAt < 300) return; // evita doppi avanzamenti ravvicinati
    lastGoAt = now;
    previous = index;
    index = (n + slides.length) % slides.length;
    render();
    schedule();
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  // Passa comunque alla slide successiva dopo MAX_SLIDE_MS,
  // anche se il video non è ancora finito
  function schedule() {
    clearTimeout(timer);
    if (paused || userPaused) return;
    timer = setTimeout(next, MAX_SLIDE_MS);
  }

  // Se il video attivo è già finito (o assente), passa subito alla prossima slide
  function advanceIfEnded() {
    if (userPaused) return;
    const v = slides[index].querySelector("video");
    if (!v || v.ended) next();
    else schedule();
  }

  // Bottone play/pausa in basso a destra
  function setUserPaused(v) {
    userPaused = v;
    toggleBtn.classList.toggle("is-paused", v);
    toggleBtn.setAttribute("aria-pressed", String(v));
    toggleBtn.setAttribute("aria-label", v ? "Riprendi il carosello" : "Metti in pausa il carosello");
    const vid = slides[index].querySelector("video");
    if (v) {
      clearTimeout(timer);
      if (vid) vid.pause();
    } else {
      if (vid) vid.play().catch(() => {});
      schedule();
    }
  }

  if (toggleBtn) toggleBtn.addEventListener("click", () => setUserPaused(!userPaused));

  // Pausa su hover / focus
  carousel.addEventListener("mouseenter", () => { paused = true; clearTimeout(timer); });
  carousel.addEventListener("mouseleave", () => { paused = false; advanceIfEnded(); });
  carousel.addEventListener("focusin", () => { paused = true; clearTimeout(timer); });
  carousel.addEventListener("focusout", () => { paused = false; advanceIfEnded(); });

  // Tastiera
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // Swipe touch
  let touchX = null;
  carousel.addEventListener("pointerdown", (e) => { touchX = e.clientX; });
  carousel.addEventListener("pointerup", (e) => {
    if (touchX === null) return;
    const dx = e.clientX - touchX;
    if (Math.abs(dx) > 48) (dx < 0 ? next() : prev());
    touchX = null;
  });

  render();
  schedule();
})();
