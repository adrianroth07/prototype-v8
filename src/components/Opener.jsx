import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

const MODES = ['lena', 'malik', 'clear'];

export default function Opener() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();

  function select(mode) {
    dispatch({ type: 'SET_USER_MODE', mode });
    dispatch({ type: 'NAVIGATE', screen: SCREENS.QUIZ_R1 });
  }

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <div className="bg-pf-primary text-white p-8 md:p-12 md:w-[360px] flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-2">{t.opener.title}</h1>
        <p className="text-pf-mid text-sm">{t.opener.subtitle}</p>
      </div>

      <div className="flex-1 flex flex-col justify-center p-8 md:p-12 gap-4">
        {MODES.map((mode) => (
          <button
            key={mode}
            onClick={() => select(mode)}
            className="text-left p-6 rounded-xl border-2 border-gray-200 hover:border-pf-primary hover:bg-pf-light transition-all cursor-pointer group"
          >
            <div className="font-semibold text-gray-800 group-hover:text-pf-primary mb-1">
              {t.opener[mode].label}
            </div>
            <div className="text-sm text-gray-500">
              {t.opener[mode].desc}
            </div>
          </button>
        ))}

        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.WELCOME })}
          className="text-sm text-gray-400 hover:text-gray-600 mt-4 cursor-pointer self-start"
        >
          {t.common.back}
        </button>
      </div>
    </div>
  );
}
