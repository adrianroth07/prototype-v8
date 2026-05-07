import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

const FIELD_ICONS = {
  roleModel: '\u{1F31F}',
  story: '\u{1F4D6}',
  motto: '\u{1F4AC}',
};

export default function Savickas() {
  const { t } = useLang();
  const { state, dispatch } = usePathFinder();
  const [fields, setFields] = useState(state.savickasAnswers);

  function proceed() {
    dispatch({ type: 'SET_SAVICKAS', answers: fields });
    dispatch({ type: 'NAVIGATE', screen: SCREENS.QUIZ_R2 });
  }

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <div className="bg-gradient-to-b from-pf-primary to-pf-dark text-white p-10 md:p-14 md:w-[400px] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-16 right-8 w-36 h-36 rounded-full border-2 border-white" />
          <div className="absolute bottom-24 left-4 w-20 h-20 rounded-full border border-white" />
        </div>
        <div className="relative">
          <div className="animate-fade-in-up inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-6">
            <span className="text-2xl">{'\u{1F52E}'}</span>
          </div>
          <h1 className="animate-fade-in-up stagger-1 text-3xl font-bold mb-3 tracking-tight">{t.savickas.title}</h1>
          <p className="animate-fade-in-up stagger-2 text-pf-mid text-base leading-relaxed">{t.savickas.subtitle}</p>
        </div>
      </div>

      <div className="flex-1 p-8 md:p-14 flex flex-col gap-6 max-w-xl">
        {['roleModel', 'story', 'motto'].map((key, i) => (
          <div key={key} className={`animate-fade-in-up stagger-${i + 1}`}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-pf-light text-sm">
                {FIELD_ICONS[key]}
              </span>
              {t.savickas[key]}
            </label>
            <textarea
              value={fields[key]}
              onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
              rows={3}
              className="w-full rounded-2xl border-2 border-gray-100 p-4 text-sm text-gray-700 leading-relaxed focus:border-pf-primary focus:ring-1 focus:ring-pf-light focus:outline-none resize-none bg-white shadow-sm transition-all placeholder:text-gray-300"
            />
          </div>
        ))}

        <div className="animate-fade-in-up stagger-4 flex items-center gap-3 mt-auto pt-4">
          <button
            onClick={proceed}
            className="btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-2xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
          >
            {t.savickas.continueBtn}
          </button>
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.QUIZ_R2 })}
            className="px-6 py-3.5 text-gray-400 hover:text-gray-600 font-medium cursor-pointer transition-colors"
          >
            {t.savickas.skipBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
