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

## 2. Directory & Route Hierarchy

Decks are organized in a clean nested academic hierarchy under `src/pages/`:

```
src/pages/
└── <Semester>/
    └── <Subject>/
        └── <Unit>/
            └── <Topic>.astro
```

**Example Route:**
`src/pages/fall2026/cs3840/unit-01/threejs-fundamentals.astro`  
$\rightarrow$ URLs resolve cleanly to `/fall2026/cs3840/unit-01/threejs-fundamentals` with **zero query strings**.

---

## 3. Defensive Projector Visual Design System

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

## 4. Fixed Slide Typography Scale (`pt`)

Presentations render at a fixed 16:9 canvas ($1280\times720\text{px}$). All slide typography uses predictable point (`pt`) sizes to prevent text clipping and ensure readability from the back of the classroom:

- **Eyebrow Label**: `11pt` — Bold, Small-Caps, Accent Color (`#4338CA`)
- **Slide Title**: `28pt` – `32pt` — Bold (`font-weight: 800`), `#0F172A`, tracking tight
- **Section / Card Headings**: `17pt` – `20pt` — Semi-bold (`font-weight: 700`), `#0F172A`
- **Body & Explanation Paragraphs**: `15pt` – `16pt` — Medium weight (`font-weight: 500`), `#0F172A`, line-height `1.55`
- **Sidebar & Key Terms Definitions**: `13pt` – `14pt` — `#1E293B`, line-height `1.45`
- **Code & Syntax Blocks**: `13pt` – `14pt` — Monospace (`JetBrains Mono`), `#0F172A`
- **Footer Metadata**: `10pt` – `11pt` — `#64748B`, bold slide counter

---

## 5. Multi-Zone Slide Layout Templates

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
- **Right Zone (35%)**: Distinct "KEY TERMS" sidebar box (`<KeyTerms />`) with thick border, containing bolded vocabulary and complete definitions.

### Template B: Structured Card Grid (`layout="card-grid"`)
- Deconstructs parallel components (e.g., OSI layers, architectural tiers, design patterns) into distinct cards (`<Card />`).
- Each card contains an explicit bold title, category badge, and full explanatory paragraph.

### Template C: High-Contrast Comparison Table (`layout="table"`)
- Formats feature matrices, trade-offs, time complexities, or protocol comparisons via `<Table />`.
- Thick cell borders ($2\text{px}$), bold column headers with subtle tinted backgrounds, alternating high-contrast rows.

### Template D: Programming Construct & Verified Output (`layout="code"`)
- Top: Syntax breakdown and keyword definitions.
- Middle: Syntactically correct, realistic code example via `<CodeBlock />`.
- Bottom: **Expected Output** box + **Common Student Pitfalls** callout box.

### Template E: Architecture & Flow Diagrams (`<Mermaid />`)
- Visualizes state machines, sequence diagrams, and class hierarchies with custom high-contrast light theme.

---

## 6. Component Library & API Specifications

```
src/
├── components/
│   ├── slides/
│   │   ├── Slide.astro              # Base slide container with eyebrow, title, divider & footer
│   │   ├── VerticalStack.astro      # 2D vertical drill-down container
│   │   ├── Step.astro               # Progressive reveal fragment
│   │   ├── KeyTerms.astro           # Bounded sidebar panel for definitions
│   │   ├── Card.astro               # Bounded content card with header & badge
│   │   ├── CodeBlock.astro          # Syntax block with expected output & pitfalls
│   │   ├── Table.astro              # High-contrast projector-ready comparison table
│   │   ├── Mermaid.astro            # High-contrast client-side Mermaid.js diagram
│   │   └── SpeakerNotes.astro       # Hidden presenter notes (S key)
│   └── decks/
│       ├── DeckHeader.astro         # Top HUD toolbar (Overview, Shortcuts, Exit)
│       └── KeyboardShortcuts.astro  # Modal shortcut guide (? key)
```

---

## 7. Slide Overflow Verification Tool

To ensure that text stays within safe bounds and never overflows slide containers on physical projection screens, run:

```bash
pnpm run lint:overflow
```

Scans generated slide files in `src/pages/` for paragraph word budgets ($\le 90$ words), code line budgets ($\le 25$ lines), and card word counts ($\le 65$ words).

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
