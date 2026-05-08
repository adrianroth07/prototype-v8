import { useState, useEffect, useRef } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { pathColor } from '../data/colors.js';
import { BRIDGE_PATHS } from '../data/paths.js';
import Reveal from './ui/Reveal.jsx';

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

function CompassPanel({ riasecCounts, lifestyle, bestPath, t }) {
  const topTypes = Object.entries(riasecCounts)
    .filter(([k]) => k !== 'unsure')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  const anchorLabel = lifestyle?.anchor ? (t.paths.anchorLabels?.[lifestyle.anchor] || null) : null;
  const bestColor = pathColor(bestPath?.id);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-pf-primary animate-pulse" />
        <h3 className="font-heading text-sm font-bold text-gray-700 uppercase tracking-wider">
          {t.paths.compassTitle}
        </h3>
      </div>

      <RiasecRadar counts={riasecCounts} labels={t.paths.riasecLabels || {}} />

      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.paths.compassTraits}</p>
        <div className="flex flex-wrap gap-1.5">
          {topTypes.map(([type]) => (
            <span key={type} className="text-xs px-2.5 py-1 rounded-full bg-pf-light text-pf-primary font-medium">
              {t.paths.riasecLabels?.[type] || type}
            </span>
          ))}
          {anchorLabel && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-medium">
              {anchorLabel}
            </span>
          )}
        </div>
      </div>

      {bestPath && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.paths.compassBestMatch}</p>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: bestColor.border }} />
            <span className="text-sm font-semibold text-gray-800">{bestPath.name}</span>
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-pf-primary" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-pf-primary animate-ping opacity-30" />
        </div>
        <span className="text-xs text-gray-400 font-medium">{t.paths.compassYouAreHere}</span>
      </div>
    </div>
  );
}

function metricDots(value) {
  if (!value) return 0;
  if (/1[,.]?[0-9]{3}|1400|high|meister|strong|hoch|sehr/i.test(value)) return 3;
  if (/[6-9]\d{2}|600|900|medium|mittel|portfolio|wide|dual/i.test(value)) return 2;
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
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-1 bottom-1 w-px" style={{ backgroundColor: color.border + '40' }} />
      {steps.map((step, i) => (
        <div key={i} className="relative pb-4 last:pb-0">
          <div
            className="absolute left-[-17px] top-1.5 w-2.5 h-2.5 rounded-full border-2 bg-white"
            style={{ borderColor: color.border }}
          />
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
      className={`bg-white rounded-2xl border overflow-hidden transition-shadow duration-500 ${
        isOpen ? 'shadow-md border-gray-200' : 'shadow-sm border-gray-100 hover:shadow-md'
      }`}
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
            <p className="text-sm text-gray-500">{path.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {path.meta.split(' · ').map((tag, j) => (
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
            <span className="text-xs text-pf-primary font-semibold transition-transform">
              {isOpen ? t.paths.closeRoute : t.paths.openRoute}
            </span>
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
                <p className="text-xs font-bold text-pf-primary uppercase tracking-wider mb-1.5">{t.paths.whyFits}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{reason}</p>
              </div>
            )}

            <p className="text-sm text-gray-600 leading-relaxed">{path.description}</p>

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

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t.comparison.headers.income, value: path.income_now },
                { label: t.comparison.headers.freedom, value: path.freedom },
                { label: t.comparison.headers.flexibility, value: path.flexibility },
                { label: t.comparison.headers.outlook, value: path.outlook },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {item.label}
                    <MetricIndicator value={item.value} />
                  </div>
                  <div className="text-xs text-gray-600">{item.value}</div>
                </div>
              ))}
            </div>

            {path.human_story && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-surface to-surface-alt border border-gray-100">
                <p className="italic text-sm text-gray-600 leading-relaxed">&ldquo;{path.human_story.quote}&rdquo;</p>
                <p className="text-xs text-gray-400 mt-2 font-medium">{'—'} {path.human_story.name}</p>
              </div>
            )}

            {path.nextSteps && (
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.paths.milestones}</p>
                <RouteMilestones steps={path.nextSteps} color={color} />
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
  const [openRoute, setOpenRoute] = useState(null);
  const [expandedBridge, setExpandedBridge] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.suggestedPaths.length > 0 && openRoute === null) {
      setOpenRoute(state.suggestedPaths[0].id);
    }
  }, [state.suggestedPaths]);

  const { suggestedPaths, wildcardPaths, reasons, riasecCounts, lifestyle } = state;

  function handleSwap(removeId, addPath) {
    dispatch({ type: 'SWAP_PATH', removeId, addPath });
    setSwapTarget(null);
  }

  return (
    <div className="min-h-dvh relative">
      {showConfetti && <Confetti />}

      <div className="px-6 md:px-12 pt-10 pb-6 max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-pf-primary" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-pf-primary animate-ping opacity-20" />
            </div>
            <span className="text-xs font-bold text-pf-primary uppercase tracking-widest">
              {t.paths.compassYouAreHere}
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-pf-text tracking-tight mb-3">
            {t.paths.title}
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl">{t.paths.subtitle}</p>
        </Reveal>
      </div>

      <div className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="lg:w-[280px] shrink-0">
            <div className="lg:sticky lg:top-8">
              <Reveal variant="left" delay={200}>
                <CompassPanel
                  riasecCounts={riasecCounts || {}}
                  lifestyle={lifestyle}
                  bestPath={suggestedPaths[0]}
                  t={t}
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
                <h2 className="font-heading text-lg font-bold text-gray-700 mt-6 mb-1 flex items-center gap-2">
                  <span className="w-8 h-px bg-gray-300" />
                  {t.paths.bridgeTitle}
                </h2>
                <p className="text-sm text-gray-400 mb-5 pl-10">{t.paths.bridgeSubtitle}</p>
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
                <div className="text-center">
                  <button
                    onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.QUALIFICATIONS })}
                    className="btn-primary btn-glow px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
                  >
                    {t.paths.confirmBtn}
                  </button>
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
                    {lang === 'de' ? 'Wird entfernt' : 'Removing'}
                  </div>
                  <div className="font-semibold text-gray-800">{removePath.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{removePath.tagline}</div>
                </div>
              );
            })()}
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              {lang === 'de' ? 'Ersetzen durch' : 'Replace with'}
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
                    <div className="text-sm text-gray-500 mt-0.5">{wc.tagline}</div>
                    <div className="text-xs text-gray-400 mt-1">{wc.meta}</div>
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
