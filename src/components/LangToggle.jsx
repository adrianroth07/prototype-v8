import { useLang } from '../LanguageContext';

export default function LangToggle() {
  const { lang, toggle } = useLang();

  return (
    <button
      onClick={toggle}
      aria-label={lang === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
      className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3.5 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-pf-primary hover:text-pf-primary transition-all cursor-pointer shadow-sm"
    >
      <span className="text-base leading-none">{lang === 'de' ? '\u{1F1EC}\u{1F1E7}' : '\u{1F1E9}\u{1F1EA}'}</span>
      {lang === 'de' ? 'EN' : 'DE'}
    </button>
  );
}
