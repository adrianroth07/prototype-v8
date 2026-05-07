import { useState } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { ALL_PATHS, CERT_RANK } from '../data/paths.js';
import { pathColor } from '../data/colors.js';

const CERTS = [
  { id: null, label: 'Kein Abschluss' },
  { id: 'Hauptschulabschluss', label: 'Hauptschulabschluss' },
  { id: 'Realschulabschluss', label: 'Realschulabschluss' },
  { id: 'Fachhochschulreife', label: 'Fachhochschulreife' },
  { id: 'Abitur', label: 'Abitur' },
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
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 cursor-pointer"
      >
        {t.common.back}
      </button>

      <h1 className="text-3xl font-bold text-pf-text mb-2">{t.map.title}</h1>
      <p className="text-gray-500 mb-8">{t.map.subtitle}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {CERTS.map((cert) => (
          <button
            key={cert.id ?? 'none'}
            onClick={() => setSelectedCert(cert.id)}
            className={`px-4 py-2 rounded-full border-2 text-sm cursor-pointer transition-all ${
              selectedCert === cert.id
                ? 'border-pf-primary bg-pf-light text-pf-primary font-medium'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {cert.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ALL_PATHS.map((path) => {
          const color = pathColor(path.id);
          const pathMinRank = CERT_RANK[path.minCert] ?? 0;
          const isAccessible = userRank === null || userRank >= pathMinRank;

          return (
            <div
              key={path.id}
              className={`rounded-xl p-4 border-l-4 border border-gray-100 transition-all ${
                isAccessible ? 'bg-white' : 'bg-gray-50 opacity-50'
              }`}
              style={{ borderLeftColor: isAccessible ? color.border : '#d1d5db' }}
            >
              <h3 className="font-semibold text-gray-800">{path.name}</h3>
              <p className="text-sm text-gray-500">{path.tagline}</p>
              <p className="text-xs text-gray-400 mt-1">
                {path.minCert ? `Min: ${path.minCert}` : 'No minimum qualification'}
              </p>
              {path.branches && isAccessible && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {path.branches.map(b => (
                    <span key={b.id} className="text-xs px-2 py-0.5 rounded-full bg-surface text-gray-600">
                      {b.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
