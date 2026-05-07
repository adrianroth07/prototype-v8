import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

const CLUSTER_IDS = ['hands-on', 'people', 'creative', 'analytical', 'nature', 'business'];
const CLUSTER_EMOJIS = {
  'hands-on': '\u{1F6E0}\u{FE0F}',
  'people': '\u{1F91D}',
  'creative': '\u{1F3A8}',
  'analytical': '\u{1F4CA}',
  'nature': '\u{1F33F}',
  'business': '\u{1F4BC}',
};

export default function FieldNarrowing() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();
  const [selected, setSelected] = useState([]);

  function toggle(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  }

  function proceed() {
    dispatch({ type: 'SET_CLUSTERS', clusters: selected });
    dispatch({ type: 'NAVIGATE', screen: SCREENS.COMPARISON });
  }

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-pf-text mb-2">{t.fieldNarrowing.title}</h1>
      <p className="text-gray-500 mb-8">{t.fieldNarrowing.subtitle}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {CLUSTER_IDS.map((id) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
              selected.includes(id)
                ? 'border-pf-primary bg-pf-light'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">{CLUSTER_EMOJIS[id]}</div>
            <div className="text-sm font-medium text-gray-800">
              {t.fieldNarrowing.clusters[id]}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={proceed}
        className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer"
      >
        {t.fieldNarrowing.continueBtn}
      </button>
    </div>
  );
}
