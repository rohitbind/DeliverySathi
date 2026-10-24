import type { Metadata } from "next";
import Link from "next/link";
import { OnboardingForm } from "@/components/onboarding-form";

export const metadata: Metadata = {
  title: "Seller onboarding",
  description:
    "Go live with Delivery Sathi. Tell us about your store, where you sell, and how you deliver COD.",
};

export const ensureStatic = "navigation";

export default function OnboardPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-16">
      <aside className="lg:sticky lg:top-10 lg:self-start">
        <p className="font-display text-sm font-semibold tracking-wide text-brand">
          Store onboarding
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-balance text-brand-deep sm:text-5xl">
          Get Sathi on your COD orders.
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-muted">
          About ten answers: who you are, where you sell, how you ship. Then
          Sathi can talk to your buyers in Hindi, Hinglish, or English.
        </p>
        <ul className="mt-8 space-y-3 text-sm leading-6 text-muted">
          <li>For own-store and D2C sellers shipping COD.</li>
          <li>Marketplace-only shops are politely turned away.</li>
          <li>
            Prefer chat?{" "}
            <a
              href="https://t.me/DeliverySathibot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              @DeliverySathibot
            </a>
          </li>
        </ul>
        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </aside>

      <div className="rounded-[1.75rem] border border-line bg-surface px-5 py-7 shadow-[0_24px_50px_-36px_rgba(6,53,50,0.55)] sm:px-8 sm:py-9">
        <OnboardingForm />
      </div>
    </div>
  );
}
