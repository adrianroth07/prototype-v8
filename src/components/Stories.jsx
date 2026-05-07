import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { STORIES } from '../data/stories.js';
import { pathColor } from '../data/colors.js';

export default function Stories() {
  const { t } = useLang();
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
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F4AC}'}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-pf-text mb-2 tracking-tight">{t.stories.title}</h1>
        <p className="text-gray-400 text-base">{t.stories.subtitle}</p>
      </div>

      <div className="flex flex-col gap-5 mb-10">
        {stories.map((story, i) => {
          const color = pathColor(story.path);
          return (
            <div
              key={story.id}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 7)} card-hover bg-white rounded-2xl p-6 md:p-8 border-l-4 border border-gray-100 shadow-sm`}
              style={{ borderLeftColor: color.border }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pf-light shrink-0">
                  <span className="text-xl">{'\u{1F464}'}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{story.name}</h3>
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
            <p className="text-sm italic">No stories available for your selected paths yet.</p>
          </div>
        )}
      </div>

      <button
        onClick={() => dispatch({ type: 'RESTART' })}
        className="animate-fade-in-up btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-2xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
      >
        {t.stories.restartBtn}
      </button>
    </div>
  );
}
