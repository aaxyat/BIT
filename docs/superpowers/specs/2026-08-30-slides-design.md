# Astro Reveal.js + Three.js Slide Presentation System Design

**Date:** 2026-08-30  
**Project:** `slides` (Astro Presentation Engine)  
**Status:** Approved  

---

## 1. Overview

The `slides` project is a modern presentation platform built with **Astro**, **Reveal.js**, **Three.js**, and **Tailwind CSS**. It provides a multi-deck slide deck framework with a dashboard home page, reusable Astro slide components, animated Three.js 3D background scenes, and presenter tools.

### Key Goals
- **Multi-Deck Management**: Organize, browse, and present multiple slide decks through a clean dashboard interface without query parameters.
- **Component-Driven Slide Authoring**: Author slides using declarative Astro components (`<Slide>`, `<VerticalStack>`, `<Step>`, `<CodeBlock>`, `<SpeakerNotes>`, `<Card>`).
- **Interactive 3D Visuals with Three.js**: Provide dynamic background scene presets (Particle Wave, Cyber Grid, Floating Geometry, Constellation) and embedded interactive 3D canvas slide widgets.
- **Performance & Battery Optimization**: Native WebGL rendering loop managed by a lifecycle singleton that automatically pauses when tabs or slides are inactive.
- **Zero Query String URLs**: Conform strictly to clean path segments (`/`, `/decks/showcase`, `/decks/threejs-deepdive`, `/decks/quick-pitch`).

---

## 2. Architecture & Directory Structure

```
slides/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── decks/
│   │   │   ├── DeckCard.astro           # Preview card on dashboard
│   │   │   ├── DeckHeader.astro         # Top presentation HUD toolbar
│   │   │   └── KeyboardShortcuts.astro  # Modal helper (? key)
│   │   ├── slides/
│   │   │   ├── Slide.astro              # Base slide container (<section>)
│   │   │   ├── VerticalStack.astro      # 2D vertical slide group
│   │   │   ├── Step.astro               # Fragment animation wrapper
│   │   │   ├── CodeBlock.astro          # Syntax highlighted code block
│   │   │   ├── SpeakerNotes.astro       # Presenter notes (<aside class="notes">)
│   │   │   └── Card.astro               # Glassmorphism content card
│   │   └── three/
│   │       ├── ThreeBackground.astro    # WebGL background canvas layer
│   │       ├── ThreeCanvas.astro        # Inline embedded 3D widget
│   │       └── scenes/                  # Modular 3D scene presets
│   │           ├── SceneManager.ts      # Engine lifecycle & RAF loop
│   │           ├── ParticleWave.ts      # Undulating glowing particles
│   │           ├── CyberGrid.ts         # Retro neon perspective grid
│   │           ├── FloatingGeometry.ts  # Morphing wireframe polyhedra
│   │           └── Constellation.ts     # Connected network nodes
│   ├── layouts/
│   │   ├── BaseLayout.astro             # Global HTML wrapper
│   │   └── DeckLayout.astro             # Reveal.js runner + 3D hook
│   ├── pages/
│   │   ├── index.astro                  # Deck catalog dashboard
│   │   └── decks/
│   │       ├── showcase.astro           # Full component showcase deck
│   │       ├── threejs-deepdive.astro   # 3D visuals demonstration deck
│   │       └── quick-pitch.astro        # Modern startup pitch deck
│   └── styles/
│       ├── global.css                   # Tailwind and base CSS
│       └── reveal-theme.css             # High-contrast custom Reveal theme
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── tailwind.config.mjs
```

---

## 3. Component Specification

### 3.1 `DeckLayout.astro`
- **Purpose**: Wraps any slide deck page, sets up Reveal.js, mounts `ThreeBackground`, and handles keyboard shortcuts.
- **Props**:
  - `title: string` (required)
  - `description?: string`
  - `theme?: 'dark' | 'light' | 'midnight'` (default `'midnight'`)
  - `transition?: 'slide' | 'fade' | 'convex' | 'concave' | 'zoom'` (default `'slide'`)
  - `controls?: boolean` (default `true`)
  - `progress?: boolean` (default `true`)
  - `autoSlide?: number` (default `0`)
- **Plugins**: Includes `RevealHighlight`, `RevealNotes`, `RevealZoom`, `RevealSearch`, `RevealMath.KaTeX`.
- **Event Listeners**: Listens to `slidechanged` to update `SceneManager` scene presets and camera angles.

### 3.2 `Slide.astro`
- **Purpose**: Declarative container for individual presentation slides.
- **Props**:
  - `id?: string` — Anchor hash identifier
  - `title?: string`, `subtitle?: string`
  - `layout?: 'cover' | 'default' | 'split' | 'grid-3' | 'center'`
  - `bgScene?: 'particles' | 'grid' | 'geometry' | 'constellation' | 'none'`
  - `transition?: string`
  - `class?: string`
- **Output**: Generates `<section data-bg-scene={bgScene} data-transition={transition}>` with formatted headings and layout containers.

### 3.3 `VerticalStack.astro`
- **Purpose**: Groups nested `<Slide>` components to enable vertical navigation (down arrow to drill into details).
- **Output**: Wraps children in an outer `<section>` container as per Reveal.js 2D navigation standard.

### 3.4 `Step.astro` (Fragments)
- **Purpose**: Step-by-step sequential animation of list items, cards, or text.
- **Props**:
  - `effect?: 'fade-in' | 'fade-up' | 'zoom-in' | 'highlight-blue' | 'highlight-red'`
  - `index?: number`
- **Output**: `<div class="fragment {effect}" data-fragment-index={index}>`.

### 3.5 `CodeBlock.astro`
- **Purpose**: Syntax-highlighted code container with animated line highlighting.
- **Props**:
  - `code: string`
  - `lang?: string`
  - `lines?: string` (e.g. `'1|2-4|5-8'`)
  - `title?: string`

### 3.6 `SpeakerNotes.astro`
- **Purpose**: Hidden speaker notes accessible via Reveal.js presenter view (`S` key).
- **Output**: `<aside class="notes"><slot /></aside>`.

---

## 4. Three.js 3D Visual Engine

### 4.1 `SceneManager.ts`
- Singleton manager attached to `window.__sceneManager`.
- Manages WebGLRenderer, Camera, and Scene graph.
- Handles smooth transitions between active scene modules on slide navigation.
- Automatically handles window resize and `visibilitychange` pausing.
- Device pixel ratio capped at `Math.min(window.devicePixelRatio, 2)`.

### 4.2 Scene Presets
1. **`ParticleWave`**: 2,500 glowing point particles in an undulating sine-wave surface. Particle amplitude and color palette react to slide navigation and mouse movement.
2. **`CyberGrid`**: Neon grid perspective floor moving toward an infinite horizon with responsive horizon glow.
3. **`FloatingGeometry`**: Orbiting wireframe Torus Knot and Icosahedron illuminated by dual complementary point lights.
4. **`Constellation`**: 80 interconnected floating nodes that form dynamic glowing connection lines when within proximity threshold.

### 4.3 `<ThreeCanvas>` Embedded Widget
- Self-contained interactive 3D model canvas that presenters can rotate live using mouse drag/orbit inside any slide layout.

---

## 5. Decks Dashboard & Starter Decks

### 5.1 Dashboard (`/`)
- Lists available slide decks with category tags, slide counts, estimated duration, and launch buttons.
- Search filter by title and tag.
- Keyboard shortcuts cheat sheet dialog.

### 5.2 Starter Decks
1. `/decks/showcase`: Comprehensive feature showcase demonstrating all slide layouts, code animations, vertical stacks, fragments, and speaker notes.
2. `/decks/threejs-deepdive`: 3D visual showcase exhibiting the 4 background presets and an embedded interactive 3D model.
3. `/decks/quick-pitch`: Sleek startup pitch deck demonstrating business metrics, problem/solution layout, and market size stat cards.

---

## 6. Verification & Quality Gates

1. **Build Validation**: Ensure `pnpm run build` generates static HTML output without errors.
2. **Runtime Testing**: Run Astro dev server and verify in browser:
   - Dashboard page loads and lists all decks.
   - Slide navigation works (horizontal Arrows/Space, vertical Down/Up for stacks).
   - Three.js background canvas renders at 60fps and switches scenes on slide changes.
   - Presenter Notes view (`S` key) opens and synchronizes.
   - Keyboard shortcut modal (`?` key) opens and closes.
3. **Clean URLs**: Verify no query string parameters exist on any route.
