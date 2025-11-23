// =====================
// MOBILE NAV TOGGLE
// =====================
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
  });

  // Optional: close on link click (mobile)
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      navLinks.classList.remove("nav-open");
    }
  });
}

// =====================
// PLANT SEARCH ENGINE
// =====================
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
      name.includes(query) || tags.includes(query) || query.length === 0;

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

// =====================
// FOOTER YEAR
// =====================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
/* =========================================
   ANIMATIONS — Fade + Slide + Hover Effects
========================================= */

/* Initial hidden state */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s ease;
}

/* Visible state */
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* Plant card hover */
.plant-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.plant-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Image hover zoom */
.plant-image {
  transition: transform 0.5s ease;
}

.plant-card:hover .plant-image {
  transform: scale(1.05);
}

/* Button hover animation */
.btn {
  transition: transform 0.2s ease, background 0.3s ease;
}

.btn:hover {
  transform: scale(1.05);
}

/* Care card hover */
.care-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.care-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.14);
}

/* Seasonal card hover */
.season-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.season-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.14);
}

/* Hero text fade-in */
.hero h1,
.hero-subtitle {
  opacity: 0;
  transform: translateY(20px);
  animation: heroFade 1.2s ease forwards;
}

.hero h1 {
  animation-delay: 0.2s;
}

.hero-subtitle {
  animation-delay: 0.4s;
}

@keyframes heroFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* ========================================
   LOADING SCREEN SCRIPT
======================================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  setTimeout(() => {
    loader.classList.add("hide");
  }, 400); // delay for smoother look
});
