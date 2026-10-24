import Link from "next/link";
import { ChatPreview } from "@/components/chat-preview";

const cityLoss = [
  { place: "Metros", first: "72–78%", returned: "18–24%" },
  { place: "Tier 1", first: "65–72%", returned: "24–30%" },
  { place: "Tier 2", first: "58–65%", returned: "30–38%" },
  { place: "Tier 3 / rural", first: "45–58%", returned: "38–50%" },
] as const;

const moments = [
  {
    title: "After the order",
    detail:
      "Sathi confirms the buyer still wants it, grabs a landmark or pin, and can push UPI — before the parcel even leaves.",
  },
  {
    title: "Out for delivery",
    detail:
      "Checks someone is home. If not, reschedules or fixes the address before your rider wastes the trip.",
  },
  {
    title: "After a failed attempt",
    detail:
      "Asks what happened at the door in the buyer’s words, books a reattempt, or logs a no-show claim you can send to the courier.",
  },
] as const;

const vsToday = [
  {
    fix: "Checkout OTP",
    shortfall: "Proves the number exists — not that they still want the parcel days later.",
  },
  {
    fix: "Confirm SMS / IVR",
    shortfall: "One snapshot. Silence kills real buyers. IVR pickup is only 5–8%.",
  },
  {
    fix: "RTO risk scores",
    shortfall: "Needs volume. Blunt cuts turn off COD for good buyers too.",
  },
  {
    fix: "NDR dashboards",
    shortfall: "You chase courier portals by hand, usually too late for the window.",
  },
] as const;

const sellerGains = [
  {
    title: "Fewer returns on the same ad spend",
    detail:
      "Sathi works the three moments that decide delivery, so more of the orders you already paid to acquire actually land.",
  },
  {
    title: "Actions, not another dashboard",
    detail:
      "Every chat ends as a reschedule, address fix, UPI link, courier instruction, or no-show claim — back in your flow.",
  },
  {
    title: "Buyer’s words for disputes",
    detail:
      "When the rider never came, you get the claim in the buyer’s exact Hinglish — not a silent NDR code.",
  },
  {
    title: "Live in about 10 messages",
    detail:
      "Onboard on the web or on Telegram. Own-store and D2C sellers only; marketplace-only shops are turned away.",
  },
] as const;

const recoveries = [
  {
    said: "Aaj ghar pe koi nahi, kal shaam aa jao",
    forYou: "Reschedule booked for next evening — your parcel stays alive.",
  },
  {
    said: "Delivery boy aaya hi nahi",
    forYou: "No-show claim logged in their words, reattempt offered.",
  },
  {
    said: "Out for delivery — will someone be home?",
    forYou: "Home check + UPI nudge before the rider burns the attempt.",
  },
] as const;

export const ensureStatic = "navigation";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(10,79,74,0.08)_0%,transparent_42%),linear-gradient(180deg,transparent_60%,rgba(232,238,242,1)_100%)]"
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-20">
          <div className="hero-copy">
            <p className="font-display text-4xl font-semibold tracking-tight text-brand-deep sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Delivery Sathi
            </p>
            <h1 className="mt-5 max-w-xl font-display text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl">
              Cut your COD returns. Keep the orders you already paid for.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-muted">
              An AI agent talks to your buyers in Hindi, Hinglish, or English —
              after the order, out for delivery, and right after a failed
              attempt — then sends the action back to you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/onboard"
                className="inline-flex h-12 items-center rounded-full bg-signal px-6 text-sm font-semibold text-white transition-colors hover:bg-[#d94f20]"
              >
                Onboard your store
              </Link>
              <a
                href="https://t.me/DeliverySathibot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-full border border-brand/25 bg-surface px-6 text-sm font-semibold text-brand-deep transition-colors hover:border-brand/50"
              >
                Or go live on Telegram
              </a>
            </div>
          </div>
          <ChatPreview />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
            You are losing 20 to 40% of COD orders
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            The more you sell into tier 2 and 3, the worse first-attempt
            delivery gets. Every return costs about ₹200 — and the ad spend
            behind that order is already gone.
          </p>
        </div>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="py-3 pr-4 font-medium">Where you ship</th>
                <th className="py-3 pr-4 font-medium">First attempt works</th>
                <th className="py-3 font-medium">Returned</th>
              </tr>
            </thead>
            <tbody>
              {cityLoss.map((row) => (
                <tr key={row.place} className="border-b border-line">
                  <td className="py-3.5 pr-4 font-medium text-foreground">
                    {row.place}
                  </td>
                  <td className="py-3.5 pr-4 tabular-nums text-muted">
                    {row.first}
                  </td>
                  <td className="py-3.5 font-display text-lg font-semibold text-signal tabular-nums">
                    {row.returned}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-xs text-muted">
          From the Delivery Sathi deck (Base.com India benchmarks 2026).
        </p>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
            What you use today only sees one moment
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            Nobody talks to the buyer on delivery day — or in the minutes after
            a failed attempt. That gap is where your returns pile up.
          </p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {vsToday.map((item) => (
              <li
                key={item.fix}
                className="grid gap-2 py-5 md:grid-cols-[14rem_1fr] md:gap-8"
              >
                <p className="font-medium text-foreground">{item.fix}</p>
                <p className="text-sm leading-6 text-muted">{item.shortfall}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="how"
        className="scroll-mt-8 border-b border-line bg-brand-deep text-white"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Sathi works the three moments that decide your delivery
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {moments.map((moment, index) => (
              <li key={moment.title}>
                <p className="font-display text-5xl font-semibold text-white/20 tabular-nums">
                  {index + 1}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {moment.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  {moment.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
          What that looks like on your orders
        </h2>
        <ul className="mt-10 space-y-6">
          {recoveries.map((item) => (
            <li
              key={item.said}
              className="grid gap-3 border-b border-line pb-6 last:border-b-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8"
            >
              <p className="text-lg leading-8 text-foreground">
                Buyer: “{item.said}”
              </p>
              <p className="text-base leading-7 text-muted">
                <span className="font-medium text-brand">For you:</span>{" "}
                {item.forYou}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
            Built for the seller desk
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {sellerGains.map((gain) => (
              <li key={gain.title} className="border-t border-line pt-6">
                <h3 className="font-display text-xl font-semibold text-brand-deep">
                  {gain.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{gain.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-8 mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
              Cheaper than one return
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-muted">
              ₹6 per COD order Sathi handles, plus ₹20 when a failed attempt
              becomes a delivery. A typical return still costs around ₹200.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-brand px-6 py-7 text-white">
                <p className="font-display text-4xl font-semibold tabular-nums">
                  ₹6
                </p>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  per COD order handled
                </p>
              </div>
              <div className="rounded-3xl bg-signal px-6 py-7 text-white">
                <p className="font-display text-4xl font-semibold tabular-nums">
                  ₹20
                </p>
                <p className="mt-2 text-sm leading-6 text-white/85">
                  per recovered failed attempt
                </p>
              </div>
            </div>
          </div>
          <aside className="rounded-[1.75rem] border border-line bg-wash/60 px-6 py-7">
            <p className="font-display text-lg font-semibold text-brand-deep">
              On 1,000 COD orders a month
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Illustrative brand with 25% returns, ₹1,200 AOV, ₹200 per return.
              If Sathi prevents 1 in 5 of those returns:
            </p>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                <dt className="text-muted">Returns prevented</dt>
                <dd className="font-display text-xl font-semibold tabular-nums">
                  50
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                <dt className="text-muted">Return costs saved</dt>
                <dd className="font-display text-xl font-semibold tabular-nums">
                  ₹10,000
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                <dt className="text-muted">Extra revenue delivered</dt>
                <dd className="font-display text-xl font-semibold text-brand tabular-nums">
                  ₹60,000
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-[linear-gradient(180deg,var(--wash)_0%,var(--background)_55%)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
            Put Sathi on your COD flow
          </h2>
          <p className="max-w-lg text-base leading-7 text-muted">
            Tell us about your store — channel, courier, volume, languages —
            and go live. Same path as{" "}
            <a
              href="https://t.me/DeliverySathibot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              @DeliverySathibot
            </a>
            , about ten answers. Own-store sellers only.
          </p>
          <Link
            href="/onboard"
            className="inline-flex h-12 items-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            Onboard your store
          </Link>
        </div>
      </section>
    </>
  );
}
