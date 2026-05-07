import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { ALL_PATHS, CERT_RANK } from '../data/paths.js';
import { pathColor } from '../data/colors.js';

const QUALIFICATIONS = [
  { id: 'none', label: 'Kein Abschluss', rank: 0 },
  { id: 'hauptschule', label: 'Hauptschulabschluss', rank: 1 },
  { id: 'realschule', label: 'Realschulabschluss', rank: 2 },
  { id: 'fachabitur', label: 'Fachhochschulreife', rank: 3 },
  { id: 'abitur', label: 'Abitur', rank: 4 },
];

const LEADS_TO = {
  ausbildung: ['studium', 'freelancing', 'bundeswehr', 'gap-year'],
  studium: ['freelancing', 'gap-year', 'ausbildung', 'bundeswehr'],
  fsj: ['ausbildung', 'studium', 'freelancing', 'bundeswehr'],
  freelancing: ['ausbildung', 'studium'],
  bundeswehr: ['ausbildung', 'studium', 'freelancing'],
  'gap-year': ['ausbildung', 'studium', 'fsj', 'freelancing', 'bundeswehr'],
};

export default function PathBuilder() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();
  const [qualification, setQualification] = useState(null);
  const [journey, setJourney] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const qualRank = qualification ? QUALIFICATIONS.find(q => q.id === qualification)?.rank ?? 0 : 0;

  function getAvailablePaths() {
    const usedIds = new Set(journey.map(p => p.id));
    if (journey.length === 0) {
      return ALL_PATHS.filter(p => {
        const minRank = CERT_RANK[p.minCert] ?? 0;
        return qualRank >= minRank && !usedIds.has(p.id);
      });
    }
    const lastPath = journey[journey.length - 1];
    const nextIds = LEADS_TO[lastPath.id] || [];
    return ALL_PATHS.filter(p => nextIds.includes(p.id) && !usedIds.has(p.id));
  }

  function addPath(path) {
    setJourney([...journey, path]);
    setShowOptions(false);
  }

  function removeLastStep() {
    setJourney(journey.slice(0, -1));
  }

  const available = qualification ? getAvailablePaths() : [];

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-3xl mx-auto">
      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.WELCOME })}
        className="animate-fade-in inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-pf-primary mb-8 cursor-pointer transition-colors"
      >
        {'\u{2190}'} {t.common.back}
      </button>

      <div className="animate-fade-in-up mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F3D7}\u{FE0F}'}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-pf-text mb-2 tracking-tight">{t.builder.title}</h1>
        <p className="text-gray-400 text-base">{t.builder.subtitle}</p>
      </div>

      <div className="animate-fade-in-up stagger-1 mb-10">
        <label className="block text-sm font-semibold text-gray-700 mb-4">{t.builder.qualLabel}</label>
        <div className="flex flex-wrap gap-2.5">
          {QUALIFICATIONS.map((q, i) => (
            <button
              key={q.id}
              onClick={() => { setQualification(q.id); setJourney([]); setShowOptions(false); }}
              className={`animate-fade-in-up stagger-${i + 1} px-5 py-2.5 rounded-2xl border-2 text-sm cursor-pointer transition-all ${
                qualification === q.id
                  ? 'border-pf-primary bg-pf-light text-pf-primary font-semibold shadow-sm shadow-pf-primary/10'
                  : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {journey.length > 0 && (
        <div className="animate-fade-in mb-8 space-y-0">
          {journey.map((path, i) => {
            const color = pathColor(path.id);
            return (
              <div key={path.id} className="animate-fade-in-up">
                {i > 0 && (
                  <div className="flex justify-center py-2">
                    <div className="flex flex-col items-center gap-0.5 text-pf-primary">
                      <div className="w-0.5 h-4 bg-pf-primary/30 rounded-full" />
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                )}
                <div
                  className="card-hover bg-white rounded-2xl p-5 border-l-4 border border-gray-100 shadow-sm"
                  style={{ borderLeftColor: color.border }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold text-white mt-0.5" style={{ backgroundColor: color.border }}>
                        {i + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-pf-primary uppercase tracking-wider">{t.builder.step} {i + 1}</span>
                        <h3 className="font-bold text-gray-800 text-lg">{path.name}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{path.tagline}</p>
                      </div>
                    </div>
                    {i === journey.length - 1 && (
                      <button
                        onClick={removeLastStep}
                        className="text-gray-300 hover:text-red-400 cursor-pointer transition-colors p-1"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {qualification && (
        <div className="animate-fade-in">
          {!showOptions ? (
            <button
              onClick={() => setShowOptions(true)}
              disabled={available.length === 0}
              className="group flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-200 text-gray-400 rounded-2xl hover:border-pf-primary hover:text-pf-primary hover:bg-pf-light/30 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-current group-hover:bg-pf-primary group-hover:text-white transition-all text-xs">+</span>
              {t.builder.addStep}
            </button>
          ) : (
            <div className="animate-scale-in grid grid-cols-1 sm:grid-cols-2 gap-3">
              {available.map(path => {
                const color = pathColor(path.id);
                return (
                  <button
                    key={path.id}
                    onClick={() => addPath(path)}
                    className="card-hover text-left p-4 rounded-2xl border-2 border-gray-100 bg-white hover:border-pf-primary hover:bg-pf-light/30 transition-all cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color.border }} />
                      <span className="font-semibold text-sm text-gray-800">{path.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-5">{path.tagline}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {journey.length > 0 && (
        <button
          onClick={() => { setJourney([]); setShowOptions(false); }}
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
        >
          {'\u{21BA}'} {t.builder.reset}
        </button>
      )}
    </div>
  );
}
