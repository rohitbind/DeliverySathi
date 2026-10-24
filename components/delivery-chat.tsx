"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const chat = [
  {
    from: "sathi",
    text: "Namaste! Aapka parcel aaj aaya tha, par ghar pe koi nahi mila. Kab aayein?",
    d: 1400,
  },
  { from: "buyer", text: "Aaj ghar pe koi nahi, kal shaam aa jao", d: 2500 },
  {
    from: "sathi",
    text: "Ho gaya. Kal shaam 6 se 8 ke beech dobara aayega.",
    d: 3600,
  },
] as const;

function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

export function DeliveryChat() {
  const [run, setRun] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  // Below the fold (phones), hold the sequence until the card is on screen.
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setWaiting(!entry.isIntersecting);
        if (entry.isIntersecting) observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stage}
      data-play={waiting ? "wait" : "go"}
      className="relative mx-auto w-full max-w-[24rem]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--lilac)_55%,transparent),transparent_62%)]"
      />

      <figure
        key={run}
        aria-label="Phone preview: Sathi chats with a COD buyer in Hinglish after a failed delivery attempt, books a reattempt, and the parcel is delivered."
        className="phone-frame overflow-hidden rounded-[2.35rem] bg-ink p-[0.55rem] shadow-[0_40px_80px_-36px_rgba(27,22,34,0.55),0_0_0_1px_rgba(255,255,255,0.18)_inset]"
      >
        <div className="relative overflow-hidden rounded-[1.9rem] bg-[linear-gradient(180deg,#f7f4fb_0%,#efeaf8_100%)]">
          {/* Status bar */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-3.5 pb-1 text-[0.7rem] font-semibold tracking-wide text-ink">
            <span className="tabular-nums">9:41</span>
            <span
              aria-hidden
              className="absolute top-2 left-1/2 h-[1.55rem] w-[6.4rem] -translate-x-1/2 rounded-full bg-ink"
            />
            <span className="flex items-center gap-1.5">
              <svg
                viewBox="0 0 18 12"
                className="h-2.5 w-4"
                fill="currentColor"
                aria-hidden
              >
                <rect x="0" y="8" width="3" height="4" rx="0.6" />
                <rect x="5" y="5" width="3" height="7" rx="0.6" />
                <rect x="10" y="2.5" width="3" height="9.5" rx="0.6" />
                <rect x="15" y="0" width="3" height="12" rx="0.6" />
              </svg>
              <svg
                viewBox="0 0 16 12"
                className="h-2.5 w-3.5"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 2.2c2.2 0 4.2.8 5.8 2.2l-1.2 1.2A6.4 6.4 0 0 0 8 4.1c-1.7 0-3.2.6-4.4 1.5L2.4 4.4A8.4 8.4 0 0 1 8 2.2Zm0 3.2c1.3 0 2.5.5 3.4 1.3L10 8A3.6 3.6 0 0 0 8 7.3c-.7 0-1.4.2-2 .6L4.6 6.7A5.4 5.4 0 0 1 8 5.4Zm0 3.2c.6 0 1.1.2 1.5.6L8 11.1 6.5 9.2c.4-.4.9-.6 1.5-.6Z" />
              </svg>
              <svg
                viewBox="0 0 25 12"
                className="h-2.5 w-[1.4rem]"
                fill="currentColor"
                aria-hidden
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="21"
                  height="11"
                  rx="2.2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <rect x="2.2" y="2.2" width="15.2" height="7.6" rx="1.2" />
                <rect x="22.2" y="3.5" width="2" height="5" rx="0.7" />
              </svg>
            </span>
          </div>

          <div className="px-4 pt-3 pb-5 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden
                  className="size-10 shrink-0 rounded-full bg-[conic-gradient(from_200deg,var(--peach),var(--rose),var(--lilac),var(--violet),var(--peach))]"
                />
                <div className="min-w-0 text-left">
                  <p className="text-sm font-semibold">Sathi</p>
                  <p className="text-xs text-ink-soft">
                    With your buyer in Kanpur
                  </p>
                </div>
              </div>
              <div className="grid shrink-0 text-xs font-semibold whitespace-nowrap">
                <span
                  style={delay(4600)}
                  className="seq-swap-out col-start-1 row-start-1 inline-flex items-center gap-1.5 rounded-full bg-rto/10 px-3 py-1.5 text-rto"
                >
                  <span className="size-1.5 rounded-full bg-rto" />
                  Attempt 1 failed
                </span>
                <span
                  style={delay(4800)}
                  className="seq-bubble col-start-1 row-start-1 inline-flex items-center justify-end gap-1.5 rounded-full bg-delivered/10 px-3 py-1.5 text-delivered"
                >
                  <span className="size-1.5 rounded-full bg-delivered" />
                  Delivered
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-2.5 text-left">
              {chat.map((message) => {
                const isBuyer = message.from === "buyer";
                return (
                  <div
                    key={message.text}
                    style={delay(message.d)}
                    className={`seq-bubble flex ${isBuyer ? "justify-end" : "justify-start"}`}
                  >
                    <p
                      className={`max-w-[86%] rounded-2xl px-4 py-2.5 text-[0.9rem] leading-6 ${
                        isBuyer
                          ? "rounded-br-md bg-gradient-to-br from-violet to-[#7a5be0] text-white"
                          : "rounded-bl-md bg-white text-ink shadow-[0_4px_14px_-8px_rgba(58,42,158,0.35)]"
                      }`}
                    >
                      <span className="sr-only">
                        {isBuyer ? "Buyer: " : "Sathi: "}
                      </span>
                      {message.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div
              style={delay(4400)}
              className="seq-bubble mt-5 flex items-center gap-3 rounded-2xl border border-white bg-white/80 px-4 py-3 text-left"
            >
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                className="size-5 shrink-0 text-violet"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="14" height="13" rx="2.5" />
                <path d="M3 8h14M7 2.5v3M13 2.5v3" />
                <path d="m7.5 12.2 1.8 1.8 3.4-3.6" />
              </svg>
              <p className="text-sm leading-5">
                <span className="font-semibold">Sent back to you:</span>{" "}
                reattempt booked for tomorrow, 6–8 pm
              </p>
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2.5" aria-hidden>
            <span className="h-1 w-28 rounded-full bg-ink/25" />
          </div>
        </div>
      </figure>

      <button
        type="button"
        onClick={() => setRun((count) => count + 1)}
        className="mx-auto mt-4 flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
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
          <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4" />
          <path d="M2.5 2.5V5H5" />
        </svg>
        Play it again
      </button>
    </div>
  );
}
