import { useLang } from '../LanguageContext';

export default function LangToggle() {
  const { lang, toggle } = useLang();

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 px-3 py-1.5 bg-white border-2 border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all cursor-pointer shadow-sm"
    >
      {lang === 'de' ? 'EN' : 'DE'}
    </button>
  );
}
