import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './data/translations';

const LanguageContext = createContext();
const LANG_KEY = 'pathfinder-lang';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem(LANG_KEY) || 'de'; } catch { return 'de'; }
  });
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch {}
  }, [lang]);

  function toggle() {
    setLang((l) => (l === 'de' ? 'en' : 'de'));
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
