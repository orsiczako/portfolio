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
    let scrollPosition = window.scrollY;
    let closestSection = sections[0];
    let minDistance = Math.abs(scrollPosition - sections[0].offsetTop);

    sections.forEach((section) => {
      let distance = Math.abs(scrollPosition - section.offsetTop);
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    // Minden szekcióból eltávolítjuk az "active" osztályt
    sections.forEach((section) => section.classList.remove("active"));

    // A legközelebbi szekciót aktívvá tesszük
    closestSection.classList.add("active");

    // Home fade-out kezelése csak akkor, ha már görgettél
    if (window.scrollY > 10 && scrollPosition > homeSection.clientHeight / 2) {
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

document.addEventListener("DOMContentLoaded", function () {
  const sections = Array.from(document.querySelectorAll(".section"));
  const scrollDownButton = document.getElementById("scroll-down");
  const scrollUpButton = document.getElementById("scroll-up");

  function getCurrentSectionIndex() {
    let scrollY = window.scrollY;
    let windowHeight = window.innerHeight;
    let middleOfViewport = scrollY + windowHeight / 2;
    return sections.findIndex(
      (section) =>
        section.offsetTop <= middleOfViewport &&
        section.offsetTop + section.offsetHeight > middleOfViewport
    );
  }

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  scrollDownButton.addEventListener("click", function () {
    let currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) {
      scrollToSection(currentIndex + 1);
    }
  });

  scrollUpButton.addEventListener("click", function () {
    let currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      scrollToSection(currentIndex - 1);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll('nav a[href^="#"]');

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const hamMenu = document.querySelector(".ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");

  hamMenu.addEventListener("click", function () {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
  });

  // Bezárás, ha kattintasz egy menüpontot
  document.querySelectorAll(".off-screen-menu a").forEach((link) => {
    link.addEventListener("click", function () {
      hamMenu.classList.remove("active");
      offScreenMenu.classList.remove("active");
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  let glow = document.querySelector(".cursor-glow");

  if (!glow) {
    glow = document.createElement("div");
    glow.classList.add("cursor-glow");
    document.body.appendChild(glow);
    console.log("cursor-glow létrehozva!");
  }

  document.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    glow.style.transform = "translate(-50%, -50%)";
  });
});
function createRipple(x, y) {
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600); // ugyanannyi mint az animáció hossza
}

function handleInteraction(event) {
  const touch = event.touches ? event.touches[0] : event;
  createRipple(touch.clientX, touch.clientY);
}

// Egér kattintásra is működik
document.body.addEventListener("click", handleInteraction);
// Érintéses eseményre mobilon
document.body.addEventListener("touchstart", handleInteraction);
