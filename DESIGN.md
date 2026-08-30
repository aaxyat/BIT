# Lecture Slide-Creation System: Design & Architecture Specification

Specialized high-density lecture slide presentation framework built with **Astro**, **Reveal.js**, **Tailwind CSS**. Designed for academic + technical instruction projected in classrooms with ambient light, low-lumen projectors, off-white screen surfaces.

---

## 1. Core Architectural Mission

Convert instructor source materials into **complete, self-contained projected teaching notes**. Not minimalist speaker cue cards. Dense reference pages allowing student absent from lecture to master 100% of concept directly from slide deck.

### Key Guarantees
- **100% Curriculum Coverage**: Zero omission of definitions, proofs, formulas, diagrams, examples.
- **Pedagogical Sequence Integrity**: Preserve step-by-step logical order of instructor material.
- **Dense Reference Pages**: Full explanatory paragraphs for conceptual rigor; bullets strictly for discrete parallel items.
- **Defensive Projector Visibility**: Pure white high-contrast backdrops, dark navy text, bold $\ge 2\text{px}$ rules, zero low-contrast pastels.

---

## 2. Directory & Route Hierarchy

Decks organized in clean nested hierarchy under `src/pages/`:

```
src/pages/
└── <Semester>/
    └── <Subject>/
        └── <Unit>/
            └── <Topic>.astro
```

**Example Route:**
`src/pages/fall2026/cs3840/unit-01/threejs-fundamentals.astro`  
$\rightarrow$ URL: `/fall2026/cs3840/unit-01/threejs-fundamentals` with **zero query strings**.

---

## 3. Defensive Projector Visual Design System

Enforce high-contrast readability on low-lumen projectors + ambient light + off-white screens:

| Element | Specification | Rationale |
|---|---|---|
| **Canvas Background** | Solid White (`#FFFFFF`) / `#F8FAFC` | Avoid off-white washes blending into non-white screens. |
| **Primary Typography** | Deep Slate / Navy (`#0F172A`, `#020617`) | Max optical contrast on white background under ambient light. |
| **Muted Copy** | Dark Neutral (`#334155`, `#475569`) | Minimum contrast ratio $\ge 7:1$; never light gray or pastel. |
| **Accent Colors** | Saturated Indigo (`#4338CA`), Crimson (`#BE123C`), Teal (`#0F766E`) | Reserved for large structural elements (headers, badges, borders). |
| **Line & Rule Weights** | Minimum $2\text{px}$ – $3\text{px}$ solid | Single-pixel hairlines vanish on low-res projectors. |
| **Code Block Theme** | Light Gray (`#F1F5F9`) with dark tokens | Light background with deep saturated syntax tokens. |
| **Dual-Channel Rule** | Color + Bold / Label / Icon | Never color alone; projector color distortion common. |

---

## 4. Fixed Slide Typography Scale (`pt`)

Fixed 16:9 canvas ($1280\times720\text{px}$). Point (`pt`) sizes ensure back-of-room readability:

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
- **Left Zone (65%)**: Full explanatory text, conceptual reasoning, math formulas.
- **Right Zone (35%)**: Distinct "KEY TERMS" sidebar box (`<KeyTerms />`) with thick border, bold terms + definitions.

### Template B: Structured Card Grid (`layout="card-grid"`)
- Deconstruct parallel components into distinct cards (`<Card />`).
- Each card has bold title, category badge, full explanatory paragraph.

### Template C: High-Contrast Comparison Table (`layout="table"`)
- Feature matrices, trade-offs, time complexities, protocol comparisons via `<Table />`.
- Thick cell borders ($2\text{px}$), bold column headers with tinted backgrounds, alternating high-contrast rows.

### Template D: Programming Construct & Verified Output (`layout="code"`)
- Top: Syntax breakdown + keyword definitions.
- Middle: Syntactically correct realistic code via `<CodeBlock />`.
- Bottom: **Expected Output** box + **Common Student Pitfalls** callout box.

### Template E: Architecture & Flow Diagrams (`<Mermaid />`)
- State machines, sequence diagrams, class hierarchies with high-contrast projector theme.

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

Ensure text stays within safe bounds on physical projection screens:

```bash
pnpm run lint:overflow
```

Scans slide files in `src/pages/` for paragraph word budgets ($\le 90$ words), code line budgets ($\le 25$ lines), card word counts ($\le 65$ words).

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
