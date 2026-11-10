/* ============================================================
   STATES2ITALY — fix tap su dispositivi touch
   ------------------------------------------------------------
   Alcuni browser mobile "mangiano" il primo tap sui link con
   effetti hover: il primo tocco attiva solo l'hover e serve un
   secondo tocco per navigare. Qui la navigazione parte al
   touchend, così basta un solo tocco su tutto il sito.
   ============================================================ */

(function () {
  "use strict";

  if (!window.matchMedia("(hover: none)").matches) return;

  let startX = 0;
  let startY = 0;
  let startT = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      const t = e.changedTouches[0];
      startX = t.clientX;
      startY = t.clientY;
      startT = Date.now();
    },
    { passive: true }
  );

  // Delega: copre anche i link iniettati dopo (vetrina, dettaglio)
  document.addEventListener(
    "touchend",
    (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      // Lascia stare ancore, link contatti (aprono il modal) e target speciali
      if (!href || href.includes("#contatti") || href.startsWith("#") || a.target === "_blank") return;

      // Protezione dai tocchi involontari: ignora se il dito si è
      // mosso (scroll/swipe) o se il tocco è durato troppo
      const t = e.changedTouches[0];
      const moved = Math.hypot(t.clientX - startX, t.clientY - startY);
      const held = Date.now() - startT;
      if (moved > 12 || held > 600) return;

      e.preventDefault();
      location.href = a.href;
    },
    { passive: false }
  );
})();
