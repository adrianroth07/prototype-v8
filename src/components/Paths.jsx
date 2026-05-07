import { useState, useEffect, useRef } from 'react';
import { useLang } from '../LanguageContext.jsx';
import { usePathFinder } from '../state/PathFinderContext.jsx';
import { SCREENS } from '../state/appReducer.js';
import { pathColor } from '../data/colors.js';
import { BRIDGE_PATHS } from '../data/paths.js';

function Confetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#0F6B5B', '#6C5CE7', '#F59E0B', '#3B82F6', '#EC4899', '#14B8A6'];
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
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}

function PathDetail({ path, t }) {
  return (
    <div className="animate-fade-in px-5 pb-5 space-y-4">
      <p className="text-sm text-gray-600 leading-relaxed">{path.description}</p>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: t.comparison.headers.income, value: path.income_now },
          { label: t.comparison.headers.freedom, value: path.freedom },
          { label: t.comparison.headers.flexibility, value: path.flexibility },
          { label: t.comparison.headers.outlook, value: path.outlook },
        ].map(item => (
          <div key={item.label} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</div>
            <div className="text-sm text-gray-700">{item.value}</div>
          </div>
        ))}
      </div>

      {path.human_story && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-surface to-surface-alt border border-gray-100">
          <p className="italic text-sm text-gray-600 leading-relaxed">"{path.human_story.quote}"</p>
          <p className="text-xs text-gray-400 mt-2 font-medium">{'\u{2014}'} {path.human_story.name}</p>
        </div>
      )}

      {path.nextSteps && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.paths.nextSteps}</p>
          <ul className="space-y-2">
            {path.nextSteps.map((step, j) => (
              <li key={j} className="flex gap-2.5 text-sm">
                <span className="text-pf-primary shrink-0 mt-0.5">{'\u{2192}'}</span>
                <span className="text-gray-500 leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Paths() {
  const { t, lang } = useLang();
  const { state, dispatch } = usePathFinder();
  const [swapTarget, setSwapTarget] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const { suggestedPaths, wildcardPaths, reasons } = state;

  function handleSwap(removeId, addPath) {
    dispatch({ type: 'SWAP_PATH', removeId, addPath });
    setSwapTarget(null);
  }

  return (
    <div className="min-h-dvh p-6 md:p-12 max-w-4xl mx-auto">
      {showConfetti && <Confetti />}

      <div className="animate-fade-in-up mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pf-light mb-4">
          <span className="text-2xl">{'\u{2728}'}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-pf-text mb-2 tracking-tight">{t.paths.title}</h1>
        <p className="text-gray-400 text-base">{t.paths.subtitle}</p>
      </div>

      <div className="flex flex-col gap-5 mb-10">
        {suggestedPaths.map((path, i) => {
          const color = pathColor(path.id);
          return (
            <div
              key={path.id}
              className={`animate-fade-in-up stagger-${i + 1} card-hover bg-white rounded-xl p-6 md:p-8 border-l-4 border border-gray-100 shadow-sm`}
              style={{ borderLeftColor: color.border }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold text-white" style={{ backgroundColor: color.border }}>
                      {i + 1}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-gray-800">{path.name}</h3>
                    {i === 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-pf-accent text-white text-[10px] font-bold uppercase tracking-wider">
                        {lang === 'de' ? 'Top-Treffer' : 'Top match'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{path.tagline}</p>
                </div>
                {wildcardPaths.length > 0 && (
                  <button
                    onClick={() => setSwapTarget(path.id)}
                    className="text-xs text-gray-400 hover:text-pf-primary cursor-pointer border border-gray-200 hover:border-pf-primary rounded-lg px-3 py-1.5 transition-all"
                  >
                    {'\u{21C4}'} {t.paths.swapBtn}
                  </button>
                )}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">{reasons[path.id]}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {path.meta.split(' · ').map((tag, j) => (
                  <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                    {tag}
                  </span>
                ))}
              </div>

              {path.human_story && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-surface to-surface-alt border border-gray-100">
                  <p className="italic text-sm text-gray-600 leading-relaxed">"{path.human_story.quote}"</p>
                  <p className="text-xs text-gray-400 mt-2 font-medium">{'\u{2014}'} {path.human_story.name}</p>
                </div>
              )}

              {path.nextSteps && (
                <div className="mt-5 pt-4 border-t border-gray-50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.paths.nextSteps}</p>
                  <ul className="space-y-2">
                    {path.nextSteps.map((step, j) => (
                      <li key={j} className="flex gap-2.5 text-sm">
                        <span className="text-pf-primary shrink-0 mt-0.5">{'\u{2192}'}</span>
                        <span className="text-gray-500 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {wildcardPaths.length > 0 && (
        <div className="animate-fade-in-up mb-10">
          <h2 className="font-heading text-lg font-bold text-gray-700 mb-2">{t.paths.wildcardTitle}</h2>
          <p className="text-sm text-gray-400 mb-4">{t.paths.wildcardSubtitle}</p>
          <div className="flex flex-col gap-3">
            {wildcardPaths.map((path) => {
              const color = pathColor(path.id);
              const isOpen = expanded === path.id;
              return (
                <div
                  key={path.id}
                  className="card-hover bg-white rounded-xl border-l-4 border border-gray-100 shadow-sm overflow-hidden transition-all"
                  style={{ borderLeftColor: color.border }}
                >
                  <button
                    onClick={() => setExpanded(isOpen ? null : path.id)}
                    className="w-full text-left p-5 cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{path.name}</h3>
                        <p className="text-sm text-gray-500">{path.tagline}</p>
                        <p className="text-xs text-gray-400 mt-1">{path.meta}</p>
                      </div>
                      <span className="text-xs text-pf-primary font-semibold shrink-0 ml-3 mt-1">
                        {isOpen ? '\u{25B2}' : '\u{25BC}'} {isOpen ? t.browse.collapseBtn : t.paths.detailBtn}
                      </span>
                    </div>
                  </button>
                  {isOpen && <PathDetail path={path} t={t} />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bridge paths — stepping stones */}
      <div className="animate-fade-in-up mb-10">
        <h2 className="font-heading text-lg font-bold text-gray-700 mb-2">{t.paths.bridgeTitle}</h2>
        <p className="text-sm text-gray-400 mb-4">{t.paths.bridgeSubtitle}</p>
        <div className="flex flex-col gap-3">
          {BRIDGE_PATHS.map((path) => {
            const color = pathColor(path.id);
            const isOpen = expanded === path.id;
            return (
              <div
                key={path.id}
                className="card-hover bg-white rounded-xl border-l-4 border border-gray-100 shadow-sm overflow-hidden transition-all"
                style={{ borderLeftColor: color.border }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : path.id)}
                  className="w-full text-left p-4 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-heading font-bold text-sm text-gray-800">{path.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{path.tagline}</p>
                      <p className="text-xs text-gray-400 mt-1">{path.meta}</p>
                    </div>
                    <span className="text-xs text-pf-primary font-semibold shrink-0 ml-3 mt-1">
                      {isOpen ? '\u{25B2}' : '\u{25BC}'} {isOpen ? t.browse.collapseBtn : t.paths.detailBtn}
                    </span>
                  </div>
                </button>
                {isOpen && <PathDetail path={path} t={t} />}
              </div>
            );
          })}
        </div>
      </div>

      <p className="animate-fade-in text-sm text-gray-400 text-center italic mb-6">
        {t.common.noPathFinal}
      </p>

      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: SCREENS.QUALIFICATIONS })}
        className="btn-primary px-10 py-3.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark shadow-lg shadow-pf-primary/15 cursor-pointer transition-all"
      >
        {t.paths.confirmBtn}
      </button>

      {swapTarget && (
        <div className="fixed inset-0 bg-black/50 modal-backdrop flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setSwapTarget(null)}>
          <div className="animate-scale-in bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border-t-4 border-pf-primary" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading font-bold text-gray-800 mb-4 text-lg">{t.paths.swapBtn}</h3>
            <div className="flex flex-col gap-2">
              {wildcardPaths.map((wc) => {
                return (
                  <button
                    key={wc.id}
                    onClick={() => handleSwap(swapTarget, wc)}
                    className="card-hover text-left p-4 rounded-xl border-2 border-gray-100 hover:border-pf-primary hover:bg-pf-light transition-all cursor-pointer"
                  >
                    <span className="font-semibold text-gray-800">{wc.name}</span>
                    <span className="text-sm text-gray-500 ml-2">{wc.tagline}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setSwapTarget(null)}
              className="mt-4 text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
            >
              {'\u{2190}'} {t.common.back}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
