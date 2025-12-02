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
   FIXED LOADING SCREEN
============================ */
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  if (!loader) return;

  loader.style.opacity = "0";

  setTimeout(() => {
    loader.style.display = "none";
  }, 600);
});

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
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

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
   FULLSCREEN HERO SLIDER
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
   SEARCH SYSTEM
============================ */
const searchBox = document.getElementById("plant-search");
const resultsList = document.getElementById("search-results");

const hiddenPlants = Array.from(
  document.querySelectorAll("#hidden-plants .plant-item")
).map((item) => ({
  name: item.textContent.trim(),
  link: item.getAttribute("data-link"),
}));

if (searchBox) {
  searchBox.addEventListener("input", () => {
    const value = searchBox.value.toLowerCase().trim();
    resultsList.innerHTML = "";

    if (value.length === 0) {
      resultsList.style.display = "none";
      return;
    }

    const matches = hiddenPlants.filter((plant) =>
      plant.name.toLowerCase().includes(value)
    );

    resultsList.style.display = "block";

    if (matches.length === 0) {
      resultsList.innerHTML =
        '<li class="result-item no-result">No matches found</li>';
      return;
    }

    matches.forEach((plant) => {
      const li = document.createElement("li");
      li.className = "result-item";
      li.innerHTML = `<a href="${plant.link}">${plant.name}</a>`;
      resultsList.appendChild(li);
    });
  });

  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target)) {
      resultsList.style.display = "none";
    }
  });
}
