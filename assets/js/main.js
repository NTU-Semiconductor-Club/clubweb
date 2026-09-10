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

  // ==================== ASTRYX SYSTEMS ====================
  initAstryxThemeToggle();
  initAstryxToast();
  initAstryxLayers();
  initAstryxCommandPalette();
  initAstryxLightbox();
  initAstryxAccordions();
  initAstryxEventFilters();
});

function initAstryxLayers() {
  const triggers = document.querySelectorAll("[data-astryx-layer-target], [data-layer-target]");
  if (!triggers.length) return;

  let activeLayer = null;
  let activeTrigger = null;
  const OFFSET = 8; // var(--spacing-2) / var(--layer-offset)
  const VIEWPORT_PADDING = 12;

  function positionLayer(trigger, layer) {
    const triggerRect = trigger.getBoundingClientRect();
    
    // Temporarily make visible to measure true dimensions
    layer.style.visibility = "hidden";
    layer.style.display = "block";
    layer.classList.add("is-open");
    const layerRect = layer.getBoundingClientRect();
    layer.classList.remove("is-open");
    layer.style.visibility = "";
    layer.style.display = "";

    const layerWidth = layerRect.width;
    const layerHeight = layerRect.height;

    // Horizontal positioning: align to trigger center and clamp within viewport
    let left = triggerRect.left + (triggerRect.width / 2) - (layerWidth / 2);
    const minLeft = VIEWPORT_PADDING;
    const maxLeft = window.innerWidth - layerWidth - VIEWPORT_PADDING;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    // Vertical positioning: default bottom with offset; flip to top if collision with viewport bottom
    const fitsBelow = triggerRect.bottom + OFFSET + layerHeight <= window.innerHeight - VIEWPORT_PADDING;
    let top;

    if (fitsBelow || triggerRect.top < layerHeight + OFFSET) {
      top = triggerRect.bottom + OFFSET;
      layer.classList.remove("placement-top");
    } else {
      top = triggerRect.top - OFFSET - layerHeight;
      layer.classList.add("placement-top");
    }

    layer.style.left = Math.round(left) + "px";
    layer.style.top = Math.round(top) + "px";
  }

  function openLayer(trigger, layer) {
    if (activeLayer && activeLayer !== layer) {
      closeActiveLayer();
    }
    positionLayer(trigger, layer);
    layer.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    activeLayer = layer;
    activeTrigger = trigger;
  }

  function closeActiveLayer() {
    if (!activeLayer) return;
    activeLayer.classList.remove("is-open");
    if (activeTrigger) {
      activeTrigger.setAttribute("aria-expanded", "false");
    }
    activeLayer = null;
    activeTrigger = null;
  }

  triggers.forEach(function (trigger) {
    const targetId = trigger.getAttribute("data-astryx-layer-target") || trigger.getAttribute("data-layer-target");
    const layer = document.getElementById(targetId);
    if (!layer) return;

    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-expanded", "false");
    layer.setAttribute("role", "dialog");

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      if (activeLayer === layer) {
        closeActiveLayer();
      } else {
        openLayer(trigger, layer);
      }
    });

    // Close button inside layer
    const closeBtn = layer.querySelector(".astryx-layer-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeActiveLayer();
      });
    }
  });

  // Astryx Dismissal Stack: Escape key closes top active layer
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      closeActiveLayer();
    }
  });

  // Astryx Light-Dismiss: click/tap outside closes active layer
  document.addEventListener("click", function (e) {
    if (!activeLayer) return;
    if (!activeLayer.contains(e.target) && !activeTrigger.contains(e.target)) {
      closeActiveLayer();
    }
  });

  // Reposition on window resize or scroll
  window.addEventListener("resize", function () {
    if (activeLayer && activeTrigger) {
      positionLayer(activeTrigger, activeLayer);
    }
  });

  window.addEventListener("scroll", function () {
    if (activeLayer && activeTrigger) {
      positionLayer(activeTrigger, activeLayer);
    }
  }, { passive: true });
}

// ==================== ASTRYX COMMAND PALETTE (CMD+K) ====================
function initAstryxCommandPalette() {
  const items = [
    // Navigation
    { title: "Home", subtitle: "Landing page & club overview", url: "index.html", icon: "fa-home", group: "Pages", badge: "Page" },
    { title: "About Us", subtitle: "Vision, mission & learning pillars", url: "about.html", icon: "fa-circle-info", group: "Pages", badge: "Page" },
    { title: "Events & Tours", subtitle: "Semicon Bulletin, site visits & workshops", url: "events.html", icon: "fa-calendar-days", group: "Pages", badge: "Page" },
    { title: "Committee", subtitle: "Executive leadership & portfolio leads", url: "committee.html", icon: "fa-users", group: "Pages", badge: "Page" },
    { title: "Join & Contact", subtitle: "Official channels, steps & FAQ", url: "join.html", icon: "fa-user-plus", group: "Pages", badge: "Page" },

    // Pillars
    { title: "IC Design & VLSI Logic", subtitle: "EDA tools, digital/analog layout & processor architectures", url: "about.html", icon: "fa-microchip", group: "Curriculum", badge: "Pillar" },
    { title: "Fabrication & Cleanroom Operations", subtitle: "Wafer fab, lithography & packaging at NTU N2FC", url: "about.html", icon: "fa-industry", group: "Curriculum", badge: "Pillar" },
    { title: "Embedded & RTOS Firmware", subtitle: "C/C++ microcontrollers & hardware-software co-design", url: "about.html", icon: "fa-code", group: "Curriculum", badge: "Pillar" },
    { title: "GPU Parallel Computing & AI Hardware", subtitle: "CUDA acceleration & partnership with AI Singapore (AISG)", url: "about.html", icon: "fa-brain", group: "Curriculum", badge: "Pillar" },

    // Site Visits & Tours
    { title: "AMD Industry Visit", subtitle: "System Level Test (SLT), Final Test & chip bring-up", url: "events.html", icon: "fa-building", group: "Industrial Visits", badge: "Tour" },
    { title: "N2FC Cleanroom Fab Tours", subtitle: "Silicon processing, wafer tools & photolithography", url: "events.html", icon: "fa-mask-face", group: "Industrial Visits", badge: "Fab Tour" },
    { title: "A*STAR IME Industry Visit", subtitle: "Advanced packaging & silicon photonics labs", url: "events.html", icon: "fa-flask", group: "Industrial Visits", badge: "R&D" },
    { title: "GlobalFoundries Visit", subtitle: "Commercial wafer fab line & cleanroom operations", url: "events.html", icon: "fa-network-wired", group: "Industrial Visits", badge: "Foundry" },
    { title: "AI Career Launch Pad", subtitle: "Bridging hardware fundamentals with AI careers (AISG)", url: "events.html", icon: "fa-rocket", group: "Industrial Visits", badge: "Career" },

    // Leadership
    { title: "Ray (President)", subtitle: "Direction, partnerships & Full-Stack Semicon Vision", url: "committee.html", icon: "fa-user-tie", group: "Leadership", badge: "Exec" },
    { title: "Rishabh (VP Internal)", subtitle: "Operations, registration & campus coordination", url: "committee.html", icon: "fa-user-shield", group: "Leadership", badge: "Exec" },
    { title: "Roland (VP External)", subtitle: "Industry partner relations (AMD, GF, IME)", url: "committee.html", icon: "fa-handshake", group: "Leadership", badge: "Exec" },
    { title: "Bryan (Events Lead)", subtitle: "Plant tours, cleanroom visits & technical workshops", url: "committee.html", icon: "fa-screwdriver-wrench", group: "Leadership", badge: "Lead" },
    { title: "Pranav (Sponsorships Lead)", subtitle: "Corporate outreach & internship pipelines", url: "committee.html", icon: "fa-briefcase", group: "Leadership", badge: "Lead" },
    { title: "Srishti (Publicity Lead)", subtitle: "Semicon Bulletin, branding & social channels", url: "committee.html", icon: "fa-bullhorn", group: "Leadership", badge: "Lead" },

    // Channels
    { title: "Telegram Community", subtitle: "Real-time student announcements & discussions", url: "https://t.me/+Wsb5No5hvnxlMjRl", icon: "fa-telegram", isExternal: true, group: "Community", badge: "Chat" },
    { title: "LinkedIn Page", subtitle: "Professional event updates & networking", url: "https://www.linkedin.com/company/ntu-semiconductor-club/", icon: "fa-linkedin", isExternal: true, group: "Community", badge: "Social" },
    { title: "Official Email", subtitle: "ntu.semiconductor.club@ntu.edu.sg", url: "mailto:ntu.semiconductor.club@ntu.edu.sg", icon: "fa-envelope", group: "Community", badge: "Email" },
    { title: "GitHub Organization", subtitle: "Open-source club code & repositories", url: "https://github.com/NTU-Semiconductor-Club", icon: "fa-github", isExternal: true, group: "Community", badge: "Code" }
  ];

  let backdrop = document.getElementById("astryx-command-palette");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "astryx-command-palette";
    backdrop.className = "astryx-command-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.innerHTML = `
      <div class="astryx-command-dialog">
        <div class="astryx-command-header">
          <i class="fas fa-search"></i>
          <input type="text" class="astryx-command-input" placeholder="Search pages, visits, leaders, channels..." aria-label="Command search">
          <kbd class="nav-search-kbd">ESC</kbd>
        </div>
        <ul class="astryx-command-list" role="listbox"></ul>
        <div class="astryx-command-footer">
          <span><kbd class="nav-search-kbd">&uarr;&darr;</kbd> Navigate</span>
          <span><kbd class="nav-search-kbd">&crarr;</kbd> Select</span>
          <span><kbd class="nav-search-kbd">ESC</kbd> Close</span>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  const input = backdrop.querySelector(".astryx-command-input");
  const list = backdrop.querySelector(".astryx-command-list");
  let selectedIndex = 0;
  let currentFiltered = [];

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    currentFiltered = items.filter(item => {
      return !q || item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q) || item.group.toLowerCase().includes(q);
    });

    if (currentFiltered.length === 0) {
      list.innerHTML = `<div class="astryx-command-empty">No results found for "${query}"</div>`;
      return;
    }

    const groups = {};
    currentFiltered.forEach(item => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    });

    let html = "";
    let itemIndex = 0;
    for (const group in groups) {
      html += `<li class="astryx-command-group-title">${group}</li>`;
      groups[group].forEach(item => {
        const isSelected = itemIndex === selectedIndex;
        const iconPrefix = item.icon.startsWith("fa-brands") || item.icon.startsWith("fa-regular") ? item.icon : `fas ${item.icon}`;
        html += `
          <li class="astryx-command-item ${isSelected ? "is-selected" : ""}" data-index="${itemIndex}" role="option" aria-selected="${isSelected}">
            <div class="astryx-command-item-left">
              <i class="${iconPrefix} astryx-command-item-icon"></i>
              <div>
                <div><strong>${item.title}</strong></div>
                <div style="font-size:0.78rem; color:var(--color-text-secondary);">${item.subtitle}</div>
              </div>
            </div>
            <span class="astryx-command-item-badge">${item.badge}</span>
          </li>
        `;
        itemIndex++;
      });
    }
    list.innerHTML = html;
  }

  function openPalette() {
    backdrop.classList.add("is-open");
    selectedIndex = 0;
    input.value = "";
    renderResults("");
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    backdrop.classList.remove("is-open");
  }

  function selectItem(index) {
    const item = currentFiltered[index];
    if (!item) return;
    closePalette();
    if (item.isExternal) {
      window.open(item.url, "_blank", "noopener");
    } else {
      window.location.href = item.url;
    }
  }

  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (backdrop.classList.contains("is-open")) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (backdrop.classList.contains("is-open")) {
      if (e.key === "Escape") {
        closePalette();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % currentFiltered.length;
        renderResults(input.value);
        scrollSelectedIntoView();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + currentFiltered.length) % currentFiltered.length;
        renderResults(input.value);
        scrollSelectedIntoView();
      } else if (e.key === "Enter") {
        e.preventDefault();
        selectItem(selectedIndex);
      }
    }
  });

  function scrollSelectedIntoView() {
    const selectedEl = list.querySelector(".astryx-command-item.is-selected");
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }

  input.addEventListener("input", function () {
    selectedIndex = 0;
    renderResults(this.value);
  });

  list.addEventListener("click", function (e) {
    const itemEl = e.target.closest(".astryx-command-item");
    if (itemEl) {
      const idx = parseInt(itemEl.getAttribute("data-index"), 10);
      selectItem(idx);
    }
  });

  backdrop.addEventListener("click", function (e) {
    if (e.target === backdrop) {
      closePalette();
    }
  });

  document.querySelectorAll("#open-command-palette, .nav-search-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openPalette();
    });
  });
}

// ==================== ASTRYX LIGHTBOX ====================
function initAstryxLightbox() {
  let backdrop = document.getElementById("astryx-lightbox");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "astryx-lightbox";
    backdrop.className = "astryx-lightbox-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.innerHTML = `
      <div class="astryx-lightbox-content">
        <button class="astryx-lightbox-close" aria-label="Close image">&times;</button>
        <img class="astryx-lightbox-img" src="" alt="Enlarged view">
        <div class="astryx-lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  const imgEl = backdrop.querySelector(".astryx-lightbox-img");
  const captionEl = backdrop.querySelector(".astryx-lightbox-caption");
  const closeBtn = backdrop.querySelector(".astryx-lightbox-close");

  function openLightbox(src, caption) {
    imgEl.src = src;
    captionEl.textContent = caption || "";
    captionEl.style.display = caption ? "block" : "none";
    backdrop.classList.add("is-open");
  }

  function closeLightbox() {
    backdrop.classList.remove("is-open");
  }

  closeBtn.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", function (e) {
    if (e.target === backdrop) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
      closeLightbox();
    }
  });

  document.querySelectorAll(".event-card-img-wrapper, .featured-event-img-wrapper, .hero-media").forEach(wrapper => {
    const img = wrapper.querySelector("img");
    if (!img) return;
    wrapper.addEventListener("click", function () {
      const card = wrapper.closest(".event-card, .featured-event-card");
      const title = card ? card.querySelector("h3")?.textContent : img.alt;
      openLightbox(img.src, title || img.alt);
    });
  });
}

// ==================== ASTRYX ACCORDIONS ====================
function initAstryxAccordions() {
  const triggers = document.querySelectorAll(".astryx-accordion-trigger");
  triggers.forEach(trigger => {
    trigger.addEventListener("click", function () {
      const item = trigger.closest(".astryx-accordion-item");
      const panel = item.querySelector(".astryx-accordion-panel");
      const isOpen = item.classList.contains("is-open");

      const parent = item.closest(".astryx-accordion");
      if (parent) {
        parent.querySelectorAll(".astryx-accordion-item.is-open").forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove("is-open");
            sibling.querySelector(".astryx-accordion-trigger")?.setAttribute("aria-expanded", "false");
            const sibPanel = sibling.querySelector(".astryx-accordion-panel");
            if (sibPanel) sibPanel.style.maxHeight = null;
          }
        });
      }

      if (isOpen) {
        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = null;
      } else {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

// ==================== ASTRYX THEME TOGGLE (DARK / LIGHT) ====================
function initAstryxThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("clubweb-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let currentTheme = storedTheme || (systemDark ? "dark" : "light");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("clubweb-theme", theme);
    if (toggleBtn) {
      const icon = toggleBtn.querySelector("i");
      if (icon) {
        icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
      }
      toggleBtn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      toggleBtn.setAttribute("title", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    }
  }

  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function (e) {
      e.preventDefault();
      currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
      showAstryxToast(`Theme switched to ${currentTheme} mode`, currentTheme === "dark" ? "fa-sun" : "fa-moon");
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!localStorage.getItem("clubweb-theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}

// ==================== ASTRYX TOAST NOTIFICATION (useToast) ====================
function showAstryxToast(message, iconClass = "fa-circle-check", duration = 3000) {
  let container = document.getElementById("astryx-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "astryx-toast-container";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "astryx-toast toast-success";
  const iconPrefix = iconClass.startsWith("fa-") ? `fas ${iconClass}` : iconClass;
  toast.innerHTML = `<i class="${iconPrefix}"></i><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, duration);
}

function initAstryxToast() {
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener("click", function () {
      const email = this.getAttribute("href").replace("mailto:", "");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showAstryxToast(`Copied ${email} to clipboard!`, "fa-envelope");
        }).catch(() => {});
      }
    });
  });
}

// ==================== ASTRYX EVENT FILTER TABS ====================
function initAstryxEventFilters() {
  const filterPills = document.querySelectorAll(".astryx-filter-pill");
  if (!filterPills.length) return;

  const eventCards = document.querySelectorAll(".event-card[data-category]");

  filterPills.forEach(pill => {
    pill.addEventListener("click", function () {
      const category = this.getAttribute("data-filter");

      filterPills.forEach(p => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      this.classList.add("active");
      this.setAttribute("aria-selected", "true");

      eventCards.forEach(card => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || cardCat === category) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });
}