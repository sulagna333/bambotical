/* ---------------------------------------------
   LOADING SCREEN
--------------------------------------------- */
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("fade-out");
    setTimeout(() => (loadingScreen.style.display = "none"), 600);
  }
});

/* ---------------------------------------------
   DARK MODE TOGGLE (saves theme)
--------------------------------------------- */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

/* ---------------------------------------------
   MOBILE NAVIGATION TOGGLE
--------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

/* ---------------------------------------------
   DROPDOWN MENU (Plant Pages)
--------------------------------------------- */
document.querySelectorAll(".has-dropdown").forEach((item) => {
  const button = item.querySelector(".nav-link-btn");
  const dropdown = item.querySelector(".nav-dropdown");

  button.addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });
});

/* ---------------------------------------------
   REVEAL ON SCROLL ANIMATIONS
--------------------------------------------- */
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ---------------------------------------------
   SEARCH SYSTEM — with HIDDEN plant support
--------------------------------------------- */
const searchInput = document.getElementById("plant-search");
const plantCards = document.querySelectorAll(".plant-card");
const searchNote = document.getElementById("search-note");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    let results = 0;

    plantCards.forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      const tags = card.dataset.tags.toLowerCase();
      const matches = name.includes(query) || tags.includes(query);

      if (query === "") {
        // When search is empty → show only normal plants
        if (card.classList.contains("hidden-plant")) {
          card.style.display = "none"; // stays hidden
        } else {
          card.style.display = ""; // normal plants show
        }
      } else {
        // When searching → show all matching plants (including hidden)
        if (matches) {
          card.style.display = "block";
          results++;
        } else {
          card.style.display = "none";
        }
      }
    });

    // Show/hide "no results" message
    if (searchNote) searchNote.hidden = results > 0;
  });
}

/* ---------------------------------------------
   FOOTER YEAR
--------------------------------------------- */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
