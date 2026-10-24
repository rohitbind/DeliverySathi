"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Only play while the video is on screen, and respect reduced motion.
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) node.play().catch(() => {});
        else node.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function toggleSound() {
    const node = video.current;
    if (!node) return;
    node.muted = !muted;
    if (muted) node.play().catch(() => {});
    setMuted(!muted);
  }

  return (
    <figure className="glass relative mx-auto w-full max-w-4xl overflow-hidden rounded-[1.75rem] p-2 shadow-[0_40px_80px_-40px_rgba(58,42,158,0.45)] sm:p-3">
      <video
        ref={video}
        className="block aspect-video w-full rounded-[1.3rem] bg-[#f6f2ec] object-cover"
        src="/video/delivery-sathi.mp4"
        poster="/video/delivery-sathi-poster.jpg"
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label="How Delivery Sathi talks to COD buyers and saves returns"
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        className="absolute right-5 bottom-5 flex h-9 items-center gap-2 rounded-full bg-ink/80 px-3.5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-ink sm:right-6 sm:bottom-6"
      >
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 6h2.5l3.5-3v10l-3.5-3H2.5z" />
          {muted ? (
            <path d="m11 6 3 4m0-4-3 4" />
          ) : (
            <path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.5a6 6 0 0 1 0 9" />
          )}
        </svg>
        {muted ? "Sound on" : "Mute"}
      </button>
    </figure>
  );
}
