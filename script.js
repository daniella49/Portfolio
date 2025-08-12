document.addEventListener("DOMContentLoaded", function () {
  // === YEAR UPDATE ===
  document.getElementById("year").textContent = new Date().getFullYear();

  // === HOME SECTION ANIMATION ===
  const homeContent = document.querySelector(".home-content");
  if (homeContent) {
    const h1 = homeContent.querySelector("h1");
    const p = homeContent.querySelector("p");
    const button = homeContent.querySelector(".home-button");

    function fadeInElement(element, delay) {
      if (!element) return;
      element.style.opacity = 0;
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 1s ease, transform 1s ease";
      setTimeout(() => {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
      }, delay);
    }

    fadeInElement(h1, 0);
    fadeInElement(p, 1000);
    fadeInElement(button, 2000);
  }

  // === MOBILE MENU TOGGLE ===
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        mobileMenu.classList.remove("active");
      }
    });
  }

  // === RESIZE HANDLER: reset menu on desktop ===
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileMenu) {
      mobileMenu.classList.remove("active");
    }
  });

  // === SECTION FADE-IN OBSERVER ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".section").forEach(section => {
    observer.observe(section);
  });

  // === "VIEW MY WORK" SCROLL BUTTON ===
  const viewButton = document.getElementById("view-my-work");
  const aboutSection = document.getElementById("about");

  if (viewButton && aboutSection) {
    viewButton.addEventListener("click", (e) => {
      e.preventDefault();
      aboutSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// === SCROLL RESTORATION ===
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.onload = function () {
  window.scrollTo(0, 0);
};
