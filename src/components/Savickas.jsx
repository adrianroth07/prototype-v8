import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

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
      <div className="bg-pf-primary text-white p-8 md:p-12 md:w-[360px] flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-2">{t.savickas.title}</h1>
        <p className="text-pf-mid text-sm">{t.savickas.subtitle}</p>
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col gap-6">
        {['roleModel', 'story', 'motto'].map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.savickas[key]}
            </label>
            <textarea
              value={fields[key]}
              onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-pf-primary focus:outline-none resize-none"
            />
          </div>
        ))}

        <div className="flex gap-3 mt-auto">
          <button
            onClick={proceed}
            className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer"
          >
            {t.savickas.continueBtn}
          </button>
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.QUIZ_R2 })}
            className="px-8 py-3 text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
          >
            {t.savickas.skipBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
