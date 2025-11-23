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
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  plantCards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const tags = card.dataset.tags.toLowerCase();

    const matches =
      name.includes(query) ||
      tags.includes(query) ||
      query.length === 0;

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
/* DARK MODE TOGGLE */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
}
