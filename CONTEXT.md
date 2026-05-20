# PathFinder — Project Context

## What is PathFinder?

PathFinder is a free, anonymous web tool that helps young people in Germany figure out what to do after school. It is aimed at 16–18 year olds — particularly students in Berlin — who are leaving school without a clear plan and need practical guidance on their next step.

The core idea: a 10-minute quiz that asks honest questions about how you think, work, and what matters to you, then recommends 3 post-secondary paths that actually fit your situation. Not a personality test. Not career advice. Just a direct, jargon-free tool that helps someone who has no idea where to start.

**Tagline:** *"Keinen Plan? Geht den meisten so."* — "No plan? Same for most people."

---

## The Problem It Solves

Students leaving school in Germany face a large number of post-secondary options — Ausbildung, university, gap year, volunteer service, military, freelancing — but very little structured support for deciding between them. School counselling is inconsistent. Parents often push toward university regardless of fit. Most online tools are either too vague ("take this personality quiz!") or too detailed to be useful.

PathFinder sits between these two extremes: it is short enough to complete in one sitting, specific enough to give a real recommendation, and honest enough to explain *why* each path is or isn't a fit for that person.

---

## Target Audience

**Primary:** Students aged 16–18 at Integrated Secondary Schools (ISS) and comprehensive schools in Berlin, particularly in Neukölln. Many are first-generation students without family experience of Ausbildung or higher education. A significant share have a migration background.

**Secondary:** Anyone in Germany (16–25) who is uncertain about their post-school direction.

**Context:** In Neukölln, a large share of students leave school without any Abschluss or clear next step. The 11. Pflichtschuljahr (Berlin, since 2024/25) means students without an Ausbildung or follow-up programme after 10 years of school must continue — this creates a specific population that needs guidance.

---

## The Six Paths

PathFinder covers six post-secondary paths. These were chosen because they represent the realistic, accessible options for the target age group in Germany — not aspirational or niche paths.

| Path | German Name | In a sentence |
|---|---|---|
| **Ausbildung** | Duale Berufsausbildung | Paid vocational training split between workplace and Berufsschule. 2–3.5 years. 300+ professions. Requires at minimum a Hauptschulabschluss in practice. |
| **Studium** | Hochschulstudium | Academic study at a Uni, FH, or Duales Studium. 3–5 years. Three formats with different entry requirements and financial models. Requires Fachhochschulreife or Abitur. |
| **FSJ / BFD** | Freiwilliges Soziales Jahr | A 6–18 month volunteer placement in a social, environmental, or cultural institution. ~350€/month pocket money. No formal qualification required (must have completed 10 school years). |
| **Freelancing** | Selbstständigkeit | Building a client base with creative, technical, or service work. Fully self-directed. Requires age 18 for formal registration. Income is unpredictable at first. |
| **Bundeswehr** | Militärdienst | Germany's armed forces. Multiple entry points from 7 months to a full career. Paid from day one. Requires Realschulabschluss and German citizenship. Age 17+ with parental consent. |
| **Gap Year** | Auszeit / Reisen | A deliberate break — travel, work abroad, try things. Working Holiday Visas require age 18. No formal structure. Helps with self-knowledge before committing. |

Each path in the app includes: a tagline, income figures, typical day, career examples, freedom/flexibility/outlook ratings, minimum qualification, concrete next steps (4 action items), and a real person's story.

---

## How the Quiz Works

### Round 1 — RIASEC interests (up to 10 questions)

Based on Holland's RIASEC model (Realistic, Investigative, Artistic, Social, Enterprising, Conventional). Each question presents a scenario or activity and asks the user to pick the option that fits them best. Each option maps to one of the 6 RIASEC types.

The quiz is adaptive: if the top 2 RIASEC types are consistent across 3 consecutive answers, the quiz ends early. Users who are uncertain can pick "Nicht sicher" (unsure) — if they do this 3 or more times, the app treats them as an exploratory user ("Lena mode") and shows more alternative path suggestions.

Three questions are flagged as "vague" — abstract scenarios like "being in the zone" — and automatically show an explanation of what the question means.

### Checkpoint (Round2Intro)

After Round 1, users see a visual breakdown of their RIASEC profile: a bar chart of their top types with plain-language descriptions of what each means.

### Reflection (Savickas)

Three optional open text fields asking who the user looks up to, what their favourite book/film/game is, and whether they have a personal motto. Inspired by Mark Savickas's career construction theory. The answers are acknowledged but do not currently feed into the matching algorithm.

### Round 2 — Lifestyle & values (5 questions)

Five questions that go beyond interests:
1. **Anchor** — what matters most right now? (earning money, independence, stability, making an impact, building something, work-life balance)
2. **Income** — do you need money now?
3. **Structure** — do you prefer structure or flexibility?
4. **Study openness** — are you open to more school?
5. **Risk tolerance** — do you prefer a safe path or are you willing to explore?

### Barriers (Blocks)

Users select any barriers that apply to them from 5 preset options plus a free-text field. Not used in scoring — shown in the results as acknowledgement.

### Vision (SuccessPicture)

A single open text field: "Picture yourself in a few years — what does your life look like?" Triggers the results computation when submitted.

### Results (Paths)

Three recommended paths ranked by score, plus 0–2 wildcard alternatives. Each path shows a personalised reason sentence, expandable detail panels, income data, a real person's story, and concrete next steps.

---

## The Matching Algorithm

1. **RIASEC score** — count how many times the user picked options mapped to each letter (R/I/A/S/E/C). Unsure answers are excluded.
2. **Anchor boost** — the Round 2 anchor answer adds numeric boosts to specific paths before ranking.
3. **Lifestyle nudges** — structure preference, risk aversion, income urgency, and study openness apply further adjustments.
4. **Top 3** — the 3 highest-scoring paths become the main recommendations.
5. **Wildcards** — the next 1–2 ranked paths (not in the top 3) are shown as alternatives.
6. **Reasons** — personalised sentences are generated for each recommended path, naming the user's top RIASEC type and anchor value.

The algorithm is transparent by design — the "why this path" sentence always explains the logic in plain language.

### Anchor → path boosts

| Anchor | Paths boosted |
|---|---|
| Tech (be really good at something) | Ausbildung +2, Studium +1, Bundeswehr +1 |
| Auto (work on your own terms) | Freelancing +3, Gap Year +2 |
| Secure (stable, reliable path) | Ausbildung +2, Bundeswehr +3 |
| Impact (make a difference) | FSJ +3, Studium +1 |
| Create (build something of your own) | Freelancing +3, Studium +1, Gap Year +1 |
| Balance (work fits around life) | FSJ +2, Gap Year +2, Freelancing +1 |

---

## User Modes

The app adapts slightly based on how certain the user is:

| Mode | Triggered by | Effect |
|---|---|---|
| **Lena** | "I have no idea" on Opener, or ≥3 unsure answers | 2 wildcard alternatives shown |
| **Malik** | "I have a rough idea" | 0 wildcard alternatives |
| **Clear** | "I know what I want" | 0 wildcard alternatives |
| **null** | Not selected | 1 wildcard alternative |

If a user starts as Malik or Clear but answers "unsure" 3+ times in Round 1, the app overrides their mode to Lena — more alternatives are more useful for genuinely uncertain users.

---

## Qualification Gating

The Qualifications screen collects the user's highest school certificate. Paths are marked as open or restricted based on their minimum requirement:

- **No cert required:** FSJ, Freelancing, Gap Year
- **Hauptschulabschluss:** Ausbildung
- **Realschulabschluss + German citizenship:** Bundeswehr
- **Fachhochschulreife:** Studium (Uni requires Abitur; FH accepts FHR; Duales Studium applied for via companies)

Bundeswehr has a hard citizenship gate — if the user selects "not a German citizen", Bundeswehr is marked unavailable with an explanation.

---

## Explore Tools (Side Entries)

Beyond the main quiz flow, PathFinder includes two exploratory tools accessible from the landing page:

**Path Map** — shows all paths filtered by your current school certificate. Includes recommended journey templates and a journey builder that uses the `LEADS_TO` graph (which paths logically lead to which others).

**Path Builder** — a step-by-step planner for building a multi-step journey (e.g. FSJ → Ausbildung → Freelancing), with qualification gating to show which steps are reachable.

---

## Design Philosophy

- **10 minutes, not 60.** Long career assessment tools lose users. PathFinder is short by design.
- **Honest, not reassuring.** The app does not tell everyone they can be anything. It says clearly what each path requires and what it costs.
- **Next step, not life plan.** The framing throughout is "find your next step" — not a permanent decision, just the one in front of you.
- **Real stories, not statistics.** Each path features a real person (name, age, quote, short backstory) rather than career statistics.
- **Anonymous and free.** No login, no email, no tracking. Results saved locally in the browser only.
- **German-first.** The app defaults to German. An English toggle exists for users who are more comfortable in English (or for demos).

---

## Prototype History

PathFinder has gone through 8 prototype iterations:

| Version | Description |
|---|---|
| v1 | Adrian's own vanilla JS prototype — initial concept, basic quiz |
| v2 | Samy's version — alternative UI approach |
| v3 | Merged repo — motion system, refined colour palette, path comparison |
| v4 | Path Atlas redesign — compass panel, RIASEC radar, route timeline |
| v5 | React/Vite rebuild of v4 — bilingual support, audit fixes, bridge paths removed |
| v6 | Adrian's local iteration on v5 |
| v7 | Samy's branch — merged Adrian's data (paths, questions, stories) into his UI shell |
| **v8** | Current version — multi-select questions, lifestyle scoring, Studium subtypes, welcome redesign, 7 feedback areas addressed |

---

## Berlin Context

PathFinder was built with Berlin's school system specifically in mind:

- **Jugendberufsagentur (JBA) Neukölln** (Sonnenallee 282, 12057 Berlin) is referenced throughout as a free, walk-in career advice centre — it is the primary real-world next step for users in the area.
- **11. Pflichtschuljahr** (Berlin, since 2024/25): students without Ausbildung or an approved follow-up programme must continue school after 10 years.
- **Typical school exit levels in the target area:** BBR (after 9th grade), MSA (after 10th grade, most common), Abitur (12th/13th grade).
- **Neukölln statistics (2023/24):** 42.6% Abitur, 34.9% MSA, ~45% BBR/eBBR at ISS, 6.9% without any qualification.

The path availability table is audited against these levels — for example, FSJ requires 10 completed school years (MSA level), so BBR graduates are not eligible.

---

## Known Content Gaps

- **Bundeswehr income figures** — marked `UNVERIFIED` in the data. Verify against current Bundeswehr pay grades before any public release.
- **Savickas answers** — collected but not used in the matching algorithm. Future versions could use these to further personalise path reasons or the comparison screen.
- **Blocks** — barriers are acknowledged but do not affect recommendations. Could be used to filter out structurally unavailable paths.

---

## Made by

Students at CODE University Berlin as part of the OS Semester.
