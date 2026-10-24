import type { Metadata } from "next";
import { Italiana, Outfit } from "next/font/google";
import Link from "next/link";
import { Logo } from "@/components/logo";
import "./globals.css";

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Delivery Sathi",
    template: "%s · Delivery Sathi",
  },
  description:
    "For D2C sellers: an AI agent that talks to your COD buyers in Hindi, Hinglish, and English so more parcels arrive and fewer come back.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ground font-sans text-ink">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-30 focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <header className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-8">
            <Link
              href="/"
              aria-label="Delivery Sathi home"
              className="shrink-0"
            >
              <Logo />
            </Link>
            <nav className="flex items-center gap-5 text-sm font-medium text-ink-soft sm:gap-7">
              <Link
                href="/#how"
                className="hidden transition-colors hover:text-ink sm:inline"
              >
                How it works
              </Link>
              <Link
                href="/#pricing"
                className="hidden transition-colors hover:text-ink md:inline"
              >
                Pricing
              </Link>
              <Link
                href="/onboard"
                className="inline-flex h-10 items-center rounded-full bg-ink px-4 font-medium text-white transition-[transform,background-color] hover:-translate-y-px hover:bg-violet-deep active:translate-y-0 sm:px-5"
              >
                Onboard
                <span className="hidden min-[400px]:inline">
                  &nbsp;your store
                </span>
              </Link>
            </nav>
          </div>
        </header>
        <main id="content" className="flex-1">
          {children}
        </main>
        <footer className="field field-quiet border-t border-white/70">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[1fr_auto] sm:items-end sm:px-8">
            <div>
              <Logo />
              <p className="mt-4 max-w-sm text-sm leading-6 text-ink-soft">
                For D2C sellers shipping cash on delivery. Sathi talks to your
                buyers so more parcels arrive and fewer come back.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm sm:items-end">
              <a
                href="https://t.me/DeliverySathibot"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-violet underline-offset-[6px] hover:underline"
              >
                @DeliverySathibot on Telegram
              </a>
              <Link
                href="/onboard"
                className="text-ink underline-offset-[6px] hover:underline"
              >
                Onboard your store
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
