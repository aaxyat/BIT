# Slides Platform Design & Architecture

Astro-based presentation framework integrating Reveal.js, Three.js, and Tailwind CSS for multi-deck presentations.

---

## 1. Architecture

```
slides/
├── AGENTS.md                    # Project-level agent rules & directives
├── DESIGN.md                    # Core architecture & component guide
├── src/
│   ├── components/
│   │   ├── decks/               # Deck HUD, Header, Shortcuts, Cards
│   │   ├── slides/              # Slide, Stack, Step, CodeBlock, Notes, Card
│   │   └── three/               # Three.js canvas & modular scene presets
│   ├── layouts/
│   │   ├── BaseLayout.astro     # Global HTML shell & dark theme
│   │   └── DeckLayout.astro     # Reveal.js runner + Three.js lifecycle hook
│   ├── pages/
│   │   ├── index.astro          # Deck catalog dashboard
│   │   └── decks/               # Individual slide deck routes (/decks/<slug>)
│   └── styles/
│       ├── global.css           # Tailwind & base styling
│       ├── reveal-theme.css     # Fixed-scale slide typography & theme vars
│       └── syntax-highlight.css # Tokyo Night code block themes
```

---

## 2. Animation & Motion Philosophy

**Rule:** *Use animation only when needed.* Presentation clarity and legibility take priority over visual noise.

1. **Background WebGL Scenes:**
   - Default is clean, dark static backdrop (`bgScene="none"` or unconfigured).
   - 3D background animation is activated **only** when a slide explicitly requests it (`bgScene="particles"`, `bgScene="grid"`, `bgScene="geometry"`, `bgScene="constellation"`).
   - Motion is calm and minimal (slow drift, low particle amplitudes, subtle mouse parallax).
   - RAF loops auto-pause when browser tab is inactive or presentation is paused (`B` key).

2. **Slide Transitions & Fragments:**
   - Standard clean fade/slide transitions without jarring rotations.
   - Sequential steps use `<Step effect="fade-up">` or `<Step effect="fade-in">` to disclose information progressively.

---

## 3. Slide Components

### `<DeckLayout>`
Master layout for presentation pages. Injects Reveal.js, plugins, HUD, and WebGL background hook.
- `title: string` (required)
- `initialScene?: 'particles' | 'grid' | 'geometry' | 'constellation' | 'none'` (default `'none'`)
- `transition?: 'slide' | 'fade' | 'convex' | 'concave' | 'zoom' | 'none'` (default `'slide'`)
- `controls?: boolean`, `progress?: boolean`, `slideNumber?: boolean`

### `<Slide>`
Standard presentation slide container (`<section>`).
- `id?: string`
- `title?: string`, `subtitle?: string`
- `layout?: 'default' | 'cover' | 'split' | 'grid-3' | 'center'`
- `bgScene?: 'particles' | 'grid' | 'geometry' | 'constellation' | 'none'`
- `transition?: string`

### `<VerticalStack>`
Enables 2D vertical slide drill-downs (Down arrow navigation). Wraps nested `<Slide>` components.

### `<Step>`
Fragment wrapper for progressive bullet/card disclosure.
- `effect?: 'fade-up' | 'fade-in' | 'zoom-in' | 'highlight-blue'`
- `index?: number`

### `<CodeBlock>`
Syntax-highlighted code block with line-step highlights.
- `code: string`
- `lang?: string`
- `lines?: string` (e.g., `'1-2|4-6|8-11'`)
- `title?: string`

### `<SpeakerNotes>`
Presenter notes accessible in Reveal Notes view (`S` key).

### `<Card>`
Glassmorphic content and stat card.
- `title?: string`, `badge?: string`, `stat?: string`, `statLabel?: string`
- `glow?: 'indigo' | 'cyan' | 'rose' | 'amber'`

### `<ThreeCanvas>`
Inline interactive 3D model widget with drag-to-orbit controls.
- `model?: 'knot' | 'torus' | 'sphere' | 'cube' | 'dodecahedron'`
- `color?: string`, `height?: string`, `wireframe?: boolean`

---

## 4. Typography Scale (`pt`)

Slide sizes are fixed (1280×720 at 16:9). Font sizes use predictable `pt` units:
- Base Body: `16pt` (`.text-base`)
- Slide Title / H1: `38pt`
- Section Title / H2: `26pt`
- Subsection / H3: `19pt`
- Small / Metadata: `13pt` (`.text-sm`)

---

## 5. URL & Routing Rules

- Strict adherence to clean path segments (`/`, `/decks/showcase`, `/decks/quick-pitch`).
- Zero query strings (`?key=value`) across all routes and navigation links.

---

## 6. Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` / `→` | Next slide / step |
| `←` | Previous slide / step |
| `↓` / `↑` | Vertical stack drill-down / up |
| `ESC` / `O` | Toggle slide overview grid |
| `S` | Open Presenter Speaker Notes |
| `F` | Toggle Fullscreen |
| `B` / `.` | Pause / Blackout screen |
| `?` / `H` | Toggle Keyboard Shortcuts Modal |
