import { useEffect, useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import InfiniteGrid from './ui/InfiniteGrid.jsx';
import Reveal from './ui/Reveal.jsx';

function getResumeScreen(state) {
  if (state.suggestedPaths?.length > 0) return SCREENS.PATHS;
  if (Object.keys(state.round2Answers || {}).length > 0) return SCREENS.BLOCKS;
  if (Object.keys(state.round1Answers || {}).length > 0) return SCREENS.QUIZ_R1;
  if (state.userMode) return SCREENS.QUIZ_R1;
  return null;
}

export default function Welcome() {
  const { t, lang } = useLang();
  const { state, dispatch } = usePathFinder();
  const nav = (screen) => dispatch({ type: 'NAVIGATE', screen });
  const [showScrollHint, setShowScrollHint] = useState(true);
  const resumeScreen = getResumeScreen(state);

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
            <div className="font-heading font-bold text-sm text-gray-700">{t.landing.badges.paths}</div>
            <div className="text-[10px] text-gray-400">{t.landing.badges.afterSchool}</div>
          </div>
        </div>


        {/* Right side — badge cards */}
        <div className="hidden md:block absolute top-36 right-[5%] pointer-events-none floating-badge-alt">
          <div className="card-glass rounded-xl px-4 py-3 shadow-lg border border-gray-100 text-left">
            <div className="font-heading font-bold text-sm text-pf-primary">{t.landing.badges.free}</div>
            <div className="text-[10px] text-gray-400">{t.landing.badges.anytime}</div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-[60%] right-[4%] pointer-events-none floating-badge-slow">
          <div className="card-glass rounded-xl px-3.5 py-2.5 shadow-lg border border-gray-100 flex items-center gap-2">
            <span className="text-sm">{'\u{2705}'}</span>
            <div>
              <div className="font-heading font-bold text-xs text-gray-700">{t.landing.badges.yourMatch}</div>
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

        {/* Resume banner */}
        {resumeScreen && (
          <div className="animate-fade-in-up stagger-2 mb-4 w-full max-w-md">
            <button
              onClick={() => nav(resumeScreen)}
              className="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl bg-white/80 backdrop-blur-sm border border-pf-primary/20 shadow-sm hover:shadow-md hover:border-pf-primary/40 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-pf-primary animate-pulse" />
                <span className="text-sm font-semibold text-pf-text">
                  {t.landing.resumeBtn}
                </span>
              </div>
              <span className="text-pf-primary group-hover:translate-x-0.5 transition-transform">{'\u{2192}'}</span>
            </button>
          </div>
        )}

        {/* CTAs */}
        <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row items-center gap-4 mb-10">
          <button
            onClick={() => {
              if (resumeScreen) dispatch({ type: 'RESTART' });
              nav(SCREENS.OPENER);
            }}
            className="btn-primary w-full sm:w-auto px-12 py-4 bg-gradient-to-b from-pf-primary to-pf-dark text-white font-bold rounded-xl shadow-lg shadow-pf-primary/15 cursor-pointer text-base"
          >
            {resumeScreen ? t.landing.restartBtn : t.landing.startBtn}
          </button>
          <button
            onClick={() => nav(SCREENS.BROWSE)}
            className="text-pf-primary hover:text-pf-dark font-semibold cursor-pointer transition-colors text-base"
          >
            {t.landing.browseBtn} {'\u{2192}'}
          </button>
        </div>

        {/* ── How it works — compact 3-step strip ── */}
        <Reveal variant="up" delay={150}>
          <div className="max-w-lg w-full mb-10">
            <div className="flex items-center justify-center gap-0">
              {t.landing.steps.slice(0, 3).map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center px-4 text-center">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-pf-light text-pf-primary text-xs font-bold mb-1.5 ring-1 ring-pf-primary/20">
                      {i + 1}
                    </div>
                    <div className="text-xs font-semibold text-gray-600">{step.title}</div>
                  </div>
                  {i < 2 && <div className="w-6 h-px bg-gray-200 shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {showScrollHint && (
        <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce-subtle">
          <div className="flex flex-col items-center gap-1 text-gray-300">
            <span className="text-xs font-medium">{t.landing.scrollHint}</span>
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
