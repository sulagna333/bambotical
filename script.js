/* =====================
   MOBILE NAV TOGGLE
===================== */
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

/* =====================
   PLANT SEARCH ENGINE
===================== */
const searchInput = document.getElementById("plant-search");
const plantCards = document.querySelectorAll(".plant-card");
const searchNote = document.getElementById("search-note");

function filterPlants() {
  if (!searchInput) return; // not on this page
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  plantCards.forEach((card) => {
    const name = (card.dataset.name || "").toLowerCase();
    const tags = (card.dataset.tags || "").toLowerCase();

    const matches =
      query.length === 0 ||
      name.includes(query) ||
      tags.includes(query);

    card.style.display = matches ? "flex" : "none";
    if (matches) visibleCount++;
  });

  if (searchNote) {
    searchNote.hidden = visibleCount !== 0;
  }
}

if (searchInput) {
  searchInput.addEventListener("input", filterPlants);
}

/* =====================
   FOOTER YEAR
===================== */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* ========================================
   SCROLL REVEAL ANIMATION
======================================== */
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

/* ========================================
   LOADING SCREEN SCRIPT
======================================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add("hide");
  }, 400);
});

/* 🌙 PREMIUM DARK MODE TOGGLE */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  // Apply saved theme on load
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
}
