import { useEffect, useRef } from 'react';

const callbacks = new Map();
let sharedObserver = null;

function getObserver() {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cb = callbacks.get(entry.target);
          if (cb) cb();
          callbacks.delete(entry.target);
          sharedObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  return sharedObserver;
}

export default function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed');
      return;
    }

    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = getObserver();
    callbacks.set(el, () => el.classList.add('revealed'));
    observer.observe(el);

    return () => {
      callbacks.delete(el);
      observer.unobserve(el);
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal reveal-${variant} ${className}`}>
      {children}
    </Tag>
  );
}
