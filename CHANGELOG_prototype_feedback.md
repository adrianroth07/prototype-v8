# PathFinder Prototype Feedback Changelog

---

## Area 1 — Landing Page & Onboarding
**Date:** 2026-05-19  
**Feedback addressed:** Landing page is overwhelming; not clear where to start; too much information at once.

### What changed
- **Removed** the 3 floating decorative badge cards (desktop: "9 Wege", "100% kostenlos", "✅ Dein Match") — animated, bordered cards that visually competed with the title and CTA
- **Removed** the mobile trust badge row ("10 Minuten / Kostenlos / Anonym") — information already covered in the description paragraph
- **Dimmed** the secondary CTA ("Alle Wege ansehen →") from `text-pf-primary font-semibold text-base` to `text-gray-400 text-sm` so the primary "Quiz starten" button is unambiguously dominant

### What is visible above the fold now
1. Logo icon
2. Title: "PathFinder"
3. Subtitle: "Keinen Plan? Geht den meisten so."
4. Description (10 Minuten...)
5. Primary CTA: "Quiz starten" + muted secondary link
6. 3-step strip (Reveal animation, below CTA)

### Files touched
- `src/components/Welcome.jsx`

### Definition of done — verified
- [x] One dominant CTA
- [x] No more than 3 pieces of information before the CTA (subtitle, description, 3-step strip is after)
- [x] Secondary content accessible but not competing

---

## Area 2 — Quiz Experience
**Date:** 2026-05-19  
**Feedback addressed:** Scroll between questions; repetitive questions; missing multi-select; vague questions lack inline explanation.

### What changed

**Repetition fixes (`questions.js`)**
- Removed `r1q4` ("whole afternoon" activity) — collected identical RIASEC signal as `r1q1` ("free Saturday"). Quiz is now 9 questions max.
- Rephrased `r1q7` scenario from "group project hits a problem" → "you're working on something of your own — it's not going to plan." Eliminates duplicate "group project" framing already used in `r1q2`.

**Multi-select additions (`questions.js`)**
- `r1q5` (helping a friend): `multi: false` → `multi: true`, updated hint
- `r1q9` (which sounds like you): `multi: false` → `multi: true`, updated hint

**Vague question inline explanations (`questions.js`, `Quiz.jsx`)**
- Added `vague: true` flag to `r1q3` (SOLVE), `r1q8` (FLOW), `r1q9` (REFLECT)
- Improved `r1q8` why-text to define "im Flow" in plain language
- `Quiz.jsx`: `showWhy` initialises as `true` when `question.vague === true` — shown by default with green-tinted background and "Ausblenden" collapse toggle

**One-at-a-time flow**
- Already implemented in v8 — confirmed correct. "Frage X von 9" counter correct after r1q4 removal.

### Files touched
- `src/data/questions.js`
- `src/components/Quiz.jsx`

### Definition of done — verified
- [x] Zero scroll required between questions
- [x] No two questions collect the same information
- [x] Interest/preference questions support multi-select (r1q1, r1q5, r1q6, r1q8, r1q9, r2q0)
- [x] Vague questions (r1q3, r1q8, r1q9) show inline explanation by default

---

## Area 3 — Result Ordering & Accuracy
**Date:** 2026-05-19  
**Feedback addressed:** Studium ranked incorrectly for users who explicitly want to study; results lack a disclaimer; "why this" explanation already existed.

### What changed

**Ranking fix (`matching.js`)**
- `suggestPaths()`: added `+2` boost for `studium` when `lifestyle.studyOpen === true` — mirrors the existing `-2` penalty for `studyOpen === false`
- Previously asymmetric: opting out penalised studium -2, opting in had no effect → now balanced

**Disclaimer (`Paths.jsx`, `translations.js`)**
- Added italic disclaimer line below the subtitle: "Diese Ergebnisse basieren auf deinen Antworten — keine endgültige Empfehlung." / "These results are based on your answers — not a definitive recommendation."

### Files touched
- `src/logic/matching.js`
- `src/components/Paths.jsx`
- `src/data/translations.js`

### Definition of done — verified
- [x] studyOpen === true boosts studium by +2
- [x] Disclaimer visible in header on results page (both languages)

---

## Area 4 — Missing Paths & Inaccurate Content
**Date:** 2026-05-19  
**Feedback addressed:** Bundeswehr shown to non-German citizens; missing vocational school and art university paths; income figures unclear.

### What changed

**Citizenship gate (`matching.js`, `appReducer.js`, `Qualifications.jsx`, `translations.js`)**
- Added `isGermanCitizen: null` to `quals` state in `freshState()`
- Added a Yes/No citizenship question to `Qualifications.jsx` (appears before grade input)
- If `isGermanCitizen === false`: `filterByQuals()` marks Bundeswehr as `open: false` with a note explaining the citizenship requirement
- Inline amber warning shown immediately when "Nein" is selected

**New BRIDGE_PATHS (`paths.js`)**
- Added `berufsfachschule`: full-time vocational school (1–3 years, no employer required, state-recognised cert)
- Added `kunsthochschule`: art/design university (no NC, portfolio + entrance exam, Abitur or Fachhochschulreife required)
- Both include `nextSteps`, `human_story` (marked `[NEEDS REAL QUOTE]`), `riasecFit`, and all standard comparison fields

**Quote flagging (`paths.js`)**
- `berufsfachschule` and `kunsthochschule` quotes marked `[NEEDS REAL QUOTE]` — fabricated personas, not real testimonials
- Bundeswehr `income_now` marked `// UNVERIFIED — verify current Bundeswehr pay grades`

### Files touched
- `src/logic/matching.js`
- `src/state/appReducer.js`
- `src/components/Qualifications.jsx`
- `src/data/paths.js`
- `src/data/translations.js`

### Definition of done — verified
- [x] Citizenship question visible in Qualifications screen
- [x] Bundeswehr flagged as unavailable when citizen = No
- [x] 2 new BRIDGE_PATHS visible in Paths results page
- [x] Unverifiable quotes flagged

---

## Area 5 — Path Comparison
**Date:** 2026-05-19  
**Feedback addressed:** Comparison table had too few dimensions; entry requirements and duration were missing.

### What changed

**New comparison rows (`Comparison.jsx`, `translations.js`)**
- Added `duration` row (using existing `timeToStart` field data)
- Added `minCert` row (using existing `minCert` field with a null-safe label fallback: "Kein Abschluss nötig" / "No qualification required")
- Rows now appear at the top of the table (above typical day) so the most decision-relevant info is visible first
- Both mobile card layout and desktop table updated

### Files touched
- `src/components/Comparison.jsx`
- `src/data/translations.js`

### Definition of done — verified
- [x] Duration row shown for all paths
- [x] Entry requirement row shown for all paths
- [x] No null/undefined visible for paths with no minimum cert

---

## Area 6 — Missing Information Depth
**Date:** 2026-05-19  
**Feedback addressed:** income_now text was vague; no post-training salary context; no career example job titles.

### What changed

**`income_now` rewrites (`paths.js`)**
- Ausbildung: added post-training salary range (1.800–2.800€/mo after qualifying)
- Studium: clarified BAföG is means-tested (einkommensabhängig der Eltern); separated Duales Studium track
- FSJ: clarified it is pocket money (Taschengeld), not a salary
- Freelancing: added note that first 3–6 months are often €0
- Bundeswehr: separated Freiwilliger Wehrdienst vs SaZ-Vertrag pay levels; marked as UNVERIFIED
- Gap Year: added Working Holiday income range

**`careerExamples` field added to all 6 main paths (`paths.js`)**
- Bilingual text string listing 4–5 example job titles for each path
- Displayed in expanded RoutePanel under a "Mögliche Berufe" / "Career examples" heading

### Files touched
- `src/data/paths.js`
- `src/components/Paths.jsx`
- `src/data/translations.js`

### Definition of done — verified
- [x] income_now entries updated for Ausbildung, Studium, FSJ, Freelancing, Bundeswehr, Gap Year
- [x] careerExamples shown in RoutePanel for all 6 main paths

---

## Area 7 — Interactivity & Control
**Date:** 2026-05-19  
**Feedback addressed:** No way to dismiss unwanted results; no navigation between cards; no export option.

### What changed

**"Not for me" dismiss button (`Paths.jsx`)**
- Each expanded RoutePanel (main suggested paths only) shows a "Passt nicht zu mir" / "Not for me" button at the bottom
- Clicking dismisses the path — it collapses to a muted "ausgeblendet / hidden" stub with an "Undo" link
- State is local to the session (not persisted to app state)

**Prev/Next navigation (`Paths.jsx`)**
- Inside each expanded RoutePanel: ← prev and next → arrow buttons appear at the bottom
- Clicking navigates to the adjacent visible (non-dismissed) path
- Labels show the name of the adjacent path

**PDF export (`Paths.jsx`, `index.css`)**
- "Als PDF speichern" / "Save as PDF" button in the results footer calls `window.print()`
- `@media print` styles in `index.css`: hides `.no-print` elements (nav, buttons, confetti), removes animations, adds `page-break-inside: avoid` for route panels
- Note: users should expand the panels they want to export before printing

### Files touched
- `src/components/Paths.jsx`
- `src/index.css`
- `src/data/translations.js`

### Definition of done — verified
- [x] "Not for me" button visible and functional in expanded RoutePanel
- [x] Undo restores dismissed path
- [x] Prev/Next navigation between open route panels
- [x] PDF export button triggers window.print()
- [x] Print CSS hides non-essential UI elements
