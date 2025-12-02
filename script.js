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

  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
  });
});

/* ============================
   SEARCH ENGINE (original filter)
============================ */
const searchInput = document.getElementById("plant-search");
const plantCards = document.querySelectorAll(".plant-card");
const searchNote = document.getElementById("search-note");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    let hasResults = false;

    plantCards.forEach((card) => {
      const name = (card.dataset.name || "").toLowerCase();
      const tags = (card.dataset.tags || "").toLowerCase();

      const match = name.includes(query) || tags.includes(query);
      card.style.display = match ? "block" : "none";
      if (match) hasResults = true;
    });

    if (searchNote) searchNote.hidden = hasResults;
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
   DARK MODE
============================ */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
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
const heroDots = document.querySelectorAll(".hero-dot");

let currentSlide = 0;
let heroInterval;

function showSlide(index) {
  bgSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  heroDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentSlide = index;
}

function autoNextSlide() {
  const next = (currentSlide + 1) % bgSlides.length;
  showSlide(next);
}

if (bgSlides.length > 0) {
  heroInterval = setInterval(autoNextSlide, 6000);

  heroDots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(heroInterval);
      showSlide(i);
      heroInterval = setInterval(autoNextSlide, 6000);
    });
  });
}

/* ============================
   SEARCH DROPDOWN (NEW)
============================ */
const searchResults = document.getElementById("search-results");

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

if (searchInput && searchResults) {
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
}

/* Close dropdown when clicking outside */
document.addEventListener("click", (e) => {
  if (e.target !== searchInput) {
    searchResults.classList.remove("show");
  }
});
