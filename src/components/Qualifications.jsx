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
      <h1 className="text-3xl font-bold text-pf-text mb-2">{t.qualifications.title}</h1>
      <p className="text-gray-500 mb-8">{t.qualifications.subtitle}</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t.qualifications.certLabel}
        </label>
        <div className="flex flex-wrap gap-2">
          {CERT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setCert(opt)}
              className={`px-4 py-2 rounded-full border-2 text-sm cursor-pointer transition-all ${
                cert === opt
                  ? 'border-pf-primary bg-pf-light text-pf-primary font-medium'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {t.qualifications.certs[opt]}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.qualifications.gradeLabel}
        </label>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="z.B. 2,3"
          className="w-32 rounded-lg border border-gray-200 p-3 text-sm focus:border-pf-primary focus:outline-none"
        />
      </div>

      {state.filterResult && Object.keys(state.filterResult).length > 0 && (
        <div className="mb-8 space-y-2">
          {state.suggestedPaths.map((path) => {
            const result = state.filterResult[path.id];
            if (!result) return null;
            return (
              <div key={path.id} className={`text-sm p-3 rounded-lg ${result.open ? 'bg-mint-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <span className="font-medium">{path.name}:</span>{' '}
                {result.open ? '\u{2705}' : '\u{274C}'} {result.note || ''}
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={proceed}
        className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer"
      >
        {t.qualifications.continueBtn}
      </button>
    </div>
  );
}
