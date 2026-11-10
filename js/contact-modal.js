/* ============================================================
   STATES2ITALY — modal contatti
   ------------------------------------------------------------
   Intercetta i link "Contattaci" / "Realizza il tuo sogno" e
   apre un pannello con l'email, invece di rimandare alla
   sezione contatti della vetrina. Animazioni di entrata e
   uscita gestite via classi .is-open / .is-closing.
   ============================================================ */

(function () {
  "use strict";

  const EMAIL = "states2italy@gmail.com";

  // Markup iniettato una sola volta
  const modal = document.createElement("div");
  modal.className = "contact-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Contatti States2Italy");
  modal.innerHTML = `
    <div class="contact-modal-backdrop" data-close></div>
    <div class="contact-modal-card">
      <button class="contact-modal-close" type="button" aria-label="Chiudi" data-close>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" aria-hidden="true">
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      </button>
      <h2 data-title>Parliamone.</h2>
      <p>Scrivici modello, anno e budget: attiviamo una ricerca dedicata sul territorio americano e non solo.</p>
      <a class="contact-modal-cta" href="mailto:${EMAIL}">Contattaci</a>
    </div>`;
  document.body.appendChild(modal);

  let open = false;
  let scrollY = 0;

  function lockScroll() {
    // Su mobile position:fixed sul body evita sia lo scroll sia la
    // banda bianca in fondo (l'overflow:hidden da solo non basta).
    // Su desktop compensiamo la scrollbar che sparisce.
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = -scrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    if (sbw > 0) {
      document.body.style.paddingRight = sbw + "px";
      const header = document.querySelector(".site-header");
      if (header) header.style.paddingRight = sbw + "px";
    }
  }

  function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.paddingRight = "";
    const header = document.querySelector(".site-header");
    if (header) header.style.paddingRight = "";
    window.scrollTo(0, scrollY);
  }

  function openModal(sourceText) {
    if (open) return;
    open = true;
    // Il titolo segue il pulsante cliccato: "Realizza il tuo sogno"
    // dalla home, "Parliamone." dagli altri "Contattaci"
    const title = modal.querySelector("[data-title]");
    title.textContent = /sogno/i.test(sourceText || "")
      ? "Il tuo sogno ti aspetta."
      : "Parliamone.";
    modal.classList.remove("is-closing");
    modal.classList.add("is-open");
    lockScroll();
  }

  function closeModal() {
    if (!open) return;
    open = false;
    modal.classList.add("is-closing");
    // Lo scroll si sblocca solo DOPO l'animazione di uscita,
    // altrimenti la pagina si sposta mentre la card scende
    setTimeout(() => {
      modal.classList.remove("is-open", "is-closing");
      unlockScroll();
    }, 300);
  }

  // Apre il modal sui link che puntano alla sezione contatti
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href$="#contatti"]');
    if (!a) return;
    e.preventDefault();
    openModal(a.textContent);
  });

  // Chiusura: X, backdrop, tasto Esc
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();
