import type { Metadata } from "next";
import { Epilogue, Noto_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Epilogue({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-body",
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
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-20 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <header className="relative z-10">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-brand-deep sm:text-2xl"
            >
              Delivery Sathi
            </Link>
            <nav className="flex items-center gap-4 text-sm sm:gap-6">
              <Link
                href="/#how"
                className="hidden text-muted underline-offset-4 hover:text-foreground hover:underline sm:inline"
              >
                How it works
              </Link>
              <Link
                href="/#pricing"
                className="hidden text-muted underline-offset-4 hover:text-foreground hover:underline md:inline"
              >
                Pricing
              </Link>
              <Link
                href="/onboard"
                className="inline-flex h-10 items-center rounded-full bg-brand px-4 font-medium text-white transition-colors hover:bg-brand-deep"
              >
                Onboard your store
              </Link>
            </nav>
          </div>
        </header>
        <main id="content" className="flex-1">
          {children}
        </main>
        <footer className="border-t border-line bg-surface">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div>
              <p className="font-display text-lg font-semibold text-brand-deep">
                Delivery Sathi
              </p>
              <p className="mt-2 max-w-sm leading-6">
                Built for D2C sellers shipping COD — Sathi talks to your buyers
                so more parcels arrive and fewer return.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <a
                href="https://t.me/DeliverySathibot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline-offset-4 hover:underline"
              >
                @DeliverySathibot on Telegram
              </a>
              <Link
                href="/onboard"
                className="text-foreground underline-offset-4 hover:underline"
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
