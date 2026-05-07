import { createContext, useContext, useState } from 'react';
import { translations } from './data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('de');
  const t = translations[lang];

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
