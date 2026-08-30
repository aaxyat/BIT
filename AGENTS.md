# Agent Directives: Lecture Slide-Creation System

## 1. System & Security Directives
- **Secrets**: `~/secrets/` or `~/Secrets/`. STRICT RULE: NEVER read, inspect, print, send, transfer files/data from `~/secrets/` or `~/Secrets/` to models, logs, prompts, external endpoints.
- **Scripts & Privileges**: `~/opt/<scripts>` or `/opt/agents/scripts/`. Use `/opt/agents/scripts/run-sudo.sh <cmd>` for privileged actions without credential exposure.
- **URL Style & Routing Hierarchy**: NEVER generate URLs with query strings (`?key=value`) in web apps, no exceptions. Use clean nested path segments following `<Semester>/<Subject>/<Unit>/<Topic>` hierarchy (`/sem4/bit255co/unit-01/oop-foundations`) or `POST` for forms/filters. Remove existing query strings found during work.
- **Cloudflare Scope**: NEVER invoke Cloudflare AI (Workers AI, inference, embeddings, text/image gen) unless explicitly ordered. Allowed scope: Infrastructure, DNS, Tunnels only.
- **Format**: Dense, compressed, terse. Zero fluff.

---

## 2. Lecture Slide-Creation Directives

### Core Mission & 4 Core Pillars
Convert instructor materials into **complete, self-contained projected teaching notes** acting as full student notes replacements. Absent students must master 100% of concept directly from slide deck.

1. **Simple Language with Formal Rigor**: Plain, direct, accessible explanations paired with all necessary formal definitions, mathematical formulas, and exact syntax. Intuition first, followed by formal specification.
2. **Natural Flow & Understandable Pacing**: Step-by-step pedagogical progression. Build concept intuitively -> state formal definition -> show code/architecture model -> analyze trade-offs and edge cases. Never jump complexity levels abruptly.
3. **Purposeful Visual Animations (Three.js & Steps)**: Use Three.js WebGL models (`<ThreeCanvas />`) and step fragments (`<Step />`) to visualize abstract concepts (coordinate frames, memory allocation, packet flow, state machines) to drive understanding. Never use animation for pure decoration.
4. **Content-Dense Notes Replacement**: Dense reference pages, not cue cards. Full paragraphs for conceptual reasoning. Bullet lists strictly for parallel items. Multi-zone layouts fill the canvas cleanly.

### Generation Workflow (Two-Phase Authoring)
1. **Phase 1 (Outline Approval)**: User provide notes/topic -> present slide outline:
   - Descriptive specific titles per slide.
   - Assigned multi-zone layout template (Main + Sidebar, Card Grid, Table, Code, or 3D Visual).
   - Core concept summary + pacing plan per slide.
2. **Phase 2 (Full Generation & Quality Gate)**: User approve -> generate complete declarative `.astro` file in `src/pages/<Semester>/<Subject>/<Unit>/<Topic>.astro`, update `src/data/curriculum.ts`, run `pnpm build`, run `pnpm run lint:overflow` verify zero errors + zero text overflow.

### Content Coverage & Pedagogical Integrity
- **100% Coverage**: Cover 100% provided material without omissions. Never skip definitions, explanations, formulas, diagrams, algorithms, examples in source.
- **No Hallucination**: No outside concepts or invented APIs/features. Only fill logical gaps for coherence or fix factual errors.
- **Preserve Teaching Order**: Follow source material pedagogical progression step-by-step. Do not reorder topics for "flow."
- **Unbounded Slide Count**: Split long topics across slides as needed. Never compress content to fit arbitrary slide limit.

### Slide Density & Multi-Zone Layouts
- **Reference Notes, Not Bullets**: Full self-contained paragraphs for conceptual explanations (definitions, motivations, reasoning, trade-offs). Bullet lists strictly for discrete parallel items (steps, components).
- **Full Canvas Utilization**: Zero large empty margins or sparse centered text blocks. Fill canvas using structured multi-zone layouts:
  1. **Main + Sidebar**: Core concept left, dedicated `<KeyTerms />` panel right with bold terms + complete definitions.
  2. **Card Grids**: Parallel concepts/components as labeled cards with explicit subheadings + full explanatory text (`<Card />`).
  3. **Comparison Tables**: Structured side-by-side tables for specs, feature matrices, trade-offs (`<Table />`).
  4. **Code with Output & Pitfalls**: Syntax-highlighted code block paired with verified expected terminal output + common student mistakes (`<CodeBlock />`).
  5. **3D Visualizations**: Embedded `<ThreeCanvas />` interactive models for spatial/hardware/architecture concepts.
- **Layout Efficiency Over Shrinking**: Density from structured layout zones, never reducing font size below readable classroom thresholds (minimum 15pt body text). Content exceeds boundaries -> split into sequential numbered slides.
- **Descriptive Titles**: Specific titles (`Binary Search: Time Complexity Analysis`, not `Complexity` or `Overview`). Zero generic filler slides (`Agenda`, `Introduction`, `What We'll Learn`).

### Defensive Visual Theme (Low-Quality Projector & Off-White Screen)
Assume presentation on low-lumen, low-resolution projectors on off-white/cream/textured surfaces:
- **Background**: Solid pure white (`#FFFFFF`) or near-white (`#F8FAFC`). No subtle cream/gray washes that blend into off-white screens.
- **Text**: Dark navy / near-black (`#0F172A` / `#020617`) for body copy + headings. Never light gray, pastels, low-contrast text.
- **Accents & Rules**: Reserve accent colors (indigo, blue, amber) for large structural elements (eyebrows, headers, card borders, icons). Divider rules + borders bold/thick (at least 2px), never hairlines.
- **Dual-Channel Distinction**: Never rely on color alone. Pair color with bold weight, badges, text labels.
- **Typography**: Plain, clean sans-serif (Inter, Arial, Helvetica) in medium/semibold weight for body text.

### Technical Diagramming & 3D Standards
- **Primary**: Structured HTML/CSS architecture boxes with bold 2px borders for projector contrast + instant loading.
- **Three.js Visualizations**: Use `<ThreeCanvas model="..." />` to visualize spatial math, 3D meshes, hardware sensors, and network nodes.
- **Mermaid.js**: Use `<Mermaid code={...} />` for state machines, sequence diagrams, class hierarchies with high-contrast projector theme.
- **Verification Rule**: Re-verify every diagram + figure for technical/mathematical correctness before delivery.

### Programming & Technical Standards
- **Syntax & Construct Analysis**: Explain syntax mechanics + every keyword introduced, not high-level behavior only.
- **Realistic Code Scenarios**: Practical, running scenarios (inventory tracker, auth validator), never toy code (`foo`, `bar`, `printNumbers()`).
- **Verified Output & Pitfalls**: State exact expected output + call out common student mistakes (off-by-one, scope, null pointers).
- **Cumulative Integration**: Conclude programming units with complete, functioning program synthesizing covered constructs.
- **Non-Programming**: Zero code snippets or pseudo-code on non-programming topics.

### Reusable Slide Anatomy Template
Every generated slide implement:
1. **Eyebrow Label**: `01 · SECTION NAME` in bold accent color, small-caps, high-contrast top-left.
2. **Title & Divider**: Specific title under eyebrow with bold divider rule (at least 2px thick).
3. **Structured Body Zone**: Full column, Main + Sidebar, Card Grid, Table, Code, or 3D Visual.
4. **Sidebar (when used)**: Bounded container with solid border labeled `KEY TERMS`.
5. **Footer**: Unit/course name (left) + slide number / total (right).

---

## 3. Avoid AI Writing Specification

Audit, rewrite, generate content free of machine-generated AI writing patterns ("AI-isms").

### Formatting Rules
- **Em Dashes (`—` and `--`)**: Target: zero. Hard max: one per 1,000 words in headings + body. Replace with commas, periods, parentheses, colons. (Exception: markdown bullet lead-in `- **Term** — definition` allowed as list typography).
- **Bold Overuse**: Max one bold phrase per section. Lead with key point rather than bolding mid-sentence words.
- **Emoji in Headers**: Prohibited. No emoji in slide titles or doc headings.
- **Excessive Bullet Lists**: Convert bullet-heavy sections into prose paragraphs. Bullets for discrete parallel items only.
- **Quotes & Typography**: Clean straight quotes in code, markdown, plain text. No decorative punctuation.

### Sentence Structure & Tropes to Eliminate
- **"It's not X, it's Y" / Split Negations**: Rewrite as direct positive claims. No stacked negations or trailing negation fragments.
- **Hollow Intensifiers**: Cut `genuine`, `genuinely`, `real` (intensifier), `truly`, `quite frankly`, `to be honest`, `let's be clear`, `it's worth noting that`. State fact directly.
- **Vague Endorsement**: Cut `worth reading`, `worth exploring`, `worth checking out`, `worth your time`. State concrete reason why it matters.
- **Hedging & Hedge-Stacking**: Cut `perhaps`, `could potentially`, `may eventually`, `might ultimately`. Make point directly.
- **Compulsive Rule of Three**: Avoid forced triads ("adjective, adjective, and adjective"). Use two, four, or full sentences.
- **Copula Avoidance**: Use plain `is` or `has`. Avoid inflated replacements (`serves as`, `features`, `boasts`, `presents`, `represents`).
- **Subjectless Fragments**: Avoid clipped agentless fragments in flowing prose; name actor when it clarifies.
- **Significance Inflation**: Cut `marking a pivotal moment`, `watershed moment`, `revolutionizing the landscape`. State event plainly.
- **Aphorism Formulas**: Cut slot-fill profundities (`X is the language of Y`, `X is the currency of Z`, `X is not a tool but a mirror`). Use concrete claims.
- **Generic Future Closers**: Cut `only time will tell`, `the future looks bright`, `poised to become the defining trend`.
- **Chatbot & "Let's" Artifacts**: Cut `Let's dive in`, `Let's explore`, `In this section we will explore`, `I hope this helps`, `Certainly!`.
- **Rhetorical Questions**: Cut transition rhetorical questions (`So why does this matter?`, `What's next?`).
- **Vague Attributions & Name-Dropping**: Cut `experts believe`, `studies show`, `analysts agree` without named citations. Avoid historical analogy stacking.

### Tier 1 Vocabulary (Always Replace)

#### Tier 1A: AI Frequency Markers
| Replace | Replace With |
|---|---|
| delve / delve into | explore, inspect, look at |
| landscape (metaphor) | field, domain, area |
| tapestry | complex structure, network |
| realm | area, field, domain |
| paradigm | model, approach, pattern |
| embark | begin, start |
| beacon | guide, standard |
| testament to | shows, proves, demonstrates |
| robust | solid, reliable, strong |
| comprehensive | full, complete, thorough |
| cutting-edge | latest, modern, advanced |
| leverage (verb) | use |
| pivotal | key, critical, important |
| underscores | highlights, shows |
| meticulous / meticulously | careful, detailed, exact |
| seamless / seamlessly | smooth, direct, uninterrupted |
| game-changer / game-changing | state exact technical change |
| showcasing | showing, demonstrating |
| deep dive / dive into | examine, inspect, analyze |
| unpack / unpacking | explain, break down |
| intricate / intricacies | complex, details |
| ever-evolving | changing, developing |
| holistic / holistically | complete, full |
| actionable | practical, concrete |
| impactful | effective, significant |
| learnings | lessons, takeaways, findings |
| at its core | fundamentally, primarily |
| synergy / synergies | combined effect, interaction |
| embrace (metaphor) | adopt, accept, use |
| load-bearing (metaphor) | essential, critical |

#### Tier 1B: Inflated Formality & Wordiness
| Replace | Replace With |
|---|---|
| utilize | use |
| in order to | to |
| due to the fact that | because |
| serves as | is |
| features (verb) | has, includes |
| boasts | has |
| presents (inflated) | shows, displays |
| commence | start, begin |
| ascertain | determine, find out |
| endeavor | effort, attempt |

### Tier 2 Vocabulary (Flag in Clusters: 2+ in Same Section)
`harness`, `navigate`, `foster`, `elevate`, `unleash`, `streamline`, `empower`, `bolster`, `spearhead`, `resonate`, `revolutionize`, `facilitate`, `underpin`, `nuanced`, `crucial`, `multifaceted`, `ecosystem`, `myriad`, `plethora`, `encompass`, `catalyze`, `reimagine`, `galvanize`, `augment`, `cultivate`, `illuminate`, `elucidate`, `juxtapose`, `transformative`, `cornerstone`, `paramount`, `poised`, `burgeoning`, `nascent`, `quintessential`, `overarching`, `underpinning`.

### Tone Calibration & Voice Principles
1. **Vary Sentence Length**: Mix short direct statements (4-8 words) with longer explanatory sentences (20+ words).
2. **Be Concrete**: Ground claims in exact numbers, names, data types, protocols, mechanisms.
3. **Instructional Tone**: Experienced professor in lecture hall: direct, authoritative, technically precise.
4. **Never Inject Fake Voice**: No fake first-person ("in my experience"), manufactured drama, or staccato fragments to fake human rhythm. Keep writing clean, clear, grounded.

---

## 4. Final Content Cleanup — Remove Meta-Copy and Specification Leakage

### Primary Invariant
**Document must contain ONLY content intended for actual reader/student/teacher.**

All instructions, requirements, specifications, design directives, generation notes, quality claims, implementation details, commentary about document itself **strictly removed from visible content**. Production constraints applied silently, never written into document.

### Mandatory Removals from Visible Output
1. **Meta-Copy & Quality Claims**:
   - Strictly remove labels, badges, callouts, text claiming:
     - `Projector & Ambient Light Optimized`, `Projector Optimized`, `Classroom Optimized`, `High Contrast`
     - `100% Content Coverage`, `Complete Content Coverage`, `Complete 1-Hour Lecture Notes`, `Teaching Reference`
     - `16pt+ Legible Font Scale`, `≥ 7:1 Optical Contrast`, `Legibility Optimized`, `Readability Optimized`
     - `Student Friendly`, `Teacher Ready`, `Exam Ready`, `University Level`, `Production Ready`, `Professional Grade`
     - `AI-Generated`, `AI-Assisted`, `Generated by AI`, `Designed for...`, `Optimized for...`
     - `Quality Checked`, `Accuracy Verified`, `Standards Compliant`, `Accessibility Compliant`
2. **Authoring Instructions & Repository Commentary**:
   - Strictly remove instructions directed at author/developer:
     - `Create a new .astro file in...`, `Add new lecture slides to...`, `Ready for new content...`
     - `Lecture Platform`, `Lecture System`, `Course Lecture Repository`, `Astro Slides Engine`
3. **Self-Referential & Procedural Commentary**:
   - Remove text talking about document structure rather than subject:
     - `In this section, we will...`, `These notes are designed to...`, `This document ensures...`
     - `The following material is optimized for...`, `The content below has been carefully...`
4. **Numeric Design Specifications**:
   - Never display internal design targets: `16pt+ Font`, `≥ 7:1 Contrast`, `100% Coverage`, `40–60 words per slide`, `Maximum 6 bullets`. Implement silently through formatting.
5. **Generation Artifacts**:
   - Zero references to prompts, instructions, "the user", AI models, formatting requirements, previous drafts, quality checks, TODOs, placeholders, authoring commentary.

### Mandatory Pre-Yield Quality Gate
Before reporting completion on ANY task, agent MUST run:
1. `pnpm run build` -> must succeed with 0 errors.
2. `pnpm run lint:overflow` -> must pass with 0 unhandled overflow warnings.
3. Verification scan -> confirm no meta-copy, no em dashes in prose, no query-string URLs.
