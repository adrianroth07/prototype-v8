import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { STORIES } from '../data/stories.js';
import { pathColor } from '../data/colors.js';

const RESOURCES = {
  de: [
    { emoji: '\u{1F3E2}', name: 'JBA Neukölln', desc: 'Jugendberufsagentur — kostenlose Berufsberatung, alles unter einem Dach', detail: 'Sonnenallee 282, 12057 Berlin', url: 'https://www.jba-berlin.de' },
    { emoji: '\u{1F3EB}', name: 'OSZ IMT Neukölln', desc: 'Oberstufenzentrum für IT, Medien und Technik — IBA, FOS, Berufliches Gymnasium', detail: 'Haarlemer Str. 23-27, 12359 Berlin', url: 'https://www.oszimt.de' },
    { emoji: '\u{1F4CB}', name: 'Check-U', desc: 'Kostenloser Online-Test der Bundesagentur für Arbeit', detail: 'Dauert ca. 60 Minuten, sehr gründlich', url: 'https://www.check-u.de' },
    { emoji: '\u{1F91D}', name: 'ARRIVO Berlin', desc: 'Hilft jungen Menschen, eine Ausbildung zu finden', detail: 'Kostenloses Coaching und Vermittlung', url: 'https://www.arrivo-berlin.de' },
    { emoji: '\u{1F4BC}', name: 'JobInn', desc: 'Job- und Ausbildungsportal für Jugendliche in Neukölln', detail: 'Teil des JBA-Netzwerks', url: 'https://www.jobinn.de' },
  ],
  en: [
    { emoji: '\u{1F3E2}', name: 'JBA Neukölln', desc: 'Youth career agency — free career guidance, all services under one roof', detail: 'Sonnenallee 282, 12057 Berlin', url: 'https://www.jba-berlin.de' },
    { emoji: '\u{1F3EB}', name: 'OSZ IMT Neukölln', desc: 'Vocational school for IT, media and tech — IBA, FOS, Berufliches Gymnasium', detail: 'Haarlemer Str. 23-27, 12359 Berlin', url: 'https://www.oszimt.de' },
    { emoji: '\u{1F4CB}', name: 'Check-U', desc: 'Free online orientation test by the Bundesagentur für Arbeit', detail: 'Takes ~60 minutes, very thorough', url: 'https://www.check-u.de' },
    { emoji: '\u{1F91D}', name: 'ARRIVO Berlin', desc: 'Helps young people find an Ausbildung placement', detail: 'Free coaching and matching', url: 'https://www.arrivo-berlin.de' },
    { emoji: '\u{1F4BC}', name: 'JobInn', desc: 'Job and Ausbildung portal for Neukölln youth', detail: 'Part of the JBA network', url: 'https://www.jobinn.de' },
  ],
};

export default function Stories() {
  const { t, lang } = useLang();
  const { state, dispatch } = usePathFinder();

  const relevantStoryIds = new Set(
    state.suggestedPaths.flatMap(p => p.stories || [])
  );
  const stories = Object.entries(STORIES)
    .filter(([id]) => relevantStoryIds.has(id))
    .map(([id, story]) => ({ id, ...story }));

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-4xl mx-auto">
      <div className="animate-fade-in-up mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F4AC}'}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-pf-text mb-2 tracking-tight">{t.stories.title}</h1>
        <p className="text-gray-400 text-base">{t.stories.subtitle}</p>
      </div>

      <div className="flex flex-col gap-5 mb-10">
        {stories.map((story, i) => {
          const color = pathColor(story.path);
          return (
            <div
              key={story.id}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 7)} card-hover bg-white rounded-xl p-6 md:p-8 border-l-4 border border-gray-100 shadow-sm`}
              style={{ borderLeftColor: color.border }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pf-light shrink-0">
                  <span className="text-xl">{'\u{1F464}'}</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-800 text-lg">{story.name}</h3>
                  <p className="text-sm text-gray-500">{story.role}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{story.detail}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-surface to-surface-alt border border-gray-100 mb-4">
                <blockquote className="text-sm text-gray-600 italic leading-relaxed">
                  "{story.quote}"
                </blockquote>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-pf-light/50">
                  <span className="text-xs font-bold text-pf-primary uppercase tracking-wider">{t.stories.why}</span>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{story.why}</p>
                </div>
                <div className="p-3 rounded-xl bg-pf-light/50">
                  <span className="text-xs font-bold text-pf-primary uppercase tracking-wider">{t.stories.advice}</span>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{story.advice}</p>
                </div>
              </div>
            </div>
          );
        })}

        {stories.length === 0 && (
          <div className="animate-fade-in text-center py-12 text-gray-400">
            <span className="text-4xl block mb-3">{'\u{1F4AD}'}</span>
            <p className="text-sm italic">{lang === 'de' ? 'Noch keine Geschichten für deine Wege.' : 'No stories available for your selected paths yet.'}</p>
          </div>
        )}
      </div>

      {/* Resources section */}
      <div className="animate-fade-in-up mb-10">
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
                <div className="font-semibold text-sm text-gray-800 group-hover:text-pf-primary transition-colors">{r.name}</div>
                <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{r.detail}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-400 text-center italic mb-6">
        {t.common.noPathFinal}
      </p>

      <button
        onClick={() => dispatch({ type: 'RESTART' })}
        className="animate-fade-in-up btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
      >
        {t.stories.restartBtn}
      </button>
    </div>
  );
}
