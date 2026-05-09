import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { l } from '../utils/localize.js';
import Reveal from './ui/Reveal.jsx';

const CERT_OPTIONS = ['none', 'hauptschule', 'realschule', 'fachabitur', 'abitur'];
const CERT_PATH_COUNT = { none: 5, hauptschule: 7, realschule: 8, fachabitur: 9, abitur: 9 };
const CERT_MAP = {
  none: null,
  hauptschule: 'Hauptschulabschluss',
  realschule: 'Realschulabschluss',
  fachabitur: 'Fachhochschulreife',
  abitur: 'Abitur',
};
const CERT_HINTS = {
  de: {
    none: 'IBA, EQ, BVJ',
    hauptschule: 'Ausbildung, IBA, EQ',
    realschule: 'Ausbildung, FOS, FSJ',
    fachabitur: 'FH, Duales Studium, Ausbildung',
    abitur: 'Uni, FH, Duales Studium, Ausbildung',
  },
  en: {
    none: 'IBA, EQ, BVJ',
    hauptschule: 'Ausbildung, IBA, EQ',
    realschule: 'Ausbildung, FOS, FSJ',
    fachabitur: 'FH, Duales Studium, Ausbildung',
    abitur: 'Uni, FH, Duales Studium, Ausbildung',
  },
};

export default function Qualifications() {
  const { t, lang } = useLang();
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
      <Reveal>
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pf-light mb-4">
            <span className="text-2xl">{'\u{1F393}'}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-black text-pf-text mb-2 tracking-tight">{t.qualifications.title}</h1>
          <p className="text-gray-400 text-base">{t.qualifications.subtitle}</p>
        </div>
      </Reveal>

      <Reveal variant="up" delay={100}>
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          {t.qualifications.certLabel}
        </label>
        <div className="flex flex-col gap-3">
          {CERT_OPTIONS.map((opt, i) => (
            <Reveal key={opt} delay={i * 80}>
            <button
              onClick={() => setCert(opt)}
              className={`w-full text-left p-4 rounded-xl border-2 cursor-pointer transition-all ${
                cert === opt
                  ? 'border-pf-primary bg-pf-light shadow-sm shadow-pf-primary/10'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <div className={`text-sm font-semibold ${cert === opt ? 'text-pf-primary' : 'text-gray-700'}`}>
                {t.qualifications.certs[opt]}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pf-primary rounded-full transition-all duration-500"
                    style={{ width: `${(CERT_PATH_COUNT[opt] / 9) * 100}%` }}
                  />
                </div>
                <span className={`text-[10px] font-bold tabular-nums shrink-0 ${cert === opt ? 'text-pf-primary' : 'text-gray-400'}`}>
                  {CERT_PATH_COUNT[opt]}/9
                </span>
              </div>
              <div className={`text-xs mt-1 ${cert === opt ? 'text-pf-primary/70' : 'text-gray-400'}`}>
                {lang === 'de' ? 'Ermöglicht: ' : 'Unlocks: '}{CERT_HINTS[lang]?.[opt] || CERT_HINTS.en[opt]}
              </div>
            </button>
            </Reveal>
          ))}
        </div>
      </div>
      </Reveal>

      <Reveal variant="up" delay={200}>
      <div className="mb-10">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.qualifications.gradeLabel}
        </label>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder={lang === 'de' ? 'z.B. 2,3' : 'e.g. 2.3'}
          className="w-36 rounded-xl border-2 border-gray-100 p-3.5 text-base focus:border-pf-primary focus:ring-1 focus:ring-pf-light focus:outline-none bg-white shadow-sm transition-all placeholder:text-gray-300"
        />
      </div>
      </Reveal>

      {state.filterResult && Object.keys(state.filterResult).length > 0 && (
        <Reveal variant="up" delay={300}>
        <div className="mb-10 space-y-3">
          {state.suggestedPaths.map((path, i) => {
            const result = state.filterResult[path.id];
            if (!result) return null;
            return (
              <div
                key={path.id}
                className={`flex items-center gap-3 text-sm p-4 rounded-xl border ${
                  result.open
                    ? 'bg-mint-50 border-mint-500/20 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <span className="text-lg">{result.open ? '\u{2705}' : '\u{274C}'}</span>
                <div>
                  <span className="font-semibold">{path.name}</span>
                  {result.note && <span className="ml-1.5 text-xs opacity-75">{l(result.note, lang)}</span>}
                </div>
              </div>
            );
          })}
        </div>
        </Reveal>
      )}

      <Reveal variant="up" delay={400}>
      <p className="text-xs text-gray-400 italic mb-6">
        {t.common.canChange}
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.PATHS })}
          className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
        >
          {'←'} {t.common.back}
        </button>
        <button
          onClick={proceed}
          className="btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
        >
          {t.qualifications.continueBtn}
        </button>
      </div>
      </Reveal>
    </div>
  );
}
