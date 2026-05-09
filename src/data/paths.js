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
    meta: { de: '2–3,5 Jahre · Geld verdienen ab Tag 1 · 300+ Berufe', en: '2–3.5 years · earn while you train · 300+ professions' },
    description: {
      de: 'Eine bezahlte duale Ausbildung: Du lernst im Betrieb und gehst parallel zur Berufsschule. Einer der anerkanntesten Qualifikationswege in Deutschland.',
      en: 'A paid, dual apprenticeship combining workplace training with Berufsschule theory. One of the most respected qualification routes in Germany.',
    },
    difficulty: 'medium',
    timeToStart: { de: 'Ab August/September', en: 'From August/September' },
    riasecFit: ['R', 'C', 'E'],
    incomeFit: 'high',
    typical_day: { de: 'Werkstatt/Büro + Berufsschule 2 Tage/Woche', en: 'Workshop + Berufsschule 2 days/wk' },
    income_now: { de: '724–1.200 €/Monat', en: '724–1,200 €/mo' },
    freedom: { de: 'Gering — fester Ablauf', en: 'Low — structured schedule' },
    flexibility: { de: 'Wechsel möglich; IHK-Abschluss bleibt gültig', en: 'Can switch; IHK cert stays valid' },
    outlook: { de: 'Meister, Studium, hohe Nachfrage', en: 'Meister, further study, high demand' },
    minCert: 'Hauptschulabschluss',
    clusters: ['hands-on', 'business', 'people'],
    stories: ['lena', 'marco'],
    nextSteps: {
      de: [
        'Schau auf ausbildung.de nach Berufen, die dich interessieren — suche nach Thema, nicht nach Jobtitel',
        'Geh zur JBA Neukölln (Sonnenallee 282, 12057 Berlin) — kostenlose Beratung ohne Termin',
        'Schreib 2-3 Betriebe in deiner Nähe direkt an — große Betriebe suchen ab September, kleinere bis März-Mai',
        'Mach den Check-U Test auf check-u.de — zeigt dir, welche Berufe zu dir passen',
      ],
      en: [
        'Browse ausbildung.de for professions that interest you — search by topic, not job title',
        'Go to JBA Neukölln (Sonnenallee 282, 12057 Berlin) — free counseling, no appointment needed',
        'Write directly to 2-3 local companies — large firms recruit from September, smaller ones until March-May',
        'Take the Check-U test at check-u.de — shows you which professions match your strengths',
      ],
    },
    human_story: {
      name: 'Lena, 17',
      quote: {
        de: 'Ich wollte Geld verdienen und was Echtes lernen. Ausbildung war perfekt — ich bin gut im Praktischen und hab keinen Bock, nur in Vorlesungen zu sitzen.',
        en: 'I wanted to earn money and learn something real. Ausbildung was perfect — I\'m good at the practical stuff and I hate just sitting in lectures.',
      },
      detail: {
        de: 'Lena hat letztes Jahr eine Ausbildung als Kauffrau im Einzelhandel angefangen. Sie verdient 680 €/Monat und hat schon mehr Verantwortung als die meisten ihrer Freunde an der Uni.',
        en: 'Lena started a Kauffrau im Einzelhandel training last year. She earns 680€/month and already has more responsibility than most of her friends who went to university.',
      },
    },
  },
  {
    id: 'studium',
    name: 'Studium',
    tagline: { de: 'Hochschulstudium', en: 'University education' },
    meta: { de: '3–5 Jahre · akademische Tiefe · drei Formate', en: '3–5 years · academic depth · three different formats' },
    description: {
      de: 'Ein Studium an einer deutschen Hochschule. Das richtige Format hängt davon ab, wie du am besten lernst und was du finanziell brauchst — alle drei führen zu einem anerkannten Abschluss.',
      en: 'Academic study at a German higher-education institution. The right format depends on how you learn best and what you need financially — all three lead to a recognised degree.',
    },
    difficulty: 'hard',
    timeToStart: { de: 'Ab Oktober (Bewerbung bis Juli)', en: 'From October (apply by July)' },
    riasecFit: ['I', 'A', 'E', 'C'],
    incomeFit: 'low',
    typical_day: { de: 'Vorlesungen, Seminare, Selbststudium', en: 'Lectures, seminars, independent study' },
    income_now: { de: 'BAföG + Nebenjob (Uni/FH) · 600–1.200 €/Monat (dual)', en: 'BAföG + part-time (Uni/FH) · 600–1200 €/mo (dual)' },
    freedom: { de: 'Hoch (Uni/FH) — Gering (dual)', en: 'High (Uni/FH) — Low (dual)' },
    flexibility: { de: 'Fachwechsel möglich; Zeitverlust ist aber hoch', en: 'Can change subject; time cost is high' },
    outlook: { de: 'Breit — hängt vom Fach und Format ab', en: 'Wide — depends on field and format' },
    minCert: 'Fachhochschulreife',
    clusters: ['analytical', 'creative', 'people', 'business'],
    stories: ['sarah', 'tim'],
    branches: [
      {
        id: 'uni',
        name: { de: 'Universität', en: 'University' },
        desc: {
          de: 'Klassische Universität. Stark in Theorie und Forschung. Erfordert in der Regel Abitur.',
          en: 'Traditional academic university. Strong on theory and research. Requires Abitur for most programmes.',
        },
        meta: {
          de: 'Abitur nötig · BAföG-berechtigt · größte Fächerauswahl',
          en: 'Abitur required · BAföG eligible · most flexible subject choice',
        },
      },
      {
        id: 'fh',
        name: { de: 'Fachhochschule (FH)', en: 'University of Applied Sciences (FH)' },
        desc: {
          de: 'Hochschule für Angewandte Wissenschaften. Praxisorientierter als die Uni, mit Pflichtpraktika.',
          en: 'University of Applied Sciences. More practical and career-oriented than a Uni, with mandatory internship semesters built in.',
        },
        meta: {
          de: 'Fachhochschulreife oder Abitur · Praxisfokus · starke Industriekontakte',
          en: 'Fachhochschulreife or Abitur · applied focus · strong industry links',
        },
      },
      {
        id: 'dual',
        name: { de: 'Duales Studium', en: 'Dual Study' },
        desc: {
          de: 'Verbindet Studium mit bezahlter Ausbildung im Betrieb. Wettbewerbsintensiv, aber du verdienst von Tag 1 und hast am Ende oft schon ein Jobangebot.',
          en: 'Combines a degree with paid company training. Competitive to get into, but you earn a salary from day one and graduate with a job offer in hand.',
        },
        meta: {
          de: '3 Jahre · 600–1.200 €/Monat · Bewerbung beim Betrieb, nicht bei der Hochschule',
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
        'Take the Check-U test at check-u.de — shows you which study programs match you',
        'Go to a Studienberatung — e.g. at HTW Berlin or TU Berlin (free!)',
        'Talk to actual students, not just counselors — ask what daily life is really like',
        'Compare Uni, FH and Duales Studium — they suit very different people',
      ],
    },
    human_story: {
      name: 'Tim, 20',
      quote: {
        de: 'Ich wollte in die Tiefe gehen — nicht nur Skills lernen, sondern das ganze System dahinter verstehen. Die Uni hat mir den Raum dafür gegeben.',
        en: 'I wanted to go deep — not just learn skills but understand the whole system behind them. University gave me that space.',
      },
      detail: {
        de: 'Tim ist im zweiten Jahr Informatik an der TU Berlin. Er jobbt nebenbei und hat sich Zeit genommen, das richtige Fach zu finden.',
        en: 'Tim is in his second year of Computer Science at TU Berlin. He works part-time and took his time finding the right subject fit.',
      },
    },
  },
  {
    id: 'fsj',
    name: 'FSJ / BFD',
    tagline: { de: 'Freiwilligendienst', en: 'Voluntary service year' },
    meta: { de: '6–18 Monate · 300–676 €/Monat · perfekter Zwischenschritt', en: '6–18 months · 300–676 €/mo · great stepping stone' },
    description: {
      de: 'Ein Freiwilliges Soziales Jahr oder Bundesfreiwilligendienst. Arbeite in einer sozialen, ökologischen oder kulturellen Einrichtung. Voraussetzung: Vollzeitschulpflicht erfüllt (10 Schuljahre). Baut echte Erfahrung auf.',
      en: 'A Freiwilliges Soziales Jahr or Bundesfreiwilligendienst. Work in a social, environmental, or cultural institution. Requires completed Vollzeitschulpflicht (10 school years). Builds real-world experience.',
    },
    difficulty: 'easy',
    timeToStart: { de: 'Jederzeit (Hauptstart September)', en: 'Anytime (main start September)' },
    riasecFit: ['S', 'A', 'R'],
    incomeFit: 'low',
    typical_day: { de: 'Schichten in sozialer/pflegerischer Einrichtung', en: 'Shifts in a social/care setting' },
    income_now: { de: '300–676 €/Monat + ggf. Unterkunft/Verpflegung', en: '300–676 €/mo + housing/meals possible' },
    freedom: { de: 'Mittel — feste Einsatzstelle', en: 'Medium — fixed placement' },
    flexibility: { de: 'Kündigung mit 6 Wochen Frist üblich', en: '6-week notice typical' },
    outlook: { de: 'Stark für Studium oder soziale Berufe', en: 'Strong for further study or care career' },
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
        'Search for placements on bundesfreiwilligendienst.de — filter by Berlin and your topic',
        'Apply to 3-4 places at once — some are very popular',
        'Ask JBA Neukölln (Sonnenallee 282, 12057 Berlin) about FSJ spots nearby',
        'Talk to someone who\'s done FSJ — ask what daily life was really like',
      ],
    },
    human_story: {
      name: 'Anna, 19',
      quote: {
        de: 'Ich brauchte Zeit, um rauszufinden, was ich will — ohne den Druck, mich sofort festzulegen. Das FSJ hat mir das gegeben — und es hat sich super in Bewerbungen gemacht.',
        en: 'I needed time to figure things out without the pressure of committing to a degree. The FSJ gave me that — and it looked great on applications later.',
      },
      detail: {
        de: 'Anna hat 12 Monate FSJ in einer Kinderklinik gemacht. Sie studiert jetzt Ergotherapie und sagt, das Jahr hat ihr die Sicherheit gegeben, dass sie den richtigen Weg einschlägt.',
        en: 'Anna did a 12-month FSJ at a children\'s hospital. She\'s now studying occupational therapy and says the year made her certain about her direction.',
      },
    },
  },
  {
    id: 'freelancing',
    name: 'Freelancing',
    tagline: { de: 'Selbstständigkeit', en: 'Self-employment' },
    meta: { de: 'Laufend · selbstbestimmt · Einkommen variabel · 18+', en: 'Ongoing · self-directed · income varies · 18+' },
    description: {
      de: 'Bau dir deinen eigenen Kundenstamm auf — mit kreativer, technischer oder dienstleistender Arbeit. Erfordert volle Geschäftsfähigkeit (ab 18) für Gewerbe- oder Freiberufler-Anmeldung. Einkommen ist anfangs unberechenbar, wächst aber mit Skills und Portfolio.',
      en: 'Build your own client base offering creative, technical, or service work. Requires full Geschäftsfähigkeit (age 18) to register a Gewerbe or work as Freiberufler. Income is unpredictable at first but scales with skills and portfolio.',
    },
    difficulty: 'hard',
    timeToStart: { de: 'Jederzeit', en: 'Anytime' },
    riasecFit: ['A', 'E', 'I'],
    incomeFit: 'variable',
    typical_day: { de: 'Kundenarbeit, eigene Zeiteinteilung', en: 'Client work, self-set hours' },
    income_now: { de: 'Variabel — von 0 bis offen', en: 'Variable — 0 to open' },
    freedom: { de: 'Hoch — komplett selbstbestimmt', en: 'High — fully self-directed' },
    flexibility: { de: 'Jederzeit aufhören — geringe Bindung', en: 'Stop anytime — low lock-in' },
    outlook: { de: 'Portfolio wächst, Einkommen steigt', en: 'Portfolio grows, income scales' },
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
        'Register as Freiberufler at the Finanzamt — it\'s simpler than you think and free',
        'Find your first client in your neighbourhood: a local shop, a school project, an event',
        'Check check-u.de to see what strengths you already have',
      ],
    },
    human_story: {
      name: 'Jay, 18',
      quote: {
        de: 'Ich hab angefangen, Videos für lokale Geschäfte zu schneiden, während alle anderen sich für Ausbildungen beworben haben. Nach sechs Monaten hatte ich drei feste Kunden.',
        en: 'I started editing videos for local businesses while everyone else was applying for Ausbildung. Six months in, I had three regular clients.',
      },
      detail: {
        de: 'Jay hat sich ein kleines Portfolio mit Social-Media-Content aufgebaut. Er verdient jetzt mehr als viele seiner Freunde in der Ausbildung — ohne dass ihm jemand sagt, was er tun soll.',
        en: 'Jay built a small portfolio editing social media content. He now earns more than many of his friends in training — without anyone telling him what to do.',
      },
    },
  },
  {
    id: 'bundeswehr',
    name: 'Bundeswehr',
    tagline: { de: 'Militärischer Dienst', en: 'Military service' },
    meta: { de: '6–23 Monate · bezahlt ab Tag 1 · ab 17 Jahren', en: '6–23 months · paid from day 1 · min. age 17' },
    description: {
      de: 'Die Bundeswehr bietet verschiedene Einstiege: den kurzen Freiwilligen Wehrdienst (FWD, 6–11 Monate), einen Zeitvertrag (Soldat auf Zeit, ab 12 Monate), oder eine Offizierslaufbahn. Ab 17 mit Einwilligung der Eltern, ab 18 ohne. Deutsche Staatsangehörigkeit erforderlich. Gehalt, Unterkunft und umfangreiche Ausbildung inklusive.',
      en: 'Germany\'s armed forces offer several entry points: a short voluntary service (Freiwilliger Wehrdienst, 6–11 months), a fixed-term soldier contract (Soldat auf Zeit, 12+ months), or a full officer career. Minimum age 17 with parental consent, 18 without. German citizenship required. All include salary, accommodation, and extensive training.',
    },
    difficulty: 'medium',
    timeToStart: { de: 'Jederzeit (Musterung nach 18)', en: 'Anytime (assessment after 18)' },
    riasecFit: ['R', 'E', 'C'],
    incomeFit: 'high',
    typical_day: { de: 'Körperliches Training, Fachausbildung, Teamarbeit', en: 'Physical training, specialist duties, team operations' },
    income_now: { de: '~2.600 €/Monat (FWD) · ~2.700+ (SaZ)', en: '~2,600 €/mo (FWD) · ~2,700+ (SaZ)' },
    freedom: { de: 'Sehr gering — stark strukturiert und hierarchisch', en: 'Very low — highly structured and hierarchical' },
    flexibility: { de: 'Feste Verträge; Ausstieg nach Anfangsphase möglich', en: 'Fixed contracts; exit possible after initial period' },
    outlook: { de: 'Fachqualifikationen, Offizierslaufbahn oder ziviler Transfer', en: 'Specialist qualifications, officer track, or civilian transfer' },
    minCert: 'Hauptschulabschluss',
    clusters: ['hands-on', 'business', 'analytical'],
    stories: [],
    nextSteps: {
      de: [
        'Buch einen Info-Termin beim Karrierecenter der Bundeswehr Berlin — kostenlos und ohne Verpflichtung',
        'Überleg dir, was zu dir passt: Freiwilliger Wehrdienst (6–11 Monate), SaZ-Vertrag oder Offizier-Laufbahn',
        'Frag nach speziellen Bereichen — IT, Medizin, Logistik — es gibt viel mehr als nur Frontdienst',
        'Geh zur JBA Neukölln (Sonnenallee 282, 12057 Berlin) für allgemeine Beratung',
      ],
      en: [
        'Book an info session at the Bundeswehr Karrierecenter Berlin — free and no obligation',
        'Think about what fits you: Freiwilliger Wehrdienst (6–11 months), SaZ contract, or officer track',
        'Ask about specialist areas — IT, medical, logistics — there\'s much more than frontline duty',
        'Go to JBA Neukölln (Sonnenallee 282, 12057 Berlin) for general advice',
      ],
    },
    human_story: {
      name: 'Marco, 19',
      quote: {
        de: 'Ich wollte Struktur und wollte sofort verdienen. Die Bundeswehr hat beides geliefert. Es ist nicht für jeden, aber mir hat es genau gepasst.',
        en: 'I wanted structure and I wanted to earn from day one. The Bundeswehr delivered both. It\'s not for everyone, but it suited me exactly.',
      },
      detail: {
        de: 'Marco ist als Freiwilliger Wehrdienst eingestiegen und hat nach sechs Monaten auf einen 4-Jahres-SaZ-Vertrag gewechselt. Er macht jetzt eine Ausbildung zum Fahrzeugsystemmechaniker.',
        en: 'Marco entered as Freiwilliger Wehrdienst and converted to a 4-year SaZ contract after six months. He\'s now training as a vehicle systems mechanic.',
      },
    },
  },
  {
    id: 'gap-year',
    name: 'Gap Year / Travel',
    tagline: { de: 'Zeit zum Erkunden', en: 'Time to explore' },
    meta: { de: '3–12 Monate · selbst finanziert · 18+ · bringt Klarheit', en: '3–12 months · self-funded · 18+ · clarifies direction' },
    description: {
      de: 'Eine bewusste Pause — reisen, im Ausland arbeiten oder verschiedene Dinge ausprobieren. Working-Holiday-Visa und Au-pair-Programme ab 18. Keine feste Struktur, aber kann für die Selbstfindung sehr wertvoll sein.',
      en: 'A deliberate pause — travel, work abroad, or try several things. Working Holiday Visas and Au-pair programmes require age 18. No formal structure, but can be transformative for self-knowledge before committing to a path.',
    },
    difficulty: 'easy',
    timeToStart: { de: 'Jederzeit', en: 'Anytime' },
    riasecFit: ['A', 'E', 'S'],
    incomeFit: 'variable',
    typical_day: { de: 'Komplett unterschiedlich', en: 'Varies completely' },
    income_now: { de: 'Selbst finanziert oder Working Holiday', en: 'Self-funded or working holiday' },
    freedom: { de: 'Maximal', en: 'Full' },
    flexibility: { de: 'Keine Bindung', en: 'No lock-in at all' },
    outlook: { de: 'Hängt davon ab, was du daraus machst', en: 'Depends entirely on what you do' },
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
        'Write down 3 things you want to try — helps you decide: work, travel, or volunteer',
        'Look into Working Holiday Visas (Australia, New Zealand, Canada) — available from 18',
        'Set a fixed date to reflect — a gap year without a plan can easily become two',
        'Ask JBA Neukölln (Sonnenallee 282, 12057 Berlin) for tips on going abroad',
      ],
    },
    human_story: {
      name: 'Felix, 18',
      quote: {
        de: 'Ich wusste, dass ich reisen wollte, aber nicht einfach ein Jahr verplempern. 8 Monate an einer Surfschule in Portugal haben mir nicht gezeigt, was ich machen soll — aber eine Menge darüber, wer ich bin.',
        en: 'I knew I wanted to travel but I didn\'t want to waste a year. Working at a surf school in Portugal for 8 months didn\'t tell me what to do next — but it told me a lot about who I am.',
      },
      detail: {
        de: 'Felix kam mit einem klareren Kopf zurück, hat ein Duales Studium in Tourismusmanagement angefangen und sagt, das Gap Year war das Beste, was er gemacht hat.',
        en: 'Felix came back with a clearer head, did a Duales Studium in tourism management, and says the gap year was the best thing he did.',
      },
    },
  },
];

export const ALL_PATHS_WITH_BRIDGES = [...ALL_PATHS, ...BRIDGE_PATHS];

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
