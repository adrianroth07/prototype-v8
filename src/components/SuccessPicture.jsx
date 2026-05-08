import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import Reveal from './ui/Reveal.jsx';

export default function SuccessPicture() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  function proceed() {
    dispatch({ type: 'SET_SUCCESS_PICTURE', text });
    setLoading(true);
    dispatch({ type: 'COMPUTE_RESULTS' });
    setTimeout(() => {
      setLoading(false);
      dispatch({ type: 'NAVIGATE', screen: SCREENS.PATHS });
    }, 1800);
  }

  function skip() {
    setLoading(true);
    dispatch({ type: 'COMPUTE_RESULTS' });
    setTimeout(() => {
      setLoading(false);
      dispatch({ type: 'NAVIGATE', screen: SCREENS.PATHS });
    }, 1800);
  }

  if (loading) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-6">
        <div className="animate-float">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-pf-light">
            <span className="text-4xl">{'\u{1F9ED}'}</span>
          </div>
        </div>
        <p className="font-heading text-xl font-bold text-pf-text">
          {t.loading?.finding || 'Finding your paths...'}
        </p>
        <div className="relative flex gap-2">
          <div className="absolute inset-0 -m-8 rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(15,107,91,0.05) 0%, transparent 70%)' }} />
          <div className="loading-dot w-3 h-3 rounded-full bg-pf-primary relative" />
          <div className="loading-dot w-3 h-3 rounded-full bg-pf-primary relative" />
          <div className="loading-dot w-3 h-3 rounded-full bg-pf-primary relative" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <div className="hidden md:flex bg-gradient-to-b from-pf-primary to-pf-dark text-white p-14 md:w-[400px] flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-24 right-6 w-32 h-32 rounded-full border-2 border-white" />
          <div className="absolute bottom-12 left-10 w-16 h-16 rounded-full border border-white" />
        </div>
        <Reveal>
          <div className="relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-6">
              <span className="text-2xl">{'\u{2728}'}</span>
            </div>
            <h1 className="font-heading text-3xl font-bold mb-3 tracking-tight">{t.successPicture.title}</h1>
            <p className="text-pf-mid text-base leading-relaxed">{t.successPicture.subtitle}</p>
          </div>
        </Reveal>
      </div>

      {/* Mobile header */}
      <div className="md:hidden px-6 pt-8 pb-2">
        <h1 className="font-heading text-2xl font-bold text-pf-text mb-1">{t.successPicture.title}</h1>
        <p className="text-sm text-gray-400">{t.successPicture.subtitle}</p>
      </div>

      <div className="flex-1 p-6 md:p-14 flex flex-col max-w-xl">
        <Reveal variant="blur">
          <div className="mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pf-light text-pf-primary text-xs font-bold uppercase tracking-wider mb-6">
              <span>{'\u{1F4AD}'}</span> {t.successPicture.title}
            </div>
          </div>

          <div className={`rounded-xl transition-all ${focused ? 'p-[2px] bg-gradient-to-b from-pf-primary to-pf-accent' : 'p-0'}`}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={t.successPicture.placeholder}
              rows={8}
              className="w-full rounded-xl border-2 border-gray-100 p-5 text-base text-gray-700 leading-relaxed focus:border-transparent focus:ring-0 focus:outline-none resize-none bg-white shadow-sm transition-all placeholder:text-gray-300"
              style={{ minHeight: '180px' }}
            />
          </div>

          <div className="flex items-center gap-3 mt-auto pt-6">
            <button
              onClick={proceed}
              className="btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
            >
              {t.successPicture.continueBtn}
            </button>
            <button
              onClick={skip}
              className="px-6 py-3.5 text-gray-400 hover:text-gray-600 font-medium cursor-pointer transition-colors"
            >
              {t.successPicture.skipBtn}
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
