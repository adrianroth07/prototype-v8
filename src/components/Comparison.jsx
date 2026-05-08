import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { pathColor } from '../data/colors.js';
import Reveal from './ui/Reveal.jsx';

const FINANCIAL_INFO = {
  de: {
    ausbildung: 'Gehalt: 600–1.200€/Monat + Kindergeld 250€ + evtl. BAB',
    studium: 'BAföG: bis 934€/Monat (geschenkt!) + Kindergeld 250€ + Nebenjob',
    fsj: 'Taschengeld: ca. 350€/Monat + Kindergeld 250€ + Unterkunft & Essen',
    freelancing: 'Eigenes Einkommen (unterschiedlich) + Gründungszuschuss möglich',
    bundeswehr: 'Sold: ca. 1.400€/Monat (netto) + Unterkunft & Essen kostenlos',
    'gap-year': 'Selbst finanziert + Kindergeld 250€ + Working Holiday Einkommen',
  },
  en: {
    ausbildung: 'Salary: 600–1,200€/month + Kindergeld 250€ + possibly BAB',
    studium: 'BAföG: up to 934€/month (grant!) + Kindergeld 250€ + part-time job',
    fsj: 'Pocket money: ~350€/month + Kindergeld 250€ + housing & food',
    freelancing: 'Own income (varies) + start-up grant possible',
    bundeswehr: 'Pay: ~1,400€/month (net) + housing & food free',
    'gap-year': 'Self-funded + Kindergeld 250€ + Working Holiday income',
  },
};

function extractEuro(text) {
  const match = text.match(/[\d.,]+\s*[–\-]\s*[\d.,]+\s*€|[\d.,]+\s*€|bis\s+[\d.,]+\s*€|up\s+to\s+[\d.,]+\s*€/);
  if (!match) return { amount: null, rest: text };
  const amount = match[0];
  const rest = text.replace(amount, '').replace(/^\s*[:–\-·]\s*/, '').trim();
  return { amount, rest };
}

export default function Comparison() {
  const { t, lang } = useLang();
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
      <Reveal>
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pf-light mb-4">
            <span className="text-2xl">{'\u{1F4CA}'}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-black text-pf-text mb-2 tracking-tight">{t.comparison.title}</h1>
          <p className="text-gray-400 text-base">{t.comparison.subtitle}</p>
        </div>
      </Reveal>

      <Reveal variant="up">
      <div className="overflow-x-auto mb-10 -mx-2">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-w-[500px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gradient-to-r from-pf-light to-white">
                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.comparison.headers.path}</th>
                {paths.map((p) => {
                  const color = pathColor(p.id);
                  return (
                    <th key={p.id} className="text-left p-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color.border }} />
                        <span className="font-heading font-bold text-gray-800">{p.name}</span>
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
      </Reveal>

      {/* Financial comparison */}
      <Reveal variant="blur" delay={200}>
      <div className="mb-10">
        <h2 className="font-heading text-lg font-bold text-pf-text mb-2">{t.comparison.financeTitle}</h2>
        <p className="text-sm text-gray-400 mb-4">{t.comparison.financeSubtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {paths.map((p) => {
            const color = pathColor(p.id);
            const info = FINANCIAL_INFO[lang]?.[p.id];
            if (!info) return null;
            return (
              <div key={p.id} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color.border }} />
                  <span className="font-heading font-bold text-sm text-gray-800">{p.name}</span>
                </div>
                {(() => {
                  const { amount, rest } = extractEuro(info);
                  if (amount) {
                    return (
                      <>
                        <p className="text-lg font-bold text-pf-primary mb-1">{amount}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{rest}</p>
                      </>
                    );
                  }
                  return <p className="text-xs text-gray-600 leading-relaxed">{info}</p>;
                })()}
              </div>
            );
          })}

          {/* Universal benefits */}
          <div className="p-4 bg-pf-light/50 rounded-xl border border-pf-light border-l-4 border-l-pf-primary sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{'\u{1F4B6}'}</span>
              <span className="font-heading font-bold text-sm text-pf-primary">Kindergeld</span>
            </div>
            <p className="text-xs text-pf-primary/70 leading-relaxed">
              {lang === 'de'
                ? '250€/Monat bis 25 Jahre — solange du in Ausbildung, Studium, FSJ oder Übergang bist. Gilt für alle Wege.'
                : '250€/month until age 25 — as long as you\'re in training, studying, doing FSJ, or in transition. Applies to all paths.'}
            </p>
          </div>
        </div>
      </div>
      </Reveal>

      <Reveal variant="up" delay={400}>
      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.STORIES })}
        className="btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
      >
        {t.comparison.continueBtn}
      </button>
      </Reveal>
    </div>
  );
}
