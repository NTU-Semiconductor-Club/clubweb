# AGENTS.md — AI Agent Operating Guide

Welcome to the **NTU Semiconductor Club Website** repository (`clubweb`). This file defines the technical boundaries, architecture, design system, writing conventions, and verification workflows for any AI coding agent (Antigravity, Cursor, Claude Code, Copilot, ChatGPT) modifying this codebase.

---

## 1. Core Architecture & Hard Constraints

- **Pure Static Web Stack**:
  - HTML5, modern CSS3, and native vanilla JavaScript (ES6+).
  - **Zero npm/Node.js dependencies** in the root repository. Do NOT add `package.json`, `node_modules/`, Webpack, Vite, Tailwind, or React to the repository.
  - The site must be immediately deployable by copying static files or via GitHub Pages.
- **Root Directory Structure**:
  - `index.html`: Homepage featuring mission statement, quick stats, learning pillars, and latest announcements.
  - `about.html`: Club background, executive message, and in-depth curriculum pillars.
  - `events.html`: AY2025/26 Semester 2 industrial site visits, cleanroom fab tours, workshop series, and category filter pills.
  - `committee.html`: Executive committee profiles, leadership bio cards, and Astryx layer offset popovers.
  - `join.html`: Membership registration steps, official channels, and accessible Astryx FAQ accordion.
  - `assets/css/main.css`: Consolidated stylesheet containing Meta Astryx design tokens, layer positioning, layout, and component styles.
  - `assets/js/main.js`: Consolidated vanilla script implementing Astryx offset engine, command palette (`⌘K`), toast notification system, light-dismiss stack, lightbox viewer, and theme switcher.
  - `images/`: Club event photos, sponsor/partner imagery, and official logos.
  - `images/committee/`: Executive leadership headshots (`ray.jpg`, `rishabh.jpg`, etc.).

---

## 2. Meta Astryx Design System Standards

The website integrates architectural patterns and design tokens from Meta's open-source **[Astryx Design System](https://github.com/facebook/astryx)**:

### 2.1 CSS Token Cascade (`assets/css/main.css`)
- **Modern Color Tokens with `light-dark()`**:
  - Surface: `--color-background-surface: light-dark(#ffffff, #1c1e21)`
  - Cards: `--color-background-card: light-dark(#f7f8fa, #242526)`
  - Borders: `--color-border: light-dark(#e4e6eb, #393a3b)`
  - Text Primary: `--color-text-primary: light-dark(#1c1e21, #f5f6f7)`
  - Text Secondary: `--color-text-secondary: light-dark(#65676b, #b0b3b8)`
  - Brand Primary: `--color-brand: #0866ff` (Meta Astryx Electric Blue)
- **3-Tier Elevation (Shadows)**:
  - Low: `--shadow-low: 0 1px 2px rgba(0, 0, 0, 0.08)`
  - Medium: `--shadow-med: 0 4px 12px rgba(0, 0, 0, 0.12)`
  - High: `--shadow-high: 0 12px 28px rgba(0, 0, 0, 0.20)`
- **Standardized Spacing & Border Radii**:
  - Spacing scale: `--spacing-1` (4px) through `--spacing-12` (48px)
  - Radii: `--radius-inner` (4px), `--radius-element` (8px), `--radius-container` (12px), `--radius-pill` (9999px)

### 2.2 Astryx Layer Offset Engine (`core-layer--offset`)
- Floating popovers (such as committee info cards) use native context anchor positioning with `offset: 8px` (`--spacing-2`).
- Boundary collision detection: Automatically clamps horizontally inside viewport margins and flips vertically between bottom and top placement when approaching viewport edges.
- Dismissal stack:
  - **Light-dismiss**: Clicking or tapping outside the active layer immediately closes it.
  - **Keyboard dismiss**: Pressing the `Escape` key closes the topmost active layer.
  - **Focus return**: Returns focus cleanly to trigger elements for screen reader accessibility.

### 2.3 Global Interactive Components
- **Command Palette (`⌘K` or `Ctrl+K`)**: Modal search index filtering pages, learning pillars, industrial site visits, executive leads, and social links with keyboard navigation (`↑`/`↓` and `Enter`).
- **Astryx Accessible Accordion (`.astryx-accordion`)**: Interactive FAQ accordion on `join.html` with dynamic `max-height` transitions, single-item auto-collapse behavior, rotating chevrons, and full `aria-expanded` keyboard accessibility.
- **Lightbox Viewer**: Modal image expansion for event photos with backdrop blur and caption display.
- **Theme Switcher**: Instant dark/light mode toggle with `localStorage` persistence, OS `prefers-color-scheme` synchronization, and `<head>` FOUC prevention script.
- **Toast Notifications (`useToast`)**: Non-blocking floating status pills in bottom-right corner for interactive feedback (theme switching, email copy, etc.).
- **Event Category Filters**: Instant category filtering on `events.html` (All, Cleanroom & Fab, Industry Visits, Workshops & Careers) using data attributes (`data-category` and `data-filter`).
- **Pulsing Status Indicator (`.astryx-status-indicator`)**: Real-time pulsing badge in hero section signaling active AY2025/26 Semester 2 enrollment.

---

## 3. Humanizer Writing Style & Content Rules

All copy in this repository must maintain an authentic, student-led, university club tone:

### 3.1 Banned AI Marketing Vocabulary & Inflections
Never use synthetic or inflated AI marketing words (including all stems, plural, and tense variants):
- ❌ `vibrant`
- ❌ `landscape`
- ❌ `pivotal`
- ❌ `testament`
- ❌ `fostering`, `foster`, `fosters`, `fostered`
- ❌ `delve`, `delves`, `delved`, `delving`, `"deep dive"`
- ❌ `unmatched`
- ❌ `beacon`
- ❌ `tapestry`
- ❌ `spearheaded`, `spearhead`, `spearheads`, `spearheading`
- ❌ `empowering`, `empower`, `empowers`, `empowered`
- ❌ `supercharge`, `supercharges`, `supercharged`, `supercharging`
- ❌ `synergy`, `synergies`, `synergistic`

### 3.2 Banned Synthetic Marketing Clichés & Rhetorical Formulas
- ❌ *"In today's rapidly evolving semiconductor landscape..."*
- ❌ *"A testament to our commitment to fostering innovation..."*
- ❌ *"Delve into the cutting-edge realm of..."*
- ❌ *"Empowering the next generation of engineers..."*
- ❌ *"Supercharging student potential through industry synergies..."*

### 3.3 Required Writing Style
- Keep text factual, concise, natural, and grounded in student club context.
- Use natural terminology: *“cleanroom tours”*, *“industry visits”*, *“student projects”*, *“hands-on workshops”*, *“technical sessions”*.
- Avoid excessive rule-of-three sentence structures or synthetic em dashes (`—`).

---

## 4. Image & Asset Conventions

1. **Storage Locations**:
   - General assets: `images/`
   - Committee headshots: `images/committee/`
2. **File Formats & Extensions**:
   - Always use lowercase file extensions (`.jpg`, `.png`, `.svg`). Avoid mixed casing (like `.JPG` or `.PNG`) which causes 404 errors on case-sensitive Linux web servers (GitHub Pages).
3. **HTML Standards**:
   - Always specify descriptive, accessible `alt` text.
   - Always include `loading="lazy"` on images below the fold.

---

## 5. Local Verification & Testing

AI agents should verify changes prior to reporting completion:

### 5.1 Local Server
Run Python's built-in HTTP server from the project root:
```bash
python3 -m http.server 8000
```
Access at `http://localhost:8000`.

### 5.2 Fast Automated Governance Checks
Run these zero-dependency one-liners in your shell:
```bash
# 1. Pure static stack check: ensure no package.json or node_modules in repository
find . -name "package.json" -o -name "node_modules"

# 2. Banned AI marketing buzzwords check across all HTML files
python3 -c "
import glob, re, sys
pattern = re.compile(r'\b(vibrant|landscape|pivotal|testament|foster|delv|unmatched|beacon|tapestry|spearhead|empower|supercharg|synerg)', re.I)
found = False
for f in glob.glob('*.html'):
    for i, line in enumerate(open(f), 1):
        m = pattern.search(line)
        if m:
            print(f'Banned word \"{m.group(0)}\" in {f}:{i}')
            found = True
if found: sys.exit(1)
print('Zero banned words found across all HTML files.')
"

# 3. Image case-sensitivity and accessibility audit
python3 -c "
import glob, re, os, sys
for f in glob.glob('*.html'):
    for img in re.findall(r'<img[^>]+>', open(f).read()):
        src_m = re.search(r'src=[\"\']([^\"\']+)[\"\']', img)
        alt_m = re.search(r'alt=[\"\']([^\"\']+)[\"\']', img)
        if src_m:
            src = src_m.group(1)
            if any(ext in src for ext in ['.JPG', '.PNG', '.SVG']):
                print(f'Uppercase extension in {f}: {src}')
                sys.exit(1)
            if not src.startswith(('http', '//')) and not os.path.exists(src):
                print(f'Missing image in {f}: {src}')
                sys.exit(1)
        if not alt_m or not alt_m.group(1).strip():
            print(f'Missing alt attribute in {f}: {img}')
            sys.exit(1)
print('All images exist, have lowercase extensions, and include valid alt text.')
"
```

### 5.3 Audit Checklist
- [ ] Zero browser console errors.
- [ ] Zero 404 or failed network requests.
- [ ] Command Palette (`⌘K`) opens, filters correctly, and closes on `ESC`.
- [ ] Astryx Layer Offset positions correctly without overflowing viewport.
- [ ] Theme toggle switches between light and dark modes without FOUC.
- [ ] Event filter tabs properly show/hide corresponding event cards.
- [ ] FAQ accordion toggles expand/collapse cleanly with smooth animation.
- [ ] Mobile navigation drawer toggles at viewports ≤ 768px.
