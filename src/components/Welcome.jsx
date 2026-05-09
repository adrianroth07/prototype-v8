import { useEffect, useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import InfiniteGrid from './ui/InfiniteGrid.jsx';
import Reveal from './ui/Reveal.jsx';

export default function Welcome() {
  const { t, lang } = useLang();
  const { dispatch } = usePathFinder();
  const nav = (screen) => dispatch({ type: 'NAVIGATE', screen });
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 100) setShowScrollHint(false);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <InfiniteGrid>
      {/* ── Hero section ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-12 text-center relative">

        {/* ── Floating side elements (desktop only) ── */}

        {/* Left side — badge cards */}
        <div className="hidden md:block absolute top-24 left-[6%] pointer-events-none floating-badge">
          <div className="card-glass rounded-xl px-4 py-3 shadow-lg border border-gray-100 text-left">
            <div className="text-lg mb-0.5">{'\u{1F9ED}'}</div>
            <div className="font-heading font-bold text-sm text-gray-700">{lang === 'de' ? '6 Wege' : '6 Paths'}</div>
            <div className="text-[10px] text-gray-400">{lang === 'de' ? 'nach dem Abi' : 'after school'}</div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-[55%] left-[3%] pointer-events-none floating-badge-alt">
          <div className="card-glass rounded-xl px-3.5 py-2.5 shadow-lg border border-gray-100 flex items-center gap-2">
            <span className="text-base">{'\u{1F4AC}'}</span>
            <span className="font-heading font-bold text-xs text-gray-600">{lang === 'de' ? 'KI-Chat' : 'AI Chat'}</span>
          </div>
        </div>

        {/* Right side — badge cards */}
        <div className="hidden md:block absolute top-36 right-[5%] pointer-events-none floating-badge-alt">
          <div className="card-glass rounded-xl px-4 py-3 shadow-lg border border-gray-100 text-left">
            <div className="font-heading font-bold text-sm text-pf-primary">{lang === 'de' ? '100% kostenlos' : '100% free'}</div>
            <div className="text-[10px] text-gray-400">{lang === 'de' ? 'Immer & überall' : 'Anytime & anywhere'}</div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-[60%] right-[4%] pointer-events-none floating-badge-slow">
          <div className="card-glass rounded-xl px-3.5 py-2.5 shadow-lg border border-gray-100 flex items-center gap-2">
            <span className="text-sm">{'\u{2705}'}</span>
            <div>
              <div className="font-heading font-bold text-xs text-gray-700">{lang === 'de' ? 'Dein Match' : 'Your Match'}</div>
              <div className="text-[10px] text-gray-400">98%</div>
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="animate-float mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 shadow-lg shadow-pf-primary/8 backdrop-blur-sm">
            <span className="text-3xl">{'\u{1F9ED}'}</span>
          </div>
        </div>

        <h1 className="animate-fade-in-up font-heading text-5xl md:text-7xl font-black text-pf-text mb-4 tracking-tight">
          <span className="text-gradient-animated">{t.landing.title.split(/(?<=Path)/)[0]}</span>
          {t.landing.title.split(/(?<=Path)/).slice(1).join('')}
        </h1>

        <p className="animate-fade-in-up stagger-1 text-xl md:text-2xl text-gray-500 mb-3 max-w-lg font-light">
          {t.landing.subtitle}
        </p>
        <p className="animate-fade-in-up stagger-2 text-base text-gray-400 mb-10 max-w-md leading-relaxed text-balance">
          {t.landing.description}
        </p>

        {/* Trust badges (mobile) */}
        <div className="md:hidden flex justify-center gap-2.5 mb-6 animate-fade-in-up stagger-2">
          {t.landing.trustBadges.map((badge, i) => (
            <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-gray-100 text-gray-500 font-medium shadow-sm">
              {badge}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row items-center gap-4 mb-10">
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

        {/* ── Tool cards — PathMap & PathBuilder ── */}
        <Reveal variant="up" delay={100}>
          <div className="max-w-xl w-full mb-12">
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
        </Reveal>

        {/* ── How it works ── */}
        <Reveal variant="up" delay={250}>
          <div className="max-w-2xl w-full">
            <h2 className="font-heading text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
              {t.landing.howItWorks}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.landing.steps.map((step, i) => (
                <div
                  key={i}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-gray-100 shadow-sm"
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
        </Reveal>
      </div>

      {showScrollHint && (
        <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce-subtle">
          <div className="flex flex-col items-center gap-1 text-gray-300">
            <span className="text-xs font-medium">{lang === 'de' ? 'Mehr entdecken' : 'Scroll to explore'}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}

      <footer className="text-center text-xs text-gray-400 pb-8">
        {t.landing.footer}
      </footer>
    </InfiniteGrid>
  );
}
