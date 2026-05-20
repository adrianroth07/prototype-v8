import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import Reveal from './ui/Reveal.jsx';

const BLOCK_IDS = ['money', 'family', 'fear', 'comparison', 'info'];
const BLOCK_EMOJIS = {
  money: '\u{1F4B0}',
  family: '\u{1F46A}',
  fear: '\u{1F628}',
  comparison: '\u{2696}\u{FE0F}',
  info: '\u{2753}',
};

export default function Blocks() {
  const { t } = useLang();
  const { state, dispatch } = usePathFinder();
  const [selected, setSelected] = useState(state.blocks || []);
  const [other, setOther] = useState(state.blocksOther || '');

  function toggleBlock(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  }

  function proceed() {
    dispatch({ type: 'SET_BLOCKS', blocks: selected, other });
    dispatch({ type: 'NAVIGATE', screen: SCREENS.SUCCESS_PICTURE });
  }

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <div className="hidden md:flex bg-gradient-to-b from-pf-primary to-pf-dark text-white p-14 md:w-[400px] flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-16 right-12 w-28 h-28 rounded-full border-2 border-white" />
        </div>
        <Reveal>
          <div className="relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-6">
              <span className="text-2xl">{'\u{1F6A7}'}</span>
            </div>
            <h1 className="font-heading text-3xl font-bold mb-3 tracking-tight">{t.blocks.title}</h1>
            <p className="text-pf-mid text-base leading-relaxed">{t.blocks.subtitle}</p>
          </div>
        </Reveal>
      </div>

      <div className="md:hidden px-6 pt-8 pb-2">
        <div className="flex items-center gap-3 mb-1">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pf-light shrink-0">
            <span className="text-xl">{'\u{1F6A7}'}</span>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-pf-text">{t.blocks.title}</h1>
            <p className="text-sm text-gray-400">{t.blocks.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-14 flex flex-col max-w-xl">
        <Reveal variant="scale">
          <div className="grid grid-cols-2 gap-3 mb-8">
            {BLOCK_IDS.map((id) => (
              <button
                key={id}
                onClick={() => toggleBlock(id)}
                className={`flex items-center gap-3 px-4 py-3 min-h-[52px] rounded-xl border-2 text-sm font-medium text-left cursor-pointer transition-all duration-200 ${
                  selected.includes(id)
                    ? 'border-pf-primary bg-pf-primary text-white shadow-sm shadow-pf-primary/10'
                    : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                <span className="text-lg shrink-0">{BLOCK_EMOJIS[id]}</span>
                <span className="leading-tight">{t.blocks.chips[id]}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: selected.length > 0 ? '80px' : '0px',
            opacity: selected.length > 0 ? 1 : 0,
            marginBottom: selected.length > 0 ? '1rem' : '0',
          }}
          aria-live="polite"
        >
          <div className="p-3 rounded-xl bg-pf-light/50 border border-pf-primary/10">
            <p className="text-xs text-pf-primary font-medium leading-relaxed">
              {t.blocks.reassurance}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">{t.blocks.otherLabel}</label>
          <input
            type="text"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            placeholder={t.blocks.otherPlaceholder || (t.blocks.otherLabel + '...')}
            className="w-full rounded-xl border-2 border-gray-100 p-4 text-base focus:border-pf-primary focus:ring-1 focus:ring-pf-light focus:outline-none bg-white shadow-sm transition-all placeholder:text-gray-300"
          />
        </div>

        <div className="flex items-center gap-3 mt-auto pt-4">
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.QUIZ_R2 })}
            className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          >
            {'←'} {t.common.back}
          </button>
          <button
            onClick={proceed}
            className="btn-primary px-10 py-3.5 bg-gradient-to-b from-pf-primary to-pf-dark text-white font-semibold rounded-xl shadow-lg shadow-pf-primary/12 cursor-pointer transition-all"
          >
            {t.blocks.continueBtn}
          </button>
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.SUCCESS_PICTURE })}
            className="btn-tertiary text-gray-400 hover:text-gray-600 font-medium cursor-pointer transition-colors"
          >
            {t.blocks.skipBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
