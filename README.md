# NTU Semiconductor Club Website ⚡

[![NTU Semiconductor Club](https://img.shields.io/badge/NTU-Semiconductor_Club-0a0a0a?style=for-the-badge&logo=microchip&logoColor=white&labelColor=212327)](https://ntu-semiconductor-club.github.io/clubweb)
[![Design: xAI](https://img.shields.io/badge/Design_System-xAI-ff7a17?style=for-the-badge&labelColor=0a0a0a)](https://getdesign.md/x.ai/design-md)
[![Telegram](https://img.shields.io/badge/Telegram-Community-white?style=for-the-badge&logo=telegram&logoColor=black&labelColor=212327)](https://t.me/+Wsb5No5hvnxlMjRl)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Follow-0a0a0a?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=212327)](https://www.linkedin.com/company/ntu-semiconductor-club/)
[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=for-the-badge&labelColor=212327)](LICENSE)

Official web portal and repository for the **NTU Semiconductor Club** at Nanyang Technological University (NTU), Singapore.

Built with the **xAI Design System** ([getdesign.md/x.ai/design-md](https://getdesign.md/x.ai/design-md)) featuring a stark monochrome near-black `#0a0a0a` canvas, regular weight 400 typography, universal outline pills, built-in vector SVGs, mobile touch ergonomics, and comprehensive SEO structured data.

---

## 🔬 Full-Stack Semiconductor Curriculum

The NTU Semiconductor Club educates and prepares NTU students across the complete silicon value chain:

1. **IC Design & VLSI Logic**: Digital logic, analog circuits, RTL architecture, and EDA synthesis tools.
2. **Cleanroom Fabrication & Testing**: Photolithography, thin-film deposition, wafer processing, and metrology at NTU NanoFabrication Centre (N2FC).
3. **Embedded & RTOS Firmware**: Microcontroller architectures, register-level C/C++ drivers, and real-time execution.
4. **GPU Computing & Acceleration**: CUDA architecture, kernel profiling, and high-performance computing pipelines with AI Singapore (AISG).

---

## 📰 AY2025/26 Semester 2 Semicon Bulletin & Expeditions

| Date | Expedition / Event | Host / Partner | Scope |
| :--- | :--- | :--- | :--- |
| **22 Jan 2026** | **AI Career Launch Pad** | AI Singapore (AISG) | Systems and hardware fundamentals for AI careers (AIIP/AIAP). |
| **26 Jan & 23 Feb 2026** | **N2FC Cleanroom Fab Tours** | NTU N2FC | Photolithography and wafer processing inside cleanroom lines. |
| **6 Feb 2026** | **AMD Singapore Industry Visit** | AMD Singapore | System Level Test (SLT), Failure Analysis, and processor bring-up. |
| **10 Feb 2026** | **A*STAR IME Industry Visit** | A*STAR IME | Advanced packaging, microelectronics research, and silicon photonics. |
| **AY2025/26** | **GlobalFoundries Visit** | GlobalFoundries | Commercial wafer fabrication lines and yield engineering. |
| **2 Apr 2026** | **Networking Coffee Chat** | NTU Campus | Informal career discussions and engineer mentorship. |

---

## 👥 Executive Leadership

| Name | Role | Responsibilities |
| :--- | :--- | :--- |
| **Ray** | President | Overall curriculum design, strategy, and foundry partnerships |
| **Rishabh** | Vice President (Internal) | Operations, safety orientations, and registration logistics |
| **Roland** | Vice President (External) | Corporate relations and industry visit coordination |
| **Bryan** | Events Director | Cleanroom tours, plant visits, and technical workshops |
| **Pranav** | Sponsorships Director | Corporate outreach, sponsorships, and internship pipelines |
| **Srishti** | Publicity Director | Technical publications, Semicon Bulletin, and branding |

---

## 🛠️ Design System & Technical Specifications

- **Design System**: xAI Design System ([xai_design_spec.md](xai_design_spec.md))
- **Colors**: Canvas `#0a0a0a`, Cards `#191919`, Hairlines `#212327`, Ink `#ffffff`, Body `#dadbdf`, Sunset Accent `#ff7a17`.
- **Typography**: Inter (Universal Sans substitute) at weight 400 with negative tracking; Geist Mono for code eyebrows (`// ...`).
- **Icons**: 59 built-in scalable vector SVGs (`.xai-icon`). Zero external CDN dependencies.
- **Mobile Ergonomics**: Breakpoints for `< 860px`, `< 640px`, and `< 480px`. Touch target heights >= 44px. iOS auto-zoom prevention.
- **SEO & Discoverability**: Schema.org JSON-LD structured data on all pages, full Open Graph / Twitter Cards, `robots.txt`, and XML sitemap.
- **Pure Static Stack**: Pure HTML5, CSS3, ES6+ vanilla JavaScript. Zero npm/Node.js dependencies.

For detailed developer specifications, see [ARCHITECTURE.md](ARCHITECTURE.md) and [AGENTS.md](AGENTS.md).

---

## 🌐 Live Web Portal Endpoints

* **Production (GitHub Pages)**: [https://ntu-semiconductor-club.github.io/clubweb/](https://ntu-semiconductor-club.github.io/clubweb/)
* **Localhost Daemon**: [http://localhost:8000/](http://localhost:8000/)

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
