// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  // Set initial state for fade-in elements
  const fadeElements = document.querySelectorAll(
    ".fade-in, .feature-description",
  );
  fadeElements.forEach((el) => {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // CTA Button interactions
  const downloadBtn = document.getElementById("download-btn");
  const desktopBtn = document.getElementById("desktop-btn");
  const desktopMenu = document.getElementById("desktop-menu");

  if (desktopBtn) {
    desktopBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      desktopMenu.classList.toggle("active");
    });
  }

  // Close desktop menu when clicking outside
  document.addEventListener("click", () => {
    if (desktopMenu && desktopMenu.classList.contains("active")) {
      desktopMenu.classList.remove("active");
    }
  });

  // Add parallax and fade effect to hero section
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector(".hero-content");
        const hero = document.querySelector(".hero");

        if (heroContent && scrolled < window.innerHeight) {
          // Fade out based on scroll depth
          const opacity = Math.max(
            0,
            1 - scrolled / (window.innerHeight * 0.6),
          );
          heroContent.style.opacity = opacity;

          // Subtle parallax (moving slightly slower or staying stable)
          heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Add hover effect to phone mockups
  const phoneMockups = document.querySelectorAll(".phone-mockup");
  phoneMockups.forEach((phone) => {
    phone.addEventListener("mouseenter", () => {
      phone.style.transform = "translateY(-10px) scale(1.02)";
      phone.style.transition = "transform 0.3s ease-out";
    });

    phone.addEventListener("mouseleave", () => {
      phone.style.transform = "translateY(0) scale(1)";
    });
  });

  // Animate feature cards on scroll with staggered delay
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Add interactive playback control
  const playBtn = document.querySelector(".play-btn");
  if (playBtn) {
    let isPlaying = false;
    playBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? "⏸️" : "▶️";

      // Animate progress bar
      const progressFill = document.querySelector(".progress-fill");
      if (progressFill && isPlaying) {
        progressFill.style.transition = "width 3s linear";
        progressFill.style.width = "100%";
      } else if (progressFill) {
        progressFill.style.transition = "none";
        progressFill.style.width = "40%";
      }
    });
  }

  // Theme Toggle Logic
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
  const initialTheme = savedTheme || systemTheme;

  htmlElement.setAttribute("data-theme", initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      console.log(`🌓 Theme switched to: ${newTheme}`);
    });
  }

  // Language Toggle Logic
  const langToggle = document.getElementById("lang-toggle");
  const savedLang = localStorage.getItem("lang") || "en";

  htmlElement.setAttribute("lang", savedLang);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const currentLang = htmlElement.getAttribute("lang");
      const newLang = currentLang === "en" ? "id" : "en";

      htmlElement.setAttribute("lang", newLang);
      localStorage.setItem("lang", newLang);

      console.log(`🌐 Language switched to: ${newLang}`);
    });
  }

  console.log(
    "🎵 musictunel Music Streaming App - Website Loaded Successfully",
  );
});
