# PathFinder — Path Availability Audit

Audit date: 2026-05-07
Sources: Bundesagentur für Arbeit, bundeswehr.de, bundesfreiwilligendienst.de, IHK, Berlin Senatsverwaltung

## Path Availability by Exit Level

| Path | Min Age | Min Qualification | BBR (9. Kl, 15-16) | MSA (10. Kl, 16-17) | Abitur (18-19) |
|---|---|---|---|---|---|
| **Ausbildung** | None | None (BBiG) | YES | YES | YES |
| **Studium** | None | Fachhochschulreife+ | NO | NO | YES |
| **FSJ / BFD** | 15 (FSJ), 16 (BFD) | Vollzeitschulpflicht (10 yrs) | NO | YES | YES |
| **Freelancing** | 18 | None (but Geschäftsfähigkeit) | NO | NO | YES |
| **Bundeswehr** | 17 | Vollzeitschulpflicht | NO | YES (17+, parental consent) | YES |
| **Gap Year / W&T** | 18 | None (but WHV/Au-pair rules) | NO | NO | YES |

## Detailed Notes

### Ausbildung
- No legal minimum age or qualification in BBiG (Berufsbildungsgesetz)
- Minors (15-17) protected by Jugendarbeitsschutzgesetz (max 8h/day, 40h/week)
- Practical reality: most employers expect at least BBR, better options with MSA
- Berlin's 11. Pflichtschuljahr (since 2024/25): starting an Ausbildung fulfills this requirement
- Available sectors with BBR: Handwerk, Gastronomie, Handel, Bauwesen

### Studium
- Requires: Allgemeine Hochschulreife (Abitur), Fachhochschulreife, or fachgebundene Hochschulreife
- Without these: access via Berufsausbildung + Berufserfahrung, or Meister/Techniker/Fachwirt
- Berlin special rule: Ausbildungsabschluss alone grants fachgebundenen Hochschulzugang (more generous than most Länder)
- Three formats: Universität (Abitur), Fachhochschule (Fachhochschulreife+), Duales Studium (via companies)

### FSJ / BFD
- FSJ: age 15-26, must have completed Vollzeitschulpflicht
- BFD: no age ceiling, must have completed Vollzeitschulpflicht
- Berlin Vollzeitschulpflicht = 10 school years
- A BBR student leaving after 9. Klasse has only 9 years → NOT eligible
- MSA student (10. Klasse) has 10 years → eligible
- FSJ/BFD counts as valid Anschluss for 11. Pflichtschuljahr

### Freelancing
- Full Geschäftsfähigkeit at age 18
- Minors (7-17) CAN register Gewerbe but need: parental consent + Familiengericht approval (§112 BGB)
- Process takes 1-6 months, extremely rare in practice
- Freiberufler (designer, tutor): same BGB §112 logic for contracts
- Realistic earliest age: 18 (Abitur level)

### Bundeswehr
- Minimum age: 17 with parental consent, 18 without
- Since 2026: new Wehrdienst model — men born from 2008 must complete Fragebogen + Musterung after 18
- Entry types: Freiwilliger Wehrdienst (6-11 months), Soldat auf Zeit (12+ months), Offizierslaufbahn
- A 15-16 year old (BBR level) cannot join regardless of qualification
- A 17 year old (MSA level) can join with parental consent

### Gap Year / Travel
- Working Holiday Visa: minimum age 18 in ALL partner countries
- Au-pair programmes: minimum age 18
- No WHV or Au-pair available for minors
- Organized youth exchanges (Schüleraustausch) exist for minors but are not a "gap year"

## Path Transitions (LEADS_TO)

```
ausbildung  → [studium, freelancing, bundeswehr, gap-year]
studium     → [freelancing, gap-year, ausbildung, bundeswehr]
fsj         → [ausbildung, studium, freelancing, bundeswehr]
freelancing → [ausbildung, studium]
bundeswehr  → [ausbildung, studium, freelancing]
gap-year    → [ausbildung, studium, fsj, freelancing, bundeswehr]
```

### Transition Justifications

| From → To | Justification |
|---|---|
| Ausbildung → Studium | Via Meister, or Berlin's Hochschulzugang für beruflich Qualifizierte |
| Ausbildung → Freelancing | Use gained skills, now 18+ |
| Ausbildung → Bundeswehr | Bundeswehr recruits Fachkräfte |
| Ausbildung → Gap Year | Common to travel before career entry |
| Studium → Freelancing | Very common for graduates |
| Studium → Gap Year | Common post-Bachelor |
| Studium → Ausbildung | Career changers (Quereinsteiger) |
| Studium → Bundeswehr | Offizierslaufbahn recruits graduates |
| FSJ → Ausbildung | Most common next step after orientation year |
| FSJ → Studium | Common if student holds Abitur |
| FSJ → Freelancing | Possible, now 18+ after FSJ |
| FSJ → Bundeswehr | Possible |
| Freelancing → Ausbildung | Want formal qualification |
| Freelancing → Studium | Want deeper education |
| Bundeswehr → Ausbildung | Very common after Freiwilliger Wehrdienst |
| Bundeswehr → Studium | Bundeswehr can fund it (BFD) |
| Bundeswehr → Freelancing | Use skills gained in service |
| Gap Year → all 5 | Gap year is low-commitment, opens all doors |

### Rejected Transitions

| Transition | Why rejected |
|---|---|
| Freelancing → Bundeswehr | Extremely uncommon for target audience |
| Freelancing → FSJ | Unusual to go from self-employment to volunteer service |
| Freelancing → Gap Year | Already self-directed, gap year redundant |
| Bundeswehr → FSJ | Unusual after military service |
| Bundeswehr → Gap Year | Uncommon, service already provides structure |
| Ausbildung → FSJ | Unusual after 2-3 years of training (age limit 27 for FSJ still allows it, but rare) |

## Berlin-Specific Context

- **Jugendberufsagentur (JBA) Neukölln**: Sonnenallee 282 — central hub combining Agentur für Arbeit, Jobcenter, Jugendhilfe, berufliche Schulen
- **36 OSZ in Berlin**: offer all Abschlüsse + Ausbildung + IBA
- **11. Pflichtschuljahr** (since 2024/25): students without Ausbildung or Anschluss after 10 years must continue
- **Statistics (2023/24)**: 42.6% Abitur, 34.9% MSA, ~45% BBR/eBBR at ISS, 6.9% without any Abschluss
- **Neukölln**: disproportionately high rates of students without Abschluss due to socioeconomic factors
