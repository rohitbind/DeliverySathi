"use client";

import { useEffect, useRef } from "react";

// A soft pool of lilac light that drifts toward the pointer across its parent section.
export function PointerGlow() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = glow.current;
    const area = node?.parentElement;
    if (!node || !area) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = area.getBoundingClientRect();
        node.style.setProperty(
          "--gx",
          `${((event.clientX - box.left) / box.width) * 100}%`,
        );
        node.style.setProperty(
          "--gy",
          `${((event.clientY - box.top) / box.height) * 100}%`,
        );
        node.dataset.on = "true";
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      node.dataset.on = "false";
    };

    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={glow} aria-hidden className="pointer-glow" data-on="false" />
  );
}
