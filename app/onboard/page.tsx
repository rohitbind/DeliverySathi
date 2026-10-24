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
    <div className="field">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] pt-28 lg:gap-16 lg:py-20 lg:pt-36">
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <h1 className="display text-[clamp(2.6rem,5.5vw,4.2rem)] text-balance">
            Ship Sathi to your store.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-ink-soft">
            About ten answers: who you are, where you sell, how you ship. Then
            Sathi can talk to your buyers in Hindi, Hinglish, or English.
          </p>
          <ul className="mt-8 max-w-md space-y-3 border-t border-line pt-5 text-sm leading-6 text-ink-soft">
            <li>For own-store and D2C sellers shipping COD.</li>
            <li>Marketplace-only shops are politely turned away.</li>
            <li>
              Prefer chat?{" "}
              <a
                href="https://t.me/DeliverySathibot"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-violet underline-offset-[5px] hover:underline"
              >
                @DeliverySathibot
              </a>
            </li>
          </ul>
          <Link
            href="/"
            className="mt-8 inline-block text-sm font-semibold text-ink underline-offset-[6px] hover:underline"
          >
            Back to home
          </Link>
        </aside>

        <div className="glass rounded-[1.75rem] px-5 py-7 sm:px-8 sm:py-9">
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
}
