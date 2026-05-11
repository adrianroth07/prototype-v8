import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { STORIES } from '../data/stories.js';
import { pathColor } from '../data/colors.js';
import { l } from '../utils/localize.js';
import Reveal from './ui/Reveal.jsx';

const RESOURCES = {
  de: [
    { emoji: '\u{1F3E2}', name: 'JBA Neukölln', desc: 'Jugendberufsagentur — kostenlose Berufsberatung, alles unter einem Dach', detail: 'Sonnenallee 282, 12057 Berlin · ohne Termin', url: 'https://jba-berlin.de' },
    { emoji: '\u{1F3EB}', name: 'OSZ IMT Neukölln', desc: 'Oberstufenzentrum für Informations- und Medizintechnik — IBA, FOS, Berufliches Gymnasium', detail: 'Haarlemer Str. 23-27, 12359 Berlin', url: 'https://www.oszimt.de' },
    { emoji: '\u{1F4CB}', name: 'Check-U', desc: 'Kostenloser Online-Test der Bundesagentur für Arbeit', detail: 'Dauert ca. 2 Stunden (Pausen möglich)', url: 'https://www.check-u.de' },
    { emoji: '\u{1F91D}', name: 'ARRIVO Berlin', desc: 'Hilft jungen Menschen mit Migrationsgeschichte, eine Ausbildung zu finden', detail: 'Kostenloses Coaching und Vermittlung', url: 'https://www.arrivo-berlin.de' },
    { emoji: '\u{1F4BC}', name: 'JobInn Neukölln', desc: 'Aufsuchende Jugendsozialarbeit — Beratung zu Ausbildung und Beruf', detail: 'Lahnstr. 25, 12055 Berlin · GANGWAY e.V.', url: 'https://gangway.de/teams/jobinn-neukoelln/' },
    { emoji: '\u{1F30D}', name: 'Beratung Bildung & Beruf', desc: 'Kostenlose, unabhängige Berufsberatung — auch auf Arabisch, Türkisch, Farsi', detail: 'Karl-Marx-Str. 131, 12043 Berlin', url: 'https://www.gesbit.de' },
  ],
  en: [
    { emoji: '\u{1F3E2}', name: 'JBA Neukölln', desc: 'Youth career agency — free career guidance, all services under one roof', detail: 'Sonnenallee 282, 12057 Berlin · walk-in', url: 'https://jba-berlin.de' },
    { emoji: '\u{1F3EB}', name: 'OSZ IMT Neukölln', desc: 'Vocational school for IT and medical tech — IBA, FOS, Berufliches Gymnasium', detail: 'Haarlemer Str. 23-27, 12359 Berlin', url: 'https://www.oszimt.de' },
    { emoji: '\u{1F4CB}', name: 'Check-U', desc: 'Free online orientation test by the Bundesagentur für Arbeit', detail: 'Takes ~2 hours (can pause and resume)', url: 'https://www.check-u.de' },
    { emoji: '\u{1F91D}', name: 'ARRIVO Berlin', desc: 'Helps young people with migration background find an Ausbildung', detail: 'Free coaching and matching', url: 'https://www.arrivo-berlin.de' },
    { emoji: '\u{1F4BC}', name: 'JobInn Neukölln', desc: 'Outreach youth social work — career and Ausbildung counseling', detail: 'Lahnstr. 25, 12055 Berlin · GANGWAY e.V.', url: 'https://gangway.de/teams/jobinn-neukoelln/' },
    { emoji: '\u{1F30D}', name: 'Beratung Bildung & Beruf', desc: 'Free, independent career counseling — also in Arabic, Turkish, Farsi', detail: 'Karl-Marx-Str. 131, 12043 Berlin', url: 'https://www.gesbit.de' },
  ],
};

export default function Stories() {
  const { t, lang } = useLang();
  const { state, dispatch } = usePathFinder();

  const relevantStoryIds = new Set(
    state.suggestedPaths.flatMap(p => p.stories || [])
  );
  const clusters = state.selectedClusters || [];
  const stories = Object.entries(STORIES)
    .filter(([id]) => relevantStoryIds.has(id))
    .map(([id, story]) => ({ id, ...story }))
    .sort((a, b) => {
      if (clusters.length === 0) return 0;
      const aMatch = clusters.includes(a.cluster) ? 1 : 0;
      const bMatch = clusters.includes(b.cluster) ? 1 : 0;
      return bMatch - aMatch;
    });

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-4xl mx-auto relative">
      <Reveal className="mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F4AC}'}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-pf-text mb-2 tracking-tight">{t.stories.title}</h1>
        <p className="text-gray-400 text-base">{t.stories.subtitle}</p>
      </Reveal>

      <div className="flex flex-col gap-5 mb-10">
        {stories.map((story, i) => {
          const color = pathColor(story.path);
          return (
            <Reveal key={story.id} delay={i * 100}>
            <div
              className="card-hover bg-white rounded-xl p-6 md:p-8 border-l-4 border border-gray-100 shadow-sm"
              style={{ borderLeftColor: color.border }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0 text-white font-heading font-bold text-lg"
                  style={{ backgroundColor: color.border }}
                >
                  {story.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-800 text-lg">{story.name}</h3>
                  <p className="text-sm text-gray-500">{l(story.role, lang)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{l(story.detail, lang)}</p>
                  {story.background && (
                    <p className="text-xs text-gray-400 mt-0.5">{l(story.background, lang)}</p>
                  )}
                </div>
              </div>

              <div className="relative p-5 rounded-xl bg-gradient-to-r from-surface to-surface-alt border border-gray-100 mb-4 overflow-hidden">
                <span className="absolute top-1 left-3 text-5xl text-pf-primary/20 font-serif leading-none select-none pointer-events-none">{'\u{201C}'}</span>
                <blockquote className="relative text-base text-gray-600 italic leading-relaxed pl-6">
                  {l(story.quote, lang)}
                </blockquote>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-pf-light/50">
                  <span className="text-xs font-bold text-pf-primary uppercase tracking-wider">{t.stories.why}</span>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{l(story.why, lang)}</p>
                </div>
                <div className="p-3 rounded-xl bg-pf-light/50">
                  <span className="text-xs font-bold text-pf-primary uppercase tracking-wider">{t.stories.advice}</span>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{l(story.advice, lang)}</p>
                </div>
              </div>
            </div>
            </Reveal>
          );
        })}

        {stories.length === 0 && (
          <div className="animate-fade-in text-center py-12 text-gray-400">
            <span className="text-4xl block mb-3">{'\u{1F4AD}'}</span>
            <p className="text-sm italic">{t.stories.noStories}</p>
          </div>
        )}
      </div>

      {/* Resources section */}
      <Reveal variant="blur" className="mb-10">
        <h2 className="font-heading text-xl font-bold text-pf-text mb-2">
          {t.stories.resourcesTitle}
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          {t.stories.resourcesSubtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RESOURCES[lang].map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm group transition-all hover:border-pf-primary"
            >
              <span className="text-2xl shrink-0 mt-0.5">{r.emoji}</span>
              <div className="min-w-0">
                <div className="font-bold text-sm text-gray-800 group-hover:text-pf-primary transition-colors flex items-center gap-1">
                  {r.name}
                  <span className="text-pf-primary opacity-0 group-hover:opacity-100 transition-opacity">{'\u{2192}'}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{r.detail}</p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      <div className="p-6 rounded-xl bg-pf-light/50 border border-pf-primary/10 text-center mb-8">
        <p className="text-sm text-gray-500 italic mb-1">
          {t.common.noPathFinal}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.PATHS })}
          className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
        >
          {'←'} {t.stories.backToRoutes}
        </button>
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.COMPARISON })}
          className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
        >
          {'←'} {t.stories.toComparison}
        </button>
        <button
          onClick={() => dispatch({ type: 'RESTART' })}
          className="btn-primary px-10 py-3.5 bg-gradient-to-b from-pf-primary to-pf-dark text-white font-semibold rounded-xl shadow-lg shadow-pf-primary/12 cursor-pointer transition-all"
        >
          {t.stories.restartBtn}
        </button>
      </div>
    </div>
  );
}
