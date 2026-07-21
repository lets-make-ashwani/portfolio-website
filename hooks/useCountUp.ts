import { useState, useEffect } from 'react';

export function useCountUp(end: number, duration: number = 2000, trigger: boolean = true): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing out cubic for smooth stop
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, trigger]);

  return count;
}
