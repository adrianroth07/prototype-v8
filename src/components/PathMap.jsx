import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { ALL_PATHS, CERT_RANK } from '../data/paths.js';
import { pathColor } from '../data/colors.js';

const CERTS = [
  { id: null, label: 'Kein Abschluss', emoji: '\u{274C}' },
  { id: 'Hauptschulabschluss', label: 'Hauptschulabschluss', emoji: '\u{1F4D7}' },
  { id: 'Realschulabschluss', label: 'Realschulabschluss', emoji: '\u{1F4D8}' },
  { id: 'Fachhochschulreife', label: 'Fachhochschulreife', emoji: '\u{1F4D9}' },
  { id: 'Abitur', label: 'Abitur', emoji: '\u{1F4D5}' },
];

export default function PathMap() {
  const { t } = useLang();
  const { dispatch } = usePathFinder();
  const [selectedCert, setSelectedCert] = useState(null);

  const userRank = selectedCert !== null ? (CERT_RANK[selectedCert] ?? 0) : null;

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-4xl mx-auto">
      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.WELCOME })}
        className="animate-fade-in inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-pf-primary mb-8 cursor-pointer transition-colors"
      >
        {'\u{2190}'} {t.common.back}
      </button>

      <div className="animate-fade-in-up mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F5FA}\u{FE0F}'}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-pf-text mb-2 tracking-tight">{t.map.title}</h1>
        <p className="text-gray-400 text-base">{t.map.subtitle}</p>
      </div>

      <div className="animate-fade-in-up stagger-1 flex flex-wrap gap-2.5 mb-10">
        {CERTS.map((cert, i) => (
          <button
            key={cert.id ?? 'none'}
            onClick={() => setSelectedCert(cert.id)}
            className={`animate-fade-in-up stagger-${i + 1} flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 text-sm cursor-pointer transition-all ${
              selectedCert === cert.id
                ? 'border-pf-primary bg-pf-light text-pf-primary font-semibold shadow-sm shadow-pf-primary/10'
                : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:shadow-sm'
            }`}
          >
            <span className="text-base">{cert.emoji}</span>
            {cert.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ALL_PATHS.map((path, i) => {
          const color = pathColor(path.id);
          const pathMinRank = CERT_RANK[path.minCert] ?? 0;
          const isAccessible = userRank === null || userRank >= pathMinRank;

          return (
            <div
              key={path.id}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 7)} rounded-2xl p-5 border-l-4 border border-gray-100 transition-all ${
                isAccessible ? 'card-hover bg-white shadow-sm' : 'bg-gray-50/80 opacity-50'
              }`}
              style={{ borderLeftColor: isAccessible ? color.border : '#d1d5db' }}
            >
              <div className="flex items-start gap-3">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${isAccessible ? 'bg-pf-light' : 'bg-gray-100'}`}>
                  <span className="text-lg">{isAccessible ? '\u{2705}' : '\u{1F512}'}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{path.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{path.tagline}</p>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {path.minCert ? `Min: ${path.minCert}` : 'No minimum qualification'}
                  </p>
                  {path.branches && isAccessible && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {path.branches.map(b => (
                        <span key={b.id} className="text-xs px-2.5 py-1 rounded-full bg-pf-light/50 text-gray-600 border border-gray-100">
                          {b.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
