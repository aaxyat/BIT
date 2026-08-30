# Astro Slides Presentation System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a presentation platform (`slides`) in Astro featuring Reveal.js, interactive Three.js 3D background visuals, Tailwind CSS, modular slide components, and multiple starter decks accessible via a dashboard with clean URLs.

**Architecture:** Component-driven Astro framework where `DeckLayout.astro` initializes Reveal.js with full plugins and manages a fixed background WebGL Three.js canvas layer. Slide decks are authored with modular Astro components (`<Slide>`, `<VerticalStack>`, `<Step>`, `<CodeBlock>`, `<SpeakerNotes>`, `<Card>`), with a dashboard hub at `/` listing presentations at clean paths like `/decks/showcase`.

**Tech Stack:** Astro, Tailwind CSS, Reveal.js, Three.js, Lucide Icons, TypeScript, pnpm.

## Global Constraints
- Zero query strings (`?key=value`) on any web route — use clean path segments only.
- Strict dark-mode visual hierarchy with glassmorphism, glowing accents, and responsive typography (using `pt` units for slide text hierarchy where applicable).
- Three.js rendering loop must auto-pause on tab invisibility or Reveal presentation pause (`B` key) to preserve battery and performance.
- Package manager: `pnpm`.

---

### Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `public/favicon.svg`
- Create: `src/pages/index.astro` (minimal placeholder)

**Interfaces:**
- Consumes: None (initial scaffold).
- Produces: Runnable Astro project with `astro`, `reveal.js`, `three`, `@astrojs/tailwind`, `lucide-astro`.

- [ ] **Step 1: Create package.json and configuration files**
  Create `package.json` with dependencies and scripts (`dev`, `build`, `preview`).
  Create `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, and `public/favicon.svg`.

- [ ] **Step 2: Install dependencies**
  Run: `pnpm install`
  Expected: Node modules installed cleanly without resolution errors.

- [ ] **Step 3: Verify initial build**
  Run: `pnpm run build`
  Expected: Successful Astro build into `dist/`.

---

### Task 2: Global Styles, Theme & Base Layout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/styles/reveal-theme.css`
- Create: `src/styles/syntax-highlight.css`
- Create: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: Tailwind base directives, Reveal.js base styles.
- Produces: `BaseLayout.astro` providing HTML boilerplate, meta tags, fonts, and dark theme variables.

- [ ] **Step 1: Create global CSS and syntax highlighting stylesheets**
  Configure `@import "tailwindcss";` or `@tailwind` directives in `src/styles/global.css`.
  Create `src/styles/syntax-highlight.css` with dark theme styling (Dracula/Tokyo night inspired token colors).
  Create `src/styles/reveal-theme.css` with CSS custom properties for slide sizes, heading typography, slide padding, and transitions.

- [ ] **Step 2: Create BaseLayout.astro**
  Implement `BaseLayout.astro` with HTML shell, meta title/description, font links, and `<slot />`.

- [ ] **Step 3: Verify build**
  Run: `pnpm run build`
  Expected: Builds without CSS syntax errors.

---

### Task 3: Three.js 3D Visual Engine & Scene Presets

**Files:**
- Create: `src/components/three/scenes/SceneManager.ts`
- Create: `src/components/three/scenes/ParticleWave.ts`
- Create: `src/components/three/scenes/CyberGrid.ts`
- Create: `src/components/three/scenes/FloatingGeometry.ts`
- Create: `src/components/three/scenes/Constellation.ts`
- Create: `src/components/three/ThreeBackground.astro`
- Create: `src/components/three/ThreeCanvas.astro`

**Interfaces:**
- Consumes: `three` library.
- Produces:
  - `SceneManager`: Singleton on `window.__sceneManager` with `.setScene(name: string)`, `.pause()`, `.resume()`, `.destroy()`.
  - `ThreeBackground.astro`: Fullscreen canvas component mounted in `DeckLayout`.
  - `ThreeCanvas.astro`: Component for inline interactive 3D model widgets.

- [ ] **Step 1: Implement SceneManager and scene presets**
  Create `SceneManager.ts` managing WebGLRenderer, PerspectiveCamera, RAF loop, responsive window resize, and visibility listeners.
  Implement `ParticleWave.ts` (sine wave animated particle grid).
  Implement `CyberGrid.ts` (perspective neon grid).
  Implement `FloatingGeometry.ts` (wireframe torus knot and icosahedron with point lights).
  Implement `Constellation.ts` (network nodes with dynamic connecting lines).

- [ ] **Step 2: Implement ThreeBackground and ThreeCanvas components**
  Create `ThreeBackground.astro` to mount the fullscreen WebGL background canvas.
  Create `ThreeCanvas.astro` to mount an inline interactive 3D canvas within slide content grids.

- [ ] **Step 3: Verify build**
  Run: `pnpm run build`
  Expected: TypeScript compilation and Astro build pass.

---

### Task 4: Slide Component Library & Deck Layout

**Files:**
- Create: `src/components/slides/Slide.astro`
- Create: `src/components/slides/VerticalStack.astro`
- Create: `src/components/slides/Step.astro`
- Create: `src/components/slides/CodeBlock.astro`
- Create: `src/components/slides/SpeakerNotes.astro`
- Create: `src/components/slides/Card.astro`
- Create: `src/components/decks/DeckHeader.astro`
- Create: `src/components/decks/KeyboardShortcuts.astro`
- Create: `src/layouts/DeckLayout.astro`

**Interfaces:**
- Consumes: `ThreeBackground.astro`, `reveal.js` core + plugins (`highlight`, `notes`, `zoom`, `search`, `math`).
- Produces: Declarative slide authoring components and `DeckLayout.astro` for presentation pages.

- [ ] **Step 1: Implement slide components**
  Create `Slide.astro` with layout options (`cover`, `default`, `split`, `grid-3`, `center`) and `data-bg-scene`.
  Create `VerticalStack.astro` wrapping nested slides for vertical drill-downs.
  Create `Step.astro` for fragment animations (`fade-in`, `fade-up`, `zoom-in`, `highlight-blue`).
  Create `CodeBlock.astro` for syntax-highlighted code blocks with line step animations.
  Create `SpeakerNotes.astro` for presenter view notes (`<aside class="notes">`).
  Create `Card.astro` for styled glassmorphism cards and badges.

- [ ] **Step 2: Implement presentation HUD and DeckLayout**
  Create `DeckHeader.astro` with deck title, slide counter, overview button, and exit button.
  Create `KeyboardShortcuts.astro` modal showing shortcuts (`?` toggle).
  Create `DeckLayout.astro` initializing Reveal.js, syncing slide changes with `SceneManager`, and binding HUD events.

- [ ] **Step 3: Verify build**
  Run: `pnpm run build`
  Expected: TypeScript and Astro build pass.

---

### Task 5: Starter Slide Decks

**Files:**
- Create: `src/pages/decks/showcase.astro`
- Create: `src/pages/decks/threejs-deepdive.astro`
- Create: `src/pages/decks/quick-pitch.astro`

**Interfaces:**
- Consumes: `DeckLayout.astro`, `<Slide>`, `<VerticalStack>`, `<Step>`, `<CodeBlock>`, `<SpeakerNotes>`, `<Card>`, `<ThreeCanvas>`.
- Produces: 3 complete presentation routes (`/decks/showcase`, `/decks/threejs-deepdive`, `/decks/quick-pitch`).

- [ ] **Step 1: Implement Master Feature Showcase deck**
  Create `src/pages/decks/showcase.astro` with title slide, split layout, 3-card grid with fragment steps, vertical slide stack, animated code highlights, and speaker notes.

- [ ] **Step 2: Implement Three.js Visual Showcase deck**
  Create `src/pages/decks/threejs-deepdive.astro` demonstrating particle waves, cyber grid, floating geometry, constellation network, and embedded interactive 3D object.

- [ ] **Step 3: Implement Modern Startup Pitch Deck**
  Create `src/pages/decks/quick-pitch.astro` with problem/solution cards, market opportunity stats, traction metrics, and product roadmap.

- [ ] **Step 4: Verify build**
  Run: `pnpm run build`
  Expected: All 3 deck routes compile cleanly into static HTML.

---

### Task 6: Decks Catalog & Home Dashboard

**Files:**
- Create: `src/components/decks/DeckCard.astro`
- Create: `src/pages/index.astro`

**Interfaces:**
- Consumes: `BaseLayout.astro`, `DeckCard.astro`, `ThreeBackground.astro`.
- Produces: Home page at `/` listing all available presentations with search/tag filter and quick launch cards.

- [ ] **Step 1: Implement DeckCard component**
  Create `DeckCard.astro` displaying deck title, category badge, slide count, description, and "Launch Presentation" button pointing to clean path `/decks/<slug>`.

- [ ] **Step 2: Implement Home Dashboard page**
  Create `src/pages/index.astro` with hero section, live presentation stats, deck grid, tag filter tabs, keyboard shortcuts quick-reference drawer, and particle background.

- [ ] **Step 3: Verify build**
  Run: `pnpm run build`
  Expected: Home page and all deck pages generate without errors.

---

### Task 7: Verification & Quality Assurance

**Files:**
- Test / Verify all generated pages and client scripts.

**Interfaces:**
- Consumes: Built static pages & dev server.
- Produces: End-to-end verification report.

- [ ] **Step 1: Run complete build**
  Run: `pnpm run build`
  Expected: All routes (`/`, `/decks/showcase`, `/decks/threejs-deepdive`, `/decks/quick-pitch`) build to `dist/` with 0 warnings or errors.

- [ ] **Step 2: Start dev server and verify routes**
  Start server via `pnpm run preview` or `pnpm run dev`.
  Verify that navigation between dashboard and decks works smoothly, Reveal.js slides transition on Arrow/Space keys, Three.js backgrounds render, and no query strings are present.

- [ ] **Step 3: Final inspection**
  Confirm all files are clean, documented, and properly formatted.
