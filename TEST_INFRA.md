# Test Infrastructure Specification

This document details the testing strategy, feature inventory, and validation checklist for the Dos Soles homepage redesign versions.

## Testing Setup
- **Framework**: Playwright (E2E testing)
- **Script command**: `npm install && npx playwright test`
- **Execution Pipeline**:
  The tests start a local HTTP server targeting the root workspace directory, allowing page navigation to `/index.html`, `/v1-editorial/`, `/v2-darkgold/`, and `/v3-bento/`.

## Feature Inventory

### 1. General & Layout System (Shared)
- **Design Tokens Consistency**: Central variables for colors (Red `#D4000C`, Navy `#0b1a48`, Gold `#dd9933`), font-family `"Plus Jakarta Sans"`.
- **Top Notification Bar**: Must load marquee/ticker styling, promo texts (Envío gratis, Portal Mayorista).
- **Header Navigation**:
  - Official logo displayed.
  - Dropdown menu lists Truss and Matrix brands.
  - Search bar element focus state.
  - Mock Live Search dropdown reveals products on text input.
- **Hero Slider / Carousel**: Banner slides automatically or shifts on click; text triggers action.
- **Footer Section**:
  - Subscription form with basic email validation.
  - Viumi/Mercado Pago payment logos.
  - Quick link navigation layout.

### 2. Version 1: Minimalista Editorial
- **Visual styling**: Fine 1px borders, white background, sparse colors.
- **Micro-interactions**: Subtle underline fade effects on links, high-fashion product grid styling.

### 3. Version 2: Premium Dark & Gold
- **Visual styling**: Deep navy backdrop (`#0B1A48`), gold `#dd9933` borders.
- **B2B Salón Focus**: Sections presenting hair workshops/styling courses, Truss/Matrix custom logo assets.

### 4. Version 3: Bento Grid Moderno
- **Visual styling**: Custom bento-style layout for Hair Categories using CSS Grid property rules.
- **Micro-interactions**: Subtle relief and shadows on card hover.

### 5. Switcher Portal (`index.html`)
- **Portal layout**: Navigation selector buttons.
- **Iframe viewport controls**: View size triggers:
  - Desktop View (scales iframe container to 1280px)
  - Mobile View (scales iframe container to 390px)
  - Tablet View (scales iframe container to 768px)

## Test Specifications

### Switcher Portal (`tests/switcher.spec.js`)
- Assert root path `/index.html` loads correctly.
- Assert switcher contains buttons for Version 1, 2, and 3.
- Assert clicking Version 1 loads `/v1-editorial/index.html` in the preview iframe.
- Assert responsive view buttons resize the iframe width to `1280px`, `768px`, and `390px` respectively.

### Version 1: Editorial (`tests/v1-minimal.spec.js`)
- Assert body background matches white (`#ffffff`).
- Assert typography utilizes `Plus Jakarta Sans`.
- Assert thin gray borders (1px) are present.
- Assert logo image loads successfully.

### Version 2: Dark Gold (`tests/v2-darkgold.spec.js`)
- Assert background matches navy `#0B1A48`.
- Assert B2B elements (brand courses, truss/matrix logos) are rendered.
- Assert buttons or border colors use gold `#dd9933`.

### Version 3: Bento Grid (`tests/v3-bento.spec.js`)
- Assert bento-grid container uses CSS Grid (`display: grid`).
- Assert cards change box-shadow or scale slightly during emulation of hover state.

### Common Components & Responsiveness (`tests/common-components.spec.js`)
- Assert typing in Header Search reveals search results list.
- Verify footer newsletter inputs alert user on malformed email structure.
- Assert product carousel contains a minimum of 4 product cards.
- Assert mobile view (390px viewport width) renders without horizontal scroll overflow.
- Assert console log lists zero errors on page loads.
