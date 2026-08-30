# Lecture Slide-Creation System: Design & Architecture Specification

A specialized, high-density lecture slide presentation framework built with **Astro**, **Reveal.js**, and **Tailwind CSS**. Engineered specifically for academic and technical instruction projected in real-world classrooms with ambient light, low-lumen projectors, and imperfect off-white screen surfaces.

---

## 1. Core Architectural Mission

The system converts instructor source materials into **complete, self-contained projected teaching notes**. Unlike minimalist speaker cue cards, these slides serve as dense reference pages allowing a student who missed the lecture to learn 100% of the concept directly from the slide deck.

### Key Guarantees
- **100% Curriculum Coverage**: Zero omission of definitions, proofs, formulas, diagrams, or examples.
- **Pedagogical Sequence Integrity**: Preserves the step-by-step logical order of the instructor's material.
- **Dense Reference Pages**: Full explanatory paragraphs for conceptual rigor; bullet points reserved strictly for discrete parallel elements.
- **Defensive Projector Visibility**: Pure white high-contrast backdrops, dark navy text, bold $\ge 2\text{px}$ rules, and zero low-contrast pastels.

---

## 2. Defensive Projector Visual Design System

Classroom environments frequently feature low-lumen projectors, ambient window/fluorescent light, and off-white/cream projection screens. The design system enforces high-contrast readability under these conditions:

| Element | Specification | Rationale |
|---|---|---|
| **Canvas Background** | Pure Solid White (`#FFFFFF`) / `#F8FAFC` | Avoids off-white/cream washes that blend into non-white projector screens. |
| **Primary Typography** | Deep Slate / Navy (`#0F172A`, `#020617`) | Maximum optical contrast against white background under ambient light. |
| **Muted Copy** | Dark Neutral (`#334155`, `#475569`) | Minimum contrast ratio of $\ge 7:1$; never light gray or pastel. |
| **Accent Colors** | Saturated Indigo (`#4338CA`), Crimson (`#BE123C`), Teal (`#0F766E`) | Reserved strictly for large structural elements (headers, badges, borders). |
| **Line & Rule Weights** | Minimum $2\text{px}$ – $3\text{px}$ solid | Single-pixel hairlines vanish on low-resolution ($1024\times768$ / $1920\times1080$) projectors. |
| **Code Block Theme** | Crisp Light Gray (`#F1F5F9`) with dark tokens | Light background with deep saturated syntax highlighting tokens. |
| **Dual-Channel Rule** | Color + Bold / Label / Icon | Never rely on color alone; projector color distortion is common. |

---

## 3. Fixed Slide Typography Scale (`pt`)

Presentations render at a fixed 16:9 canvas ($1280\times720\text{px}$). All slide typography uses predictable point (`pt`) sizes to prevent text clipping and ensure readability from the back of the classroom:

- **Eyebrow Label**: `11pt` — Bold, Small-Caps, Accent Color (`#4338CA`)
- **Slide Title**: `28pt` – `32pt` — Bold (`font-weight: 800`), `#0F172A`, tracking tight
- **Section / Card Headings**: `17pt` – `20pt` — Semi-bold (`font-weight: 700`), `#0F172A`
- **Body & Explanation Paragraphs**: `15pt` – `16pt` — Medium weight (`font-weight: 500`), `#0F172A`, line-height `1.55`
- **Sidebar & Key Terms Definitions**: `13pt` – `14pt` — `#1E293B`, line-height `1.45`
- **Code & Syntax Blocks**: `13pt` – `14pt` — Monospace (`JetBrains Mono`), `#0F172A`
- **Footer Metadata**: `10pt` – `11pt` — `#64748B`, bold slide counter

*Hard Rule: Density is achieved through multi-zone layout efficiency, never by shrinking text below 14pt body size. If content overflows, split across sequential numbered slides.*

---

## 4. Multi-Zone Slide Layout Templates

Every slide utilizes one of four structured layout templates to maximize canvas utilization without visual clutter:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 01 · DISTRIBUTED SYSTEMS                           [Lecture 04]        │
│ Consistent Hashing: Node Join & Ring Partitioning                      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                        │
│  [ ZONE A: MAIN TEACHING CONTENT ]      [ ZONE B: KEY TERMS SIDEBAR ]  │
│  Full explanatory paragraphs detailing  │ Bounded panel (solid border) │
│  the exact mechanism, trade-offs, and   │ listing new terminology      │
│  mathematical properties.               │ with complete definitions.   │
│                                         │                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ Unit 01: Distributed Systems                       Slide 08 / 24       │
└────────────────────────────────────────────────────────────────────────┘
```

### Template A: Main Column + Key Terms Sidebar (`layout="split-sidebar"`)
- **Left Zone (65%)**: Full explanatory text, conceptual reasoning, and mathematical formulas.
- **Right Zone (35%)**: Distinct "KEY TERMS" sidebar box with thick border, containing bolded vocabulary and complete definitions.

### Template B: Structured Card Grid (`layout="card-grid"`)
- Deconstructs parallel components (e.g., OSI layers, architectural tiers, design patterns) into distinct cards.
- Each card contains an explicit bold title, category badge, and full explanatory paragraph.

### Template C: High-Contrast Comparison Table (`layout="table"`)
- Formats feature matrices, trade-offs, time complexities, or protocol comparisons.
- Thick cell borders ($2\text{px}$), bold column headers with subtle tinted backgrounds, alternating high-contrast rows.

### Template D: Programming Construct & Verified Output (`layout="code"`)
- Top: Syntax breakdown and keyword definitions.
- Middle: Syntactically correct, realistic, non-toy code example with syntax highlighting.
- Bottom Split: **Expected Output** box + **Common Student Pitfalls** callout box (highlighting off-by-one, scoping, null pointer errors).

---

## 5. Component Library & API Specifications

```
src/
├── components/
│   ├── slides/
│   │   ├── Slide.astro              # Base slide container with eyebrow, title, divider & footer
│   │   ├── VerticalStack.astro      # 2D vertical drill-down container
│   │   ├── Step.astro               # Progressive bullet/paragraph reveal fragment
│   │   ├── KeyTerms.astro           # Bounded sidebar panel for definitions
│   │   ├── CardGrid.astro           # Responsive dynamic card grid
│   │   ├── Card.astro               # Bounded content card with header & badge
│   │   ├── CodeBlock.astro          # Syntax block with expected output & pitfalls
│   │   ├── Table.astro              # High-contrast projector-ready comparison table
│   │   └── SpeakerNotes.astro       # Hidden presenter notes (S key)
│   └── decks/
│       ├── DeckHeader.astro         # Top HUD toolbar (Overview, Shortcuts, Exit)
│       └── KeyboardShortcuts.astro  # Modal shortcut guide (? key)
```

### `<Slide>` Component API
```astro
---
interface Props {
  id?: string;
  unit?: string;           // e.g. "01 · DISTRIBUTED COMPUTING"
  title: string;           // Specific, descriptive title
  layout?: 'split-sidebar' | 'card-grid' | 'table' | 'code' | 'default' | 'center';
  transition?: 'slide' | 'fade' | 'none';
  class?: string;
}
---
```

### `<CodeBlock>` Component API
```astro
---
interface Props {
  code: string;
  lang?: string;
  title?: string;
  lines?: string;
  output?: string;         // Expected execution output
  pitfalls?: string[];     // Common student mistakes to call out
}
---
```

---

## 6. Pedagogical Tone & Quality Directives

- **Instructional Tone**: Write the way an experienced professor speaks in a lecture hall. Direct, rigorous, and technically precise.
- **Zero Fluff**: Eliminate stock transition phrases ("let's dive in", "now that we understand", "as you can see").
- **Real-World Scenarios**: Programming examples must be practical, functioning code (such as a student grade calculator, packet router, or database connection pool), never `foo`/`bar`.
- **Accuracy Gate**: Double-check that all technical claims, equations, and code snippets execute without syntax errors.

---

## 7. URL & Navigation Rules

- **Clean Path Segments**: All deck URLs use clean routing (`/`, `/decks/distributed-systems`, `/decks/algorithms-01`).
- **Zero Query Strings**: Strictly no `?query=param` URLs in the application.

---

## 8. Keyboard Navigation Controls

| Key | Function |
|---|---|
| `Space` / `→` | Advance to next slide / fragment |
| `←` | Previous slide / fragment |
| `↓` / `↑` | Vertical sub-slide navigation |
| `ESC` / `O` | Toggle presentation slide overview |
| `S` | Open Presenter Speaker Notes window |
| `F` | Toggle Fullscreen mode |
| `B` / `.` | Pause / Blackout screen |
| `?` / `H` | Toggle Keyboard Shortcuts help modal |
