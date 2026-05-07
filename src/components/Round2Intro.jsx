import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { computeRiasec } from '../logic/matching.js';

export default function Round2Intro() {
  const { t } = useLang();
  const { state, dispatch } = usePathFinder();

  const counts = computeRiasec(state.round1Answers);
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top2 = sorted.slice(0, 2).map(([type]) => type);

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <div className="hidden md:flex bg-gradient-to-b from-pf-primary to-pf-dark text-white p-14 md:w-[400px] flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full border-2 border-white" />
        </div>
        <div className="relative">
          <div className="animate-fade-in-up inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-6">
            <span className="text-2xl">{'\u{1F3AF}'}</span>
          </div>
          <h1 className="animate-fade-in-up stagger-1 font-heading text-3xl font-bold mb-3 tracking-tight">{t.round2Intro.title}</h1>
          <p className="animate-fade-in-up stagger-2 text-pf-mid text-base leading-relaxed">{t.round2Intro.subtitle}</p>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden px-6 pt-8 pb-2">
        <h1 className="font-heading text-2xl font-bold text-pf-text mb-1">{t.round2Intro.title}</h1>
        <p className="text-sm text-gray-400">{t.round2Intro.subtitle}</p>
      </div>

      <div className="flex-1 p-6 md:p-14 flex flex-col justify-center gap-5 max-w-xl">
        {top2.map((type, i) => {
          const mode = t.riasec[type];
          if (!mode) return null;
          return (
            <div
              key={type}
              className={`animate-fade-in-up stagger-${i + 1} card-hover flex items-start gap-5 p-6 bg-white rounded-xl border border-gray-100 shadow-sm`}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-pf-light shrink-0">
                <span className="text-3xl">{mode.emoji}</span>
              </div>
              <div>
                <div className="font-heading font-bold text-gray-800 text-lg">{mode.name}</div>
                <div className="text-sm text-gray-500 leading-relaxed mt-1">{mode.desc}</div>
              </div>
            </div>
          );
        })}

        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.SAVICKAS })}
          className="animate-fade-in-up stagger-3 btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer self-start mt-4 transition-all"
        >
          {t.round2Intro.continueBtn}
        </button>
      </div>
    </div>
  );
}
