import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { ALL_PATHS_WITH_BRIDGES } from '../data/paths.js';
import { pathColor } from '../data/colors.js';

export default function Browse() {
  const { t, lang } = useLang();
  const { dispatch } = usePathFinder();
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('');

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-4xl mx-auto">
      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.WELCOME })}
        className="animate-fade-in inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-pf-primary mb-8 cursor-pointer transition-colors"
      >
        {'\u{2190}'} {t.common.back}
      </button>

      <div className="animate-fade-in-up mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F5C2}\u{FE0F}'}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-pf-text mb-2 tracking-tight">{t.browse.title}</h1>
        <p className="text-gray-400 text-base">{t.browse.subtitle}</p>
      </div>

      <div className="animate-fade-in-up mb-6">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={lang === 'de' ? 'Wege durchsuchen...' : 'Search paths...'}
          className="w-full rounded-xl border-2 border-gray-100 p-3.5 text-sm focus:border-pf-primary focus:ring-1 focus:ring-pf-light focus:outline-none bg-white shadow-sm transition-all placeholder:text-gray-300"
        />
      </div>

      <div className="flex flex-col gap-4">
        {ALL_PATHS_WITH_BRIDGES.filter((path) => {
          if (!filter.trim()) return true;
          const q = filter.toLowerCase();
          return (
            path.name.toLowerCase().includes(q) ||
            path.tagline.toLowerCase().includes(q) ||
            (path.description && path.description.toLowerCase().includes(q))
          );
        }).map((path, i) => {
          const color = pathColor(path.id);
          const isExpanded = expanded === path.id;
          return (
            <div
              key={path.id}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 7)} card-hover bg-white rounded-xl border-l-4 border border-gray-100 shadow-sm overflow-hidden transition-all`}
              style={{ borderLeftColor: color.border }}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold text-white" style={{ backgroundColor: color.border }}>
                        {i + 1}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-gray-800">{path.name}</h3>
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

                    {(path.difficulty || path.timeToStart) && (
                      <div className="flex flex-wrap gap-2">
                        {path.difficulty && (
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            path.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                            path.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {path.difficulty === 'easy' ? (lang === 'de' ? 'Einfach' : 'Easy') :
                             path.difficulty === 'medium' ? (lang === 'de' ? 'Mittel' : 'Medium') :
                             (lang === 'de' ? 'Anspruchsvoll' : 'Challenging')}
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
                        { label: t.comparison.headers.income, value: path.income_now },
                        { label: t.comparison.headers.freedom, value: path.freedom },
                        { label: t.comparison.headers.flexibility, value: path.flexibility },
                        { label: t.comparison.headers.outlook, value: path.outlook },
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
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{lang === 'de' ? 'Formate' : 'Formats'}</p>
                        {path.branches.map(b => (
                          <div key={b.id} className="card-hover p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                            <div className="font-semibold text-sm text-gray-700">{b.name}</div>
                            <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                            <p className="text-xs text-gray-400 mt-1">{b.meta}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {path.nextSteps && (
                      <div className="pt-2">
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

      {/* Deadline calendar */}
      <div className="mt-12">
        <h2 className="font-heading text-xl font-bold text-pf-text mb-2">{t.browse.deadlinesTitle}</h2>
        <p className="text-sm text-gray-400 mb-6">{t.browse.deadlinesSubtitle}</p>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {(() => {
            const deadlines = [
              { month: 'Mai', monthEn: 'May', emoji: '\u{1F4DA}', item: 'OSZ / IBA', desc: 'Anmeldung an Oberstufenzentren (IBA, FOS, Berufliches Gymnasium)', descEn: 'Registration at Oberstufenzentren (IBA, FOS, Berufliches Gymnasium)', color: '#3B82F6' },
              { month: 'Jul', monthEn: 'Jul', emoji: '\u{1F393}', item: 'Uni / FH', desc: 'Bewerbungsfrist für viele Studiengänge (15. Juli)', descEn: 'Application deadline for many study programmes (July 15)', color: '#6C5CE7' },
              { month: 'Jul–Nov', monthEn: 'Jul–Nov', emoji: '\u{1F6E0}\u{FE0F}', item: 'Ausbildung', desc: 'Hauptbewerbungszeit — je früher, desto besser', descEn: 'Main application period — the earlier, the better', color: '#F59E0B' },
              { month: 'Sep', monthEn: 'Sep', emoji: '\u{1F91D}', item: 'EQ', desc: 'Einstiegsqualifizierung startet am 1. Oktober — vorher bewerben', descEn: 'Einstiegsqualifizierung starts October 1 — apply before', color: '#0F6B5B' },
              { month: 'Ganzjährig', monthEn: 'Year-round', emoji: '\u{1F49A}', item: 'FSJ / BFD', desc: 'Plätze gibt es das ganze Jahr — Hauptstart September', descEn: 'Places available year-round — main start September', color: '#14B8A6' },
              { month: 'Ganzjährig', monthEn: 'Year-round', emoji: '\u{1F396}\u{FE0F}', item: 'Bundeswehr', desc: 'Karrierecenter beraten jederzeit — Musterung nach 18', descEn: 'Career centres advise anytime — Musterung after 18', color: '#64748B' },
            ];
            return deadlines.map((d, i) => (
              <div key={i} className={`flex items-start gap-4 p-4 ${i > 0 ? 'border-t border-gray-50' : ''}`}>
                <div className="shrink-0 w-20 text-right">
                  <span className="text-xs font-bold text-pf-primary uppercase">{lang === 'de' ? d.month : d.monthEn}</span>
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
                  <p className="text-xs text-gray-500 mt-0.5">{lang === 'de' ? d.desc : d.descEn}</p>
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
}
