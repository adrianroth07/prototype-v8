import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';

const MODES = [
  { id: 'lena', emoji: '\u{1F32A}\u{FE0F}', color: 'from-amber-50 to-orange-50' },
  { id: 'malik', emoji: '\u{1F914}', color: 'from-blue-50 to-indigo-50' },
  { id: 'clear', emoji: '\u{1F3AF}', color: 'from-green-50 to-emerald-50' },
];

export default function Opener() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();

  function select(mode) {
    dispatch({ type: 'SET_USER_MODE', mode });
    dispatch({ type: 'NAVIGATE', screen: SCREENS.QUIZ_R1 });
  }

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <div className="hidden md:flex bg-gradient-to-b from-pf-primary to-pf-dark text-white p-14 md:w-[400px] flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-white" />
          <div className="absolute bottom-20 left-5 w-24 h-24 rounded-full border border-white" />
        </div>
        <div className="relative">
          <h1 className="animate-fade-in-up font-heading text-3xl font-bold mb-3 tracking-tight">{t.opener.title}</h1>
          <p className="animate-fade-in-up stagger-1 text-pf-mid text-base leading-relaxed">{t.opener.subtitle}</p>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden px-6 pt-8 pb-4">
        <h1 className="font-heading text-2xl font-bold text-pf-text mb-1">{t.opener.title}</h1>
        <p className="text-sm text-gray-400">{t.opener.subtitle}</p>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6 md:p-14 gap-4 max-w-xl">
        {MODES.map((mode, i) => (
          <button
            key={mode.id}
            onClick={() => select(mode.id)}
            className={`animate-fade-in-up stagger-${i + 1} card-hover text-left p-6 rounded-xl border-2 border-gray-100 bg-gradient-to-r ${mode.color} hover:border-pf-primary transition-all cursor-pointer group`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl mt-0.5">{mode.emoji}</span>
              <div>
                <div className="font-heading font-bold text-gray-800 group-hover:text-pf-primary mb-1 text-base transition-colors">
                  {t.opener[mode.id].label}
                </div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  {t.opener[mode.id].desc}
                </div>
              </div>
            </div>
          </button>
        ))}

        <p className="animate-fade-in text-xs text-gray-400 text-center mt-4 italic">
          {t.common.canChange || 'You can always change this later.'}
        </p>

        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.WELCOME })}
          className="animate-fade-in text-sm text-gray-400 hover:text-gray-600 mt-2 cursor-pointer self-start transition-colors"
        >
          {'\u{2190}'} {t.common.back}
        </button>
      </div>
    </div>
  );
}
