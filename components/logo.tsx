import { useId } from "react";

// Two companions holding a parcel between them, in the site's peach-to-violet palette.
export function LogoMark({ className = "size-10" }: { className?: string }) {
  const id = useId();
  const warm = `${id}-warm`;
  const cool = `${id}-cool`;

  return (
    <svg aria-hidden viewBox="0 0 130 120" className={`shrink-0 ${className}`}>
      <defs>
        <linearGradient id={warm} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6c08f" />
          <stop offset="1" stopColor="#e2649f" />
        </linearGradient>
        <linearGradient id={cool} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b3a3f6" />
          <stop offset="1" stopColor="#4f3cc9" />
        </linearGradient>
      </defs>
      <circle cx="44" cy="26.5" r="14" fill={`url(#${warm})`} />
      <path
        fill={`url(#${warm})`}
        d="M71 57.5C60 47 46 40.5 35 41 16 42 7 57 7 73c0 21 21 35 52 34-19-4-30-15-30-28 0-17 18-29 42-21.5Z"
      />
      <circle cx="95.5" cy="27.5" r="13.7" fill={`url(#${cool})`} />
      <path
        fill={`url(#${cool})`}
        d="M64 70c6-15 20-28 34-28 15 0 26 13 26 30 0 22-24 38-55 38 19-5 28-17 28-30 0-14-9-23-19-23-6 0-11 5-14 13Z"
      />
      <g strokeLinejoin="round" strokeWidth="2.4">
        <path
          d="M42 71 63 60.5 84 71 63 81.5Z"
          fill="#e4dcfb"
          stroke="#e4dcfb"
        />
        <path d="M42 71 63 81.5V104L42 93.5Z" fill="#9c88ee" stroke="#9c88ee" />
        <path d="M63 81.5 84 71V93.5L63 104Z" fill="#4f3cc9" stroke="#4f3cc9" />
      </g>
      <path d="M51.5 66.2 56 64 76 74.4 71.5 76.6Z" fill="#fff" opacity=".7" />
      <path d="M71.5 76.6 76 74.4V95.6L71.5 97.8Z" fill="#fff" opacity=".45" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="h-11 w-12" />
      <span className="font-display text-[1.05rem] leading-[1.05] tracking-[0.08em] text-ink uppercase">
        Delivery
        <br />
        Sathi
      </span>
    </span>
  );
}
