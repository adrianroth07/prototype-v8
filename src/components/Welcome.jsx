import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

export default function Welcome() {
  const { t, lang } = useLang();
  const { dispatch } = usePathFinder();
  const nav = (screen) => dispatch({ type: 'NAVIGATE', screen });

  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="absolute top-[-120px] right-[-80px] w-[400px] h-[400px] rounded-full bg-pf-light/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-60px] w-[300px] h-[300px] rounded-full bg-pf-accent-light/40 blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center relative">
        <div className="animate-float mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-pf-light shadow-lg shadow-pf-primary/10">
            <span className="text-4xl">{'\u{1F9ED}'}</span>
          </div>
        </div>

        <h1 className="animate-fade-in-up font-heading text-5xl md:text-7xl font-black text-gradient mb-4 tracking-tight">
          {t.landing.title}
        </h1>
        <p className="animate-fade-in-up stagger-1 text-xl md:text-2xl text-gray-500 mb-3 max-w-lg font-light">
          {t.landing.subtitle}
        </p>
        <p className="animate-fade-in-up stagger-2 text-base text-gray-400 mb-10 max-w-md leading-relaxed text-balance">
          {t.landing.description}
        </p>

        {/* 2 CTAs above fold */}
        <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button
            onClick={() => nav(SCREENS.OPENER)}
            className="btn-primary btn-glow w-full sm:w-auto px-12 py-4 bg-gradient-to-b from-pf-primary to-pf-dark text-white font-bold rounded-xl shadow-lg shadow-pf-primary/20 cursor-pointer text-base"
          >
            {t.landing.startBtn}
          </button>
          <button
            onClick={() => nav(SCREENS.BROWSE)}
            className="text-pf-primary hover:text-pf-dark font-semibold cursor-pointer transition-colors text-base"
          >
            {t.landing.browseBtn} {'\u{2192}'}
          </button>
        </div>

        {/* Trust badges */}
        <div className="animate-fade-in-up stagger-4 flex items-center gap-3 mb-16">
          {(t.landing.trustBadges || (lang === 'de' ? ['10 Minuten', 'Kostenlos', 'Anonym'] : ['10 minutes', 'Free', 'Anonymous'])).map((badge, i) => (
            <span key={i} className="bg-white border border-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full">
              {badge}
            </span>
          ))}
        </div>

        {/* Tool cards — PathMap & PathBuilder */}
        <div className="animate-fade-in-up stagger-4 max-w-xl w-full mb-16">
          <h2 className="font-heading text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
            {t.landing.tools.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => nav(SCREENS.MAP)}
              className="card-hover card-glass text-left p-5 rounded-xl border border-gray-100 shadow-sm cursor-pointer group transition-all hover:border-pf-primary hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pf-light ring-1 ring-pf-primary/10 group-hover:bg-pf-primary group-hover:ring-0 transition-colors">
                  <span className="text-xl group-hover:brightness-0 group-hover:invert transition-all">{'\u{1F5FA}\u{FE0F}'}</span>
                </div>
                <span className="font-heading font-bold text-gray-800 group-hover:text-pf-primary transition-colors">{t.landing.tools.map.title}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{t.landing.tools.map.desc}</p>
            </button>

            <button
              onClick={() => nav(SCREENS.PATH_BUILDER)}
              className="card-hover card-glass text-left p-5 rounded-xl border border-gray-100 shadow-sm cursor-pointer group transition-all hover:border-pf-accent hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pf-accent-light ring-1 ring-pf-accent/10 group-hover:bg-pf-accent group-hover:ring-0 transition-colors">
                  <span className="text-xl group-hover:brightness-0 group-hover:invert transition-all">{'\u{1F3D7}\u{FE0F}'}</span>
                </div>
                <span className="font-heading font-bold text-gray-800 group-hover:text-pf-accent transition-colors">{t.landing.tools.builder.title}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{t.landing.tools.builder.desc}</p>
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="animate-fade-in-up stagger-5 max-w-2xl w-full">
          <h2 className="font-heading text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            {t.landing.howItWorks}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.landing.steps.map((step, i) => (
              <div
                key={i}
                className={`animate-fade-in-up stagger-${Math.min(i + 5, 7)} bg-white rounded-xl p-5 border border-gray-100 shadow-sm`}
              >
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-pf-primary to-pf-dark text-white text-xs font-bold mb-3">
                  {i + 1}
                </div>
                <div className="font-heading font-bold text-sm text-gray-800 mb-1">{step.title}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-300 pb-8 relative">
        {t.landing.footer}
      </footer>
    </div>
  );
}
