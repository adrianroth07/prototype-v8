import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

const CERT_OPTIONS = ['none', 'hauptschule', 'realschule', 'fachabitur', 'abitur'];
const CERT_MAP = {
  none: null,
  hauptschule: 'Hauptschulabschluss',
  realschule: 'Realschulabschluss',
  fachabitur: 'Fachhochschulreife',
  abitur: 'Abitur',
};

export default function Qualifications() {
  const { t } = useLang();
  const { state, dispatch } = usePathFinder();
  const [cert, setCert] = useState('none');
  const [grade, setGrade] = useState('');

  function proceed() {
    dispatch({
      type: 'SET_QUALS',
      quals: { ...state.quals, cert: CERT_MAP[cert], overallGrade: grade },
    });
    dispatch({ type: 'NAVIGATE', screen: SCREENS.FIELD_NARROWING });
  }

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-3xl mx-auto">
      <div className="animate-fade-in-up mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F393}'}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-pf-text mb-2 tracking-tight">{t.qualifications.title}</h1>
        <p className="text-gray-400 text-base">{t.qualifications.subtitle}</p>
      </div>

      <div className="animate-fade-in-up stagger-1 mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          {t.qualifications.certLabel}
        </label>
        <div className="flex flex-wrap gap-2.5">
          {CERT_OPTIONS.map((opt, i) => (
            <button
              key={opt}
              onClick={() => setCert(opt)}
              className={`animate-fade-in-up stagger-${i + 1} px-5 py-2.5 rounded-2xl border-2 text-sm cursor-pointer transition-all ${
                cert === opt
                  ? 'border-pf-primary bg-pf-light text-pf-primary font-semibold shadow-sm shadow-pf-primary/10'
                  : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              {t.qualifications.certs[opt]}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-fade-in-up stagger-2 mb-10">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.qualifications.gradeLabel}
        </label>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="z.B. 2,3"
          className="w-36 rounded-2xl border-2 border-gray-100 p-3.5 text-sm focus:border-pf-primary focus:ring-1 focus:ring-pf-light focus:outline-none bg-white shadow-sm transition-all placeholder:text-gray-300"
        />
      </div>

      {state.filterResult && Object.keys(state.filterResult).length > 0 && (
        <div className="animate-fade-in mb-10 space-y-3">
          {state.suggestedPaths.map((path, i) => {
            const result = state.filterResult[path.id];
            if (!result) return null;
            return (
              <div
                key={path.id}
                className={`animate-fade-in-up stagger-${i + 1} flex items-center gap-3 text-sm p-4 rounded-2xl border ${
                  result.open
                    ? 'bg-mint-50 border-mint-500/20 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <span className="text-lg">{result.open ? '\u{2705}' : '\u{274C}'}</span>
                <div>
                  <span className="font-semibold">{path.name}</span>
                  {result.note && <span className="ml-1.5 text-xs opacity-75">{result.note}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={proceed}
        className="animate-fade-in-up stagger-3 btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-2xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
      >
        {t.qualifications.continueBtn}
      </button>
    </div>
  );
}
