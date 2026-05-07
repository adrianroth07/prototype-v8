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
      <div className="animate-fade-in-up mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{2728}'}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-pf-text mb-2 tracking-tight">{t.paths.title}</h1>
        <p className="text-gray-400 text-base">{t.paths.subtitle}</p>
      </div>

      <div className="flex flex-col gap-5 mb-10">
        {suggestedPaths.map((path, i) => {
          const color = pathColor(path.id);
          return (
            <div
              key={path.id}
              className={`animate-fade-in-up stagger-${i + 1} card-hover bg-white rounded-2xl p-6 md:p-8 border-l-4 border border-gray-100 shadow-sm`}
              style={{ borderLeftColor: color.border }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold text-white" style={{ backgroundColor: color.border }}>
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800">{path.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{path.tagline}</p>
                </div>
                {wildcardPaths.length > 0 && (
                  <button
                    onClick={() => setSwapTarget(path.id)}
                    className="text-xs text-gray-400 hover:text-pf-primary cursor-pointer border border-gray-200 hover:border-pf-primary rounded-lg px-3 py-1.5 transition-all"
                  >
                    {'\u{21C4}'} {t.paths.swapBtn}
                  </button>
                )}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">{reasons[path.id]}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {path.meta.split(' · ').map((tag, j) => (
                  <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                    {tag}
                  </span>
                ))}
              </div>

              {path.human_story && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-surface to-surface-alt border border-gray-100">
                  <p className="italic text-sm text-gray-600 leading-relaxed">"{path.human_story.quote}"</p>
                  <p className="text-xs text-gray-400 mt-2 font-medium">{'\u{2014}'} {path.human_story.name}</p>
                </div>
              )}

              {path.nextSteps && (
                <div className="mt-5 pt-4 border-t border-gray-50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.paths.nextSteps}</p>
                  <ul className="space-y-2">
                    {path.nextSteps.map((step, j) => (
                      <li key={j} className="flex gap-2.5 text-sm">
                        <span className="text-pf-primary shrink-0 mt-0.5">{'\u{2192}'}</span>
                        <span className="text-gray-500 leading-relaxed">{step}</span>
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
        <div className="animate-fade-in-up mb-10">
          <h2 className="text-lg font-bold text-gray-700 mb-2">{t.paths.wildcardTitle}</h2>
          <p className="text-sm text-gray-400 mb-4">{t.paths.wildcardSubtitle}</p>
          <div className="flex flex-col gap-3">
            {wildcardPaths.map((path) => {
              const color = pathColor(path.id);
              return (
                <div
                  key={path.id}
                  className="card-hover bg-white rounded-xl p-5 border-l-4 border border-gray-100 shadow-sm"
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
        className="btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-2xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
      >
        {t.paths.confirmBtn}
      </button>

      {swapTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setSwapTarget(null)}>
          <div className="animate-scale-in bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-800 mb-4 text-lg">{t.paths.swapBtn}</h3>
            <div className="flex flex-col gap-2">
              {wildcardPaths.map((wc) => {
                const color = pathColor(wc.id);
                return (
                  <button
                    key={wc.id}
                    onClick={() => handleSwap(swapTarget, wc)}
                    className="card-hover text-left p-4 rounded-xl border-2 border-gray-100 hover:border-pf-primary hover:bg-pf-light transition-all cursor-pointer"
                  >
                    <span className="font-semibold text-gray-800">{wc.name}</span>
                    <span className="text-sm text-gray-500 ml-2">{wc.tagline}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setSwapTarget(null)}
              className="mt-4 text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
            >
              {'\u{2190}'} {t.common.back}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
