# Dos Soles Redesign Project

## Overview
This project targets the design and implementation of three distinct homepage versions for the hair product distributor **Dos Soles**, inspired by the premium aesthetics of cosmetic brand Juleriaque. The project includes an interactive portal (`index.html` Switcher) to toggle and preview the layouts side-by-side.

## Identity & Design Tokens
- **Logo Principal**: `https://dossolesdistribuidora.com.ar/wp-content/uploads/2024/12/LOGO-DOS-SOLES-180PX.png`
- **Isologo Auxiliar**: `https://dossolesdistribuidora.com.ar/wp-content/uploads/2023/09/isologo-dossoles-rojo-2023-768x768.png.webp`
- **Typography**: `"Plus Jakarta Sans", sans-serif` (Imported from Google Fonts)
- **Palette**:
  - Red Primary: `#D4000C` (or `#c1000b` for menus)
  - Navy Blue (Titles): `#0b1a48`
  - Accent Gold: `#dd9933` (or `#a06f26`)
  - Background Neutral: `#ffffff`
  - Text Neutral: `#4c4d52`

## Architectural Modules
```text
dos_soles_redesign/
├── index.html                   # Root Switcher portal with interactive iframe previewer
├── package.json                 # Dependency list for Playwright E2E tests
├── playwright.config.js         # Playwright test execution setup
├── shared/                      # Shared assets and styles
│   ├── css/
│   │   ├── variables.css        # Centralized CSS Custom Properties (Colors, Sizing, Font family)
│   │   └── common.css           # Base reset, responsive wrapper grid, and standard components
│   └── js/
│       └── common.js            # Live search mock data, brand list array, navigation utility scripts
├── v1-editorial/                # Version 1: Minimalista Editorial
│   ├── index.html
│   ├── style.css
│   └── script.js
├── v2-darkgold/                 # Version 2: Premium Dark & Gold
│   ├── index.html
│   ├── style.css
│   └── script.js
├── v3-bento/                    # Version 3: Bento Grid Moderno
│   ├── index.html
│   ├── style.css
│   └── script.js
└── tests/                       # E2E test files
    ├── switcher.spec.js
    ├── v1-minimal.spec.js
    ├── v2-darkgold.spec.js
    ├── v3-bento.spec.js
    └── common-components.spec.js
```

## Milestone Status
| Milestone | Status | Description |
|-----------|--------|-------------|
| Milestone 1 | DONE | Project Setup, Design System & E2E Test Suite Setup |
| Milestone 2 | DONE | Versión 1 Implementation (Minimalista Editorial) |
| Milestone 3 | DONE | Versión 2 Implementation (Premium Dark & Gold) |
| Milestone 4 | DONE | Versión 3 Implementation (Bento Grid Moderno) |
| Milestone 5 | DONE | Home Switcher Portal & Common Component Refinement |
| Milestone 6 | DONE | Final Verification, Responsiveness Tuning & Adversarial Hardening |
| Milestone 7 | DONE | Versión 4: Sephora Vibrant Style (v4-sephora/) |
| Milestone 8 | DONE | Versión 5: Douglas Premium Bold (v5-douglas/) |
| Milestone 9 | DONE | Versión 6: Bento Grid Moderno & Interactivo Sephora (v6-bento-sephora/) |
| Milestone 10 | DONE | Home Switcher Update for All 6 Versions |
| Milestone 11 | DONE | E2E Testing, Adversarial Coverage & Final Validation |

## Milestone Decomposition

### Milestone 1: Project Setup, Design System & E2E Test Suite Setup
- **Objectives**: Initialize folder structure, configure design variables in `shared/css/variables.css`, build `package.json` for Playwright E2E test setup.
- **Outputs**:
  - `/shared/css/variables.css`
  - `/shared/css/common.css`
  - `/shared/js/common.js`
  - `/package.json`
  - `/playwright.config.js`
- **Verification**: Run a basic smoke test with Playwright to verify environment validity.

### Milestone 2: Versión 1 Implementation (Minimalista Editorial)
- **Objectives**: Implement the pure editorial style with clean white backgrounds, fine 1px gray borders, huge typography, and very subtle red highlights. Setup the V1 slider and V1 responsive structure.
- **Outputs**:
  - `/v1-editorial/index.html`
  - `/v1-editorial/style.css`
  - `/v1-editorial/script.js`
  - `/tests/v1-minimal.spec.js`
- **Verification**: Run `npx playwright test tests/v1-minimal.spec.js`. Ensure background is white and 1px borders are verified.

### Milestone 3: Versión 2 Implementation (Premium Dark & Gold)
- **Objectives**: Implement the premium dark styling focusing on professionals and salons (B2B). Integrate navy blue backgrounds, gold accents, Truss/Matrix dropdown menus, courses grid, and brand logos.
- **Outputs**:
  - `/v2-darkgold/index.html`
  - `/v2-darkgold/style.css`
  - `/v2-darkgold/script.js`
  - `/tests/v2-darkgold.spec.js`
- **Verification**: Run `npx playwright test tests/v2-darkgold.spec.js`. Verify dark theme elements and Truss/Matrix details.

### Milestone 4: Versión 3 Implementation (Bento Grid Moderno)
- **Objectives**: Build the bento grid version highlighting category tiles (Coloración, Tratamientos, Styling). Add card shadows, interactive scales, hover relief, and smooth CSS transitions.
- **Outputs**:
  - `/v3-bento/index.html`
  - `/v3-bento/style.css`
  - `/v3-bento/script.js`
  - `/tests/v3-bento.spec.js`
- **Verification**: Run `npx playwright test tests/v3-bento.spec.js`. Assert bento layout styles and grid attributes.

### Milestone 5: Home Switcher Portal & Common Component Refinement
- **Objectives**: Implement root `index.html` displaying the interactive preview portal with iframe containers. Integrate preview size buttons (Desktop, Mobile) and description sidebars. Refine shared scripts and style modules.
- **Outputs**:
  - `/index.html`
  - `/tests/switcher.spec.js`
- **Verification**: Run `npx playwright test tests/switcher.spec.js`. Verify switching pages inside the iframe and button resize commands.

### Milestone 6: Final Verification, Responsiveness Tuning & Adversarial Hardening
- **Objectives**: Execute full suite of E2E tests in desktop, tablet, and mobile configurations. Harden CSS layouts to avoid overflow scrollbars. Resolve any console warnings and inspect asset loads.
- **Outputs**:
  - Complete verification log and project release.
- **Verification**: Run `npm test` or `npx playwright test`. Check for zero console errors.

### Milestone 7: Versión 4 Implementation (Sephora Vibrant Style)
- **Objectives**: Design and implement the Sephora Vibrant Style homepage in `v4-sephora/` directory. Focus on high product density, vibrant visual banners, marquee announcements, active color accenting (#D4000C), dropdown menu with Matrix and Truss brands, mock search, and newsletter subscription form.
- **Outputs**:
  - `/v4-sephora/index.html`
  - `/v4-sephora/style.css`
  - `/v4-sephora/script.js`
- **Verification**: Ensure no console errors and that layout matches Sephora aesthetics.

### Milestone 8: Versión 5 Implementation (Douglas Premium Bold)
- **Objectives**: Design and implement the Douglas Premium Bold homepage in `v5-douglas/` directory. Focus on a premium dark contrast theme, gold accent highlights, highly polished product cards, and a dedicated "Rutinas Capilares Recomendadas" section.
- **Outputs**:
  - `/v5-douglas/index.html`
  - `/v5-douglas/style.css`
  - `/v5-douglas/script.js`
- **Verification**: Ensure B2B/Rutinas section renders correctly, design tokens are respected, and pages load cleanly.

### Milestone 9: Versión 6 Implementation (Bento Grid Moderno & Interactivo Sephora)
- **Objectives**: Design and implement the Bento Grid Moderno & Interactivo Sephora homepage in `v6-bento-sephora/` directory. Focus on structured grid categories, modern clean presentation, and interactive micro-animations (3D hovers, scale, or smooth relief).
- **Outputs**:
  - `/v6-bento-sephora/index.html`
  - `/v6-bento-sephora/style.css`
  - `/v6-bento-sephora/script.js`
- **Verification**: Assert CSS Grid layout properties and hover scaling effects.

### Milestone 10: Switcher Portal Update
- **Objectives**: Update root `index.html` to support selection and responsive iframe scaling for all 6 homepages. Categorize them into "Línea Editorial & Minimalista" (V1-V3) and "Línea Dinámica Sephora/Douglas" (V4-V6).
- **Outputs**:
  - `/index.html`
- **Verification**: Check if all 6 options switch successfully.

### Milestone 11: E2E Playwright Tests Update & Hardening
- **Objectives**: Create or expand test specifications to run verification across all 6 versions. Ensure common component tests run on all 6 versions (live search, newsletter invalid format alert, product carousel count, mobile scroll layout, zero console error).
- **Outputs**:
  - `/tests/v4-sephora.spec.js`
  - `/tests/v5-douglas.spec.js`
  - `/tests/v6-bento-sephora.spec.js`
  - `/tests/switcher.spec.js` (updated)
  - `/tests/common-components.spec.js` (updated)
- **Verification**: Verify all Playwright E2E tests run and pass.

## Run/Build/Test Commands
- **Local Server**: Run a simple node server or static server: `npx http-server -p 8080` (or `npx live-server`).
- **Run Tests**: `npx playwright test`
- **Run Tests UI**: `npx playwright test --ui`
