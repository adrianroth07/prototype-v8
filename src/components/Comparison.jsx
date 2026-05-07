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
      <div className="animate-fade-in-up mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{1F4CA}'}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-pf-text mb-2 tracking-tight">{t.comparison.title}</h1>
        <p className="text-gray-400 text-base">{t.comparison.subtitle}</p>
      </div>

      <div className="animate-fade-in-up stagger-1 overflow-x-auto mb-10 -mx-2">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-w-[500px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.comparison.headers.path}</th>
                {paths.map((p) => {
                  const color = pathColor(p.id);
                  return (
                    <th key={p.id} className="text-left p-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color.border }} />
                        <span className="font-bold text-gray-800">{p.name}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.key} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-gray-50/30' : ''}`}>
                  <td className="p-4 text-gray-500 font-medium text-xs uppercase tracking-wider">{t.comparison.headers[row.key]}</td>
                  {paths.map((p) => (
                    <td key={p.id} className="p-4 text-gray-700 leading-relaxed">{row.accessor(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.STORIES })}
        className="animate-fade-in-up stagger-2 btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-2xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
      >
        {t.comparison.continueBtn}
      </button>
    </div>
  );
}
