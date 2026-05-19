import { useState, useEffect, useRef } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { pathColor } from '../data/colors.js';
import { BRIDGE_PATHS } from '../data/paths.js';
import { l } from '../utils/localize.js';
import Reveal from './ui/Reveal.jsx';

const STUDIUM_SUBTYPES = {
  de: [
    { id: 'bachelor', icon: '\u{1F393}', name: 'Bachelor (BSc / BA)', time: '3–4 Jahre', desc: 'Der klassische Einstieg. An Uni oder FH — gibt dir Breite, Theorie und ein anerkanntes Abschlusszeugnis.' },
    { id: 'dual', icon: '\u{1F504}', name: 'Duales Studium', time: '3 Jahre', desc: 'Studium + Berufsausbildung gleichzeitig. Du verdienst von Anfang an und hast einen festen Betriebspartner.' },
    { id: 'fh', icon: '\u{1F3D7}', name: 'Fachhochschule (FH)', time: '3–4 Jahre', desc: 'Mehr Praxis als die Uni, kleinere Kurse und enger mit der Industrie vernetzt.' },
    { id: 'master', icon: '\u{1F52C}', name: 'Master', time: '+1,5–2 Jahre', desc: 'Vertiefung nach dem Bachelor — sinnvoll, wenn du in Forschung, Führung oder ein Spezialfeld willst.' },
    { id: 'abroad', icon: '\u{2708}', name: 'Studium im Ausland', time: 'variabel', desc: 'Erasmus-Semester, vollständiges Studium oder ein Jahr mit Sprachkurs. Öffnet Türen global.' },
  ],
  en: [
    { id: 'bachelor', icon: '\u{1F393}', name: 'Bachelor (BSc / BA)', time: '3–4 years', desc: 'The classic entry point. At university or Fachhochschule — breadth, theory, and a recognised degree.' },
    { id: 'dual', icon: '\u{1F504}', name: 'Dual Study Programme', time: '3 years', desc: 'Study + apprenticeship at the same time. You earn from day one and have a real employer on board.' },
    { id: 'fh', icon: '\u{1F3D7}', name: 'Fachhochschule (FH)', time: '3–4 years', desc: 'More hands-on than university, smaller classes, closer ties to industry.' },
    { id: 'master', icon: '\u{1F52C}', name: "Master's Degree", time: '+1.5–2 years', desc: 'Deep specialisation after your bachelor — worth it for research, leadership, or niche fields.' },
    { id: 'abroad', icon: '\u{2708}', name: 'Study Abroad', time: 'variable', desc: 'Erasmus semester, full degree abroad, or a gap year with language courses. Opens global doors.' },
  ],
};

function StudiumSubTypes({ lang }) {
  const [expanded, setExpanded] = useState(null);
  const subtypes = STUDIUM_SUBTYPES[lang] || STUDIUM_SUBTYPES.en;
  const label = lang === 'de' ? 'Welche Art von Studium?' : 'Which type of study?';

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      </div>
      <div className="divide-y divide-gray-100">
        {subtypes.map(sub => (
          <div key={sub.id}>
            <button
              onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{sub.icon}</span>
                <div>
                  <span className="text-sm font-semibold text-gray-700">{sub.name}</span>
                  <span className="ml-2 text-xs text-gray-400">{sub.time}</span>
                </div>
              </div>
              <svg
                className="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200"
                style={{ transform: expanded === sub.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded === sub.id && (
              <div className="px-4 pb-3">
                <p className="text-sm text-gray-500 leading-relaxed pl-8">{sub.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Confetti() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#0F6B5B', '#1B8A72', '#F59E0B', '#3B82F6', '#EC4899', '#14B8A6'];
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 8,
      vy: -(Math.random() * 12 + 8),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.15,
      opacity: 1,
    }));
    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.x += p.vx; p.vy += p.gravity; p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, p.opacity - 0.008);
        if (p.opacity > 0) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      frame++;
      if (alive && frame < 180) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(animate);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" style={{ width: '100vw', height: '100vh' }} />;
}

function RiasecRadar({ counts, labels }) {
  const types = ['R', 'I', 'A', 'S', 'E', 'C'];
  const maxCount = Math.max(...types.map(t => counts[t] || 0), 1);
  const cx = 100, cy = 100, r = 65;
  const angles = types.map((_, i) => (i * Math.PI * 2) / 6 - Math.PI / 2);

  const bgHex = (scale) =>
    angles.map(a => `${cx + r * scale * Math.cos(a)},${cy + r * scale * Math.sin(a)}`).join(' ');

  const dataPoints = types.map((type, i) => {
    const value = (counts[type] || 0) / maxCount;
    const radius = Math.max(r * value, 8);
    return `${cx + radius * Math.cos(angles[i])},${cy + radius * Math.sin(angles[i])}`;
  }).join(' ');

  const labelR = r + 20;

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[180px] mx-auto" aria-hidden="true">
      {[0.33, 0.66, 1].map(s => (
        <polygon key={s} points={bgHex(s)} fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
      ))}
      {angles.map((a, i) => (
        <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="#e5e7eb" strokeWidth="0.5" />
      ))}
      <polygon points={dataPoints} fill="rgba(15, 107, 91, 0.12)" stroke="#0F6B5B" strokeWidth="1.5" strokeLinejoin="round" />
      {types.map((type, i) => {
        const value = (counts[type] || 0) / maxCount;
        const radius = Math.max(r * value, 8);
        return <circle key={type} cx={cx + radius * Math.cos(angles[i])} cy={cy + radius * Math.sin(angles[i])} r="3" fill="#0F6B5B" />;
      })}
      {types.map((type, i) => (
        <text
          key={type}
          x={cx + labelR * Math.cos(angles[i])}
          y={cy + labelR * Math.sin(angles[i])}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-gray-400 font-medium"
          style={{ fontSize: '9px' }}
        >
          {labels[type] || type}
        </text>
      ))}
      <circle cx={cx} cy={cy} r="2.5" fill="#0F6B5B" opacity="0.4" />
    </svg>
  );
}

function CompassPanel({ riasecCounts, lifestyle, bestPath, t, lang }) {
  const topTypes = Object.entries(riasecCounts)
    .filter(([k]) => k !== 'unsure')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  const anchorLabel = lifestyle?.anchor ? (t.paths.anchorLabels?.[lifestyle.anchor] || null) : null;
  const bestColor = pathColor(bestPath?.id);

  const topLabels = topTypes.map(([type]) => t.paths.riasecLabels?.[type] || type);
  const summaryText = topLabels.length > 0
    ? `${t.paths.personalSummary} ${topLabels.join(' + ')}${anchorLabel ? ` · ${anchorLabel}` : ''}`
    : null;

  return (
    <div className="compass-panel p-6 space-y-5">
      <div className="flex items-center gap-2.5">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-pf-light">
          <span className="text-sm">{'\u{1F9ED}'}</span>
        </div>
        <h3 className="font-heading text-sm font-bold text-pf-text uppercase tracking-wider">
          {t.paths.compassTitle}
        </h3>
      </div>

      <RiasecRadar counts={riasecCounts} labels={t.paths.riasecLabels || {}} />

      {summaryText && (
        <p className="text-sm text-gray-600 leading-relaxed text-center italic">
          {summaryText}
        </p>
      )}

      <div className="space-y-2.5">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.paths.compassTraits}</p>
        <div className="flex flex-wrap gap-1.5">
          {topTypes.map(([type]) => (
            <span key={type} className="text-xs px-3 py-1.5 rounded-full bg-pf-light text-pf-primary font-semibold">
              {t.paths.riasecLabels?.[type] || type}
            </span>
          ))}
          {anchorLabel && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 font-semibold">
              {anchorLabel}
            </span>
          )}
        </div>
      </div>

      {bestPath && (
        <div className="pt-4 border-t border-gray-100/80">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">{t.paths.compassBestMatch}</p>
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-pf-light/50">
            <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: bestColor.border }} />
            <span className="text-sm font-bold text-pf-text">{bestPath.name}</span>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-100/80 flex items-center gap-2.5">
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-pf-primary" />
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-pf-primary animate-ping opacity-25" />
        </div>
        <span className="text-xs text-gray-500 font-medium">{t.paths.compassYouAreHere}</span>
      </div>
    </div>
  );
}

function metricDots(value) {
  const s = typeof value === 'string' ? value : '';
  if (!s) return 0;
  if (/1[,.]?[0-9]{3}|2[,.]?[0-9]{3}|high|meister|strong|hoch|sehr|maximal/i.test(s)) return 3;
  if (/[6-9]\d{2}|600|900|medium|mittel|portfolio|wide|dual|breit/i.test(s)) return 2;
  return 1;
}

function MetricIndicator({ value }) {
  const filled = metricDots(value);
  return (
    <span className="inline-flex gap-1 ml-2">
      {[1, 2, 3].map(i => (
        <span key={i} className={`inline-block w-1.5 h-1.5 rounded-full ${i <= filled ? 'bg-pf-primary' : 'bg-gray-200'}`} />
      ))}
    </span>
  );
}

function RouteMilestones({ steps, color }) {
  if (!steps?.length) return null;
  return (
    <div className="relative pl-7">
      <div className="absolute left-[9px] top-2 bottom-2 w-px" style={{ backgroundColor: color.border + '30' }} />
      {steps.map((step, i) => (
        <div key={i} className="relative pb-5 last:pb-0 group/step">
          <div
            className="absolute left-[-19px] top-1 w-[18px] h-[18px] rounded-full border-2 bg-white flex items-center justify-center"
            style={{ borderColor: color.border }}
          >
            <span className="text-[8px] font-bold" style={{ color: color.border }}>{i + 1}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
        </div>
      ))}
    </div>
  );
}

function RoutePanel({ path, index, reason, isOpen, onToggle, isBest, onSwap, hasWildcards, t, lang }) {
  const color = pathColor(path.id);
  const diffLabel = { easy: { de: 'Einfach', en: 'Easy' }, medium: { de: 'Mittel', en: 'Medium' }, hard: { de: 'Anspruchsvoll', en: 'Challenging' } };
  const diffColor = { easy: 'bg-green-100 text-green-700', medium: 'bg-amber-100 text-amber-700', hard: 'bg-red-100 text-red-700' };

  return (
    <div
      className={`route-panel overflow-hidden ${isOpen ? 'route-active' : ''} ${isBest && !isOpen ? 'route-best' : ''}`}
      style={{ borderLeftWidth: '4px', borderLeftColor: color.border }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-5 md:p-6 cursor-pointer group"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              {index !== undefined && (
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: color.border }}
                >
                  {index + 1}
                </span>
              )}
              <h3 className="font-heading text-lg font-bold text-gray-800">{path.name}</h3>
              {isBest && (
                <span className="px-2.5 py-0.5 rounded-full bg-pf-primary text-white text-[10px] font-bold uppercase tracking-wider">
                  {t.paths.bestMatch}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{l(path.tagline, lang)}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {l(path.meta, lang).split(' · ').map((tag, j) => (
                <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-400 border border-gray-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            {hasWildcards && onSwap && (
              <span
                onClick={(e) => { e.stopPropagation(); onSwap(path.id); }}
                className="text-xs text-gray-400 hover:text-pf-primary border border-gray-200 hover:border-pf-primary rounded-lg px-2.5 py-1 transition-all cursor-pointer hidden sm:inline-flex"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onSwap(path.id); } }}
              >
                {'⇄'} {t.paths.swapBtn}
              </span>
            )}
            <svg
              className="w-5 h-5 text-pf-primary transition-transform duration-300"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div className="px-5 md:px-6 pb-6 space-y-5">
            {hasWildcards && onSwap && (
              <button
                onClick={() => onSwap(path.id)}
                className="sm:hidden text-xs text-gray-400 hover:text-pf-primary border border-gray-200 hover:border-pf-primary rounded-lg px-2.5 py-1.5 transition-all cursor-pointer"
              >
                {'⇄'} {t.paths.swapBtn}
              </button>
            )}

            {reason && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-pf-light/50 to-transparent border border-pf-primary/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <svg className="w-3.5 h-3.5 text-pf-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs font-bold text-pf-primary uppercase tracking-wider">{t.paths.whyFits}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{l(reason, lang)}</p>
              </div>
            )}

            <p className="text-sm text-gray-600 leading-relaxed">{l(path.description, lang)}</p>

            {path.id === 'studium' && <StudiumSubTypes lang={lang} />}

            {(path.difficulty || path.timeToStart) && (
              <div className="flex flex-wrap gap-2">
                {path.difficulty && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diffColor[path.difficulty]}`}>
                    {diffLabel[path.difficulty]?.[lang] || path.difficulty}
                  </span>
                )}
                {path.timeToStart && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-pf-light text-pf-primary font-medium">
                    {typeof path.timeToStart === 'object' ? (path.timeToStart[lang] || path.timeToStart.en) : path.timeToStart}
                  </span>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: t.comparison.headers.income, value: l(path.income_now, lang) },
                { label: t.comparison.headers.freedom, value: l(path.freedom, lang) },
                { label: t.comparison.headers.flexibility, value: l(path.flexibility, lang) },
                { label: t.comparison.headers.outlook, value: l(path.outlook, lang) },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-xl bg-warm-50 border border-gray-100/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
                    <MetricIndicator value={item.value} />
                  </div>
                  <div className="text-xs text-gray-700 font-medium">{item.value}</div>
                </div>
              ))}
            </div>

            {path.human_story && (
              <div className="relative p-5 rounded-xl bg-gradient-to-r from-surface to-surface-alt border border-gray-100 overflow-hidden">
                <span className="absolute top-0 left-3 text-4xl text-pf-primary/15 font-serif leading-none select-none pointer-events-none">{'\u{201C}'}</span>
                <p className="relative italic text-sm text-gray-600 leading-relaxed pl-4">&ldquo;{l(path.human_story.quote, lang)}&rdquo;</p>
                <p className="text-xs text-gray-400 mt-2.5 pl-4 font-medium">{'—'} {path.human_story.name}</p>
              </div>
            )}

            {path.nextSteps && (
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.paths.milestones}</p>
                <RouteMilestones steps={l(path.nextSteps, lang)} color={color} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Paths() {
  const { t, lang } = useLang();
  const { state, dispatch } = usePathFinder();
  const [swapTarget, setSwapTarget] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [openRoute, setOpenRoute] = useState(() =>
    state.suggestedPaths.length > 0 ? state.suggestedPaths[0].id : null
  );
  const [expandedBridge, setExpandedBridge] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!swapTarget) return;
    function onKey(e) { if (e.key === 'Escape') setSwapTarget(null); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [swapTarget]);

  const [copied, setCopied] = useState(false);
  const { suggestedPaths, wildcardPaths, reasons, riasecCounts, lifestyle } = state;

  function handleSwap(removeId, addPath) {
    dispatch({ type: 'SWAP_PATH', removeId, addPath });
    setSwapTarget(null);
  }

  async function shareResults() {
    const summary = suggestedPaths.map((p, i) => `${i + 1}. ${p.name} — ${l(p.tagline, lang)}`).join('\n');
    const text = `${t.paths.shareTitle}:\n\n${summary}\n\n${t.paths.shareFooter}: ${window.location.origin}`;
    if (navigator.share) {
      try { await navigator.share({ title: 'PathFinder', text }); return; } catch { /* user cancelled */ }
    }
    try { await navigator.clipboard.writeText(text); } catch { /* clipboard unavailable */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-dvh relative">
      {showConfetti && <Confetti />}

      <div className="px-6 md:px-12 pt-10 pb-8 max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-pf-primary" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-pf-primary animate-ping opacity-20" />
            </div>
            <span className="text-[11px] font-bold text-pf-primary uppercase tracking-widest">
              {t.paths.compassYouAreHere}
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-pf-text tracking-tight mb-3">
            {t.paths.title}
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed mb-2">{t.paths.subtitle}</p>
          <p className="text-sm text-gray-400">
            {suggestedPaths.length} {t.paths.routesForYou}
            {wildcardPaths.length > 0 && ` · ${wildcardPaths.length} ${t.paths.hidden}`}
          </p>
        </Reveal>
      </div>

      <div className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="lg:w-[280px] shrink-0">
            <div className="lg:sticky lg:top-8">
              <Reveal variant="left" delay={100}>
                <CompassPanel
                  riasecCounts={riasecCounts || {}}
                  lifestyle={lifestyle}
                  bestPath={suggestedPaths[0]}
                  t={t}
                  lang={lang}
                />
              </Reveal>
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-10 pb-12">

            <section>
              <Reveal>
                <h2 className="font-heading text-lg font-bold text-gray-700 mb-5 flex items-center gap-2">
                  <span className="w-8 h-px bg-pf-primary" />
                  {t.paths.mainRoutes}
                </h2>
              </Reveal>
              <div className="flex flex-col gap-4">
                {suggestedPaths.map((path, i) => (
                  <Reveal key={path.id} delay={i * 80}>
                    <RoutePanel
                      path={path}
                      index={i}
                      reason={reasons[path.id]}
                      isOpen={openRoute === path.id}
                      onToggle={() => setOpenRoute(openRoute === path.id ? null : path.id)}
                      isBest={i === 0}
                      onSwap={wildcardPaths.length > 0 ? setSwapTarget : null}
                      hasWildcards={wildcardPaths.length > 0}
                      t={t}
                      lang={lang}
                    />
                  </Reveal>
                ))}
              </div>
            </section>

            {wildcardPaths.length > 0 && (
              <section>
                <Reveal variant="up">
                  <h2 className="font-heading text-lg font-bold text-gray-700 mb-1 flex items-center gap-2">
                    <span className="w-8 h-px bg-gray-300" />
                    {t.paths.wildcardTitle}
                  </h2>
                  <p className="text-sm text-gray-400 mb-5 pl-10">{t.paths.wildcardSubtitle}</p>
                </Reveal>
                <div className="flex flex-col gap-3">
                  {wildcardPaths.map((path) => (
                    <Reveal key={path.id} delay={100}>
                      <RoutePanel
                        path={path}
                        reason={reasons[path.id]}
                        isOpen={openRoute === path.id}
                        onToggle={() => setOpenRoute(openRoute === path.id ? null : path.id)}
                        t={t}
                        lang={lang}
                      />
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            <section>
              <Reveal variant="up">
                <div className="divider-gradient my-2" />
                <div className="mt-6 mb-5 flex items-start gap-3 pl-1">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 shrink-0 mt-0.5">
                    <span className="text-sm">{'\u{1F309}'}</span>
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-gray-700">
                      {t.paths.bridgeTitle}
                    </h2>
                    <p className="text-sm text-gray-400">{t.paths.bridgeSubtitle}</p>
                  </div>
                </div>
              </Reveal>
              <div className="flex flex-col gap-3">
                {BRIDGE_PATHS.map((path) => (
                  <Reveal key={path.id} delay={100}>
                    <RoutePanel
                      path={path}
                      reason={reasons[path.id]}
                      isOpen={expandedBridge === path.id}
                      onToggle={() => setExpandedBridge(expandedBridge === path.id ? null : path.id)}
                      t={t}
                      lang={lang}
                    />
                  </Reveal>
                ))}
              </div>
            </section>

            <div className="pt-4">
              <p className="text-sm text-gray-400 text-center italic mb-6">{t.common.noPathFinal}</p>
              <Reveal variant="scale">
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.QUALIFICATIONS })}
                    className="btn-primary px-10 py-3.5 bg-gradient-to-b from-pf-primary to-pf-dark text-white font-semibold rounded-xl shadow-lg shadow-pf-primary/12 cursor-pointer transition-all"
                  >
                    {t.paths.confirmBtn}
                  </button>
                  <button
                    onClick={shareResults}
                    className="text-sm text-gray-400 hover:text-pf-primary cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>{'✓'} {t.paths.copiedMsg}</>
                    ) : (
                      <>{'↗'} {t.paths.shareBtn}</>
                    )}
                  </button>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.BROWSE })}
                      className="text-sm text-gray-400 hover:text-pf-primary cursor-pointer transition-colors"
                    >
                      {t.paths.browseAll}
                    </button>
                    <button
                      onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.QUIZ_R1 })}
                      className="text-sm text-gray-400 hover:text-pf-primary cursor-pointer transition-colors"
                    >
                      {t.paths.retakeQuiz}
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {swapTarget && (
        <div className="fixed inset-0 bg-black/50 modal-backdrop flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setSwapTarget(null)}>
          <div className="animate-scale-in bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border-t-4 border-pf-primary max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading font-bold text-gray-800 mb-4 text-lg">{t.paths.swapBtn}</h3>
            {(() => {
              const removePath = suggestedPaths.find(p => p.id === swapTarget);
              if (!removePath) return null;
              const removeColor = pathColor(removePath.id);
              return (
                <div className="mb-4 p-3 rounded-xl border-l-4 bg-red-50/50 border border-red-100" style={{ borderLeftColor: removeColor.border }}>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {t.paths.removing}
                  </div>
                  <div className="font-semibold text-gray-800">{removePath.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{l(removePath.tagline, lang)}</div>
                </div>
              );
            })()}
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              {t.paths.replaceWith}
            </div>
            <div className="flex flex-col gap-2">
              {wildcardPaths.map((wc) => {
                const wcColor = pathColor(wc.id);
                return (
                  <button
                    key={wc.id}
                    onClick={() => handleSwap(swapTarget, wc)}
                    className="card-hover text-left p-4 rounded-xl border-2 border-l-4 border-gray-100 hover:border-pf-primary hover:bg-pf-light transition-all cursor-pointer"
                    style={{ borderLeftColor: wcColor.border }}
                  >
                    <span className="font-semibold text-gray-800">{wc.name}</span>
                    <div className="text-sm text-gray-500 mt-0.5">{l(wc.tagline, lang)}</div>
                    <div className="text-xs text-gray-400 mt-1">{l(wc.meta, lang)}</div>
                  </button>
                );
              })}
            </div>
            <button onClick={() => setSwapTarget(null)} className="mt-4 text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              {'←'} {t.common.back}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
