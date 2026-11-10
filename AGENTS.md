# AGENTS.md — AI Agent Operating Guide

Welcome to the **NTU Semiconductor Club Website** repository (`clubweb`). This file defines the technical boundaries, architecture, design system, writing conventions, and verification workflows for any AI coding agent (Antigravity, Cursor, Claude Code, Copilot, ChatGPT) modifying this codebase.

---

## 1. Core Architecture & Hard Constraints

- **Pure Static Web Stack**:
  - HTML5, modern CSS3, and native vanilla JavaScript (ES6+).
  - **Zero npm/Node.js dependencies** in the root repository. Do NOT add `package.json`, `node_modules/`, Webpack, Vite, Tailwind, or React to the repository.
  - The site must be immediately deployable by copying static files or via GitHub Pages.
- **Root Directory Structure**:
  - `index.html`: Homepage featuring mission, learning pillars, metrics, and semiconductor curriculum.
  - `about.html`: Club background, executive message, and in-depth curriculum pillars.
  - `events.html`: AY2025/26 Semester 2 industrial site visits, cleanroom fab tours, workshop series, and category filter pills.
  - `committee.html`: Executive committee profiles, leadership bio cards, and layer offset popovers.
  - `join.html`: Membership registration steps, official channels, and accessible FAQ accordion.
  - `assets/css/main.css`: Consolidated stylesheet implementing the xAI design tokens, typography ladder, hairline layout, and pill components.
  - `assets/js/main.js`: Consolidated vanilla script implementing command palette (`⌘K`), layer offset popovers, toast notification system, image lightbox, event filtering, and mobile drawer.
  - `images/`: Club event photos, partner imagery, and official logos.
  - `images/committee/`: Executive leadership headshots (`ray.jpg`, `rishabh.jpg`, etc.).

---

## 2. xAI Design System Standards

The website strictly follows the **xAI Design System** as documented in [getdesign.md/x.ai/design-md](https://getdesign.md/x.ai/design-md):

### 2.1 Color Tokens & Canvas Surface (`assets/css/main.css`)
- **Strict Near-Black Canvas Edge-to-Edge**:
  - Canvas: `--color-canvas: #0a0a0a` (The only page surface. Zero light-mode counterpart.)
  - Soft Canvas: `--color-canvas-soft: #1a1c20` (nav hover, tooltip/popover fills)
  - Card Fill: `--color-canvas-card: #191919` (content and feature cards)
  - Mid Canvas: `--color-canvas-mid: #363a3f` (nested code mockups, badges)
  - Hairline: `--color-hairline: #212327` (all structural dividing lines and borders)
- **Text & Ink**:
  - Primary / Ink: `--color-ink: #ffffff`
  - Body Text: `--color-body: #dadbdf`
  - Muted / Caption: `--color-mute: #7d8187`
- **Illustrative Accents (Used Sparingly)**:
  - Sunset Orange: `--color-accent-sunset: #ff7a17`
  - Dusk Purple: `--color-accent-dusk: #7c3aed`
  - Twilight Violet: `--color-accent-twilight: #c4b5fd`
  - Breeze Blue: `--color-accent-breeze: #a0c3ec`
- **Zero Shadows & Hairline Elevation**:
  - All `box-shadow` values are `none`. Elevation is achieved solely through hairline borders (`1px solid #212327`) and surface tone contrasts.
- **Zero Mode Toggle**:
  - No theme switchers, no light mode buttons, and no FOUC theme initialization scripts. The canvas is permanently near-black (`#0a0a0a`).

### 2.2 Typography & Strict Regular Weight 400
- **Two-Face System**:
  - **Geometric Sans (`Inter`)**: Used for all display headings and body copy. Weight 400 is enforced across the board. Negative letter-spacing is applied to all display sizes:
    - `display-xl`: 96px, line-height 96px, letter-spacing -2.4px (scales to 48px, line-height 52px, letter-spacing -1.2px on mobile)
    - `display-lg`: 64px - 72px, line-height 68px, letter-spacing -1.6px
    - `display-md`: 44px - 48px, line-height 48px, letter-spacing -1.2px
    - `display-sm`: 32px, line-height 36px, letter-spacing -0.6px
  - **Monospace (`Geist Mono`)**: Used for code-comment style uppercase eyebrows (`.eyebrow-mono`), metric numbers, and technical labels. Tracked positively (`1.4px` at 13-14px).
- **Strict Regular Weight**: Never bold display headlines. Weight 400 is the entire scale.

### 2.3 Interactive Vocabulary & Shapes
- **The Universal Pill (`border-radius: 9999px`)**:
  - Every interactive button, filter pill, and action trigger is a pill (`--rounded-pill: 9999px`).
  - **Canonical Outline Pill**: `background: transparent; border: 1px solid rgba(255, 255, 255, 0.22); color: #ffffff;`.
  - **Primary White Pill (Rare)**: `background: #ffffff; color: #0a0a0a; border: 1px solid #ffffff;`.
- **Cards (`border-radius: 8px`)**:
  - All cards (`.card`, `.event-card`, `.person-card`) use tight 8px radii (`--rounded-sm: 8px`), `#191919` surface fill, and `1px solid #212327` hairline borders.

### 2.4 Built-In Vector SVGs (Zero Third-Party Icon Fonts)
- All icons across the site (search, external link, terminal, cleanroom mask, chip, code, social channels, chevron, checkmark) are self-contained, clean vector SVGs.
- Do NOT use external icon fonts (such as Font Awesome CDN) which introduce render latency, network failure points, and missing-glyph fallback boxes `[X]`.

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

### 3.2 Banned Synthetic Marketing Clichés & Filler
- ❌ *"In today's rapidly evolving semiconductor landscape..."*
- ❌ *"A testament to our commitment to fostering innovation..."*
- ❌ *"Delve into the cutting-edge realm of..."*
- ❌ *"Empowering the next generation of engineers..."*
- ❌ *"Supercharging student potential through industry synergies..."*
- ❌ Useless generic status pills like *"AY2025/26 Semester 2 • Active Community"*. Use precise technical descriptions instead: *“AY2025/26 Curriculum • NTU NanoFabrication Centre & Foundry Partnerships”*.

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

# 4. Strict xAI compliance: ensure zero theme toggles or light-mode scripts remain
python3 -c "
import glob, sys
for f in glob.glob('*.html') + ['assets/js/main.js', 'assets/css/main.css']:
    content = open(f).read()
    if 'theme-toggle' in content or 'nav-theme-toggle' in content:
        print(f'Holdover theme toggle found in {f}')
        sys.exit(1)
    if 'prefers-color-scheme' in content and f.endswith('.html'):
        print(f'Holdover theme script found in {f}')
        sys.exit(1)
print('Zero holdover theme switchers or light-mode scripts found.')
"
```

### 5.3 Audit Checklist
- [ ] Pure near-black canvas `#0a0a0a` edge-to-edge.
- [ ] Zero theme switcher buttons, zero light-mode holdovers.
- [ ] All interactive buttons are outline pills (`border-radius: 9999px`) with translucent white hairline borders.
- [ ] Strict weight 400 across all display headings and body text.
- [ ] All icons are built out as crisp, self-contained inline SVGs (no missing font glyphs `[X]`).
- [ ] Command Palette (`⌘K`) opens, filters correctly with SVGs, and closes on `ESC`.
- [ ] FAQ accordion toggles expand/collapse cleanly with SVG rotating chevron.
- [ ] Layer offset popovers position cleanly with hairline borders and zero shadows.
