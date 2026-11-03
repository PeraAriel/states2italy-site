/* ============================================================
   STATES2ITALY — carousel
   ============================================================ */

(function () {
  "use strict";

  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".slide"));
  const dotsWrap = carousel.querySelector(".carousel-dots");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const AUTOPLAY_MS = 7000;

  let index = 0;
  let timer = null;

  // Dots
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.className = "dot";
    b.type = "button";
    b.setAttribute("aria-label", "Vai alla slide " + (i + 1));
    b.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(b);
    return b;
  });

  function render() {
    slides.forEach((s, i) => {
      const active = i === index;
      s.classList.toggle("is-active", active);
      const v = s.querySelector("video");
      if (v) {
        if (active) {
          v.play().catch(() => {});
        } else {
          v.pause();
          v.currentTime = 0;
        }
      }
    });
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }

  function go(n, user) {
    index = (n + slides.length) % slides.length;
    render();
    if (user) restart();
  }

  function next(user) { go(index + 1, user); }
  function prev(user) { go(index - 1, user); }

  function start() {
    stop();
    timer = setInterval(() => next(false), AUTOPLAY_MS);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restart() { start(); }

  nextBtn.addEventListener("click", () => next(true));
  prevBtn.addEventListener("click", () => prev(true));

  // Pausa su hover / focus
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);

  // Tastiera
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next(true);
    if (e.key === "ArrowLeft") prev(true);
  });

  // Swipe touch
  let touchX = null;
  carousel.addEventListener("pointerdown", (e) => { touchX = e.clientX; });
  carousel.addEventListener("pointerup", (e) => {
    if (touchX === null) return;
    const dx = e.clientX - touchX;
    if (Math.abs(dx) > 48) (dx < 0 ? next(true) : prev(true));
    touchX = null;
  });

  render();
  start();
})();
