function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("show");
}

document.querySelector(".menu-icon").addEventListener("click", toggleMenu);

/*Hogy ha rányomunk egy olyan elemre, ami rendelkezik a data-rul-el
    akkor elvisz minket az adott oldalra, ez igazából ennyi */
function onClickLink(event) {
  let target = event.target.closest("button[data-url]");
  if (target) {
    window.open(target.getAttribute("data-url"), "_blank");
  }
}

document.querySelectorAll("button[data-url]").forEach((button) => {
  button.addEventListener("click", onClickLink);
});

document.addEventListener("DOMContentLoaded", function () {
  // Megkeressük a kezdő (home) szekciót
  const homeSection = document.getElementById("home");
  // Hozzáadjuk a "show" osztályt, hogy szépen megjelenjen (behalványul)
  homeSection.classList.add("show");

  // Összes többi szekciót megkeressük
  const sections = document.querySelectorAll(".section");

  function handleScroll() {
    let scrollPosition = window.scrollY + window.innerHeight / 2;
    let activeSection = sections[0]; // Alapértelmezett aktív szekció

    sections.forEach((section) => {
      let sectionTop = section.offsetTop;
      let sectionBottom = sectionTop + section.clientHeight;

      // Ha a képernyő középpontja ebben a szekcióban van, akkor ezt választjuk aktívnak
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSection = section;
      }
    });

    // Minden szekcióból eltávolítjuk az "active" osztályt
    sections.forEach((section) => section.classList.remove("active"));

    // A kiválasztott szekciót aktívvá tesszük
    activeSection.classList.add("active");

    // Home fade-out kezelése
    if (scrollPosition > homeSection.clientHeight / 2) {
      homeSection.classList.add("fade-out");
    } else {
      homeSection.classList.remove("fade-out");
    }
  }

  // Amikor a felhasználó görget, mindig frissítjük, hogy melyik szekció aktív
  window.addEventListener("scroll", handleScroll);
  // Az oldal betöltése után azonnal ellenőrizzük a helyzetet
  handleScroll();
});
