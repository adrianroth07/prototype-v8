import { useRef, useCallback } from 'react';

export default function TiltCard({ children, className = '', intensity = 8, as: Tag = 'div', ...props }) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateY(-4px)`;
    el.style.boxShadow = `${-x * 20}px ${-y * 10 + 20}px 40px -8px rgba(15, 107, 91, 0.1)`;
  }, [intensity]);

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
      {...props}
    >
      {children}
    </Tag>
  );
}
