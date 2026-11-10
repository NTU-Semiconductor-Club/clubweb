/**
 * NTU Semiconductor Club — Core JavaScript Engine
 * Aligned strictly with xAI Design System standards.
 * Features: Command Palette (Cmd+K), Popover Layers, Event Filters,
 * Accordion FAQ, Lightbox Viewer, and Toast Notifications.
 */

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("nav");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector("#nav ul");

  // Sticky Navbar Scroll Listener
  window.addEventListener("scroll", function () {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Mobile Navigation Drawer Engine
  if (mobileToggle && navMenu) {
    const hamburgerSvg = `<svg class="xai-icon" width="16" height="16" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    const closeSvg = `<svg class="xai-icon" width="16" height="16" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    function closeMobileMenu() {
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.innerHTML = hamburgerSvg;
      }
    }

    mobileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const willOpen = !navMenu.classList.contains("show");
      navMenu.classList.toggle("show", willOpen);
      mobileToggle.setAttribute("aria-expanded", willOpen.toString());
      mobileToggle.innerHTML = willOpen ? closeSvg : hamburgerSvg;
    });

    // 1. Auto-close when user taps any nav link
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileMenu();
      });
    });

    // 2. Auto-close when tapping anywhere outside the nav bar
    document.addEventListener("click", function (e) {
      if (nav && !nav.contains(e.target)) {
        closeMobileMenu();
      }
    });

    document.addEventListener("pointerdown", function (e) {
      if (nav && !nav.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // 3. Auto-close when pressing Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    });

    // Reset drawer state when resizing to desktop viewport
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) {
        closeMobileMenu();
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

  // Initialize Interactive Components
  initCommandPalette();
  initPopoverLayers();
  initEventFilters();
  initAccordions();
  initLightbox();
  initEmailCopyToast();
});

// ==================== TOAST NOTIFICATION ENGINE ====================
function showToast(message, duration = 3000) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="toast-icon">
      <svg class="xai-icon" width="14" height="14" viewBox="0 0 24 24" style="color: var(--color-accent-sunset);"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </span>
    <span>${message}</span>
  `;
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

function initEmailCopyToast() {
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener("click", function () {
      const email = this.getAttribute("href").replace("mailto:", "");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard`);
        }).catch(() => {});
      }
    });
  });
}

// ==================== POPOVER LAYER ENGINE ====================
function initPopoverLayers() {
  const triggers = document.querySelectorAll("[data-layer-target]");
  if (!triggers.length) return;

  let activeLayer = null;
  let activeTrigger = null;
  const OFFSET = 8;
  const PADDING = 12;

  function positionLayer(trigger, layer) {
    if (window.innerWidth <= 640) {
      layer.style.left = "";
      layer.style.top = "";
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    layer.style.visibility = "hidden";
    layer.style.display = "block";
    layer.classList.add("is-open");
    const layerRect = layer.getBoundingClientRect();
    layer.classList.remove("is-open");
    layer.style.visibility = "";
    layer.style.display = "";

    const layerWidth = layerRect.width;
    const layerHeight = layerRect.height;

    let left = triggerRect.left + (triggerRect.width / 2) - (layerWidth / 2);
    left = Math.max(PADDING, Math.min(left, window.innerWidth - layerWidth - PADDING));

    const fitsBelow = triggerRect.bottom + OFFSET + layerHeight <= window.innerHeight - PADDING;
    const top = fitsBelow || triggerRect.top < layerHeight + OFFSET
      ? triggerRect.bottom + OFFSET
      : triggerRect.top - OFFSET - layerHeight;

    layer.style.left = Math.round(left) + "px";
    layer.style.top = Math.round(top) + "px";
  }

  function openLayer(trigger, layer) {
    if (activeLayer && activeLayer !== layer) closeLayer();
    activeLayer = layer;
    activeTrigger = trigger;
    positionLayer(trigger, layer);
    layer.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  }

  function closeLayer() {
    if (!activeLayer) return;
    activeLayer.classList.remove("is-open");
    if (activeTrigger) activeTrigger.setAttribute("aria-expanded", "false");
    activeLayer = null;
    activeTrigger = null;
  }

  triggers.forEach(trigger => {
    const targetId = trigger.getAttribute("data-layer-target");
    const layer = document.getElementById(targetId);
    if (!layer) return;

    trigger.addEventListener("click", e => {
      e.stopPropagation();
      activeLayer === layer ? closeLayer() : openLayer(trigger, layer);
    });
  });

  // Tap or click outside cleanly dismisses the popover on mobile and desktop
  function handleOutsideTap(e) {
    if (!activeLayer) return;
    if (activeLayer.contains(e.target)) return;
    if (activeTrigger && activeTrigger.contains(e.target)) return;
    closeLayer();
  }

  document.addEventListener("click", handleOutsideTap);
  document.addEventListener("pointerdown", handleOutsideTap);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && activeLayer) closeLayer();
  });

  window.addEventListener("resize", () => {
    if (activeLayer && activeTrigger) positionLayer(activeTrigger, activeLayer);
  });

  window.addEventListener("scroll", () => {
    if (activeLayer && activeTrigger) positionLayer(activeTrigger, activeLayer);
  }, { passive: true });
}

// ==================== EVENT CATEGORY FILTER TABS ====================
function initEventFilters() {
  const filterPills = document.querySelectorAll(".filter-pill[data-filter]");
  const eventCards = document.querySelectorAll(".event-card[data-category]");
  if (!filterPills.length || !eventCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener("click", function () {
      filterPills.forEach(p => p.classList.remove("active"));
      this.classList.add("active");
      const selected = this.getAttribute("data-filter");

      eventCards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (selected === "all" || cat === selected) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// ==================== FAQ ACCORDION ENGINE ====================
function initAccordions() {
  const triggers = document.querySelectorAll(".faq-trigger");
  if (!triggers.length) return;

  triggers.forEach(trigger => {
    trigger.addEventListener("click", function () {
      const item = this.closest(".faq-item");
      const body = item.querySelector(".faq-body");
      const isExpanded = item.classList.contains("is-expanded");

      // Auto-collapse siblings
      document.querySelectorAll(".faq-item.is-expanded").forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove("is-expanded");
          openItem.querySelector(".faq-body").style.maxHeight = null;
          openItem.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
        }
      });

      if (isExpanded) {
        item.classList.remove("is-expanded");
        body.style.maxHeight = null;
        this.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-expanded");
        body.style.maxHeight = body.scrollHeight + "px";
        this.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ==================== COMMAND PALETTE (⌘K) ====================
function initCommandPalette() {
  const items = [
    { title: "Home", subtitle: "Curriculum overview & hardware pillars", url: "index.html", badge: "Page" },
    { title: "About the Club", subtitle: "Foundry partnerships, vision & roadmap", url: "about.html", badge: "Page" },
    { title: "Events & Bulletin", subtitle: "Cleanroom tours, fab visits & workshops", url: "events.html", badge: "Page" },
    { title: "Executive Committee", subtitle: "Leadership roster & engineering bios", url: "committee.html", badge: "Page" },
    { title: "Join & Contact", subtitle: "Registration process & student FAQ", url: "join.html", badge: "Page" },

    { title: "Chip Design & VLSI Logic", subtitle: "EDA workflows, RTL verification & architecture", url: "about.html", badge: "Curriculum" },
    { title: "Cleanroom Operations & Fab", subtitle: "Wafer lithography at NTU N2FC & packaging", url: "about.html", badge: "Curriculum" },
    { title: "Embedded & RTOS Firmware", subtitle: "Microcontrollers & bare-metal C/C++ co-design", url: "about.html", badge: "Curriculum" },
    { title: "GPU Computing & Acceleration", subtitle: "CUDA architecture & AI systems", url: "about.html", badge: "Curriculum" },

    { title: "AMD Industry Visit", subtitle: "System Level Test (SLT) & chip bring-up", url: "events.html", badge: "Tour" },
    { title: "N2FC Cleanroom Fab Tours", subtitle: "Silicon processing & photolithography", url: "events.html", badge: "Fab Tour" },
    { title: "A*STAR IME Visit", subtitle: "Advanced packaging & silicon photonics", url: "events.html", badge: "R&D" },
    { title: "GlobalFoundries Tour", subtitle: "Commercial wafer fab operations", url: "events.html", badge: "Foundry" },
    { title: "AI Singapore Career Launchpad", subtitle: "Apprenticeship pipelines (AIIP/AIAP)", url: "events.html", badge: "Career" },

    { title: "Ray", subtitle: "President — Full-Stack Semicon Vision", url: "committee.html", badge: "Lead" },
    { title: "Rishabh", subtitle: "Vice President (Internal)", url: "committee.html", badge: "Lead" },
    { title: "Roland", subtitle: "Vice President (External)", url: "committee.html", badge: "Lead" },
    { title: "Bryan", subtitle: "Events Director", url: "committee.html", badge: "Lead" },
    { title: "Pranav", subtitle: "Sponsorships Director", url: "committee.html", badge: "Lead" },
    { title: "Srishti", subtitle: "Publicity Director", url: "committee.html", badge: "Lead" },

    { title: "Telegram Community", subtitle: "Official student announcements", url: "https://t.me/+Wsb5No5hvnxlMjRl", isExternal: true, badge: "Community" },
    { title: "LinkedIn Page", subtitle: "Professional networking updates", url: "https://www.linkedin.com/company/ntu-semiconductor-club/", isExternal: true, badge: "Social" },
    { title: "Official Email", subtitle: "ntu.semiconductor.club@ntu.edu.sg", url: "mailto:ntu.semiconductor.club@ntu.edu.sg", badge: "Email" },
    { title: "GitHub Organization", subtitle: "Open-source projects & code", url: "https://github.com/NTU-Semiconductor-Club", isExternal: true, badge: "Code" }
  ];

  let backdrop = document.getElementById("cmd-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "cmd-backdrop";
    backdrop.className = "cmd-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.innerHTML = `
      <div class="cmd-dialog">
        <div class="cmd-header">
          <svg class="xai-icon" width="16" height="16" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="search" inputmode="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="cmd-input" placeholder="Search pages, curriculum, visits, leads (ESC to close)..." aria-label="Search">
          <kbd class="nav-search-kbd">ESC</kbd>
        </div>
        <ul class="cmd-list" role="listbox"></ul>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  const input = backdrop.querySelector(".cmd-input");
  const list = backdrop.querySelector(".cmd-list");
  const escKbd = backdrop.querySelector(".nav-search-kbd");
  let selectedIndex = 0;
  let currentResults = items;

  // Prevent mobile browser auto-zoom glitch by ensuring 16px minimum font size
  if (window.matchMedia("(max-width: 768px)").matches) {
    input.style.fontSize = "16px";
  }

  if (escKbd) {
    escKbd.style.cursor = "pointer";
    escKbd.addEventListener("click", closeCmd);
  }

  function render(results) {
    currentResults = results;
    selectedIndex = 0;
    if (!results.length) {
      list.innerHTML = `<li style="padding: 24px; text-align: center; color: var(--color-mute); font-size: 13px;">No matching results found</li>`;
      return;
    }

    list.innerHTML = results.map((item, idx) => `
      <li class="cmd-item ${idx === 0 ? "is-selected" : ""}" data-index="${idx}">
        <div class="cmd-item-left">
          <div>
            <div class="cmd-item-title">${item.title}</div>
            <div class="cmd-item-sub">${item.subtitle}</div>
          </div>
        </div>
        <span class="cmd-badge">${item.badge}</span>
      </li>
    `).join("");

    list.querySelectorAll(".cmd-item").forEach(el => {
      el.addEventListener("click", () => {
        const i = parseInt(el.getAttribute("data-index"), 10);
        executeItem(currentResults[i]);
      });
    });
  }

  function executeItem(item) {
    closeCmd();
    if (item.isExternal) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = item.url;
    }
  }

  function openCmd() {
    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
    input.value = "";
    render(items);
    // Smooth auto-focus for mobile and desktop without viewport jump
    input.focus({ preventScroll: true });
    setTimeout(() => {
      if (backdrop.classList.contains("is-open")) {
        input.focus({ preventScroll: true });
      }
    }, 50);
  }

  function closeCmd() {
    backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
    input.blur();
  }

  input.addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      render(items);
      return;
    }
    const filtered = items.filter(it =>
      it.title.toLowerCase().includes(q) ||
      it.subtitle.toLowerCase().includes(q) ||
      it.badge.toLowerCase().includes(q)
    );
    render(filtered);
  });

  input.addEventListener("keydown", e => {
    const listItems = list.querySelectorAll(".cmd-item");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % listItems.length;
      updateSelection(listItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + listItems.length) % listItems.length;
      updateSelection(listItems);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (currentResults[selectedIndex]) {
        executeItem(currentResults[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      closeCmd();
    }
  });

  function updateSelection(listItems) {
    listItems.forEach((el, i) => {
      el.classList.toggle("is-selected", i === selectedIndex);
      if (i === selectedIndex) el.scrollIntoView({ block: "nearest" });
    });
  }

  const triggerBtn = document.getElementById("open-command-palette");
  if (triggerBtn) {
    triggerBtn.addEventListener("click", e => {
      e.preventDefault();
      openCmd();
    });
  }

  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      backdrop.classList.contains("is-open") ? closeCmd() : openCmd();
    } else if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
      closeCmd();
    }
  });

  backdrop.addEventListener("click", e => {
    if (e.target === backdrop) closeCmd();
  });
}

// ==================== IMAGE LIGHTBOX ====================
function initLightbox() {
  const images = document.querySelectorAll(".event-card img, .featured-event-card img, .hero-media img");
  if (!images.length) return;

  let modal = document.getElementById("lightbox-modal");
  function closeModal() {
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "lightbox-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 2500;
      display: none; align-items: center; justify-content: center; padding: 16px;
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    `;
    modal.innerHTML = `
      <div style="position: relative; max-width: 90vw; max-height: 85vh;">
        <img id="lightbox-img" src="" alt="Enlarged view" style="max-width: 100%; max-height: 85vh; border-radius: 8px; border: 1px solid #212327;">
        <button id="lightbox-close" aria-label="Close image preview" style="position: absolute; top: -44px; right: 0; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: rgba(10, 10, 10, 0.7); border: 1px solid #212327; border-radius: 9999px; color: #ffffff; cursor: pointer;">
          <svg class="xai-icon" width="18" height="18" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById("lightbox-close");
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && modal.style.display === "flex") closeModal();
    });
  }

  images.forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      document.getElementById("lightbox-img").src = img.src;
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });
}
