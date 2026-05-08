import { useRef, useEffect } from 'react';
import { cn } from '../../lib/utils.js';

export default function InfiniteGrid({ children, className }) {
  const containerRef = useRef(null);
  const revealRef = useRef(null);
  const staticRef = useRef(null);
  const rafRef = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const reveal = revealRef.current;
    const staticGrid = staticRef.current;
    if (!reveal || !staticGrid) return;

    const animate = () => {
      offsetRef.current = (offsetRef.current + 0.3) % 40;
      const v = offsetRef.current;
      const pos = `${v}px ${v}px`;
      reveal.style.backgroundPosition = pos;
      staticGrid.style.backgroundPosition = pos;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const reveal = revealRef.current;
    if (!container || !reveal) return;

    const onMove = (e) => {
      const { left, top } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      reveal.style.maskImage = `radial-gradient(350px circle at ${x}px ${y}px, black, transparent)`;
      reveal.style.webkitMaskImage = `radial-gradient(350px circle at ${x}px ${y}px, black, transparent)`;
    };

    container.addEventListener('mousemove', onMove);
    return () => container.removeEventListener('mousemove', onMove);
  }, []);

  const gridBg = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%230F6B5B' stroke-width='1'/%3E%3C/svg%3E")`;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full min-h-dvh flex flex-col overflow-hidden',
        className
      )}
    >
      {/* Static grid — always visible, very faint */}
      <div
        ref={staticRef}
        className="absolute inset-0 z-0 opacity-[0.06]"
        style={{ backgroundImage: gridBg, backgroundSize: '40px 40px' }}
      />

      {/* Mouse-reveal grid — brighter, masked to cursor */}
      <div
        ref={revealRef}
        className="absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: gridBg,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(350px circle at -1000px -1000px, black, transparent)',
          WebkitMaskImage: 'radial-gradient(350px circle at -1000px -1000px, black, transparent)',
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-15%] top-[-15%] w-[35%] h-[35%] rounded-full bg-pf-primary/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[-5%] w-[18%] h-[18%] rounded-full bg-pf-mid/10 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-15%] w-[35%] h-[35%] rounded-full bg-pf-dark/8 blur-[120px]" />
        <div className="absolute left-[30%] bottom-[10%] w-[20%] h-[20%] rounded-full bg-pf-mid/25 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
