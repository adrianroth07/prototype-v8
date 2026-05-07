import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { pathColor } from '../data/colors.js';

export default function Comparison() {
  const { t } = useLang();
  const { state, dispatch } = usePathFinder();
  const paths = state.suggestedPaths;

  const rows = [
    { key: 'typicalDay', accessor: (p) => p.typical_day },
    { key: 'income', accessor: (p) => p.income_now },
    { key: 'freedom', accessor: (p) => p.freedom },
    { key: 'flexibility', accessor: (p) => p.flexibility },
    { key: 'outlook', accessor: (p) => p.outlook },
  ];

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-pf-text mb-2">{t.comparison.title}</h1>
      <p className="text-gray-500 mb-8">{t.comparison.subtitle}</p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left p-3 text-gray-500 font-medium">{t.comparison.headers.path}</th>
              {paths.map((p) => {
                const color = pathColor(p.id);
                return (
                  <th key={p.id} className="text-left p-3 font-semibold" style={{ color: color.text }}>
                    {p.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-gray-100">
                <td className="p-3 text-gray-500 font-medium">{t.comparison.headers[row.key]}</td>
                {paths.map((p) => (
                  <td key={p.id} className="p-3 text-gray-700">{row.accessor(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.STORIES })}
        className="px-8 py-3 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark transition-colors cursor-pointer"
      >
        {t.comparison.continueBtn}
      </button>
    </div>
  );
}
