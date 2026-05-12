export const BRIDGE_PATHS = [
  {
    id: 'iba',
    name: 'IBA',
    tagline: { de: 'Berufsausbildungsvorbereitung', en: 'Pre-vocational preparation' },
    meta: { de: '1 Jahr · am OSZ · Abschluss verbessern', en: '1 year · at OSZ · upgrade your certificate' },
    description: {
      de: 'Integrierte Berufsausbildungsvorbereitung — ein einjähriges Programm am OSZ (Oberstufenzentrum) mit Schule und Praktikum. Du kannst deinen Abschluss verbessern (BBR zu eBBR oder MSA). Erfüllt das 11. Pflichtschuljahr. Anmeldung bis Ende Mai.',
      en: 'Integrierte Berufsausbildungsvorbereitung — a one-year programme at an OSZ (Oberstufenzentrum) combining school and internships. You can upgrade your certificate (BBR to eBBR or MSA). Fulfills the 11. Pflichtschuljahr. Registration deadline: end of May.',
    },
    difficulty: 'easy',
    timeToStart: { de: 'Ab August (Anmeldung bis Mai)', en: 'From August (registration by May)' },
    riasecFit: ['R', 'S', 'C'],
    incomeFit: 'low',
    typical_day: { de: 'Unterricht am OSZ + Praktikumstage im Betrieb', en: 'Classes at OSZ + Praktikum days at a company' },
    income_now: { de: 'Keins (Kindergeld läuft weiter)', en: 'None (but Kindergeld continues)' },
    freedom: { de: 'Gering — fester Stundenplan', en: 'Low — structured school schedule' },
    flexibility: { de: 'Schwerpunkt kann im Jahr gewechselt werden', en: 'Can switch focus area within the year' },
    outlook: { de: 'Ausbildung, Weiterbildung oder EQ', en: 'Ausbildung, further schooling, or EQ' },
    minCert: null,
    clusters: ['hands-on', 'people', 'business'],
    stories: [],
    nextSteps: {
      de: [
        'Geh zur JBA Neukölln (Sonnenallee 282, 12057 Berlin) — die helfen dir bei der Anmeldung',
        'Melde dich vor Ende Mai beim OSZ an — z.B. OSZ IMT (Haarlemer Str. 23-27, 12359 Berlin)',
        'Finde dein nächstes OSZ auf berlin.de/sen/bildung/schule/oberstufenzentren',
      ],
      en: [
        'Go to JBA Neukölln (Sonnenallee 282, 12057 Berlin) — they help with registration',
        'Register at an OSZ before end of May — e.g. OSZ IMT (Haarlemer Str. 23-27, 12359 Berlin)',
        'Find your nearest OSZ at berlin.de/sen/bildung/schule/oberstufenzentren',
      ],
    },
    human_story: {
      name: 'Yusuf, 16',
      quote: {
        de: 'Ich hab die Schule mit nem BBR verlassen und wusste nicht weiter. IBA hat mir Zeit gegeben, Sachen auszuprobieren — und am Ende hatte ich meinen MSA.',
        en: 'I left school with just a BBR and didn\'t know what to do. IBA gave me time to try things out — and I got my MSA at the end.',
      },
      detail: {
        de: 'Yusuf hat sein IBA-Jahr an einem OSZ in Neukölln gemacht, mit Praktikumstagen in einer KFZ-Werkstatt. Jetzt hat er einen Ausbildungsvertrag als KFZ-Mechatroniker.',
        en: 'Yusuf did his IBA year at an OSZ in Neukölln, with internship days at a car workshop. He now has an Ausbildung contract as a KFZ-Mechatroniker.',
      },
    },
  },
  {
    id: 'eq',
    name: 'EQ',
    tagline: { de: 'Einstiegsqualifizierung', en: 'Entry qualification' },
    meta: { de: '6–12 Monate · 276 €/Monat · Brücke zur Ausbildung', en: '6–12 months · 276 €/mo · bridge to Ausbildung' },
    description: {
      de: 'Ein gefördertes Langzeitpraktikum (6–12 Monate) in einem echten Betrieb, finanziert von der Arbeitsagentur. Du verdienst 276 €/Monat und sammelst Praxiserfahrung. Über 60 % bekommen danach einen Ausbildungsvertrag. Start: 1. Oktober.',
      en: 'A subsidised long-term internship (6-12 months) at a real company, funded by the Arbeitsagentur. You earn 276€/month and get practical experience. Over 60% of participants get offered an Ausbildung contract afterwards. Starts October 1.',
    },
    difficulty: 'easy',
    timeToStart: { de: 'Ab Oktober (Bewerbung bis September)', en: 'From October (apply by September)' },
    riasecFit: ['R', 'E', 'C'],
    incomeFit: 'low',
    typical_day: { de: 'Vollzeit im Betrieb, learning by doing', en: 'Full-time at a company, learning on the job' },
    income_now: { de: '276 €/Monat (gefördert)', en: '276 €/mo (subsidised)' },
    freedom: { de: 'Gering — wie ein normaler Job', en: 'Low — like a regular job' },
    flexibility: { de: 'Betrieb wechseln möglich, wenn es nicht passt', en: 'Can switch employer if it doesn\'t fit' },
    outlook: { de: 'Ausbildung — 60 %+ werden übernommen', en: 'Ausbildung — 60%+ get taken on' },
    minCert: null,
    clusters: ['hands-on', 'business', 'people'],
    stories: [],
    nextSteps: {
      de: [
        'Frag bei der JBA Neukölln (Sonnenallee 282, 12057 Berlin) nach freien EQ-Plätzen',
        'Bewirb dich bis September für Start im Oktober',
        'Überleg dir, welchen Beruf du testen willst — EQ gibt es in fast allen Branchen',
      ],
      en: [
        'Ask at JBA Neukölln (Sonnenallee 282, 12057 Berlin) about open EQ spots',
        'Apply by September for an October start',
        'Think about which profession you want to try — EQ is available in almost every industry',
      ],
    },
    human_story: {
      name: 'Amira, 17',
      quote: {
        de: 'Ich hab keine Ausbildung gefunden, dann hat meine Berufsberaterin mir EQ vorgeschlagen. Nach 8 Monaten hat mein Chef mir einen richtigen Vertrag angeboten.',
        en: 'I couldn\'t find an Ausbildung so my Berufsberaterin suggested EQ. After 8 months, my boss offered me a real contract.',
      },
      detail: {
        de: 'Amira hat eine EQ in einem Hotel in Neukölln gemacht. Sie hat die Grundlagen der Hotelfachfrau gelernt und das Team so überzeugt, dass sie einen Ausbildungsplatz bekam.',
        en: 'Amira did an EQ at a hotel in Neukölln. She learned the basics of Hotelfachfrau and impressed the team enough to get an Ausbildung spot.',
      },
    },
  },
  {
    id: 'fos',
    name: 'FOS / Berufliches Gymnasium',
    tagline: { de: 'Fachabitur oder Abitur nachholen', en: 'Upgrade to Fachabitur or Abitur' },
    meta: { de: '2–3 Jahre · am OSZ · öffnet Studium', en: '2–3 years · at OSZ · opens university' },
    description: {
      de: 'Die Fachoberschule (FOS, 2 Jahre) führt zur Fachhochschulreife. Das Berufliche Gymnasium (3 Jahre) zur Allgemeinen Hochschulreife (Abitur). Beides am OSZ, mit Allgemeinbildung und beruflichem Schwerpunkt. Öffnet den Weg zum Studium.',
      en: 'Fachoberschule (FOS, 2 years) leads to Fachhochschulreife. Berufliches Gymnasium (3 years) leads to Allgemeine Hochschulreife (Abitur). Both are at an OSZ and combine general education with a professional focus area. Opens the door to Studium.',
    },
    difficulty: 'medium',
    timeToStart: { de: 'Ab August (Bewerbung bis Februar)', en: 'From August (apply by February)' },
    riasecFit: ['I', 'A', 'C'],
    incomeFit: 'low',
    typical_day: { de: 'Schule + Fachschwerpunkt (IT, Wirtschaft, Gesundheit etc.)', en: 'School + subject focus (IT, business, health, etc.)' },
    income_now: { de: 'Keins (BAföG möglich)', en: 'None (BAföG possible)' },
    freedom: { de: 'Mittel — Stundenplan, aber mehr Eigenständigkeit', en: 'Medium — school schedule but more independence' },
    flexibility: { de: 'Verschiedene Schwerpunkte wählbar', en: 'Can choose from multiple focus areas' },
    outlook: { de: 'Studium, Duales Studium oder qualifizierte Ausbildung', en: 'University, Duales Studium, or qualified Ausbildung' },
    minCert: 'Realschulabschluss',
    clusters: ['analytical', 'business', 'creative'],
    stories: [],
    nextSteps: {
      de: [
        'OSZ IMT (Haarlemer Str. 23-27, 12359 Berlin) hat FOS und Berufliches Gymnasium mit IT-Schwerpunkt',
        'Bewirb dich mit deinem MSA bis Februar — manche Fächer brauchen einen bestimmten Schnitt',
        'Frag bei der JBA Neukölln (Sonnenallee 282, 12057 Berlin) nach Hilfe bei der Bewerbung',
      ],
      en: [
        'OSZ IMT (Haarlemer Str. 23-27, 12359 Berlin) offers FOS and Berufliches Gymnasium with IT focus',
        'Apply with your MSA by February — some subjects require a minimum grade average',
        'Ask JBA Neukölln (Sonnenallee 282, 12057 Berlin) for help with your application',
      ],
    },
    human_story: {
      name: 'Leila, 18',
      quote: {
        de: 'Ich hatte meinen MSA, aber wollte studieren. Das Berufliche Gymnasium hat mir ermöglicht, mein Abitur zu machen und dabei was zu lernen, das mich wirklich interessiert — Wirtschaft.',
        en: 'I had my MSA but wanted to study at university. The Berufliches Gymnasium let me get my Abitur while focusing on something I actually liked — business.',
      },
      detail: {
        de: 'Leila ist jetzt im zweiten Jahr BWL an der FOS. Sie plant danach ein Duales Studium in Marketing.',
        en: 'Leila is now in her second year of BWL at the FOS. She plans to do a Duales Studium in marketing after graduating.',
      },
    },
  },
];

export const ALL_PATHS = [
  {
    id: 'ausbildung',
    name: 'Ausbildung',
    tagline: { de: 'Duale Berufsausbildung', en: 'Vocational training' },
    meta: { de: '2–3,5 Jahre · Verdienen & Lernen · 300+ Berufe', en: '2–3.5 years · earn while you train · 300+ professions' },
    description: {
      de: 'Eine bezahlte, duale Ausbildung — du lernst im Betrieb und in der Berufsschule. Einer der angesehensten Ausbildungswege in Deutschland.',
      en: 'A paid, dual apprenticeship combining workplace training with Berufsschule theory. One of the most respected qualification routes in Germany.',
    },
    difficulty: 'medium',
    timeToStart: { de: 'Ab August/September', en: 'From August/September' },
    riasecFit: ['R', 'C', 'E'],
    incomeFit: 'high',
    typical_day: { de: 'Betrieb + Berufsschule 2 Tage/Woche', en: 'Workshop + Berufsschule 2 days/wk' },
    income_now: { de: '600–900 €/Monat', en: '600–900 €/mo' },
    freedom: { de: 'Gering — fester Stundenplan', en: 'Low — structured schedule' },
    flexibility: { de: 'Wechsel möglich; IHK-Abschluss bleibt gültig', en: 'Can switch; IHK cert stays valid' },
    outlook: { de: 'Meister, Weiterbildung, hohe Nachfrage', en: 'Meister, further study, high demand' },
    minCert: 'Hauptschulabschluss',
    clusters: ['hands-on', 'business', 'people'],
    stories: ['lena', 'marco'],
    nextSteps: {
      de: [
        'Schau auf ausbildung.de nach Berufen, die dich interessieren — suche nach Thema, nicht nach Jobtitel',
        'Geh zur JBA Neukölln (Sonnenallee 282, 12057 Berlin) — kostenlose Beratung ohne Termin',
        'Schreib 2-3 Betriebe in deiner Nähe direkt an — die meisten stellen von Januar bis März ein',
        'Mach den Check-U Test auf check-u.de — zeigt dir, welche Berufe zu dir passen',
      ],
      en: [
        'Check ausbildung.de for jobs that interest you — search by topic, not job title',
        'Visit JBA Neukölln (Sonnenallee 282, 12057 Berlin) — free walk-in advice',
        'Contact 2–3 local companies directly — most hire between January and March',
        'Take the Check-U test at check-u.de — shows which professions fit you',
      ],
    },
    human_story: {
      name: 'Lena, 17',
      quote: {
        de: 'Ich wollte Geld verdienen und etwas Echtes lernen. Ausbildung war perfekt — ich bin gut im Praktischen und hasse es, nur in Vorlesungen zu sitzen.',
        en: "I wanted to earn money and learn something real. Ausbildung was perfect — I'm good at the practical stuff and I hate just sitting in lectures.",
      },
      detail: {
        de: 'Lena hat letztes Jahr eine Ausbildung zur Kauffrau im Einzelhandel begonnen. Sie verdient 680 €/Monat und hat bereits mehr Verantwortung als die meisten ihrer Freunde, die studieren.',
        en: "Lena started a Kauffrau im Einzelhandel training last year. She earns 680€/month and already has more responsibility than most of her friends who went to university.",
      },
    },
  },
  {
    id: 'studium',
    name: 'Studium',
    tagline: { de: 'Hochschulstudium', en: 'University education' },
    meta: { de: '3–5 Jahre · akademische Tiefe · drei verschiedene Formate', en: '3–5 years · academic depth · three different formats' },
    description: {
      de: 'Akademisches Studium an einer deutschen Hochschule. Das richtige Format hängt davon ab, wie du am besten lernst und was du finanziell brauchst — alle drei führen zu einem anerkannten Abschluss.',
      en: 'Academic study at a German higher-education institution. The right format depends on how you learn best and what you need financially — all three lead to a recognised degree.',
    },
    difficulty: 'hard',
    timeToStart: { de: 'Ab Oktober (Bewerbung bis Juli)', en: 'From October (apply by July)' },
    riasecFit: ['I', 'A', 'E', 'C'],
    incomeFit: 'low',
    typical_day: { de: 'Vorlesungen, Seminare, Selbststudium', en: 'Lectures, seminars, independent study' },
    income_now: { de: 'BAföG + Nebenjob (Uni/FH) · 600–1.200 €/Monat (dual)', en: 'BAföG + part-time (Uni/FH) · 600–1200 €/mo (dual)' },
    freedom: { de: 'Hoch (Uni/FH) — Gering (dual)', en: 'High (Uni/FH) — Low (dual)' },
    flexibility: { de: 'Fach wechseln möglich; Zeitaufwand hoch', en: 'Can change subject; time cost is high' },
    outlook: { de: 'Breit — abhängig von Fach und Format', en: 'Wide — depends on field and format' },
    minCert: 'Fachhochschulreife',
    clusters: ['analytical', 'creative', 'people', 'business'],
    stories: ['sarah', 'tim'],
    branches: [
      {
        id: 'uni',
        name: { de: 'Universität', en: 'University' },
        desc: {
          de: 'Klassische akademische Universität. Stark in Theorie und Forschung. Für die meisten Studiengänge ist Abitur erforderlich.',
          en: 'Traditional academic university. Strong on theory and research. Requires Abitur for most programmes.',
        },
        meta: {
          de: 'Abitur erforderlich · BAföG-berechtigt · flexibelste Fächerwahl',
          en: 'Abitur required · BAföG eligible · most flexible subject choice',
        },
      },
      {
        id: 'fh',
        name: { de: 'Fachhochschule (FH)', en: 'University of Applied Sciences (FH)' },
        desc: {
          de: 'Hochschule für Angewandte Wissenschaften. Praxisnäher als eine Uni, mit verpflichtenden Praxissemestern.',
          en: 'University of Applied Sciences. More practical and career-oriented than a Uni, with mandatory internship semesters built in.',
        },
        meta: {
          de: 'Fachhochschulreife oder Abitur · anwendungsorientiert · starke Industriekontakte',
          en: 'Fachhochschulreife or Abitur · applied focus · strong industry links',
        },
      },
      {
        id: 'dual',
        name: { de: 'Duales Studium', en: 'Dual Study' },
        desc: {
          de: 'Kombiniert ein Studium mit bezahlter Unternehmensausbildung. Schwer reinzukommen, aber du verdienst ab Tag 1 und hast nach dem Abschluss oft schon einen Job.',
          en: 'Combines a degree with paid company training. Competitive to get into, but you earn a salary from day one and graduate with a job offer in hand.',
        },
        meta: {
          de: '3 Jahre · 600–1.200 €/Monat · Bewerbung über Unternehmen, nicht Hochschulen',
          en: '3 years · 600–1200 €/mo · applied for via companies, not universities',
        },
      },
    ],
    nextSteps: {
      de: [
        'Mach den Check-U Test auf check-u.de — zeigt dir, welche Studienfächer zu dir passen',
        'Geh zu einer Studienberatung — z.B. an der HTW Berlin oder TU Berlin (kostenlos!)',
        'Rede mit echten Studierenden, nicht nur mit Beratern — frag, wie der Alltag wirklich ist',
        'Vergleiche Uni, FH und Duales Studium — die passen zu sehr verschiedenen Leuten',
      ],
      en: [
        'Take the Check-U test at check-u.de — shows which subjects suit you',
        'Visit a Studienberatung — e.g. HTW Berlin or TU Berlin (free!)',
        'Talk to real students, not just advisors — ask what the daily reality is',
        'Compare Uni, FH and Duales Studium — they suit very different people',
      ],
    },
    human_story: {
      name: 'Tim, 20',
      quote: {
        de: 'Ich wollte tief einsteigen — nicht nur Fähigkeiten lernen, sondern das ganze System dahinter verstehen. Das hat mir das Studium gegeben.',
        en: "I wanted to go deep — not just learn skills but understand the whole system behind them. University gave me that space.",
      },
      detail: {
        de: 'Tim ist im zweiten Jahr Informatik an der TU Berlin. Er arbeitet nebenbei und hat sich Zeit genommen, das richtige Fach zu finden.',
        en: 'Tim is in his second year of Computer Science at TU Berlin. He works part-time and took his time finding the right subject fit.',
      },
    },
  },
  {
    id: 'fsj',
    name: 'FSJ / BFD',
    tagline: { de: 'Freiwilliges Soziales Jahr', en: 'Voluntary service year' },
    meta: { de: '6–18 Monate · ~350 €/Monat · guter Einstieg', en: '6–18 months · ~350 €/mo · great stepping stone' },
    description: {
      de: 'Ein Freiwilliges Soziales Jahr oder Bundesfreiwilligendienst. Arbeit in einer sozialen, ökologischen oder kulturellen Einrichtung. Baut echte Berufserfahrung auf.',
      en: 'A Freiwilliges Soziales Jahr or Bundesfreiwilligendienst. Work in a social, environmental, or cultural institution. Requires completed Vollzeitschulpflicht (10 school years). Builds real-world experience.',
    },
    difficulty: 'easy',
    timeToStart: { de: 'Jederzeit (Hauptstart September)', en: 'Anytime (main start September)' },
    riasecFit: ['S', 'A', 'R'],
    incomeFit: 'low',
    typical_day: { de: 'Schichten in einer sozialen oder pflegerischen Einrichtung', en: 'Shifts in a social/care setting' },
    income_now: { de: '~350 €/Monat + Unterkunft', en: '~350 €/mo + board' },
    freedom: { de: 'Mittel — feste Einsatzstelle', en: 'Medium — fixed placement' },
    flexibility: { de: '6 Monate Kündigungsfrist üblich', en: '6-month notice typical' },
    outlook: { de: 'Gut für Studium oder Pflegeberufe', en: 'Strong for further study or care career' },
    minCert: null,
    clusters: ['people', 'nature', 'creative'],
    stories: ['anna'],
    nextSteps: {
      de: [
        'Such Plätze auf bundesfreiwilligendienst.de — filter nach Berlin und deinem Thema',
        'Bewirb dich bei 3-4 Stellen gleichzeitig — manche sind sehr beliebt',
        'Frag bei der JBA Neukölln (Sonnenallee 282, 12057 Berlin) nach FSJ-Stellen in der Nähe',
        'Rede mit jemandem, der schon FSJ gemacht hat — frag, wie der Alltag wirklich war',
      ],
      en: [
        'Find placements at bundesfreiwilligendienst.de — filter by Berlin and your topic',
        'Apply to 3–4 positions at once — popular spots fill up fast',
        'Ask at JBA Neukölln (Sonnenallee 282, 12057 Berlin) about nearby FSJ placements',
        "Talk to someone who's done an FSJ — ask what the day-to-day was really like",
      ],
    },
    human_story: {
      name: 'Anna, 19',
      quote: {
        de: 'Ich brauchte Zeit zum Nachdenken — ohne den Druck, mich sofort zu entscheiden. Das FSJ hat mir das gegeben — und auf Bewerbungen hat es sich super ausgewirkt.',
        en: "I needed time to figure things out without the pressure of committing to a degree. The FSJ gave me that — and it looked great on applications later.",
      },
      detail: {
        de: 'Anna hat 12 Monate FSJ in einem Kinderkrankenhaus gemacht. Sie studiert jetzt Ergotherapie und sagt, das Jahr hat ihr die Richtung gegeben.',
        en: "Anna did a 12-month FSJ at a children's hospital. She's now studying occupational therapy and says the year made her certain about her direction.",
      },
    },
  },
  {
    id: 'freelancing',
    name: 'Freelancing',
    tagline: { de: 'Selbstständigkeit', en: 'Self-employment' },
    meta: { de: 'Jederzeit · eigengesteuert · Einkommen variabel · ab 18', en: 'Ongoing · self-directed · income varies · 18+' },
    description: {
      de: 'Bau dir einen eigenen Kundenstamm mit kreativen, technischen oder serviceorientierten Angeboten. Ab 18 kannst du ein Gewerbe anmelden oder als Freiberufler arbeiten. Am Anfang unberechenbar, wächst aber mit Fähigkeiten und Portfolio.',
      en: 'Build your own client base offering creative, technical, or service work. Requires full Geschäftsfähigkeit (age 18) to register a Gewerbe or work as Freiberufler. Income is unpredictable at first but scales with skills and portfolio.',
    },
    difficulty: 'hard',
    timeToStart: { de: 'Jederzeit', en: 'Anytime' },
    riasecFit: ['A', 'E', 'I'],
    incomeFit: 'variable',
    typical_day: { de: 'Kundenarbeit, selbst bestimmte Arbeitszeiten', en: 'Client work, self-set hours' },
    income_now: { de: 'Variabel — 0 bis unbegrenzt', en: 'Variable — 0 to open' },
    freedom: { de: 'Hoch — vollständig eigengesteuert', en: 'High — fully self-directed' },
    flexibility: { de: 'Jederzeit aufhören — geringe Bindung', en: 'Stop anytime — low lock-in' },
    outlook: { de: 'Portfolio wächst, Einkommen skaliert', en: 'Portfolio grows, income scales' },
    minCert: null,
    clusters: ['creative', 'business', 'analytical'],
    stories: ['jay'],
    nextSteps: {
      de: [
        'Wähle eine Sache — Design, Video, Text, Coding — und mach ein kostenloses Projekt für dein Portfolio',
        'Melde dich als Freiberufler beim Finanzamt an — das ist einfacher als du denkst und kostenlos',
        'Finde deinen ersten Kunden in deinem Umfeld: ein Laden im Kiez, ein Schulprojekt, ein Event',
        'Schau auf check-u.de, welche Stärken du schon hast',
      ],
      en: [
        'Pick one thing — design, video, writing, coding — and do a free project for your portfolio',
        'Register as a Freiberufler with the Finanzamt — simpler than you think and free',
        'Find your first client nearby: a local shop, a school project, an event',
        'Check check-u.de to see what strengths you already have',
      ],
    },
    human_story: {
      name: 'Jay, 18',
      quote: {
        de: 'Ich habe angefangen, Videos für lokale Unternehmen zu schneiden, während alle anderen Ausbildungsplätze gesucht haben. Nach sechs Monaten hatte ich drei Stammkunden.',
        en: "I started editing videos for local businesses while everyone else was applying for Ausbildung. Six months in, I had three regular clients.",
      },
      detail: {
        de: 'Jay hat ein kleines Portfolio mit Social-Media-Content aufgebaut. Er verdient jetzt mehr als viele Freunde in der Ausbildung — ohne dass ihm jemand sagt, was er tun soll.',
        en: "Jay built a small portfolio editing social media content. He now earns more than many of his friends in training — without anyone telling him what to do.",
      },
    },
  },
  {
    id: 'bundeswehr',
    name: 'Bundeswehr',
    tagline: { de: 'Militärdienst', en: 'Military service' },
    meta: { de: '7 Monate – Karriere · Bezahlung ab Tag 1 · ab 17 Jahren', en: '7 months – career · paid from day 1 · min. age 17' },
    description: {
      de: 'Die Bundeswehr bietet verschiedene Einstiegsmöglichkeiten: Freiwilliger Wehrdienst (7–23 Monate), Zeitsoldatenvertrag (2–25 Jahre) oder Offizierslaufbahn. Mindestalter 17 mit elterlichem Einverständnis, 18 ohne. Beinhaltet Gehalt, Unterkunft und umfangreiche Ausbildung.',
      en: "Germany's armed forces offer several entry points: a short voluntary service (Freiwilliger Wehrdienst, 7–23 months), a fixed-term soldier contract (Soldat auf Zeit, 2–25 years), or a full officer career. Minimum age 17 with parental consent, 18 without. All include salary, accommodation, and extensive training.",
    },
    difficulty: 'medium',
    timeToStart: { de: 'Jederzeit (Musterung nach 18)', en: 'Anytime (assessment after 18)' },
    riasecFit: ['R', 'E', 'C'],
    incomeFit: 'high',
    typical_day: { de: 'Körperliches Training, Fachaufgaben, Teamoperationen', en: 'Physical training, specialist duties, team operations' },
    income_now: { de: '~1.400 €/Monat (freiwillig) · mehr mit Vertrag', en: '~1,400 €/mo (voluntary) · more on contract' },
    freedom: { de: 'Sehr gering — stark strukturiert und hierarchisch', en: 'Very low — highly structured and hierarchical' },
    flexibility: { de: 'Feste Verträge; Ausstieg nach Anfangszeitraum möglich', en: 'Fixed contracts; exit possible after initial period' },
    outlook: { de: 'Fachqualifikationen, Offizierslaufbahn oder zivile Übernahme', en: 'Specialist qualifications, officer track, or civilian transfer' },
    minCert: 'Realschulabschluss',
    clusters: ['hands-on', 'business', 'analytical'],
    stories: ['emeka'],
    nextSteps: {
      de: [
        'Buch einen Info-Termin beim Karrierecenter der Bundeswehr Berlin — kostenlos und ohne Verpflichtung',
        'Überleg dir, was zu dir passt: Freiwilliger Wehrdienst (7 Monate), SaZ-Vertrag oder Offizier-Laufbahn',
        'Frag nach speziellen Bereichen — IT, Medizin, Logistik — es gibt viel mehr als nur Frontdienst',
        'Geh zur JBA Neukölln (Sonnenallee 282, 12057 Berlin) für allgemeine Beratung',
      ],
      en: [
        'Book an info appointment at the Bundeswehr Karrierecenter Berlin — free, no commitment',
        'Think about what suits you: volunteer service (7 months), fixed contract, or officer track',
        'Ask about specialist areas — IT, medicine, logistics — there\'s much more than front-line service',
        'Visit JBA Neukölln (Sonnenallee 282, 12057 Berlin) for general career advice',
      ],
    },
    human_story: {
      name: 'Marco, 19',
      quote: {
        de: 'Ich wollte Struktur und ich wollte von Anfang an verdienen. Die Bundeswehr hat beides geliefert. Das ist nicht für jeden, aber es hat perfekt zu mir gepasst.',
        en: "I wanted structure and I wanted to earn from day one. The Bundeswehr delivered both. It's not for everyone, but it suited me exactly.",
      },
      detail: {
        de: 'Marco ist als Freiwilliger Wehrdienst eingetreten und hat nach sechs Monaten auf einen 4-Jahres-SaZ-Vertrag gewechselt. Er wird jetzt zum Fahrzeugmechatroniker ausgebildet.',
        en: "Marco entered as Freiwilliger Wehrdienst and converted to a 4-year SaZ contract after six months. He's now training as a vehicle systems mechanic.",
      },
    },
  },
  {
    id: 'gap-year',
    name: 'Gap Year / Travel',
    tagline: { de: 'Zeit zum Entdecken', en: 'Time to explore' },
    meta: { de: '3–12 Monate · selbst finanziert · ab 18 · gibt Orientierung', en: '3–12 months · self-funded · 18+ · clarifies direction' },
    description: {
      de: 'Eine bewusste Auszeit — reisen, im Ausland arbeiten oder verschiedene Dinge ausprobieren. Working-Holiday-Visa und Au-pair-Programme erfordern das 18. Lebensjahr. Keine feste Struktur, aber kann sehr prägend für die Selbstkenntnis sein.',
      en: 'A deliberate pause — travel, work abroad, or try several things. Working Holiday Visas and Au-pair programmes require age 18. No formal structure, but can be transformative for self-knowledge before committing to a path.',
    },
    difficulty: 'easy',
    timeToStart: { de: 'Jederzeit', en: 'Anytime' },
    riasecFit: ['A', 'E', 'S'],
    incomeFit: 'variable',
    typical_day: { de: 'Ganz unterschiedlich', en: 'Varies completely' },
    income_now: { de: 'Selbst finanziert oder Working Holiday', en: 'Self-funded or working holiday' },
    freedom: { de: 'Vollständig frei', en: 'Full' },
    flexibility: { de: 'Keinerlei Bindung', en: 'No lock-in at all' },
    outlook: { de: 'Hängt ganz davon ab, was du machst', en: 'Depends entirely on what you do' },
    minCert: null,
    clusters: ['creative', 'nature', 'people'],
    stories: ['felix'],
    nextSteps: {
      de: [
        'Schreib 3 Sachen auf, die du ausprobieren willst — das hilft dir zu entscheiden: arbeiten, reisen oder freiwillig helfen',
        'Schau dir Working Holiday Visa an (Australien, Neuseeland, Kanada) — ab 18 möglich',
        'Setz dir ein festes Datum zum Nachdenken — ein Gap Year ohne Plan kann leicht zwei werden',
        'Frag bei der JBA Neukölln (Sonnenallee 282, 12057 Berlin) nach Tipps für Auslandsaufenthalte',
      ],
      en: [
        'Write down 3 things you want to try — helps decide: work, travel or volunteer',
        'Look into Working Holiday Visas (Australia, New Zealand, Canada) — available from age 18',
        'Set a fixed date to reflect — a gap year without a plan can easily become two',
        'Ask at JBA Neukölln (Sonnenallee 282, 12057 Berlin) for tips on stays abroad',
      ],
    },
    human_story: {
      name: 'Felix, 18',
      quote: {
        de: "Ich wollte reisen, aber kein Jahr verschwenden. 8 Monate in einer Surfschule in Portugal haben mir nicht gesagt, was ich als Nächstes tun soll — aber viel darüber, wer ich bin.",
        en: "I knew I wanted to travel but I didn't want to waste a year. Working at a surf school in Portugal for 8 months didn't tell me what to do next — but it told me a lot about who I am.",
      },
      detail: {
        de: 'Felix kam mit einem klareren Kopf zurück, machte ein Duales Studium in Tourismusmanagement und sagt, das Gap Year war das Beste, was er je gemacht hat.',
        en: 'Felix came back with a clearer head, did a Duales Studium in tourism management, and says the gap year was the best thing he did.',
      },
    },
  },
];

export const ALL_PATHS_WITH_BRIDGES = [...ALL_PATHS, ...BRIDGE_PATHS];

export const loc = (field, lang) => {
  if (!field) return '';
  if (typeof field === 'object' && !Array.isArray(field)) return field[lang] || field.en || '';
  return String(field);
};

export const locArr = (field, lang) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  return field[lang] || field.en || [];
};

export const CERT_RANK = {
  null: 0,
  'Hauptschulabschluss': 1,
  'Realschulabschluss': 2,
  'Fachhochschulreife': 3,
  'Abitur': 4,
};

export const CLUSTER_LABELS = {
  'hands-on': { de: 'Handwerk & Technik', en: 'Hands-on & technical' },
  'people': { de: 'Menschen & Soziales', en: 'People & care' },
  'creative': { de: 'Kreativ & Digital', en: 'Creative & digital' },
  'analytical': { de: 'Analytisch & Daten', en: 'Analytical & data' },
  'nature': { de: 'Natur & Umwelt', en: 'Nature & environment' },
  'business': { de: 'Wirtschaft & Organisation', en: 'Business & organisation' },
};
