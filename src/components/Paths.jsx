import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { pathColor } from '../data/colors.js';

export default function Paths() {
  const { t } = useLang();
  const { state, dispatch } = usePathFinder();
  const [swapTarget, setSwapTarget] = useState(null);

  const { suggestedPaths, wildcardPaths, reasons } = state;

  function handleSwap(removeId, addPath) {
    dispatch({ type: 'SWAP_PATH', removeId, addPath });
    setSwapTarget(null);
  }

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-pf-text mb-2">{t.paths.title}</h1>
      <p className="text-gray-500 mb-8">{t.paths.subtitle}</p>

      <div className="flex flex-col gap-4 mb-8">
        {suggestedPaths.map((path, i) => {
          const color = pathColor(path.id);
          return (
            <div
              key={path.id}
              className="bg-white rounded-xl p-6 border-l-4 border border-gray-100"
              style={{ borderLeftColor: color.border }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: color.text }}>
                    #{i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">{path.name}</h3>
                  <p className="text-sm text-gray-500">{path.tagline}</p>
                </div>
                {wildcardPaths.length > 0 && (
                  <button
                    onClick={() => setSwapTarget(path.id)}
                    className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer border border-gray-200 rounded-lg px-3 py-1"
                  >
                    {t.paths.swapBtn}
                  </button>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-3">{reasons[path.id]}</p>
              <p className="text-xs text-gray-400">{path.meta}</p>

              {path.human_story && (
                <div className="mt-4 p-3 rounded-lg bg-surface text-sm">
                  <p className="italic text-gray-600">"{path.human_story.quote}"</p>
                  <p className="text-xs text-gray-400 mt-1">— {path.human_story.name}</p>
                </div>
              )}

              {path.nextSteps && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">{t.paths.nextSteps}</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    {path.nextSteps.map((step, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-pf-primary">{'→'}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {wildcardPaths.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">{t.paths.wildcardTitle}</h2>
          <p className="text-sm text-gray-500 mb-4">{t.paths.wildcardSubtitle}</p>
          <div className="flex flex-col gap-3">
            {wildcardPaths.map((path) => {
              const color = pathColor(path.id);
              return (
                <div
                  key={path.id}
                  className="bg-white rounded-xl p-4 border-l-4 border border-gray-100"
                  style={{ borderLeftColor: color.border }}
                >
                  <h3 className="font-semibold text-gray-800">{path.name}</h3>
                  <p className="text-sm text-gray-500">{path.tagline}</p>
                  <p className="text-xs text-gray-400 mt-1">{path.meta}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.QUALIFICATIONS })}
        className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer"
      >
        {t.paths.confirmBtn}
      </button>

      {swapTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-gray-800 mb-4">{t.paths.swapBtn}</h3>
            <div className="flex flex-col gap-2">
              {wildcardPaths.map((wc) => (
                <button
                  key={wc.id}
                  onClick={() => handleSwap(swapTarget, wc)}
                  className="text-left p-3 rounded-lg border border-gray-200 hover:border-pf-primary hover:bg-pf-light transition-all cursor-pointer"
                >
                  <span className="font-medium text-gray-800">{wc.name}</span>
                  <span className="text-sm text-gray-500 ml-2">{wc.tagline}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setSwapTarget(null)}
              className="mt-4 text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {t.common.back}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
