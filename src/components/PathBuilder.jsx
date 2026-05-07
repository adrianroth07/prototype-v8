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
  ausbildung: ['studium', 'freelancing', 'bundeswehr'],
  studium: ['freelancing', 'gap-year'],
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
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 cursor-pointer"
      >
        {t.common.back}
      </button>

      <h1 className="text-3xl font-bold text-pf-text mb-2">{t.builder.title}</h1>
      <p className="text-gray-500 mb-8">{t.builder.subtitle}</p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">{t.builder.qualLabel}</label>
        <div className="flex flex-wrap gap-2">
          {QUALIFICATIONS.map(q => (
            <button
              key={q.id}
              onClick={() => { setQualification(q.id); setJourney([]); setShowOptions(false); }}
              className={`px-4 py-2 rounded-full border-2 text-sm cursor-pointer transition-all ${
                qualification === q.id
                  ? 'border-pf-primary bg-pf-light text-pf-primary font-medium'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {journey.length > 0 && (
        <div className="mb-6 space-y-3">
          {journey.map((path, i) => {
            const color = pathColor(path.id);
            return (
              <div key={path.id}>
                {i > 0 && <div className="flex justify-center py-1 text-gray-300">{'\u{2193}'}</div>}
                <div
                  className="bg-white rounded-xl p-4 border-l-4 border border-gray-100"
                  style={{ borderLeftColor: color.border }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-pf-primary">{t.builder.step} {i + 1}</span>
                      <h3 className="font-semibold text-gray-800">{path.name}</h3>
                      <p className="text-sm text-gray-500">{path.tagline}</p>
                    </div>
                    {i === journey.length - 1 && (
                      <button
                        onClick={removeLastStep}
                        className="text-xs text-gray-400 hover:text-red-500 cursor-pointer"
                      >
                        {'\u{2715}'}
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
        <div>
          {!showOptions ? (
            <button
              onClick={() => setShowOptions(true)}
              disabled={available.length === 0}
              className="px-6 py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-pf-primary hover:text-pf-primary transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              + {t.builder.addStep}
            </button>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {available.map(path => {
                const color = pathColor(path.id);
                return (
                  <button
                    key={path.id}
                    onClick={() => addPath(path)}
                    className="text-left p-3 rounded-xl border-2 border-gray-200 hover:border-pf-primary hover:bg-pf-light transition-all cursor-pointer"
                  >
                    <div className="font-medium text-sm text-gray-800" style={{ color: color.text }}>
                      {path.name}
                    </div>
                    <div className="text-xs text-gray-500">{path.tagline}</div>
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
          className="mt-6 text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {t.builder.reset}
        </button>
      )}
    </div>
  );
}
