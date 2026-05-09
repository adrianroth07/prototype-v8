import { LanguageProvider } from './LanguageContext.jsx';
import { PathFinderProvider } from './state/PathFinderContext.jsx';
import { usePathFinder } from './state/PathFinderContext.jsx';
import { SCREENS } from './state/appReducer.js';
import ScreenRouter from './components/ScreenRouter.jsx';
import LangToggle from './components/LangToggle.jsx';

const FLOW_SCREENS = [
  SCREENS.OPENER, SCREENS.QUIZ_R1, SCREENS.ROUND2_INTRO,
  SCREENS.SAVICKAS, SCREENS.QUIZ_R2, SCREENS.BLOCKS,
  SCREENS.SUCCESS_PICTURE, SCREENS.PATHS, SCREENS.QUALIFICATIONS,
  SCREENS.FIELD_NARROWING, SCREENS.COMPARISON, SCREENS.STORIES,
];

function FlowProgress() {
  const { state } = usePathFinder();
  const idx = FLOW_SCREENS.indexOf(state.screen);
  if (idx === -1) return null;
  const pct = ((idx + 1) / FLOW_SCREENS.length) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gray-200/50">
      <div
        className="h-full bg-pf-primary rounded-r-full"
        style={{
          width: `${pct}%`,
          transition: 'width 500ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </div>
  );
}

function AppShell() {
  return (
    <>
      <FlowProgress />
      <LangToggle />
      <main>
        <ScreenRouter />
      </main>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PathFinderProvider>
        <AppShell />
      </PathFinderProvider>
    </LanguageProvider>
  );
}
