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
   FULLSCREEN HERO BACKGROUND SLIDER
============================ */
const bgSlides = document.querySelectorAll(".hero-bg-slide");
const bgDots = document.querySelectorAll(".hero-dot");

let bgIndex = 0;
let bgTimer;

function showBgSlide(index) {
  bgSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  bgDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  bgIndex = index;
}

function nextBgSlide() {
  const next = (bgIndex + 1) % bgSlides.length;
  showBgSlide(next);
}

if (bgSlides.length > 0) {
  bgTimer = setInterval(nextBgSlide, 6000);

  bgDots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(bgTimer);
      showBgSlide(i);
      bgTimer = setInterval(nextBgSlide, 6000);
    });
  });
}
const searchInput = document.getElementById("plant-search");
const searchResults = document.getElementById("search-results");
const plantCards = document.querySelectorAll(".plant-card");

const plantMap = {
  "monstera deliciosa": "monstera.html",
  "snake plant": "snake-plant.html",
  "aloe vera": "aloe-vera.html",
  "tulsi": "tulsi.html",
  "rosemary": "rosemary.html",
  "lavender": "lavender.html",
  "adenium": "adenium.html",
  "money plant": "money-plant.html",
  "pothos": "money-plant.html"
};

searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase().trim();
  searchResults.innerHTML = "";
  searchResults.classList.remove("show");

  if (q.length === 0) return;

  let matches = [];

  plantCards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const tags = card.dataset.tags.toLowerCase();

    if (name.includes(q) || tags.includes(q)) {
      matches.push(name);
    }
  });

  if (matches.length > 0) {
    matches.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name.replace(/\b\w/g, (c) => c.toUpperCase());
      li.addEventListener("click", () => {
        window.location.href = plantMap[name];
      });
      searchResults.appendChild(li);
    });
    searchResults.classList.add("show");
  }
});

