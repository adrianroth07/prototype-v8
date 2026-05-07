import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

export default function Welcome() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();
  const nav = (screen) => dispatch({ type: 'NAVIGATE', screen });

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="text-6xl mb-6">{'\u{1F9ED}'}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-pf-text mb-3">
          {t.landing.title}
        </h1>
        <p className="text-lg text-gray-600 mb-2 max-w-md">
          {t.landing.subtitle}
        </p>
        <p className="text-sm text-gray-500 mb-10 max-w-lg">
          {t.landing.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-16">
          <button
            onClick={() => nav(SCREENS.OPENER)}
            className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer"
          >
            {t.landing.startBtn}
          </button>
          <button
            onClick={() => nav(SCREENS.BROWSE)}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-500 transition-colors cursor-pointer"
          >
            {t.landing.browseBtn}
          </button>
          <button
            onClick={() => nav(SCREENS.MAP)}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-500 transition-colors cursor-pointer"
          >
            {t.landing.mapBtn}
          </button>
          <button
            onClick={() => nav(SCREENS.PATH_BUILDER)}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-500 transition-colors cursor-pointer"
          >
            {t.landing.builderBtn}
          </button>
        </div>

        <div className="max-w-2xl w-full">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
            {t.landing.howItWorks}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.landing.steps.map((step, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-xs font-bold text-pf-primary mb-1">{i + 1}</div>
                <div className="font-semibold text-sm text-gray-800 mb-1">{step.title}</div>
                <div className="text-xs text-gray-500">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-400 pb-6">
        {t.landing.footer}
      </footer>
    </div>
  );
}
