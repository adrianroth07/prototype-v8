import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import Reveal from './ui/Reveal.jsx';

const CLUSTER_IDS = ['hands-on', 'people', 'creative', 'analytical', 'nature', 'business'];
const CLUSTER_EMOJIS = {
  'hands-on': '\u{1F6E0}\u{FE0F}',
  'people': '\u{1F91D}',
  'creative': '\u{1F3A8}',
  'analytical': '\u{1F4CA}',
  'nature': '\u{1F33F}',
  'business': '\u{1F4BC}',
};
const CLUSTER_COLORS = {
  'hands-on': 'from-orange-50 to-amber-50',
  'people': 'from-blue-50 to-indigo-50',
  'creative': 'from-purple-50 to-pink-50',
  'analytical': 'from-cyan-50 to-blue-50',
  'nature': 'from-green-50 to-emerald-50',
  'business': 'from-slate-50 to-gray-50',
};

export default function FieldNarrowing() {
  const { t, lang } = useLang();
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
      <Reveal>
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pf-light mb-4">
            <span className="text-2xl">{'\u{1F50D}'}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-black text-pf-text mb-2 tracking-tight">{t.fieldNarrowing.title}</h1>
          <p className="text-gray-400 text-base">{t.fieldNarrowing.subtitle}</p>
        </div>
      </Reveal>

      <Reveal variant="scale" delay={100}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {CLUSTER_IDS.map((id) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`card-hover p-6 rounded-xl border-2 text-left cursor-pointer transition-all bg-gradient-to-br ${CLUSTER_COLORS[id]} ${
              selected.includes(id)
                ? 'border-pf-primary shadow-md shadow-pf-primary/10 ring-1 ring-pf-light'
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="text-2xl mb-3">{CLUSTER_EMOJIS[id]}</div>
            <div className="text-sm font-semibold text-gray-800">
              {t.fieldNarrowing.clusters[id]}
            </div>
            {selected.includes(id) && (
              <div className="mt-2 inline-flex items-center gap-1 text-xs text-pf-primary font-medium">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {lang === 'de' ? 'Ausgewählt' : 'Selected'}
              </div>
            )}
          </button>
        ))}
      </div>
      </Reveal>

      <div className="text-sm text-gray-500 mb-6 text-center">
        <span className={`font-semibold ${selected.length > 0 ? 'text-pf-primary' : ''}`}>{selected.length}</span>
        {' '}{lang === 'de' ? 'von' : 'of'} 6
      </div>

      <Reveal variant="up" delay={200}>
      <button
        onClick={proceed}
        className="btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
      >
        {t.fieldNarrowing.continueBtn}
      </button>
      </Reveal>
    </div>
  );
}
