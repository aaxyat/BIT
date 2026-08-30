# Agent Directives: Lecture Slide-Creation System

## 1. System & Security Directives
- **Secrets**: Location: `~/secrets/` or `~/Secrets/`. STRICT RULE: NEVER read, inspect, print, send, or transfer files/data from `~/secrets/` or `~/Secrets/` to models, logs, prompts, or external endpoints.
- **Scripts & Privileges**: Location: `~/opt/<scripts>` or `/opt/agents/scripts/`. Use `/opt/agents/scripts/run-sudo.sh <cmd>` for privileged actions without credential exposure.
- **URL Style & Routing Hierarchy**: NEVER generate URLs with query strings (`?key=value`) in web apps, with no exceptions. Use clean nested path segments following the `<Semester>/<Subject>/<Unit>/<Topic>` hierarchy (e.g. `/fall2026/cs3840/unit-01/threejs-fundamentals`) or `POST` for forms/filters. Remove any existing query strings found during work.
- **Cloudflare Scope**: NEVER invoke Cloudflare AI (Workers AI, inference, embeddings, text/image gen) unless explicitly ordered. Allowed scope: Infrastructure, DNS, and Tunnels only.
- **Documentation & Dotfiles Maintenance**: Master record: `/home/aaxyat/HOMELAB_SETUP.md`. Update on every setup, package, service, route, or config change. Run `yadm commit` and `yadm push` on shell/terminal/editor/system config changes.
- **Format**: Dense, compressed, terse. Zero fluff.

---

## 2. Lecture Slide-Creation Directives

### Core Mission
Convert instructor source materials into **complete, self-contained projected teaching notes**, not presentation cue cards or high-level outlines. A student absent from lecture must be able to master 100% of the concept directly from the slide deck.

### Generation Workflow (Two-Phase Authoring)
1. **Phase 1 (Outline Approval)**: When the user provides lecture notes or a topic, first present an explicit slide outline specifying:
   - Descriptive specific titles for each slide.
   - Assigned multi-zone layout template (Main + Sidebar, Card Grid, Table, or Code).
   - Core concept summary per slide.
2. **Phase 2 (Full Generation & Quality Gate)**: Upon user approval, generate the complete declarative `.astro` file in `src/pages/<Semester>/<Subject>/<Unit>/<Topic>.astro`, update `src/pages/index.astro` `decks` array, run `pnpm build`, and run `pnpm run lint:overflow` to verify zero errors and no text overflow.

### Content Coverage & Pedagogical Integrity
- **100% Coverage**: Cover 100% of the provided material without omissions. Never skip definitions, explanations, formulas, diagrams, algorithms, or examples present in the source.
- **No Hallucination**: Do not inject outside concepts or invent APIs/features. Only fill logical gaps necessary for coherence or fix factual errors.
- **Preserve Teaching Order**: Follow the source material's pedagogical progression step-by-step. Do not reorder topics for cosmetic "flow."
- **Unbounded Slide Count**: Split long topics across as many slides as needed. Never compress content to fit an arbitrary slide limit.

### Slide Density & Multi-Zone Layouts
- **Reference Notes, Not Bullets**: Full self-contained paragraphs for conceptual explanations (definitions, motivations, reasoning, trade-offs). Bullet lists strictly reserved for discrete parallel items (steps, components).
- **Full Canvas Utilization**: Zero large empty margins or sparse centered text blocks. Fill canvas using structured multi-zone layouts:
  1. **Main + Sidebar**: Core concept on left, dedicated `<KeyTerms />` panel on right with bold terms and complete definitions.
  2. **Card Grids**: Parallel concepts/components organized as labeled cards with explicit subheadings and full explanatory text (`<Card />`).
  3. **Comparison Tables**: Structured side-by-side tables for specs, feature matrices, and trade-offs (`<Table />`).
  4. **Code with Output & Pitfalls**: Syntax-highlighted code block paired with verified expected terminal output and common student mistakes (`<CodeBlock />`).
- **Layout Efficiency Over Shrinking**: Density comes from structured layout zones, never by reducing font size below readable classroom thresholds (minimum 15pt body text). If content exceeds slide boundaries, split into sequential numbered slides.
- **Descriptive Titles**: Specific titles (e.g., `Binary Search: Time Complexity Analysis`, not `Complexity` or `Overview`). Zero generic filler slides (`Agenda`, `Introduction`, `What We'll Learn`).

### Defensive Visual Theme (Low-Quality Projector & Off-White Screen)
Assume presentation on low-lumen, low-resolution projectors onto off-white/cream/textured surfaces:
- **Background**: Solid pure white (`#FFFFFF`) or near-white (`#F8FAFC`). No subtle cream/gray washes that blend into off-white projection screens.
- **Text**: Dark navy / near-black (`#0F172A` / `#020617`) for all body copy and headings. Never use light gray, pastels, or low-contrast text.
- **Accents & Rules**: Reserve accent colors (indigo, blue, amber) for large structural elements (eyebrows, headers, card borders, icons). All divider rules and borders must be bold and thick (at least 2px), never hairlines.
- **Dual-Channel Distinction**: Never rely on color alone. Always pair color with bold weight, badges, or text labels.
- **Typography**: Plain, clean sans-serif (Inter, Arial, Helvetica) in medium/semibold weight for body text.

### Technical Diagramming Standards
- **Primary**: Structured HTML/CSS architecture boxes with bold 2px borders for maximum projector contrast and instant loading.
- **Mermaid.js**: Use `<Mermaid code={...} />` for state machines, sequence diagrams, and class hierarchies with the built-in high-contrast projector theme.
- **Verification Rule**: Re-verify every diagram and figure for technical and mathematical correctness before delivery.

### Programming & Technical Standards
- **Syntax & Construct Analysis**: Explain syntax mechanics and every keyword introduced, not just high-level behavior.
- **Realistic Code Scenarios**: Practical, running scenarios (e.g. inventory tracker, auth validator), never toy code (`foo`, `bar`, `printNumbers()`).
- **Verified Output & Pitfalls**: State exact expected output and explicitly call out common student mistakes (off-by-one, scope, null pointers).
- **Cumulative Integration**: Conclude programming units with a complete, functioning program synthesizing all covered constructs.
- **Non-Programming**: Strictly zero code snippets or pseudo-code on non-programming topics.

### Reusable Slide Anatomy Template
Every generated slide must implement:
1. **Eyebrow Label**: `01 · SECTION NAME` in bold accent color, small-caps, high-contrast top-left.
2. **Title & Divider**: Specific title directly beneath eyebrow with a bold divider rule (at least 2px thick).
3. **Structured Body Zone**: Full column, Main + Sidebar, Card Grid, Table, or Code.
4. **Sidebar (when used)**: Bounded container with solid border labeled `KEY TERMS`.
5. **Footer**: Unit/course name (left) + slide number / total (right).

---

## 3. Avoid AI Writing Specification

Audit, rewrite, and generate content strictly free of machine-generated AI writing patterns ("AI-isms").

### Formatting Rules
- **Em Dashes (`—` and `--`)**: Target: zero. Hard maximum: one per 1,000 words across headings and body prose. Replace with commas, periods, parentheses, or colons. (Exception: markdown bullet lead-in `- **Term** — definition` is allowed as list typography).
- **Bold Overuse**: At most one bold phrase per section, or none. Lead with the key point rather than bolding mid-sentence words.
- **Emoji in Headers**: Strictly prohibited. No emoji in slide titles or documentation headings.
- **Excessive Bullet Lists**: Convert bullet-heavy sections into structured prose paragraphs. Bullets only for genuinely discrete parallel items.
- **Quotes & Typography**: Use clean straight quotes in code, markdown, and plain text. Avoid decorative punctuation.

### Sentence Structure & Tropes to Eliminate
- **"It's not X, it's Y" / Split Negations**: Rewrite as direct positive claims. Do not stack negations or append trailing negation fragments.
- **Hollow Intensifiers**: Cut `genuine`, `genuinely`, `real` (as an intensifier), `truly`, `quite frankly`, `to be honest`, `let's be clear`, `it's worth noting that`. State the fact directly.
- **Vague Endorsement**: Cut `worth reading`, `worth exploring`, `worth checking out`, `worth your time`. State the concrete reason why something matters.
- **Hedging & Hedge-Stacking**: Cut `perhaps`, `could potentially`, `may eventually`, `might ultimately`. Make the point directly.
- **Compulsive Rule of Three**: Avoid forced triads ("adjective, adjective, and adjective"). Use two, four, or full sentences.
- **Copula Avoidance**: Use plain `is` or `has`. Avoid inflated replacements (`serves as`, `features`, `boasts`, `presents`, `represents`).
- **Subjectless Fragments**: Avoid clipped agentless fragments in flowing prose; name the actor when it clarifies.
- **Significance Inflation**: Cut phrases like `marking a pivotal moment`, `watershed moment`, `revolutionizing the landscape`. State the event plainly.
- **Aphorism Formulas**: Cut slot-fill profundities (`X is the language of Y`, `X is the currency of Z`, `X is not a tool but a mirror`). Replace with concrete claims.
- **Generic Future Closers**: Cut `only time will tell`, `the future looks bright`, `poised to become the defining trend`.
- **Chatbot & "Let's" Artifacts**: Cut `Let's dive in`, `Let's explore`, `In this section we will explore`, `I hope this helps`, `Certainly!`.
- **Rhetorical Questions**: Cut transition rhetorical questions (`So why does this matter?`, `What's next?`).
- **Vague Attributions & Name-Dropping**: Cut `experts believe`, `studies show`, `analysts agree` without named checkable citations. Avoid historical analogy stacking.

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
| game-changer / game-changing | state the exact technical change |
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
2. **Be Concrete**: Ground claims in exact numbers, names, data types, protocols, and mechanisms.
3. **Instructional Tone**: Sound like an experienced professor in a lecture hall: direct, authoritative, and technically precise.
4. **Never Inject Fake Voice**: Do not add fake first-person ("in my experience"), manufactured drama, or staccato fragments to fake human rhythm. Keep technical and educational writing clean, clear, and grounded.

---

## 4. Final Content Cleanup — Remove Meta-Copy and Specification Leakage

### Primary Invariant
**The document must contain ONLY content intended for the actual reader/student/teacher.**

Any instruction, requirement, specification, design directive, generation note, quality claim, implementation detail, or commentary about the document itself must be **strictly removed from all visible content**. All such material is an internal production constraint to be applied silently, never written into the document.

### Mandatory Removals from Visible Output
1. **Meta-Copy & Quality Claims**:
   - Strictly remove labels, badges, callouts, or text claiming:
     - `Projector & Ambient Light Optimized`, `Projector Optimized`, `Classroom Optimized`, `High Contrast`
     - `100% Content Coverage`, `Complete Content Coverage`, `Complete 1-Hour Lecture Notes`, `Teaching Reference`
     - `16pt+ Legible Font Scale`, `≥ 7:1 Optical Contrast`, `Legibility Optimized`, `Readability Optimized`
     - `Student Friendly`, `Teacher Ready`, `Exam Ready`, `University Level`, `Production Ready`, `Professional Grade`
     - `AI-Generated`, `AI-Assisted`, `Generated by AI`, `Designed for...`, `Optimized for...`
     - `Quality Checked`, `Accuracy Verified`, `Standards Compliant`, `Accessibility Compliant`
2. **Authoring Instructions & Repository Commentary**:
   - Strictly remove instructions directed at the author/developer:
     - `Create a new .astro file in...`, `Add new lecture slides to...`, `Ready for new content...`
     - `Lecture Platform`, `Lecture System`, `Course Lecture Repository`, `Astro Slides Engine`
3. **Self-Referential & Procedural Commentary**:
   - Remove text talking about the document structure rather than teaching the subject:
     - `In this section, we will...`, `These notes are designed to...`, `This document ensures...`
     - `The following material is optimized for...`, `The content below has been carefully...`
4. **Numeric Design Specifications**:
   - Never display internal design targets: `16pt+ Font`, `≥ 7:1 Contrast`, `100% Coverage`, `40–60 words per slide`, `Maximum 6 bullets`. Implement the underlying requirement silently through formatting.
5. **Generation Artifacts**:
   - Zero references to prompts, instructions, "the user", AI models, formatting requirements, previous drafts, quality checks, TODOs, placeholders, or authoring commentary.

### Mandatory Pre-Yield Quality Gate
Before reporting completion on ANY task, the agent MUST run:
1. `pnpm run build` $\rightarrow$ must succeed with 0 errors.
2. `pnpm run lint:overflow` $\rightarrow$ must pass with 0 unhandled overflow warnings.
3. Verification scan $\rightarrow$ confirm no meta-copy, no em dashes in prose, and no query-string URLs exist.
