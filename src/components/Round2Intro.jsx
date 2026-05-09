import { useState, useEffect } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { computeRiasec } from '../logic/matching.js';
import Reveal from './ui/Reveal.jsx';

const RIASEC_ORDER = ['R', 'I', 'A', 'S', 'E', 'C'];

const TYPE_COLORS = {
  R: { bar: 'bg-red-400', bg: 'bg-red-50' },
  I: { bar: 'bg-blue-400', bg: 'bg-blue-50' },
  A: { bar: 'bg-pink-400', bg: 'bg-pink-50' },
  S: { bar: 'bg-emerald-400', bg: 'bg-emerald-50' },
  E: { bar: 'bg-amber-400', bg: 'bg-amber-50' },
  C: { bar: 'bg-slate-400', bg: 'bg-slate-50' },
};

export default function Round2Intro() {
  const { t } = useLang();
  const { state, dispatch } = usePathFinder();
  const [showBars, setShowBars] = useState(false);

  const counts = computeRiasec(state.round1Answers);
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top2 = sorted.slice(0, 2).map(([type]) => type);
  const maxCount = Math.max(...Object.values(counts), 1);

  useEffect(() => {
    const timer = setTimeout(() => setShowBars(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <div className="hidden md:flex bg-gradient-to-b from-pf-primary to-pf-dark text-white p-14 md:w-[400px] flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full border-2 border-white" />
        </div>
        <Reveal>
          <div className="relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-6">
              <span className="text-2xl">{'\u{1F3AF}'}</span>
            </div>
            <h1 className="font-heading text-3xl font-bold mb-3 tracking-tight">{t.round2Intro.title}</h1>
            <p className="text-pf-mid text-base leading-relaxed">{t.round2Intro.subtitle}</p>
          </div>
        </Reveal>
      </div>

      <div className="md:hidden px-6 pt-8 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pf-light">
            <span className="text-xl">{'\u{1F3AF}'}</span>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-pf-text">{t.round2Intro.title}</h1>
            <p className="text-sm text-gray-400">{t.round2Intro.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-14 flex flex-col justify-center max-w-xl">
        <div className="space-y-2.5 mb-8">
          {RIASEC_ORDER.map((type, i) => {
            const count = counts[type] || 0;
            const pct = Math.max((count / maxCount) * 100, 4);
            const isTop = top2.includes(type);
            const mode = t.riasec[type];
            if (!mode) return null;
            const colors = TYPE_COLORS[type];

            return (
              <Reveal key={type} delay={i * 60}>
                <div
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    isTop ? 'bg-pf-light/50 border-pf-primary/20 shadow-sm' : 'bg-white border-gray-100'
                  }`}
                >
                  <span className="text-xl w-7 text-center shrink-0">{mode.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-heading font-bold text-sm ${isTop ? 'text-pf-primary' : 'text-gray-600'}`}>
                        {mode.name}
                      </span>
                      {isTop && (
                        <span className="text-[9px] font-bold text-pf-primary bg-pf-light px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Top
                        </span>
                      )}
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isTop ? 'bg-pf-primary' : colors.bar}`}
                        style={{
                          width: showBars ? `${pct}%` : '0%',
                          transition: `width 800ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 100 + 200}ms`,
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 leading-snug">{mode.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={600}>
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.SAVICKAS })}
            className="btn-primary w-full md:w-auto px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
          >
            {t.round2Intro.continueBtn}
          </button>
        </Reveal>
      </div>
    </div>
  );
}
