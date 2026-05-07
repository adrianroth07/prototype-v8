import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

export default function SuccessPicture() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();
  const [text, setText] = useState('');

  function proceed() {
    dispatch({ type: 'SET_SUCCESS_PICTURE', text });
    dispatch({ type: 'COMPUTE_RESULTS' });
    dispatch({ type: 'NAVIGATE', screen: SCREENS.PATHS });
  }

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <div className="bg-pf-primary text-white p-8 md:p-12 md:w-[360px] flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-2">{t.successPicture.title}</h1>
        <p className="text-pf-mid text-sm">{t.successPicture.subtitle}</p>
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.successPicture.placeholder}
          rows={6}
          className="w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-pf-primary focus:outline-none resize-none mb-6"
        />

        <div className="flex gap-3 mt-auto">
          <button
            onClick={proceed}
            className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer"
          >
            {t.successPicture.continueBtn}
          </button>
          <button
            onClick={() => {
              dispatch({ type: 'COMPUTE_RESULTS' });
              dispatch({ type: 'NAVIGATE', screen: SCREENS.PATHS });
            }}
            className="px-8 py-3 text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
          >
            {t.successPicture.skipBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
