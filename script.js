/* ============================
   MOBILE NAV TOGGLE
============================ */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      navLinks.classList.remove("nav-open");
    }
  });
}

/* ============================
   DROPDOWN (Plant Pages)
============================ */
document.querySelectorAll(".has-dropdown").forEach((item) => {
  const btn = item.querySelector(".nav-link-btn");
  const dropdown = item.querySelector(".nav-dropdown");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
  });
});

/* ============================
   SEARCH ENGINE (Hidden Plants Supported)
============================ */
const searchInput = document.getElementById("plant-search");
const plantCards = document.querySelectorAll(".plant-card");
const searchNote = document.getElementById("search-note");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    let matchFound = false;

    plantCards.forEach((card) => {
      const name = (card.dataset.name || "").toLowerCase();
      const tags = (card.dataset.tags || "").toLowerCase();

      const matches =
        query.length === 0 ||
        name.includes(query) ||
        tags.includes(query);

      if (matches) {
        card.style.display = "block"; // Shows hidden plants when matched
        matchFound = true;
      } else {
        card.style.display = "none";
      }
    });

    if (searchNote) {
      searchNote.hidden = matchFound || query.length === 0;
    }
  });
}

/* ============================
   FOOTER YEAR
============================ */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* ============================
   SCROLL REVEAL
============================ */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ============================
   LOADING SCREEN
============================ */
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add("hide");
  }, 400);
});

/* ============================
   DARK MODE (Fixed)
   Uses class "dark" from CSS
============================ */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  // Apply saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
}

/* ============================
   HERO IMAGE SLIDER (6 images)
============================ */
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
let heroCurrent = 0;
let heroTimer;

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  heroDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  heroCurrent = index;
}

function nextHeroSlide() {
  const next = (heroCurrent + 1) % heroSlides.length;
  showHeroSlide(next);
}

if (heroSlides.length > 0) {
  heroTimer = setInterval(nextHeroSlide, 6000);

  heroDots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(heroTimer);
      showHeroSlide(i);
      heroTimer = setInterval(nextHeroSlide, 6000);
    });
  });
}
