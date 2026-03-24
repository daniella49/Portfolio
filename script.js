document.addEventListener("DOMContentLoaded", () => {
  // === 1. FOOTER YEAR UPDATE ===
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();


  // === 2. SEQUENTIAL HOME FADE-IN (DRY Clean Code) ===
  const homeContent = document.querySelector(".home-content");

  if (homeContent) {
    const heroElements = [
      homeContent.querySelector("h1"),
      homeContent.querySelector("p"),
      homeContent.querySelector(".home-button")
    ];

    const fadeInElement = (element, delay) => {
      if (!element) return;
      element.style.opacity = 0;
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 1s ease, transform 1s ease";

      setTimeout(() => {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
      }, delay);
    };

    // Loops through elements and staggers them automatically by 1 second each
    heroElements.forEach((el, index) => fadeInElement(el, index * 1000));
  }


  // === 3. MOBILE MENU TOGGLE ===
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    const toggleMenu = () => mobileMenu.classList.toggle("active");
    const closeMenu = () => mobileMenu.classList.remove("active");

    menuToggle.addEventListener("click", toggleMenu);

    // Close menu when clicking links or anywhere outside
    mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }


  // === 4. RESIZE HANDLER ===
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileMenu) {
      mobileMenu.classList.remove("active");
    }
  });


  // === 5. INTERSECTION OBSERVER (Scroll Fade-ins) ===
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        revealObserver.unobserve(entry.target); // Runs only once for performance
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".section").forEach(section => revealObserver.observe(section));


  // === 6. SMOOTH SCROLL FOR HERO ACTION BUTTON ===
  const viewButton = document.getElementById("view-my-work");
  const aboutSection = document.getElementById("about");

  if (viewButton && aboutSection) {
    viewButton.addEventListener("click", (e) => {
      e.preventDefault();
      aboutSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// === 7. INITIAL PAGE SCROLL RESET ===
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.onload = () => window.scrollTo(0, 0);