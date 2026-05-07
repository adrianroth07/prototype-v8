import { LanguageProvider } from './LanguageContext.jsx';
import { PathFinderProvider } from './state/PathFinderContext.jsx';
import ScreenRouter from './components/ScreenRouter.jsx';
import LangToggle from './components/LangToggle.jsx';

export default function App() {
  return (
    <LanguageProvider>
      <PathFinderProvider>
        <LangToggle />
        <ScreenRouter />
      </PathFinderProvider>
    </LanguageProvider>
  );
}
