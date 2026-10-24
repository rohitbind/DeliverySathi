"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 420;

// Rolls a number to its new value so the visitor sees which way it moved.
export function TweenedNumber({
  value,
  format,
}: {
  value: number;
  format: (value: number) => string;
}) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : DURATION;
    const start = performance.now();
    const origin = from.current;
    let frame = 0;
    const step = (now: number) => {
      const t = duration ? Math.min((now - start) / duration, 1) : 1;
      const eased = 1 - Math.pow(1 - t, 4);
      const next = origin + (value - origin) * eased;
      from.current = next;
      setShown(next);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{format(Math.round(shown))}</>;
}
