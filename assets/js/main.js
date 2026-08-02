document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("nav");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector("#nav ul");

  // Sticky Navbar Scroll Listener
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Mobile Navigation Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
      const isOpen = navMenu.classList.contains("show");
      mobileToggle.setAttribute("aria-expanded", isOpen.toString());
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.className = isOpen ? "fas fa-times" : "fas fa-bars";
      }
    });
  }

  // Active Menu Link Highlighter
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("#nav a");

  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});