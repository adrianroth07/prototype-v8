import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

export default function Welcome() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();
  const nav = (screen) => dispatch({ type: 'NAVIGATE', screen });

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-pf-light mb-8">
            <span className="text-4xl">{'\u{1F9ED}'}</span>
          </div>
        </div>

        <h1 className="animate-fade-in-up stagger-1 text-4xl md:text-6xl font-extrabold text-pf-text mb-4 tracking-tight">
          {t.landing.title}
        </h1>
        <p className="animate-fade-in-up stagger-2 text-xl md:text-2xl text-gray-500 mb-3 max-w-lg font-light">
          {t.landing.subtitle}
        </p>
        <p className="animate-fade-in-up stagger-3 text-sm text-gray-400 mb-12 max-w-md leading-relaxed">
          {t.landing.description}
        </p>

        <div className="animate-fade-in-up stagger-4 flex flex-col sm:flex-row gap-3 mb-20">
          <button
            onClick={() => nav(SCREENS.OPENER)}
            className="btn-primary px-10 py-4 bg-pf-primary text-white font-semibold rounded-2xl hover:bg-pf-dark shadow-lg shadow-pf-primary/20 cursor-pointer text-base"
          >
            {t.landing.startBtn}
          </button>
          <button
            onClick={() => nav(SCREENS.BROWSE)}
            className="px-8 py-4 bg-white border border-gray-200 text-gray-600 font-medium rounded-2xl hover:border-pf-primary hover:text-pf-primary transition-all cursor-pointer shadow-sm"
          >
            {t.landing.browseBtn}
          </button>
          <button
            onClick={() => nav(SCREENS.MAP)}
            className="px-8 py-4 bg-white border border-gray-200 text-gray-600 font-medium rounded-2xl hover:border-pf-primary hover:text-pf-primary transition-all cursor-pointer shadow-sm"
          >
            {t.landing.mapBtn}
          </button>
          <button
            onClick={() => nav(SCREENS.PATH_BUILDER)}
            className="px-8 py-4 bg-white border border-gray-200 text-gray-600 font-medium rounded-2xl hover:border-pf-primary hover:text-pf-primary transition-all cursor-pointer shadow-sm"
          >
            {t.landing.builderBtn}
          </button>
        </div>

        <div className="animate-fade-in-up stagger-5 max-w-2xl w-full">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            {t.landing.howItWorks}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.landing.steps.map((step, i) => (
              <div
                key={i}
                className={`animate-fade-in-up stagger-${i + 4} card-hover bg-white rounded-2xl p-5 border border-gray-100 shadow-sm`}
              >
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-pf-light text-pf-primary text-xs font-bold mb-3">
                  {i + 1}
                </div>
                <div className="font-semibold text-sm text-gray-800 mb-1">{step.title}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-300 pb-8">
        {t.landing.footer}
      </footer>
    </div>
  );
}
