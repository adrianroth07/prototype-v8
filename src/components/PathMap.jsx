import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { ALL_PATHS, CERT_RANK } from '../data/paths.js';
import { pathColor } from '../data/colors.js';

const CERT_LEVELS = [
  { id: 'bbr', label: 'BBR', fullLabel: '9. Klasse', rank: 1, emoji: '\u{1F4D7}', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200' },
  { id: 'msa', label: 'MSA', fullLabel: '10. Klasse', rank: 2, emoji: '\u{1F4D8}', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200' },
  { id: 'abitur', label: 'Abitur', fullLabel: '12./13. Klasse', rank: 4, emoji: '\u{1F4D5}', gradient: 'from-purple-50 to-pink-50', border: 'border-purple-200' },
];

const LEADS_TO = {
  ausbildung: ['studium', 'freelancing', 'bundeswehr', 'gap-year'],
  studium: ['freelancing', 'gap-year', 'ausbildung', 'bundeswehr'],
  fsj: ['ausbildung', 'studium', 'freelancing', 'bundeswehr'],
  freelancing: ['ausbildung', 'studium'],
  bundeswehr: ['ausbildung', 'studium', 'freelancing'],
  'gap-year': ['ausbildung', 'studium', 'fsj', 'freelancing', 'bundeswehr'],
};

const PATH_EMOJIS = {
  ausbildung: '\u{1F6E0}\u{FE0F}',
  studium: '\u{1F393}',
  fsj: '\u{1F49A}',
  freelancing: '\u{1F4BB}',
  bundeswehr: '\u{1F396}\u{FE0F}',
  'gap-year': '\u{2708}\u{FE0F}',
};

const HORIZON = {
  ausbildung: { emoji: '\u{1F3ED}', text: 'Career in your trade — Meister, Techniker, or team lead' },
  studium: { emoji: '\u{1F4BC}', text: 'Join a company, start research, or launch your own project' },
  fsj: { emoji: '\u{1F331}', text: 'Clarity on your direction — ready for the next step' },
  freelancing: { emoji: '\u{1F680}', text: 'Grow your business, build a team, or pivot anytime' },
  bundeswehr: { emoji: '\u{1F396}\u{FE0F}', text: 'Specialist career, officer track, or civilian transfer with strong skills' },
  'gap-year': { emoji: '\u{1F30D}', text: 'Come back with perspective — ready to commit' },
};

const RECOMMENDED_JOURNEYS = {
  bbr: [
    {
      label: 'The classic',
      desc: 'Learn a trade, then go further',
      steps: ['ausbildung', 'studium'],
    },
    {
      label: 'Earn & grow',
      desc: 'Start hands-on, then go independent',
      steps: ['ausbildung', 'freelancing'],
    },
    {
      label: 'Structure first',
      desc: 'Learn a trade, then serve',
      steps: ['ausbildung', 'bundeswehr'],
    },
  ],
  msa: [
    {
      label: 'Orientation first',
      desc: 'Find your direction, then commit',
      steps: ['fsj', 'ausbildung'],
    },
    {
      label: 'Service & study',
      desc: 'Volunteer year, then university',
      steps: ['fsj', 'studium'],
    },
    {
      label: 'Hands-on start',
      desc: 'Vocational training opens many doors',
      steps: ['ausbildung', 'studium'],
    },
    {
      label: 'Discipline path',
      desc: 'Military experience, then a trade',
      steps: ['bundeswehr', 'ausbildung'],
    },
  ],
  abitur: [
    {
      label: 'Explore, then study',
      desc: 'Take time to find the right fit',
      steps: ['gap-year', 'studium'],
    },
    {
      label: 'Academic path',
      desc: 'Study deep, then go independent',
      steps: ['studium', 'freelancing'],
    },
    {
      label: 'The practical route',
      desc: 'Real skills first, theory later',
      steps: ['ausbildung', 'studium'],
    },
    {
      label: 'Social start',
      desc: 'Give back, gain clarity, then commit',
      steps: ['fsj', 'ausbildung', 'studium'],
    },
    {
      label: 'Self-made',
      desc: 'Travel, build skills, go solo',
      steps: ['gap-year', 'freelancing'],
    },
  ],
};

function pathById(id) {
  return ALL_PATHS.find(p => p.id === id);
}

export default function PathMap() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();
  const [selectedCert, setSelectedCert] = useState(null);
  const [journey, setJourney] = useState([]);
  const [expandedPath, setExpandedPath] = useState(null);

  const certLevel = selectedCert ? CERT_LEVELS.find(c => c.id === selectedCert) : null;
  const userRank = certLevel?.rank ?? null;
  const journeyIds = new Set(journey.map(p => p.id));
  const lastStep = journey.length > 0 ? journey[journey.length - 1] : null;
  const nextOptions = lastStep ? (LEADS_TO[lastStep.id] || []).filter(id => !journeyIds.has(id)) : [];

  function isAccessible(path) {
    if (userRank === null) return true;
    return userRank >= (CERT_RANK[path.minCert] ?? 0);
  }

  function startJourney(path) {
    setJourney([path]);
    setExpandedPath(null);
  }

  function loadRecommended(steps) {
    const paths = steps.map(id => pathById(id)).filter(Boolean);
    setJourney(paths);
    setExpandedPath(null);
  }

  function addStep(pathId) {
    const path = pathById(pathId);
    if (path) {
      setJourney(prev => [...prev, path]);
      setExpandedPath(null);
    }
  }

  function removeFromStep(index) {
    setJourney(prev => prev.slice(0, index));
  }

  function resetJourney() {
    setJourney([]);
    setExpandedPath(null);
  }

  const availablePaths = selectedCert ? ALL_PATHS.filter(p => isAccessible(p)) : [];
  const lockedPaths = selectedCert ? ALL_PATHS.filter(p => !isAccessible(p)) : [];
  const recommendations = selectedCert ? (RECOMMENDED_JOURNEYS[selectedCert] || []) : [];

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-3xl mx-auto">
      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.WELCOME })}
        className="animate-fade-in inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-pf-primary mb-6 cursor-pointer transition-colors"
      >
        {'\u{2190}'} {t.common.back}
      </button>

      <div className="animate-fade-in-up mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F5FA}\u{FE0F}'}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-pf-text mb-2 tracking-tight">{t.map.title}</h1>
        <p className="text-gray-400 text-base">{t.map.subtitle}</p>
      </div>

      {/* Level selector */}
      <div className="animate-fade-in-up stagger-1 mb-8">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Where are you?</p>
        <div className="flex flex-wrap gap-2.5">
          {CERT_LEVELS.map((cert, i) => (
            <button
              key={cert.id}
              onClick={() => { setSelectedCert(prev => prev === cert.id ? null : cert.id); resetJourney(); }}
              className={`animate-fade-in-up stagger-${i + 1} flex items-center gap-2.5 px-5 py-3 rounded-2xl border-2 text-sm cursor-pointer transition-all ${
                selectedCert === cert.id
                  ? `bg-gradient-to-r ${cert.gradient} ${cert.border} font-semibold shadow-sm`
                  : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <span className="text-lg">{cert.emoji}</span>
              <div className="text-left">
                <div className="font-semibold leading-tight">{cert.label}</div>
                <div className="text-xs opacity-60">{cert.fullLabel}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {!selectedCert && (
        <div className="animate-fade-in text-center py-16">
          <span className="text-5xl block mb-4">{'\u{261D}\u{FE0F}'}</span>
          <p className="text-gray-400 text-sm">Choose your qualification level to see what's possible</p>
        </div>
      )}

      {selectedCert && (
        <>
          {/* Summary */}
          <div className="animate-fade-in mb-8 p-4 rounded-2xl bg-pf-light/50 border border-pf-light">
            <p className="text-sm text-pf-primary font-medium">
              {availablePaths.length === ALL_PATHS.length
                ? '\u{1F389} All 6 paths are open to you!'
                : `\u{2705} ${availablePaths.length} paths open to you right now`
              }
            </p>
            {lockedPaths.length > 0 && (
              <p className="text-xs text-pf-primary/60 mt-1">
                {lockedPaths.map(p => p.name).join(', ')} — not yet available at this level, but you can work towards them
              </p>
            )}
          </div>

          {/* Recommended journeys */}
          {journey.length === 0 && recommendations.length > 0 && (
            <div className="animate-fade-in-up mb-10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{'\u{1F4A1}'} Popular paths from {certLevel.label}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendations.map((rec, i) => (
                  <button
                    key={i}
                    onClick={() => loadRecommended(rec.steps)}
                    className={`animate-fade-in-up stagger-${i + 1} card-hover text-left p-4 rounded-2xl border-2 border-gray-100 bg-white cursor-pointer transition-all hover:border-pf-primary hover:shadow-md group`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      {rec.steps.map((id, j) => (
                        <span key={id} className="flex items-center gap-1.5">
                          {j > 0 && <span className="text-gray-300 text-xs">{'\u{2192}'}</span>}
                          <span className="text-base">{PATH_EMOJIS[id]}</span>
                        </span>
                      ))}
                    </div>
                    <div className="font-bold text-sm text-gray-800 group-hover:text-pf-primary transition-colors">{rec.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{rec.desc}</div>
                    <div className="flex items-center gap-1 mt-2">
                      {rec.steps.map((id, j) => {
                        const c = pathColor(id);
                        return (
                          <span key={id} className="flex items-center gap-1">
                            {j > 0 && <span className="text-gray-300 text-[10px]">{'\u{2192}'}</span>}
                            <span className="text-[11px] font-medium" style={{ color: c.text }}>{pathById(id)?.name}</span>
                          </span>
                        );
                      })}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active journey */}
          {journey.length > 0 && (
            <div className="animate-fade-in mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{'\u{1F6A9}'} Your journey</p>
                <button
                  onClick={resetJourney}
                  className="text-xs text-gray-400 hover:text-red-400 cursor-pointer transition-colors"
                >
                  {'\u{21BA}'} Reset
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                {journey.map((path, i) => {
                  const color = pathColor(path.id);
                  return (
                    <div key={`${path.id}-${i}`}>
                      {i > 0 && (
                        <div className="flex items-center gap-2 py-2 pl-5">
                          <div className="w-0.5 h-3 bg-pf-primary/20 rounded-full" />
                          <svg className="w-3.5 h-3.5 text-pf-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                      )}
                      <div className="flex items-center gap-3 group">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ backgroundColor: color.border }}
                        >
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{PATH_EMOJIS[path.id]}</span>
                            <span className="font-bold text-gray-800 text-sm">{path.name}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{path.tagline}</p>
                        </div>
                        {i === journey.length - 1 && journey.length > 1 && (
                          <button
                            onClick={() => removeFromStep(i)}
                            className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 cursor-pointer transition-all p-1"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Horizon — what comes after the last step */}
                {journey.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 py-2 pl-5">
                      <div className="w-0.5 h-3 bg-pf-accent/20 rounded-full" />
                      <svg className="w-3.5 h-3.5 text-pf-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-pf-light/60 to-white border border-pf-light/80">
                      <span className="text-xl">{HORIZON[lastStep.id]?.emoji || '\u{2728}'}</span>
                      <p className="text-sm text-pf-text/80 leading-snug">{HORIZON[lastStep.id]?.text || 'The world is open.'}</p>
                    </div>
                  </div>
                )}

                {/* Next step options */}
                {nextOptions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <p className="text-xs font-semibold text-pf-primary mb-3">{'\u{2795}'} Or keep building:</p>
                    <div className="flex flex-wrap gap-2">
                      {nextOptions.map(id => {
                        const p = pathById(id);
                        const c = pathColor(id);
                        const accessible = p && isAccessible(p);
                        return (
                          <button
                            key={id}
                            onClick={() => accessible && addStep(id)}
                            disabled={!accessible}
                            className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border-2 font-medium transition-all ${
                              accessible
                                ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5'
                                : 'opacity-40 cursor-not-allowed'
                            }`}
                            style={{
                              borderColor: accessible ? c.border : '#d1d5db',
                              color: accessible ? c.text : '#9ca3af',
                              backgroundColor: accessible ? c.bg : '#f9fafb',
                            }}
                          >
                            <span>{PATH_EMOJIS[id]}</span>
                            {p?.name}
                            {!accessible && <span className="text-xs">{'\u{1F512}'}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Lifelong learning message */}
                <div className="mt-5 pt-4 border-t border-gray-50">
                  <p className="text-xs text-gray-400 text-center leading-relaxed italic">
                    No path is final. We learn, grow, and change direction throughout our lives — every step opens new doors.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* All available paths — flat list */}
          <div className="animate-fade-in-up stagger-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              {journey.length > 0 ? '\u{1F4DA} All your options' : '\u{270F}\u{FE0F} Or build your own — pick a starting path'}
            </p>

            <div className="space-y-2.5 mb-6">
              {availablePaths.map((path, i) => {
                const color = pathColor(path.id);
                const inJourney = journeyIds.has(path.id);
                const isExpanded = expandedPath === path.id;
                const canAdd = journey.length > 0 && nextOptions.includes(path.id) && !inJourney;

                return (
                  <div key={path.id} className={`animate-fade-in-up stagger-${Math.min(i + 1, 7)}`}>
                    <div
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        inJourney
                          ? 'border-pf-primary bg-pf-light/50'
                          : isExpanded
                            ? 'border-gray-200 bg-white shadow-md'
                            : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                        style={{ backgroundColor: color.bg }}
                      >
                        {PATH_EMOJIS[path.id]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-800 text-sm">{path.name}</h3>
                          {inJourney && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-pf-primary text-white font-medium">
                              Step {journey.findIndex(j => j.id === path.id) + 1}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{path.tagline}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                          className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors p-1"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {!inJourney && journey.length === 0 && (
                          <button
                            onClick={() => startJourney(path)}
                            className="text-xs px-3 py-1.5 rounded-xl bg-pf-primary text-white font-semibold cursor-pointer hover:bg-pf-dark transition-colors"
                          >
                            Start
                          </button>
                        )}
                        {canAdd && (
                          <button
                            onClick={() => addStep(path.id)}
                            className="text-xs px-3 py-1.5 rounded-xl border-2 border-pf-primary text-pf-primary font-semibold cursor-pointer hover:bg-pf-light transition-colors"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="animate-fade-in mt-1.5 rounded-2xl border border-gray-100 bg-white shadow-sm p-5 space-y-4">
                        <p className="text-sm text-gray-600 leading-relaxed">{path.description}</p>

                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { icon: '\u{1F4B0}', label: 'Income', value: path.income_now },
                            { icon: '\u{1F54A}\u{FE0F}', label: 'Freedom', value: path.freedom },
                            { icon: '\u{1F504}', label: 'Flexibility', value: path.flexibility },
                            { icon: '\u{1F4C8}', label: 'Outlook', value: path.outlook },
                          ].map(item => (
                            <div key={item.label} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                              <div className="text-xs text-gray-400 mb-0.5">{item.icon} {item.label}</div>
                              <div className="text-xs text-gray-700 font-medium">{item.value}</div>
                            </div>
                          ))}
                        </div>

                        {path.human_story && (
                          <div className="p-3.5 rounded-xl bg-gradient-to-r from-surface to-surface-alt border border-gray-100">
                            <p className="italic text-xs text-gray-600 leading-relaxed">"{path.human_story.quote}"</p>
                            <p className="text-xs text-gray-400 mt-1.5 font-medium">{'\u{2014}'} {path.human_story.name}</p>
                          </div>
                        )}

                        {!inJourney && journey.length === 0 && (
                          <button
                            onClick={() => startJourney(path)}
                            className="btn-primary w-full px-6 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all text-sm"
                          >
                            {'\u{1F680}'} Start your journey here
                          </button>
                        )}
                        {canAdd && (
                          <button
                            onClick={() => addStep(path.id)}
                            className="w-full px-6 py-3 border-2 border-pf-primary text-pf-primary font-semibold rounded-xl hover:bg-pf-light cursor-pointer transition-all text-sm"
                          >
                            {'\u{2795}'} Add as step {journey.length + 1}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Locked paths */}
            {lockedPaths.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{'\u{1F512}'} Available with a higher qualification</p>
                <div className="space-y-2">
                  {lockedPaths.map(path => {
                    const color = pathColor(path.id);
                    return (
                      <div
                        key={path.id}
                        className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-100 bg-gray-50/50 opacity-50"
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 bg-gray-100">
                          {'\u{1F512}'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-600 text-sm">{path.name}</h3>
                          <p className="text-xs text-gray-400">{path.tagline}</p>
                          <p className="text-xs text-gray-400 mt-1">Min: {path.minCert}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
