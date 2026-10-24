export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg aria-hidden viewBox="0 0 32 32" className="size-8 shrink-0">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#f6c8a0" />
            <stop offset="0.5" stopColor="#c4b5f4" />
            <stop offset="1" stopColor="#4f3cc9" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="15" fill="url(#logo-grad)" />
        <path
          d="m10 16.5 4 4 8-9"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`font-display text-[1.35rem] leading-none tracking-[0.06em] uppercase ${inverted ? "text-white" : "text-ink"}`}
      >
        Delivery Sathi
      </span>
    </span>
  );
}
