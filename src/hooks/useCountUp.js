import { useState, useEffect, useRef } from 'react';

/**
 * useCountUp – animates a number from 0 to `target` when `start` becomes true.
 * @param {number} target  – final number to count up to
 * @param {number} duration – animation duration in ms (default 1800)
 * @param {boolean} start  – set true when the element enters viewport
 * @param {string} suffix  – optional suffix like '+' to append
 */
export default function useCountUp(target, duration = 1800, start = false, suffix = '') {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const startTime = useRef(null);

  useEffect(() => {
    if (!start || target === null) return;

    // Reset
    setCount(0);
    startTime.current = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return count;
}
