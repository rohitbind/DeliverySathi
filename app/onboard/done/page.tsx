import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "You are in",
  description: "Delivery Sathi has your seller onboarding details.",
};

async function ReferenceId({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  if (!id) return null;

  return (
    <p className="mt-6 inline-block rounded-full bg-white/70 px-4 py-2 text-sm text-ink-soft">
      Reference{" "}
      <span className="font-semibold text-ink tabular-nums">{id}</span>
    </p>
  );
}

type DonePageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default function OnboardDonePage({ searchParams }: DonePageProps) {
  return (
    <div className="field">
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28">
        <div className="glass relative rounded-[1.75rem] px-6 py-9 text-center sm:px-10">
          <p
            aria-hidden
            className="hero-in mx-auto mb-6 grid size-14 place-items-center rounded-full bg-[conic-gradient(from_200deg,var(--peach),var(--rose),var(--lilac),var(--violet),var(--peach))]"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-7"
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 12.5 4 4 8-9" />
            </svg>
          </p>
          <h1 className="display text-[clamp(2.4rem,5.5vw,3.6rem)] text-balance">
            Your store is in the queue.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            Next we connect your store and start buyer chats on the three
            moments that decide delivery — so more of your COD orders arrive.
            Prefer Telegram in the meantime? Open{" "}
            <a
              href="https://t.me/DeliverySathibot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-violet underline-offset-[5px] hover:underline"
            >
              @DeliverySathibot
            </a>
            .
          </p>
          <Suspense fallback={null}>
            <ReferenceId searchParams={searchParams} />
          </Suspense>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-white transition-[transform,background-color] hover:-translate-y-px hover:bg-violet-deep"
            >
              Back to home
            </Link>
            <Link
              href="/onboard"
              className="inline-flex h-11 items-center rounded-full border border-white bg-white/60 px-5 text-sm font-medium text-ink transition-transform hover:-translate-y-px"
            >
              Submit another store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
