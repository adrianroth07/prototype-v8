import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

const Welcome = lazy(() => import('./Welcome.jsx'));
const Opener = lazy(() => import('./Opener.jsx'));
const Quiz = lazy(() => import('./Quiz.jsx'));
const Round2Intro = lazy(() => import('./Round2Intro.jsx'));
const Savickas = lazy(() => import('./Savickas.jsx'));
const Blocks = lazy(() => import('./Blocks.jsx'));
const SuccessPicture = lazy(() => import('./SuccessPicture.jsx'));
const Paths = lazy(() => import('./Paths.jsx'));
const Qualifications = lazy(() => import('./Qualifications.jsx'));
const FieldNarrowing = lazy(() => import('./FieldNarrowing.jsx'));
const Comparison = lazy(() => import('./Comparison.jsx'));
const Stories = lazy(() => import('./Stories.jsx'));
const Browse = lazy(() => import('./Browse.jsx'));
const PathMap = lazy(() => import('./PathMap.jsx'));
const PathBuilder = lazy(() => import('./PathBuilder.jsx'));

const SCREEN_ORDER = [
  SCREENS.WELCOME, SCREENS.OPENER, SCREENS.QUIZ_R1, SCREENS.ROUND2_INTRO,
  SCREENS.SAVICKAS, SCREENS.QUIZ_R2, SCREENS.BLOCKS, SCREENS.SUCCESS_PICTURE,
  SCREENS.PATHS, SCREENS.QUALIFICATIONS, SCREENS.FIELD_NARROWING,
  SCREENS.COMPARISON, SCREENS.STORIES, SCREENS.BROWSE, SCREENS.MAP, SCREENS.PATH_BUILDER,
];

function getDirection(from, to) {
  const fi = SCREEN_ORDER.indexOf(from);
  const ti = SCREEN_ORDER.indexOf(to);
  if (fi === -1 || ti === -1) return 'forward';
  return ti >= fi ? 'forward' : 'back';
}

function getScreen(screen) {
  switch (screen) {
    case SCREENS.WELCOME:        return <Welcome />;
    case SCREENS.OPENER:         return <Opener />;
    case SCREENS.QUIZ_R1:        return <Quiz round={1} />;
    case SCREENS.ROUND2_INTRO:   return <Round2Intro />;
    case SCREENS.SAVICKAS:       return <Savickas />;
    case SCREENS.QUIZ_R2:        return <Quiz round={2} />;
    case SCREENS.BLOCKS:         return <Blocks />;
    case SCREENS.SUCCESS_PICTURE: return <SuccessPicture />;
    case SCREENS.PATHS:          return <Paths />;
    case SCREENS.QUALIFICATIONS: return <Qualifications />;
    case SCREENS.FIELD_NARROWING: return <FieldNarrowing />;
    case SCREENS.COMPARISON:     return <Comparison />;
    case SCREENS.STORIES:        return <Stories />;
    case SCREENS.BROWSE:         return <Browse />;
    case SCREENS.MAP:            return <PathMap />;
    case SCREENS.PATH_BUILDER:   return <PathBuilder />;
    default:                     return <Welcome />;
  }
}

function LoadingFallback() {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-pf-primary animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-pf-primary animate-pulse" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-pf-primary animate-pulse" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

const SCREEN_TITLES = {
  WELCOME:        { de: 'PathFinder', en: 'PathFinder' },
  OPENER:         { de: 'PathFinder — Start', en: 'PathFinder — Start' },
  QUIZ_R1:        { de: 'PathFinder — Quiz', en: 'PathFinder — Quiz' },
  ROUND2_INTRO:   { de: 'PathFinder — Checkpoint', en: 'PathFinder — Checkpoint' },
  SAVICKAS:       { de: 'PathFinder — Reflexion', en: 'PathFinder — Reflection' },
  QUIZ_R2:        { de: 'PathFinder — Quiz', en: 'PathFinder — Quiz' },
  BLOCKS:         { de: 'PathFinder — Hürden', en: 'PathFinder — Barriers' },
  SUCCESS_PICTURE:{ de: 'PathFinder — Vision', en: 'PathFinder — Vision' },
  PATHS:          { de: 'PathFinder — Ergebnisse', en: 'PathFinder — Results' },
  QUALIFICATIONS: { de: 'PathFinder — Qualifikationen', en: 'PathFinder — Qualifications' },
  FIELD_NARROWING:{ de: 'PathFinder — Arbeitsstil', en: 'PathFinder — Work Style' },
  COMPARISON:     { de: 'PathFinder — Vergleich', en: 'PathFinder — Comparison' },
  STORIES:        { de: 'PathFinder — Geschichten', en: 'PathFinder — Stories' },
  BROWSE:         { de: 'PathFinder — Alle Wege', en: 'PathFinder — All Paths' },
  MAP:            { de: 'PathFinder — Karte', en: 'PathFinder — Map' },
  PATH_BUILDER:   { de: 'PathFinder — Planer', en: 'PathFinder — Builder' },
};

export default function ScreenRouter() {
  const { lang } = useLang();
  const { state } = usePathFinder();
  const [rendered, setRendered] = useState(state.screen);
  const [animState, setAnimState] = useState('visible');
  const [direction, setDirection] = useState('forward');
  const prevRef = useRef(state.screen);

  useEffect(() => {
    const titles = SCREEN_TITLES[state.screen];
    document.title = titles?.[lang] || 'PathFinder';
  }, [state.screen, lang]);

  useEffect(() => {
    if (state.screen !== rendered && animState === 'visible') {
      setDirection(getDirection(prevRef.current, state.screen));
      setAnimState('exit');
    }
  }, [state.screen, rendered, animState]);

  useEffect(() => {
    if (animState === 'exit') {
      const t = setTimeout(() => {
        prevRef.current = state.screen;
        setRendered(state.screen);
        setAnimState('enter');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 250);
      return () => clearTimeout(t);
    }
    if (animState === 'enter') {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimState('visible'));
      });
    }
  }, [animState, state.screen]);

  const slide = direction === 'forward' ? 24 : -24;
  let style = {
    transition: 'opacity 300ms cubic-bezier(0.22, 1, 0.36, 1), transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
    opacity: 1,
    transform: 'translateX(0)',
  };

  if (animState === 'exit') {
    style.opacity = 0;
    style.transform = `translateX(${-slide}px)`;
  } else if (animState === 'enter') {
    style.opacity = 0;
    style.transform = `translateX(${slide}px)`;
    style.transition = 'none';
  }

  return (
    <div style={style}>
      <Suspense fallback={<LoadingFallback />}>
        {getScreen(rendered)}
      </Suspense>
    </div>
  );
}
