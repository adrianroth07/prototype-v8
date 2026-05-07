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
      <div className="bg-gradient-to-b from-pf-primary to-pf-dark text-white p-10 md:p-14 md:w-[400px] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-24 right-6 w-32 h-32 rounded-full border-2 border-white" />
          <div className="absolute bottom-12 left-10 w-16 h-16 rounded-full border border-white" />
        </div>
        <div className="relative">
          <div className="animate-fade-in-up inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-6">
            <span className="text-2xl">{'\u{2728}'}</span>
          </div>
          <h1 className="animate-fade-in-up stagger-1 text-3xl font-bold mb-3 tracking-tight">{t.successPicture.title}</h1>
          <p className="animate-fade-in-up stagger-2 text-pf-mid text-base leading-relaxed">{t.successPicture.subtitle}</p>
        </div>
      </div>

      <div className="flex-1 p-8 md:p-14 flex flex-col max-w-xl">
        <div className="animate-fade-in-up stagger-1 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pf-light text-pf-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span>{'\u{1F4AD}'}</span> {t.successPicture.title}
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.successPicture.placeholder}
          rows={8}
          className="animate-fade-in-up stagger-2 w-full rounded-2xl border-2 border-gray-100 p-5 text-sm text-gray-700 leading-relaxed focus:border-pf-primary focus:ring-1 focus:ring-pf-light focus:outline-none resize-none bg-white shadow-sm transition-all placeholder:text-gray-300"
        />

        <div className="animate-fade-in-up stagger-3 flex items-center gap-3 mt-auto pt-6">
          <button
            onClick={proceed}
            className="btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-2xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
          >
            {t.successPicture.continueBtn}
          </button>
          <button
            onClick={() => {
              dispatch({ type: 'COMPUTE_RESULTS' });
              dispatch({ type: 'NAVIGATE', screen: SCREENS.PATHS });
            }}
            className="px-6 py-3.5 text-gray-400 hover:text-gray-600 font-medium cursor-pointer transition-colors"
          >
            {t.successPicture.skipBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
