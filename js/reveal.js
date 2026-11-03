/* ============================================================
   STATES2ITALY — animazioni di ingresso
   ------------------------------------------------------------
   - .reveal: appare con fade+slide quando entra nel viewport
     (IntersectionObserver, una sola volta).
   - Rispetta prefers-reduced-motion.
   ============================================================ */

(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showAll(els) {
    els.forEach((el) => el.classList.add("is-visible"));
  }

  function observe() {
    const els = Array.from(document.querySelectorAll(".reveal:not(.is-visible)"));
    if (!els.length) return;

    if (reduced || !("IntersectionObserver" in window)) {
      showAll(els);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => io.observe(el));
  }

  // Prima passata all'avvio
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observe);
  } else {
    observe();
  }

  // Contenuti iniettati dopo (es. vetrina renderizzata via JS)
  document.addEventListener("states2italy:rendered", observe);
})();
