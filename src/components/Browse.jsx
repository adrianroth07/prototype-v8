import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { ALL_PATHS } from '../data/paths.js';
import { pathColor } from '../data/colors.js';

export default function Browse() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-4xl mx-auto">
      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.WELCOME })}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 cursor-pointer"
      >
        {t.common.back}
      </button>

      <h1 className="text-3xl font-bold text-pf-text mb-2">{t.browse.title}</h1>
      <p className="text-gray-500 mb-8">{t.browse.subtitle}</p>

      <div className="flex flex-col gap-4">
        {ALL_PATHS.map((path) => {
          const color = pathColor(path.id);
          const isExpanded = expanded === path.id;
          return (
            <div
              key={path.id}
              className="bg-white rounded-xl border-l-4 border border-gray-100 overflow-hidden"
              style={{ borderLeftColor: color.border }}
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800">{path.name}</h3>
                <p className="text-sm text-gray-500">{path.tagline}</p>
                <p className="text-xs text-gray-400 mt-1">{path.meta}</p>

                {isExpanded && (
                  <div className="mt-4 space-y-3 text-sm text-gray-600">
                    <p>{path.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="font-medium text-gray-500">Income:</span> {path.income_now}</div>
                      <div><span className="font-medium text-gray-500">Freedom:</span> {path.freedom}</div>
                      <div><span className="font-medium text-gray-500">Flexibility:</span> {path.flexibility}</div>
                      <div><span className="font-medium text-gray-500">Outlook:</span> {path.outlook}</div>
                    </div>
                    {path.human_story && (
                      <div className="p-3 bg-surface rounded-lg">
                        <p className="italic text-gray-600">"{path.human_story.quote}"</p>
                        <p className="text-xs text-gray-400 mt-1">— {path.human_story.name}</p>
                      </div>
                    )}
                    {path.branches && (
                      <div className="space-y-2">
                        {path.branches.map(b => (
                          <div key={b.id} className="p-3 bg-surface-alt rounded-lg">
                            <div className="font-medium text-gray-700">{b.name}</div>
                            <p className="text-xs text-gray-500">{b.desc}</p>
                            <p className="text-xs text-gray-400 mt-1">{b.meta}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setExpanded(isExpanded ? null : path.id)}
                  className="text-xs text-pf-primary font-medium mt-3 cursor-pointer hover:underline"
                >
                  {isExpanded ? t.browse.collapseBtn : t.browse.expandBtn}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
