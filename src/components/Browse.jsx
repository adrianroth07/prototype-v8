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
        className="animate-fade-in inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-pf-primary mb-8 cursor-pointer transition-colors"
      >
        {'\u{2190}'} {t.common.back}
      </button>

      <div className="animate-fade-in-up mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F5C2}\u{FE0F}'}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-pf-text mb-2 tracking-tight">{t.browse.title}</h1>
        <p className="text-gray-400 text-base">{t.browse.subtitle}</p>
      </div>

      <div className="flex flex-col gap-4">
        {ALL_PATHS.map((path, i) => {
          const color = pathColor(path.id);
          const isExpanded = expanded === path.id;
          return (
            <div
              key={path.id}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 7)} card-hover bg-white rounded-2xl border-l-4 border border-gray-100 shadow-sm overflow-hidden transition-all`}
              style={{ borderLeftColor: color.border }}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold text-white" style={{ backgroundColor: color.border }}>
                        {i + 1}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800">{path.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{path.tagline}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {path.meta.split(' · ').map((tag, j) => (
                        <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="animate-fade-in mt-6 space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{path.description}</p>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Income', value: path.income_now },
                        { label: 'Freedom', value: path.freedom },
                        { label: 'Flexibility', value: path.flexibility },
                        { label: 'Outlook', value: path.outlook },
                      ].map(item => (
                        <div key={item.label} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</div>
                          <div className="text-sm text-gray-700">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    {path.human_story && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-surface to-surface-alt border border-gray-100">
                        <p className="italic text-sm text-gray-600 leading-relaxed">"{path.human_story.quote}"</p>
                        <p className="text-xs text-gray-400 mt-2 font-medium">{'\u{2014}'} {path.human_story.name}</p>
                      </div>
                    )}

                    {path.branches && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Branches</p>
                        {path.branches.map(b => (
                          <div key={b.id} className="card-hover p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                            <div className="font-semibold text-sm text-gray-700">{b.name}</div>
                            <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                            <p className="text-xs text-gray-400 mt-1">{b.meta}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setExpanded(isExpanded ? null : path.id)}
                  className="inline-flex items-center gap-1 text-xs text-pf-primary font-semibold mt-4 cursor-pointer hover:text-pf-dark transition-colors"
                >
                  {isExpanded ? '\u{25B2}' : '\u{25BC}'} {isExpanded ? t.browse.collapseBtn : t.browse.expandBtn}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
