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
      <div className="bg-pf-primary text-white p-8 md:p-12 md:w-[360px] flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-2">{t.round2Intro.title}</h1>
        <p className="text-pf-mid text-sm">{t.round2Intro.subtitle}</p>
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center gap-6">
        {top2.map((type) => {
          const mode = t.riasec[type];
          if (!mode) return null;
          return (
            <div key={type} className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100">
              <span className="text-3xl">{mode.emoji}</span>
              <div>
                <div className="font-semibold text-gray-800">{mode.name}</div>
                <div className="text-sm text-gray-500">{mode.desc}</div>
              </div>
            </div>
          );
        })}

        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.SAVICKAS })}
          className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer self-start mt-4"
        >
          {t.round2Intro.continueBtn}
        </button>
      </div>
    </div>
  );
}
