# PathFinder v8 — Claude Context File

React/Vite career guidance app for 16–18 year olds in Germany. Guides users through a RIASEC-based quiz and recommends one of 6 post-secondary paths.

---

## Run

```bash
cd prototype-v8
npm install        # first time only
npm run dev        # http://localhost:5173
npm run build      # production build to dist/
npm run preview    # preview production build
npm run lint       # ESLint
```

Hard-refresh (`Cmd+Shift+R`) after CSS changes. Tailwind 4 uses the Vite plugin — no config file needed.

---

## Tech Stack

| Layer | Library / Version |
|---|---|
| UI framework | React 19.2.5 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4.2.4 (via `@tailwindcss/vite` plugin) |
| State | React Context + useReducer |
| Language | Vanilla JS/JSX — no TypeScript |
| Persistence | localStorage |

No external UI libraries. All components are hand-written.

---

## Project Structure

```
src/
  App.jsx                    ← root: providers + AppShell + FlowProgress
  main.jsx                   ← ReactDOM.createRoot entry
  index.css                  ← Tailwind + all custom CSS (tokens, animations, utilities)
  LanguageContext.jsx        ← DE/EN language provider (useLang hook)

  state/
    appReducer.js            ← SCREENS constants, freshState(), appReducer()
    PathFinderContext.jsx     ← global state provider (usePathFinder hook)

  components/
    ScreenRouter.jsx         ← lazy-loads screens, slide transitions, document.title updates
    Welcome.jsx              ← landing page
    Opener.jsx               ← user mode selector (Lena / Malik / Clear)
    Quiz.jsx                 ← adaptive quiz (round 1 + round 2, shared component)
    Round2Intro.jsx          ← RIASEC bar chart + top type badges
    Savickas.jsx             ← 3 reflection textareas (role model, story, motto)
    Blocks.jsx               ← barrier selector (5 chips + freeform)
    SuccessPicture.jsx       ← vision textarea + loading animation + COMPUTE_RESULTS trigger
    Paths.jsx                ← main results screen (confetti, radar, route cards, swap)
    Qualifications.jsx       ← cert selector + path unlock visualisation
    FieldNarrowing.jsx       ← 6-cluster work style selector
    Comparison.jsx           ← side-by-side path comparison table
    Stories.jsx              ← real testimonials + resource links
    Browse.jsx               ← all-paths browser with search, filter, 3-way compare
    PathMap.jsx              ← journey builder from cert level
    PathBuilder.jsx          ← step-by-step journey with LEADS_TO graph traversal
    ErrorBoundary.jsx        ← full-page error fallback with localStorage reset
    LangToggle.jsx           ← fixed top-right DE/EN toggle

    ui/
      Reveal.jsx             ← scroll-triggered reveal (IntersectionObserver, stagger)
      TiltCard.jsx           ← 3D tilt on hover/touch
      InfiniteGrid.jsx       ← animated grid + mouse-mask + glow blobs (Welcome bg)

  hooks/
    useScrollReveal.js       ← reusable scroll-triggered reveal hook (currently unused)

  utils/
    localize.js              ← l(field, lang) — safe bilingual string extractor

  lib/
    utils.js                 ← cn() — Tailwind class merging utility

  logic/
    matching.js              ← all scoring, RIASEC, path suggestion, filtering

  data/
    paths.js                 ← ALL_PATHS (6), BRIDGE_PATHS ([]), CERT_RANK, CLUSTER_LABELS, loc(), locArr()
    questions.js             ← ROUND1_QUESTIONS (10), ROUND2_QUESTIONS (5)
    stories.js               ← STORIES — real person testimonials
    translations.js          ← translations.de / translations.en — all UI strings
    colors.js                ← pathColor(id) → { text, bg, border }
    journeys.js              ← LEADS_TO graph, PATH_EMOJIS, pathById()
    pathDetails.js           ← extended reference copy per path
```

---

## User Flow (screen order)

```
WELCOME → OPENER → QUIZ_R1 → ROUND2_INTRO → SAVICKAS → QUIZ_R2
→ BLOCKS → SUCCESS_PICTURE → PATHS → QUALIFICATIONS → FIELD_NARROWING
→ COMPARISON → STORIES
```

Side entries from WELCOME (not part of the guided flow):
- `BROWSE` — all-paths browser
- `MAP` — PathMap journey builder
- `PATH_BUILDER` — step-by-step planner

`ScreenRouter` determines forward/back direction from `SCREEN_ORDER` array and applies a 24px slide + opacity transition over 250ms.

`FlowProgress` (in `App.jsx`) renders a fixed 3px top bar covering OPENER → STORIES only. It does not appear on WELCOME, BROWSE, MAP, or PATH_BUILDER.

---

## State

### Screens

```js
// src/state/appReducer.js
export const SCREENS = {
  WELCOME, OPENER, QUIZ_R1, ROUND2_INTRO, SAVICKAS,
  QUIZ_R2, BLOCKS, SUCCESS_PICTURE, PATHS, QUALIFICATIONS,
  FIELD_NARROWING, COMPARISON, STORIES, BROWSE, MAP, PATH_BUILDER
}
```

### State shape (`freshState()`)

```js
{
  screen: 'WELCOME',
  userMode: null,                      // 'lena' | 'malik' | 'clear' | null
  round1Answers: {},                   // { [questionIndex]: string[] }
  round2Answers: {},                   // { [questionIndex]: string[] }
  round1Index: 0,
  round2Index: 0,
  round1Length: 10,
  unsureCount: 0,
  savickasAnswers: { roleModel: '', story: '', motto: '' },
  blocks: [],                          // string[] of selected block IDs
  blocksOther: '',
  successPicture: '',
  riasecCounts: {},                    // { R: n, I: n, A: n, S: n, E: n, C: n }
  lifestyle: {},                       // see extractLifestyle() below
  suggestedPaths: [],                  // Path[] — top 3
  wildcardPaths: [],                   // Path[] — 0-2 alternates
  reasons: {},                         // { [pathId]: { de: string, en: string } }
  quals: {
    cert: null,                        // 'Hauptschulabschluss' | 'Realschulabschluss' | 'Fachhochschulreife' | 'Abitur'
    overallGrade: '',
    langs: [],
    engLevel: '',
    experience: [],
    extras: [],
    isGermanCitizen: null,             // required for Bundeswehr gate
  },
  filterResult: {},                    // { [pathId]: { open: bool, note: { de, en } | null } }
  selectedClusters: [],                // string[] of selected cluster IDs
}
```

### All dispatch actions

```js
dispatch({ type: 'NAVIGATE', screen: SCREENS.X })
dispatch({ type: 'SET_USER_MODE', mode: 'lena' | 'malik' | 'clear' })
dispatch({ type: 'SET_R1_ANSWER', index: 0, selected: ['r1q0_r'] })
dispatch({ type: 'SET_R1_INDEX', index: 2 })
dispatch({ type: 'SET_R2_ANSWER', index: 0, selected: ['r2q0_tech'] })
dispatch({ type: 'SET_R2_INDEX', index: 1 })
dispatch({ type: 'SET_SAVICKAS', answers: { roleModel, story, motto } })
dispatch({ type: 'SET_BLOCKS', blocks: ['money', 'german'], other: 'text' })
dispatch({ type: 'SET_SUCCESS_PICTURE', text: 'I see myself...' })
dispatch({ type: 'COMPUTE_RESULTS' })        // triggered from SuccessPicture
dispatch({ type: 'SWAP_PATH', removeId: 'fsj', addPath: pathObject })
dispatch({ type: 'SET_QUALS', quals: { cert: 'Abitur', ... } })
dispatch({ type: 'SET_CLUSTERS', clusters: ['creative', 'analytical'] })
dispatch({ type: 'RESTART' })                // resets to freshState()
```

### Persistence

- Storage key: `'pathfinder-v5'` (string, even though this is v8 — do not rename, it would break existing sessions)
- State version: `STATE_VERSION = 1` — if `_v` doesn't match, saved state is discarded
- State is saved on every render via `useEffect([state])`
- State is cleared when user is on WELCOME with no userMode (fresh start)
- Merge strategy: `{ ...freshState(), ...savedState }` — new fields added to freshState() are always initialised

---

## Contexts and Hooks

### `usePathFinder()` — from `PathFinderContext.jsx`
Returns `{ state, dispatch }`. Used in every screen component.

### `useLang()` — from `LanguageContext.jsx`
Returns `{ lang, t, toggle }`.
- `lang` — `'de'` | `'en'`
- `t` — `translations[lang]` — full translation object
- `toggle()` — switches between DE and EN, persisted to `localStorage('pathfinder-lang')`
- Default: `'de'`

Usage pattern:
```jsx
const { t, lang } = useLang();
// Use t.quiz.next for translated strings
// Use lang directly when passing to loc() or bilingual data fields
```

---

## Bilingual System

Every user-facing string is bilingual. There are two patterns:

**Pattern 1 — Translation keys (UI strings)**
All static UI copy lives in `src/data/translations.js` as `translations.de` and `translations.en`. Access via `t.<screen>.<key>` from `useLang()`.

Key namespaces: `landing`, `opener`, `quiz`, `round2Intro`, `savickas`, `blocks`, `successPicture`, `paths`, `qualifications`, `fieldNarrowing`, `comparison`, `stories`, `browse`, `map`, `builder`, `common`.

**Pattern 2 — Inline bilingual objects (data)**
Data objects (paths, questions, stories) store strings as `{ de: '...', en: '...' }` objects. Access with:
- `field[lang]` — direct access (use when you have `lang` from `useLang()`)
- `loc(field, lang)` — from `src/data/paths.js` — safe accessor, falls back to `.en`
- `locArr(field, lang)` — for array fields (e.g. `nextSteps`)
- `l(field, lang)` — from `src/utils/localize.js` — same as loc(), used in components

Never hardcode German or English strings in JSX. Always use `t.*` or `field[lang]`.

---

## Matching Logic (`src/logic/matching.js`)

### Step-by-step flow

`COMPUTE_RESULTS` action (triggered by SuccessPicture) runs:
1. `computeRiasec(round1Answers)` → aggregates all selected option types into `{ R, I, A, S, E, C }` counts. Options ending in `_u` (unsure) are excluded.
2. `countUnsure(round1Answers)` → counts `_u` selections. If ≥ 3 and userMode ≠ `'clear'`, overrides userMode to `'lena'`
3. `extractLifestyle(round2Answers)` → parses R2 answers into lifestyle flags
4. `suggestPaths(riasecCounts, lifestyle)` → returns top 3 paths
5. `getWildcards(riasecCounts, suggested, anchor, count)` → returns 0–2 alternates
6. `buildReasons(allPaths, riasecCounts, lifestyle)` → generates personalised reason sentences

### `extractLifestyle()` output shape

```js
{
  anchor: 'tech' | 'auto' | 'secure' | 'impact' | 'create' | 'balance' | null,
  wantsIncomeNow: boolean,   // r2q1_high selected
  studyOpen: boolean,        // r2q3_yes or r2q3_open selected
  prefersStructure: boolean, // r2q2_structured selected
  prefersFlexibility: boolean, // r2q2_flexible selected
  riskAverse: boolean,       // r2q4_secure selected
  explorer: boolean,         // r2q4_explore selected
}
```

### Anchor → path score boosts

```
tech:    ausbildung +2, studium +1, bundeswehr +1
auto:    freelancing +3, gap-year +2
secure:  ausbildung +2, bundeswehr +3
impact:  fsj +3, studium +1
create:  freelancing +3, studium +1, gap-year +1
balance: fsj +2, gap-year +2, freelancing +1
```

### Lifestyle boosts (applied after anchor boosts)

```
prefersStructure → ausbildung +1, bundeswehr +1
prefersFlexibility → freelancing +1, gap-year +1
riskAverse → ausbildung +1, bundeswehr +1
studyOpen === false → studium -2
studyOpen === true → studium +2
explorer → gap-year promoted to index 2 if ranked lower
wantsIncomeNow → used as tiebreaker (high incomeFit wins)
```

### RIASEC type → path fit mapping

```
ausbildung:  R, C, E
studium:     I, A, E, C
fsj:         S, A, R
freelancing: A, E, I
bundeswehr:  R, E, C
gap-year:    A, E, S
```

### Wildcard count by userMode

```
lena → 2 wildcards
null → 1 wildcard
malik / clear → 0 wildcards
```

### `shouldEndRound1()` — early exit logic

Called after each R1 answer starting from index 3. Exits early if the top 2 RIASEC types are identical across the last 3 consecutive answers. This shortens the quiz for users with clear patterns. The user still sees all questions they've answered via the progress bar.

### `filterByQuals()` — qualification gate

```
CERT_RANK = { null: 0, Hauptschulabschluss: 1, Realschulabschluss: 2, Fachhochschulreife: 3, Abitur: 4 }

Path minCert:
  ausbildung → Hauptschulabschluss (rank 1)
  studium    → Fachhochschulreife (rank 3)
  fsj        → null (no cert required)
  freelancing → null
  bundeswehr → Realschulabschluss (rank 2)  + isGermanCitizen === true required
  gap-year   → null

Special notes generated by filterByQuals():
  - freelancing without portfolio → note about client-building time
  - studium with Realschulabschluss → note about needing FHR/Abitur first
  - bundeswehr with isGermanCitizen === false → hard gate (open: false)
```

---

## Path Data Shape

All 6 paths are in `src/data/paths.js` as `ALL_PATHS`. `BRIDGE_PATHS` is currently empty (`[]`).

```js
{
  id: string,                    // 'ausbildung' | 'studium' | 'fsj' | 'freelancing' | 'bundeswehr' | 'gap-year'
  name: string,
  tagline: { de, en },
  meta: { de, en },              // short descriptor line shown in cards
  description: { de, en },
  difficulty: 'easy' | 'medium' | 'hard',
  timeToStart: { de, en },
  riasecFit: string[],           // RIASEC type letters that score for this path
  incomeFit: 'high' | 'variable' | 'low',
  typical_day: { de, en },
  income_now: { de, en },        // income string (Bundeswehr figure marked UNVERIFIED)
  careerExamples: { de, en },
  freedom: { de, en },
  flexibility: { de, en },
  outlook: { de, en },
  minCert: string | null,        // minimum cert required (used in CERT_RANK lookup)
  clusters: string[],            // subset of CLUSTER_LABELS keys
  stories: string[],             // story IDs from stories.js
  nextSteps: { de: string[], en: string[] },   // 4 concrete action steps
  human_story: {
    name: string,
    quote: { de, en },
    detail: { de, en },
  },
  branches?: [{ id, name, desc, meta }],  // studium only — uni / fh / dual
}
```

### Path IDs

| ID | Name | RIASEC | minCert | incomeFit |
|---|---|---|---|---|
| `ausbildung` | Ausbildung | R, C, E | Hauptschulabschluss | high |
| `studium` | Studium | I, A, E, C | Fachhochschulreife | low |
| `fsj` | FSJ / BFD | S, A, R | null | low |
| `freelancing` | Freelancing | A, E, I | null | variable |
| `bundeswehr` | Bundeswehr | R, E, C | Realschulabschluss | high |
| `gap-year` | Gap Year | A, E, S | null | variable |

---

## Quiz Data Shape

### Round 1 (RIASEC interests) — `ROUND1_QUESTIONS`

10 questions, single-select (all have `multi: false`). Each question has:
```js
{
  id: string,
  word: { de, en },        // category label (shown as pill badge)
  text: { de, en },        // main question text
  hint: { de, en },        // sub-label below question
  why: { de, en },         // "why do we ask" explanation — shown via toggle
  vague?: true,            // if true: showWhy starts expanded; box uses tinted bg style
  multi: false,
  options: [
    { id: string, text: { de, en }, type: 'R'|'I'|'A'|'S'|'E'|'C'|'unsure' }
  ]
}
```

Each question has 6 RIASEC options + 1 unsure option (id ends in `_u`, type `'unsure'`).
Questions with `vague: true`: indices 2, 7, 8 (0-indexed).
Early-exit check starts at index 3 (after 3 answers).

### Round 2 (lifestyle + anchor) — `ROUND2_QUESTIONS`

5 questions, always shown in full. Q0 is single-select, Q1–Q4 are single-select.

| Index | Purpose | Option IDs |
|---|---|---|
| Q0 | Anchor (Schein career value) | `r2q0_tech`, `r2q0_auto`, `r2q0_secure`, `r2q0_impact`, `r2q0_create`, `r2q0_balance` |
| Q1 | Income urgency | `r2q1_high`, `r2q1_later`, `r2q1_no` |
| Q2 | Structure preference | `r2q2_structured`, `r2q2_flexible`, `r2q2_mixed` |
| Q3 | Study openness | `r2q3_yes`, `r2q3_open`, `r2q3_no` |
| Q4 | Risk tolerance | `r2q4_secure`, `r2q4_explore`, `r2q4_balanced` |

---

## Component Map

### Quiz.jsx

Used for both rounds via `<Quiz round={1} />` and `<Quiz round={2} />`.

- Keyboard shortcuts: keys 1–N select options; Enter advances when selection is made
- `showWhy` state: starts `true` for `vague` questions, `false` for all others (reset on question change via `useEffect([currentIndex, round])`)
- `selectOption` and `goNext` are `useCallback` memoised; keydown listener is registered via `useEffect([handleKeyDown])` with proper cleanup
- Early exit logic in `goNext()`: round 1 only, after index ≥ 3, calls `shouldEndRound1()`
- Encouragement text shown after questions at indices 2, 5, 8 (`ENCOURAGE_AFTER = [2, 5, 8]`)
- Mobile: sticky CTA button at bottom with gradient fade; spacer div `h-20` prevents content overlap
- Desktop: full sidebar with progress bar and keyboard hint

### Paths.jsx

The most complex component. Key internals:
- Confetti animation on mount (canvas, RAF-based) — RAF cancelled and canvas cleared on unmount
- `dismissedPaths` Set (tracks which paths user dismissed from main routes) — reset via `useEffect([state.suggestedPaths])`
- Compass panel: RIASEC radar + lifestyle summary — collapsible on mobile via `compassOpen` state; desktop always visible via `hidden lg:block` / `lg:hidden` dual render
- Swap mechanic: wildcard path replaces a main route via `SWAP_PATH` dispatch
- Route panels: expandable details per path (typical day, income, careers, human story, milestones)
- Share button: calls `navigator.clipboard.writeText()` with success/error toast feedback

### ScreenRouter.jsx

- All screens are `React.lazy()` — loaded on first render of that screen
- `SCREEN_ORDER` array determines forward/back direction for transitions
- Transition: 250ms exit (opacity 0 + translateX) → swap rendered screen → 2x rAF enter → visible
- `document.title` updated via `useEffect([state.screen, lang])`
- Loading fallback: 3-dot pulse (generic — not route-specific)

### App.jsx

Provider nesting order (outermost first):
```
ErrorBoundary → LanguageProvider → PathFinderProvider → AppShell
```

`FlowProgress` renders the global 3px progress bar for OPENER → STORIES only (not WELCOME, BROWSE, MAP, PATH_BUILDER).

### Reveal.jsx

Scroll-triggered animation using a shared `IntersectionObserver`. Props:
```jsx
<Reveal variant="up" | "blur" | "left" | "right" delay={0}>
  {children}
</Reveal>
```
Default variant: `"up"`. Default delay: `0ms`. Respects `prefers-reduced-motion`.

### TiltCard.jsx

3D perspective tilt on mouse/touch movement. Uses inline `transform: perspective(800px) rotateX() rotateY()`. Respects `prefers-reduced-motion` (disabled if motion reduced).

---

## CSS Architecture (`src/index.css`)

Tailwind 4 with `@import "tailwindcss"`. Custom theme via `@theme` block.

### CSS custom properties (design tokens)

```css
/* Brand colors */
--color-pf-primary: #1B5E4F     /* main green, buttons, accents */
--color-pf-dark: #134439        /* dark variant for gradients */
--color-pf-mid: #8CB8AC         /* mid-tone for text on dark bg (WCAG AA: ~5.5:1 on pf-dark) */
--color-pf-light: #E8F5F1       /* light tint for backgrounds */
--color-pf-text: #0D3328        /* body text on light bg */
--color-warm-50: #FAFAF9        /* off-white page background */

/* Stagger tokens */
--stagger-sm: 80ms
--stagger-md: 120ms
```

### Key utility classes

```css
.btn-primary      /* primary CTA button — used on main nav actions */
.btn-secondary    /* secondary button — padding: 0.5rem 1.25rem, font-size: 0.9rem, radius: 8px */
.btn-tertiary     /* tertiary/small button — padding: 0.4rem 1rem, font-size: 0.85rem, radius: 6px */
.option-card      /* quiz answer card — base style */
.option-card.selected  /* selected state */
.progress-bar-fill     /* quiz progress bar with transition */
.tilt-card        /* 3D card wrapper */
.animate-reveal-up / -blur / -left / -right   /* Reveal animation keyframes */
.safe-bottom      /* padding-bottom for iOS safe area */
```

### Print styles

`@media print` styles exist for PDF export from Paths screen — partial implementation.

---

## Cluster Labels

Used by `FieldNarrowing.jsx` and path filtering in `Browse.jsx`:

```js
CLUSTER_LABELS = {
  'hands-on':   { de: 'Handwerk & Technik', en: 'Hands-on & technical' },
  'people':     { de: 'Menschen & Soziales', en: 'People & care' },
  'creative':   { de: 'Kreativ & Digital', en: 'Creative & digital' },
  'analytical': { de: 'Analytisch & Daten', en: 'Analytical & data' },
  'nature':     { de: 'Natur & Umwelt', en: 'Nature & environment' },
  'business':   { de: 'Wirtschaft & Organisation', en: 'Business & organisation' },
}
```

---

## Journey Graph (`src/data/journeys.js`)

`LEADS_TO` defines valid path transitions (used by PathMap and PathBuilder):

```js
LEADS_TO = {
  ausbildung:  ['studium', 'freelancing', 'bundeswehr', 'gap-year'],
  studium:     ['freelancing', 'gap-year', 'ausbildung', 'bundeswehr'],
  fsj:         ['ausbildung', 'studium', 'freelancing', 'bundeswehr'],
  freelancing: ['ausbildung', 'studium'],
  bundeswehr:  ['ausbildung', 'studium', 'freelancing'],
  'gap-year':  ['ausbildung', 'studium', 'fsj', 'freelancing', 'bundeswehr'],
}
```

`pathById(id)` — looks up a path from `ALL_PATHS_WITH_BRIDGES` by ID.

---

## Known Gaps / Limitations

- `savickasAnswers`, `blocks`, `blocksOther`, and `successPicture` are collected but **do not feed into `matching.js`** — they are shown as acknowledgement text only
- Quiz question order and content is identical for all three `userMode` values — only results framing and wildcard count differ
- `BRIDGE_PATHS` is an empty array — IBA, EQ, FOS paths were removed. `ALL_PATHS_WITH_BRIDGES` therefore equals `ALL_PATHS`
- Bundeswehr income figure in `paths.js` is marked `// UNVERIFIED` — verify before any public release
- `useScrollReveal.js` hook exists in `/hooks/` but is currently unused (Reveal.jsx uses its own observer)
- Loading fallback in ScreenRouter is generic (3-dot pulse) — no per-route skeleton
- Print/PDF styles are partially implemented

---

## Sync & Git

The standalone React project lives at:
```
/Users/adrianroth/Documents/CODE/OS Semester/PathFinder/code/prototype-v8/
```

It is also mirrored inside the all-prototypes monorepo at:
```
/Users/adrianroth/Documents/CODE/pathfinder/prototype-v8/
```

After any changes, sync with:
```bash
rsync -av --delete \
  --exclude='node_modules' --exclude='.git' --exclude='dist' \
  "/Users/adrianroth/Documents/CODE/OS Semester/PathFinder/code/prototype-v8/" \
  "/Users/adrianroth/Documents/CODE/pathfinder/prototype-v8/"
```

Then commit and push in both repos separately.

Git remote config (inside standalone prototype-v8/):
```
adrianroth08  → https://github.com/adrianroth07/prototype-v8.git  (standalone repo)
origin        → https://github.com/samyasy/pathfinder-merged.git  (Samy's shared repo)
adrianroth    → https://github.com/adrianroth07/prototype-v7.git  (older prototype)
```

Active branch: `v5` (local). Push to standalone GitHub repo: `git push adrianroth08 v5:main`
