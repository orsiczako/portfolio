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
    // Megnézzük, hogy a felhasználó éppen hol tart az oldalon
    let scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      let sectionTop = section.offsetTop; // Szekció tetejének pozíciója
      let sectionBottom = sectionTop + section.clientHeight; // Szekció alja

      // Ha a felhasználó ezen a szekción belül van, akkor aktív lesz
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        section.classList.add("active"); // Kiemeljük az aktuális szekciót
      } else {
        section.classList.remove("active"); // Ha már nem ott van, akkor levesszük a kiemelést
      }
    });

    // Ha a kezdő (home) szekció már nincs a képernyőn, akkor halványítsuk el
    if (scrollPosition > homeSection.clientHeight / 2) {
      homeSection.classList.add("fade-out"); // Home eltűnik
    } else {
      homeSection.classList.remove("fade-out"); // Ha visszagörgetsz, újra látható lesz
    }
  }

  // Amikor a felhasználó görget, mindig frissítjük, hogy melyik szekció aktív
  window.addEventListener("scroll", handleScroll);
  // Az oldal betöltése után azonnal ellenőrizzük a helyzetet
  handleScroll();
});
