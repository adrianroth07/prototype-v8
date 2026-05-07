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
      <h1 className="text-3xl font-bold text-pf-text mb-2">{t.stories.title}</h1>
      <p className="text-gray-500 mb-8">{t.stories.subtitle}</p>

      <div className="flex flex-col gap-4 mb-8">
        {stories.map((story) => {
          const color = pathColor(story.path);
          return (
            <div
              key={story.id}
              className="bg-white rounded-xl p-6 border-l-4 border border-gray-100"
              style={{ borderLeftColor: color.border }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">{story.name}</h3>
                  <p className="text-sm text-gray-500">{story.role}</p>
                  <p className="text-xs text-gray-400">{story.detail}</p>
                </div>
              </div>

              <blockquote className="text-sm text-gray-700 italic mb-3">
                {story.quote}
              </blockquote>

              <div className="space-y-2">
                <div>
                  <span className="text-xs font-semibold text-gray-500">{t.stories.why}</span>
                  <p className="text-sm text-gray-600">{story.why}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500">{t.stories.advice}</span>
                  <p className="text-sm text-gray-600">{story.advice}</p>
                </div>
              </div>
            </div>
          );
        })}

        {stories.length === 0 && (
          <p className="text-sm text-gray-400 italic">No stories available for your selected paths yet.</p>
        )}
      </div>

      <button
        onClick={() => dispatch({ type: 'RESTART' })}
        className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer"
      >
        {t.stories.restartBtn}
      </button>
    </div>
  );
}
