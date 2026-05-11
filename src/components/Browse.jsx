import { useState, useEffect } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { ALL_PATHS_WITH_BRIDGES } from '../data/paths.js';
import { pathColor } from '../data/colors.js';
import { l } from '../utils/localize.js';
import Reveal from './ui/Reveal.jsx';

export default function Browse() {
  const { t, lang } = useLang();
  const { dispatch } = usePathFinder();
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState([]);
  const [comparing, setComparing] = useState(false);

  const toggleSelect = (pathId) => {
    setSelected((prev) => {
      if (prev.includes(pathId)) return prev.filter((id) => id !== pathId);
      if (prev.length >= 3) return prev;
      return [...prev, pathId];
    });
  };

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        if (comparing) setComparing(false);
        else if (expanded) setExpanded(null);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [comparing, expanded]);

  const selectedPaths = ALL_PATHS_WITH_BRIDGES.filter((p) => selected.includes(p.id));

  const comparisonRows = [
    { key: 'tagline', label: t.browse.description, get: (p) => l(p.tagline, lang) },
    { key: 'income_now', label: t.comparison.headers.income, get: (p) => l(p.income_now, lang) },
    { key: 'freedom', label: t.comparison.headers.freedom, get: (p) => l(p.freedom, lang) },
    { key: 'flexibility', label: t.comparison.headers.flexibility, get: (p) => l(p.flexibility, lang) },
    { key: 'outlook', label: t.comparison.headers.outlook, get: (p) => l(p.outlook, lang) },
    {
      key: 'difficulty',
      label: t.browse.difficulty,
      get: (p) => {
        if (!p.difficulty) return '\u{2014}';
        if (p.difficulty === 'easy') return t.browse.difficultyEasy;
        if (p.difficulty === 'medium') return t.browse.difficultyMedium;
        return t.browse.difficultyHard;
      },
    },
    {
      key: 'timeToStart',
      label: t.browse.timeToStart,
      get: (p) => (p.timeToStart ? (p.timeToStart[lang] || p.timeToStart) : '\u{2014}'),
    },
    { key: 'meta', label: 'Tags', get: (p) => l(p.meta, lang) },
  ];

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-4xl mx-auto relative">
      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.WELCOME })}
        className="animate-fade-in inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-pf-primary mb-8 cursor-pointer transition-colors"
      >
        {'\u{2190}'} {t.common.back}
      </button>

      <Reveal className="mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F5C2}\u{FE0F}'}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-pf-text mb-2 tracking-tight">{t.browse.title}</h1>
        <p className="text-gray-400 text-base">{t.browse.subtitle}</p>
      </Reveal>

      {/* ── Comparison view ── */}
      {comparing && selectedPaths.length >= 2 ? (
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-bold text-pf-text">
              {t.comparison.title}
            </h2>
            <button
              onClick={() => setComparing(false)}
              className="inline-flex items-center gap-1.5 text-sm text-pf-primary font-semibold cursor-pointer hover:text-pf-dark transition-colors"
            >
              {'\u{2190}'} {t.browse.backToBrowse}
            </button>
          </div>

          {/* Mobile: card-based comparison */}
          <Reveal>
            <div className="sm:hidden space-y-4">
              {selectedPaths.map((path) => {
                const color = pathColor(path.id);
                return (
                  <div key={path.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5" style={{ borderLeftWidth: '4px', borderLeftColor: color.border }}>
                    <h3 className="font-heading font-bold text-gray-800 mb-3">{path.name}</h3>
                    <div className="space-y-3">
                      {comparisonRows.map(row => (
                        <div key={row.key}>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{row.label}</div>
                          <div className="text-sm text-gray-700 mt-0.5 leading-relaxed">
                            {row.key === 'difficulty' ? (
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                path.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                path.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                                path.difficulty === 'hard' ? 'bg-red-100 text-red-700' : 'text-gray-400'
                              }`}>{row.get(path)}</span>
                            ) : row.get(path)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Desktop: table comparison */}
          <Reveal>
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-100 shadow-sm bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100 min-w-[120px]">
                      {t.comparison.headers.path}
                    </th>
                    {selectedPaths.map((path) => {
                      const color = pathColor(path.id);
                      return (
                        <th key={path.id} className="text-left p-4 border-b border-gray-100 min-w-[180px]" style={{ backgroundColor: color.bg }}>
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color.border }} />
                            <span className="font-heading font-bold text-gray-800">{path.name}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, ri) => (
                    <tr key={row.key} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-r border-gray-100">{row.label}</td>
                      {selectedPaths.map((path) => (
                        <td key={path.id} className="p-4 text-gray-700 border-r border-gray-50 last:border-r-0">
                          {row.key === 'meta' ? (
                            <div className="flex flex-wrap gap-1.5">
                              {l(path.meta, lang).split(' \u{00B7} ').map((tag, j) => (
                                <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{tag}</span>
                              ))}
                            </div>
                          ) : row.key === 'difficulty' ? (
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              path.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                              path.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                              path.difficulty === 'hard' ? 'bg-red-100 text-red-700' : 'text-gray-400'
                            }`}>{row.get(path)}</span>
                          ) : row.get(path)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setComparing(false);
                setSelected([]);
              }}
              className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
            >
              {t.browse.clearSelection}
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ── Browse cards ── */}
          <Reveal delay={100} className="mb-6">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={t.browse.searchPlaceholder}
              className="w-full rounded-xl border-2 border-gray-100 p-3.5 text-sm focus:border-pf-primary focus:ring-1 focus:ring-pf-light focus:outline-none bg-white shadow-sm transition-all placeholder:text-gray-300"
            />
          </Reveal>

          <div className="flex flex-col gap-4">
            {ALL_PATHS_WITH_BRIDGES.filter((path) => {
              if (!filter.trim()) return true;
              const q = filter.toLowerCase();
              return (
                path.name.toLowerCase().includes(q) ||
                l(path.tagline, lang).toLowerCase().includes(q) ||
                (path.description && l(path.description, lang).toLowerCase().includes(q))
              );
            }).map((path, i) => {
              const color = pathColor(path.id);
              const isExpanded = expanded === path.id;
              const isSelected = selected.includes(path.id);
              const atMax = selected.length >= 3 && !isSelected;
              return (
                <Reveal key={path.id} delay={i * 80}>
                <div
                  className={`card-hover bg-white rounded-xl border-l-4 border shadow-sm overflow-hidden transition-all ${
                    isSelected ? 'border-pf-primary ring-2 ring-pf-light' : 'border-gray-100'
                  }`}
                  style={{ borderLeftColor: color.border }}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold text-white" style={{ backgroundColor: color.border }}>
                            {i + 1}
                          </span>
                          <h3 className="font-heading text-lg font-bold text-gray-800">{path.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{l(path.tagline, lang)}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {l(path.meta, lang).split(' \u{00B7} ').map((tag, j) => (
                            <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Selection checkbox */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSelect(path.id); }}
                        disabled={atMax}
                        className={`shrink-0 ml-3 mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-pf-primary border-pf-primary text-white'
                            : atMax
                              ? 'border-gray-200 text-transparent cursor-not-allowed opacity-40'
                              : 'border-gray-300 hover:border-pf-primary text-transparent'
                        }`}
                        aria-label={isSelected
                          ? (lang === 'de' ? `${path.name} abw\u{00E4}hlen` : `Deselect ${path.name}`)
                          : (lang === 'de' ? `${path.name} ausw\u{00E4}hlen` : `Select ${path.name}`)
                        }
                        title={atMax
                          ? t.browse.maxPaths
                          : isSelected
                            ? t.browse.deselect
                            : t.browse.selectToCompare
                        }
                      >
                        {isSelected && (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateRows: isExpanded ? '1fr' : '0fr',
                        transition: 'grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <div style={{ overflow: 'hidden', minHeight: 0 }}>
                        <div className="mt-6 space-y-4">
                          <p className="text-sm text-gray-600 leading-relaxed">{l(path.description, lang)}</p>

                          {(path.difficulty || path.timeToStart) && (
                            <div className="flex flex-wrap gap-2">
                              {path.difficulty && (
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                  path.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                  path.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {path.difficulty === 'easy' ? t.browse.difficultyEasy :
                                   path.difficulty === 'medium' ? t.browse.difficultyMedium :
                                   t.browse.difficultyHard}
                                </span>
                              )}
                              {path.timeToStart && (
                                <span className="text-xs px-2.5 py-1 rounded-full bg-pf-light text-pf-primary font-medium">
                                  {path.timeToStart[lang] || path.timeToStart}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { label: t.comparison.headers.income, value: l(path.income_now, lang) },
                              { label: t.comparison.headers.freedom, value: l(path.freedom, lang) },
                              { label: t.comparison.headers.flexibility, value: l(path.flexibility, lang) },
                              { label: t.comparison.headers.outlook, value: l(path.outlook, lang) },
                            ].map(item => (
                              <div key={item.label} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</div>
                                <div className="text-sm text-gray-700">{item.value}</div>
                              </div>
                            ))}
                          </div>

                          {path.human_story && (
                            <div className="p-4 rounded-xl bg-gradient-to-r from-surface to-surface-alt border border-gray-100">
                              <p className="italic text-sm text-gray-600 leading-relaxed">"{l(path.human_story.quote, lang)}"</p>
                              <p className="text-xs text-gray-400 mt-2 font-medium">{'\u{2014}'} {path.human_story.name}</p>
                            </div>
                          )}

                          {path.branches && (
                            <div className="space-y-2">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.browse.formats}</p>
                              {path.branches.map(b => (
                                <div key={b.id} className="card-hover p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                  <div className="font-semibold text-sm text-gray-700">{l(b.name, lang)}</div>
                                  <p className="text-xs text-gray-500 mt-0.5">{l(b.desc, lang)}</p>
                                  <p className="text-xs text-gray-400 mt-1">{l(b.meta, lang)}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {path.nextSteps && (
                            <div className="pt-2">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.paths.nextSteps}</p>
                              <ul className="space-y-2">
                                {(l(path.nextSteps, lang) || []).map((step, j) => (
                                  <li key={j} className="flex gap-2.5 text-sm">
                                    <span className="text-pf-primary shrink-0 mt-0.5">{'\u{2192}'}</span>
                                    <span className="text-gray-500 leading-relaxed">{step}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpanded(isExpanded ? null : path.id)}
                      className="inline-flex items-center gap-1 text-xs text-pf-primary font-semibold mt-4 cursor-pointer hover:text-pf-dark transition-colors"
                    >
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                      {isExpanded ? t.browse.collapseBtn : t.browse.expandBtn}
                    </button>
                  </div>
                </div>
                </Reveal>
              );
            })}
          </div>

          {/* Deadline calendar */}
          <Reveal variant="blur" className="mt-12">
            <h2 className="font-heading text-xl font-bold text-pf-text mb-2">{t.browse.deadlinesTitle}</h2>
            <p className="text-sm text-gray-400 mb-6">{t.browse.deadlinesSubtitle}</p>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {(() => {
                const deadlines = [
                  { month: { de: 'Mai', en: 'May' }, emoji: '\u{1F4DA}', item: 'OSZ / IBA', desc: { de: 'Anmeldung an Oberstufenzentren (IBA, FOS, Berufliches Gymnasium)', en: 'Registration at Oberstufenzentren (IBA, FOS, Berufliches Gymnasium)' }, color: '#3B82F6' },
                  { month: { de: 'Jul', en: 'Jul' }, emoji: '\u{1F393}', item: 'Uni / FH', desc: { de: 'Bewerbungsfrist f\u{00FC}r viele Studieng\u{00E4}nge (15. Juli)', en: 'Application deadline for many study programmes (July 15)' }, color: '#1B8A72' },
                  { month: { de: 'Jul\u{2013}Nov', en: 'Jul\u{2013}Nov' }, emoji: '\u{1F6E0}\u{FE0F}', item: 'Ausbildung', desc: { de: 'Hauptbewerbungszeit \u{2014} je fr\u{00FC}her, desto besser', en: 'Main application period \u{2014} the earlier, the better' }, color: '#F59E0B' },
                  { month: { de: 'Sep', en: 'Sep' }, emoji: '\u{1F91D}', item: 'EQ', desc: { de: 'Einstiegsqualifizierung startet am 1. Oktober \u{2014} vorher bewerben', en: 'Einstiegsqualifizierung starts October 1 \u{2014} apply before' }, color: '#0F6B5B' },
                  { month: { de: 'Ganzj\u{00E4}hrig', en: 'Year-round' }, emoji: '\u{1F49A}', item: 'FSJ / BFD', desc: { de: 'Pl\u{00E4}tze gibt es das ganze Jahr \u{2014} Hauptstart September', en: 'Places available year-round \u{2014} main start September' }, color: '#14B8A6' },
                  { month: { de: 'Ganzj\u{00E4}hrig', en: 'Year-round' }, emoji: '\u{1F396}\u{FE0F}', item: 'Bundeswehr', desc: { de: 'Karrierecenter beraten jederzeit \u{2014} Musterung nach 18', en: 'Career centres advise anytime \u{2014} Musterung after 18' }, color: '#64748B' },
                ];
                return deadlines.map((d, i) => (
                  <div key={i} className={`flex items-start gap-4 p-4 ${i > 0 ? 'border-t border-gray-50' : ''}`}>
                    <div className="shrink-0 w-20 text-right">
                      <span className="text-xs font-bold text-pf-primary uppercase">{l(d.month, lang)}</span>
                    </div>
                    <div className="relative flex flex-col items-center shrink-0">
                      <span className="inline-block w-3 h-3 rounded-full border-2 border-white shadow-sm z-10" style={{ backgroundColor: d.color }} />
                      {i < deadlines.length - 1 && (
                        <span className="absolute top-3 w-0.5 bg-gray-200" style={{ height: 'calc(100% + 16px)' }} />
                      )}
                    </div>
                    <span className="text-lg shrink-0">{d.emoji}</span>
                    <div>
                      <div className="font-semibold text-sm text-gray-800">{d.item}</div>
                      <p className="text-xs text-gray-500 mt-0.5">{l(d.desc, lang)}</p>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </Reveal>

          {/* Spacer so sticky bar doesn't cover last card */}
          {selected.length > 0 && <div className="h-24" />}
        </>
      )}

      {/* ── Sticky compare bar ── */}
      {selected.length >= 1 && !comparing && (
        <div className="fixed bottom-0 inset-x-0 z-50 safe-bottom">
          <div className="card-glass border-t border-gray-200/60 shadow-lg backdrop-blur-xl">
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedPaths.map((path) => {
                    const color = pathColor(path.id);
                    return (
                      <span
                        key={path.id}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border"
                        style={{ backgroundColor: color.bg, borderColor: color.border, color: color.text }}
                      >
                        {path.name}
                        <button
                          onClick={() => toggleSelect(path.id)}
                          className="hover:opacity-70 cursor-pointer transition-opacity"
                          aria-label={lang === 'de' ? `${path.name} entfernen` : `Remove ${path.name}`}
                        >
                          {'\u{00D7}'}
                        </button>
                      </span>
                    );
                  })}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {selected.length} {t.browse.of} {ALL_PATHS_WITH_BRIDGES.length} {t.browse.selectedLabel}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setSelected([])}
                  className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors px-3 py-2"
                >
                  {t.browse.clear}
                </button>
                <button
                  onClick={() => { if (selected.length >= 2) setComparing(true); }}
                  disabled={selected.length < 2}
                  className={`btn-primary bg-gradient-to-b from-pf-primary to-pf-dark text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all ${
                    selected.length >= 2
                      ? 'cursor-pointer shadow-lg shadow-pf-primary/10'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  {t.browse.compare}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
