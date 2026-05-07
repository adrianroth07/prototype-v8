import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

const BLOCK_IDS = ['money', 'family', 'fear', 'comparison', 'info'];

export default function Blocks() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();
  const [selected, setSelected] = useState([]);
  const [other, setOther] = useState('');

  function toggleBlock(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  }

  function proceed() {
    dispatch({ type: 'SET_BLOCKS', blocks: selected, other });
    dispatch({ type: 'NAVIGATE', screen: SCREENS.SUCCESS_PICTURE });
  }

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <div className="bg-pf-primary text-white p-8 md:p-12 md:w-[360px] flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-2">{t.blocks.title}</h1>
        <p className="text-pf-mid text-sm">{t.blocks.subtitle}</p>
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-6">
          {BLOCK_IDS.map((id) => (
            <button
              key={id}
              onClick={() => toggleBlock(id)}
              className={`px-4 py-2 rounded-full border-2 text-sm cursor-pointer transition-all ${
                selected.includes(id)
                  ? 'border-pf-primary bg-pf-light text-pf-primary font-medium'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {t.blocks.chips[id]}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">{t.blocks.otherLabel}</label>
          <input
            type="text"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-pf-primary focus:outline-none"
          />
        </div>

        <div className="flex gap-3 mt-auto">
          <button
            onClick={proceed}
            className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer"
          >
            {t.blocks.continueBtn}
          </button>
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.SUCCESS_PICTURE })}
            className="px-8 py-3 text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
          >
            {t.blocks.skipBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
