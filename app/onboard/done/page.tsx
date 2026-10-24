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
    <p className="mt-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
      Reference{" "}
      <span className="font-medium text-foreground tabular-nums">{id}</span>
    </p>
  );
}

type DonePageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default function OnboardDonePage({ searchParams }: DonePageProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-5 py-16 sm:px-8 sm:py-24">
      <p className="font-display text-sm font-semibold tracking-wide text-brand">
        Store received
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand-deep sm:text-5xl">
        Your store is in the queue.
      </h1>
      <p className="mt-5 text-base leading-7 text-muted">
        Next we connect your store and start buyer chats on the three moments
        that decide delivery — so more of your COD orders arrive. Prefer
        Telegram in the meantime? Open{" "}
        <a
          href="https://t.me/DeliverySathibot"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          @DeliverySathibot
        </a>
        .
      </p>
      <Suspense fallback={null}>
        <ReferenceId searchParams={searchParams} />
      </Suspense>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
        >
          Back to home
        </Link>
        <Link
          href="/onboard"
          className="inline-flex h-11 items-center rounded-full border border-line bg-surface px-5 text-sm font-semibold text-brand-deep"
        >
          Submit another store
        </Link>
      </div>
    </div>
  );
}
