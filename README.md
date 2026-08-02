# NTU Semiconductor Club Website ⚡

[![NTU Semiconductor Club](https://img.shields.io/badge/NTU-Semiconductor_Club-0066ff?style=for-the-badge&logo=microchip&logoColor=white)](https://ntu-semiconductor-club.github.io/clubweb)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](LICENSE)

Official website for the **NTU Semiconductor Club** at Nanyang Technological University (NTU). Connecting students, industry leaders, and microelectronics researchers across the global semiconductor ecosystem.

---

## 🌟 Features

* **Sleek Silicon Dark Theme**: Deep dark palette (`#030814`) with glassmorphism, glowing cyan badges, and fluid micro-interactions.
* **Fully Responsive**: Optimized across mobile, tablet, laptop, and desktop displays with responsive grid structures and a mobile navigation drawer.
* **SEO & Social Metadata**: Pre-configured with Open Graph metadata, semantic HTML5 tags (`<nav>`, `<main>`, `<header>`, `<section>`, `<footer>`), and accessible ARIA attributes.
* **Zero External Dependencies**: Pure Vanilla HTML5, CSS3, and JavaScript — fast, lightweight, and easy to deploy anywhere.

---

## 📁 Repository Structure

```text
.
├── index.html              # Landing page (Hero, Impact Stats, Core Tech, Featured Events)
├── about.html              # About Us (Vision, Mission, Strategic Pillars)
├── events.html             # Club Activities (Cleanroom Visits, Technical Workshops, Career Seminars)
├── committee.html          # Leadership Team (Executive Committee & Portfolio Leads)
├── join.html               # Membership & Registration (Benefits, Discipline Eligibility, Steps)
├── assets/
│   ├── css/
│   │   └── main.css        # Core stylesheet (Design system, typography, glassmorphic cards, layout)
│   └── js/
│       └── main.js         # Sticky navbar scroll listener, active link detector, mobile menu drawer
├── images/                 # Standardized high-res website image assets (.jpg)
│   └── committee/          # Executive committee member headshots
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Pages CI/CD deployment workflow
├── .gitignore              # Standard gitignore exclusions
├── LICENSE                 # MIT License
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Local Development

Since this project is built with Vanilla HTML/CSS/JS, no build step or node package installation is required!

1. **Clone the repository**:
   ```bash
   git clone git@github.com:NTU-Semiconductor-Club/clubweb.git
   cd clubweb
   ```

2. **Run locally using any static web server**:

   * **Using Python**:
     ```bash
     python3 -m http.server 8000
     ```
     Then open `http://localhost:8000` in your browser.

   * **Using VS Code Live Server Extension**:
     Right-click `index.html` and select **"Open with Live Server"**.

   * **Using Node `serve`**:
     ```bash
     npx serve .
     ```

---

## 🌐 Deployment

### GitHub Pages Setup

This repository is configured for automated deployment to **GitHub Pages**:

1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Pushing changes to the `main` branch will automatically trigger `.github/workflows/deploy.yml` and publish the site.

---

## 📬 Contact & Community

* **Email**: [ntu.semiconductor.club@ntu.edu.sg](mailto:ntu.semiconductor.club@ntu.edu.sg)
* **Organization**: Nanyang Technological University (NTU), Singapore

---

## 📄 License

Distributed under the [MIT License](LICENSE). See `LICENSE` for more information.
