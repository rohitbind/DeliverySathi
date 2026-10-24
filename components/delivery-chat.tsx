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
      className="relative mx-auto w-full max-w-[26rem]"
    >
      <figure
        key={run}
        aria-label="Sathi chats with a COD buyer in Hinglish after a failed delivery attempt, books a reattempt, and the parcel is delivered."
        className="glass rounded-[1.75rem] p-5 text-left sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="size-10 rounded-full bg-[conic-gradient(from_200deg,var(--peach),var(--rose),var(--lilac),var(--violet),var(--peach))]"
            />
            <div>
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

        <div className="mt-5 space-y-2.5">
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
          className="seq-bubble mt-5 flex items-center gap-3 rounded-2xl border border-white bg-white/70 px-4 py-3"
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
            <span className="font-semibold">Sent back to you:</span> reattempt
            booked for tomorrow, 6–8 pm
          </p>
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
