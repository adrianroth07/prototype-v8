import { useRef, useCallback, useEffect, useState } from 'react';

export default function TiltCard({ children, className = '', intensity = 8, as: Tag = 'div', ...props }) {
  const ref = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const applyTilt = useCallback((x, y) => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    el.style.transform = `perspective(600px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateY(-4px)`;
    el.style.boxShadow = `${-x * 20}px ${-y * 10 + 20}px 40px -8px rgba(15, 107, 91, 0.1)`;
  }, [intensity, reducedMotion]);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    applyTilt((e.clientX - left) / width - 0.5, (e.clientY - top) / height - 0.5);
  }, [applyTilt]);

  const handleTouch = useCallback((e) => {
    const touch = e.touches[0];
    if (!touch) return;
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = Math.max(-0.5, Math.min(0.5, (touch.clientX - left) / width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (touch.clientY - top) / height - 0.5));
    applyTilt(x * 0.6, y * 0.6);
  }, [applyTilt]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.boxShadow = '';
  }, []);

  return (
    <Tag
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouch}
      onTouchEnd={handleLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
