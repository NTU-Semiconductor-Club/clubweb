# Contributing & Vibe Coding Guidelines 🚀

Thank you for contributing to the **NTU Semiconductor Club Website**! This document provides rules for human contributors and instructions for AI coding agents to ensure seamless, clean development.

---

## 🤖 AI Agent Guidelines (For LLMs & Vibe Coding)

When prompted to edit, extend, or fix code in this repository:

1. **Follow the `humanizer` Writing Style**:
   * Do NOT use inflated AI marketing words (`vibrant`, `landscape`, `pivotal`, `testament`, `fostering`, `delve`, `unmatched`).
   * Keep text factual, concise, natural, and grounded in student club context.
   * Avoid overuse of rule-of-three phrasing or synthetic em dashes (`—`).

2. **Use Native HTML5, CSS3, and Vanilla JS**:
   * Do NOT add npm build dependencies, React, or Vite unless explicitly requested by the user.
   * Maintain the pure static layout so the site deploys instantly to GitHub Pages.

3. **Preserve Image Naming & Extension Conventions**:
   * All images must be stored under `images/` or `images/committee/`.
   * Use lowercase `.jpg` or `.png` extensions to avoid case-sensitivity bugs on Linux web servers.
   * Always provide descriptive `alt` text and `loading="lazy"` on `<img>` elements.

4. **Follow HTML Layout & Component Structure**:
   * Every HTML file must retain:
     - Navigation header (`#nav` with `.nav-brand`, mobile menu button, and `.active` class on current page link).
     - Global footer with official lion logo [`images/logo.png`](file:///home/ray/dev/clubweb/images/logo.png) and contact email.
     - Script tag `<script src="assets/js/main.js"></script>` before `</body>`.

---

## 🛠️ Local Development & Testing

1. **Serve locally using Python**:
   ```bash
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000` in your web browser.

2. **Git Workflow**:
   ```bash
   git add -A
   git commit -m "Describe your changes clearly"
   git push origin main
   ```

3. **Deployment**:
   Pushing to `main` automatically triggers the GitHub Actions workflow [`.github/workflows/deploy.yml`](file:///home/ray/dev/clubweb/.github/workflows/deploy.yml) to deploy to GitHub Pages.
