import { DeliveryChat } from "@/components/delivery-chat";
import { ReturnsCalculator } from "@/components/returns-calculator";

const zones = [
  { place: "Metros", first: "72–78%", low: 18, high: 24 },
  { place: "Tier 1", first: "65–72%", low: 24, high: 30 },
  { place: "Tier 2", first: "58–65%", low: 30, high: 38 },
  { place: "Tier 3 and rural", first: "45–58%", low: 38, high: 50 },
] as const;

const SCALE_MAX = 50;

const moments = [
  {
    title: "After the order",
    sathi:
      "Checks the buyer still wants it, gets a landmark or pincode, and can send a UPI link, before the parcel leaves your warehouse.",
    today:
      "Checkout OTP proves the number exists, not that they want the parcel days later. Confirm SMS and IVR take one snapshot, and IVR pickup is only 5–8%. Risk scores need volume and turn off COD for good buyers too.",
  },
  {
    title: "Out for delivery",
    sathi:
      "Checks someone is home. If not, reschedules or fixes the address before the rider wastes the trip.",
    today: "Nobody talks to the buyer. The rider finds out at the door.",
  },
  {
    title: "After a failed attempt",
    sathi:
      "Asks what happened in the buyer’s own words, books a reattempt, or logs a no-show claim you can send to the courier.",
    today:
      "NDR dashboards. You chase courier portals by hand, usually after the reattempt window has closed.",
  },
] as const;

const outcomes = [
  {
    said: "Ab nahi chahiye, cancel kar do",
    action: "Stopped before dispatch",
    detail: "The order never ships, so there is no ₹200 return to pay for.",
    tone: "ink",
  },
  {
    said: "Gali number galat hai, 4 nahi 14 hai",
    action: "Address fixed",
    detail:
      "The courier gets the corrected address before the rider heads out.",
    tone: "ink",
  },
  {
    said: "Delivery boy aaya hi nahi",
    action: "No-show claim",
    detail:
      "Logged in the buyer’s exact words for your courier dispute, with a reattempt offered.",
    tone: "rto",
  },
  {
    said: "Haan ghar pe hoon. UPI se de doon?",
    action: "UPI link sent",
    detail: "Paid before the rider arrives. No hunting for change at the door.",
    tone: "delivered",
  },
] as const;

const contents = [
  {
    title: "Fewer returns on the same ad spend",
    detail:
      "More of the orders you already paid to win actually get delivered.",
  },
  {
    title: "Actions, not another dashboard",
    detail:
      "Every chat ends as a reschedule, address fix, UPI link, courier instruction or no-show claim, sent back into your flow.",
  },
  {
    title: "The buyer’s words for disputes",
    detail:
      "When the rider never came, you get the claim in the buyer’s own Hinglish, not a silent NDR code.",
  },
  {
    title: "Live in about ten answers",
    detail:
      "Onboard on Telegram. For own-store D2C sellers; marketplace-only shops are turned away.",
  },
] as const;

const toneClass = {
  ink: "bg-white text-ink",
  rto: "bg-rto/10 text-rto",
  delivered: "bg-delivered/10 text-delivered",
} as const;

export const ensureStatic = "navigation";

export default function Home() {
  return (
    <>
      {/* Hero: centred title over a drifting gradient */}
      <section className="field">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-36 pb-20 text-center sm:px-8 sm:pt-44 sm:pb-28">
          <p className="kicker hero-in">For D2C sellers shipping COD</p>
          <h1
            className="display hero-in mt-7 max-w-5xl text-[clamp(2.9rem,8.4vw,6.4rem)] text-balance"
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            Fewer returns.
            <br />
            More parcels delivered.
          </h1>
          <p
            className="hero-in mt-8 max-w-[36rem] text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9"
            style={{ "--d": "260ms" } as React.CSSProperties}
          >
            Sathi talks to your COD buyers in Hindi, Hinglish or English, after
            checkout, on delivery day and right after a failed attempt, then
            hands you back the fix.
          </p>
          <div
            className="hero-in mt-10 flex flex-wrap items-center justify-center gap-3"
            style={{ "--d": "380ms" } as React.CSSProperties}
          >
            <a
              href="https://t.me/DeliverySathibot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-base font-medium text-white shadow-[0_14px_30px_-14px_rgba(27,22,34,0.6)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-violet-deep active:translate-y-0"
            >
              Onboard your store
            </a>
          </div>
          <div
            className="hero-in mt-16 w-full sm:mt-20"
            style={{ "--d": "520ms" } as React.CSSProperties}
          >
            <DeliveryChat />
          </div>
        </div>
      </section>

      {/* The loss */}
      <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker">The cost of COD</p>
          <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.6rem)] text-balance">
            The farther the pincode, the more comes back.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-ink-soft">
            Sellers lose 20 to 40% of COD orders. Sell into tier 2 and 3 and up
            to half can return, each costing about ₹200, while the ad spend that
            won the order is already gone.
          </p>
        </div>

        <div className="glass mt-14 rounded-[1.75rem] px-5 py-3 sm:px-8">
          <div className="hidden grid-cols-[11rem_7rem_1fr_6rem] gap-6 border-b border-line py-4 text-sm text-ink-soft md:grid">
            <p>Where you ship</p>
            <p>First attempt</p>
            <p>Share of COD parcels returned</p>
            <p className="text-right">Returned</p>
          </div>
          <ul className="divide-y divide-line">
            {zones.map((zone) => (
              <li
                key={zone.place}
                className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-5 md:grid-cols-[11rem_7rem_1fr_6rem]"
              >
                <p className="text-lg font-medium">{zone.place}</p>
                <p className="hidden text-ink-soft tabular-nums md:block">
                  {zone.first}
                </p>
                <div
                  className="col-span-2 row-start-2 md:col-span-1 md:row-start-auto"
                  role="img"
                  aria-label={`${zone.low} to ${zone.high} percent returned`}
                >
                  <div className="relative h-2.5 overflow-hidden rounded-full bg-line/70">
                    <div
                      className="scroll-bar grad-bar absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${(zone.high / SCALE_MAX) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-right text-2xl font-semibold text-rto tabular-nums">
                  {zone.low}–{zone.high}%
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-5 text-center text-xs text-ink-soft">
          Ranges from the Delivery Sathi deck, based on Base.com India
          benchmarks 2026. Bars run to the top of each range on a 0–50% scale.
        </p>
      </section>

      {/* The route: three moments */}
      <section id="how" className="field field-rose route-scope scroll-mt-4">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker">How it works</p>
            <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.6rem)] text-balance">
              Three moments decide every delivery.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-ink-soft">
              The tools you use today each see one moment. Nobody talks to the
              buyer on delivery day, or in the minutes after a failed attempt.
              Sathi is at all three.
            </p>
          </div>

          <div className="relative mt-16 md:mt-20">
            {/* Route line with a parcel riding it (desktop) */}
            <div
              aria-hidden
              className="absolute top-5 right-0 left-5 hidden h-0.5 rounded-full bg-white/70 md:block"
            >
              <div className="route-progress grad-line absolute inset-0 rounded-full" />
              <div className="route-parcel absolute top-1/2 left-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet shadow-[0_0_0_6px_rgba(79,60,201,0.18),0_0_24px_4px_rgba(79,60,201,0.45)]" />
            </div>
            <ol className="grid gap-6 md:grid-cols-3">
              {moments.map((moment, index) => (
                <li key={moment.title} className="relative md:pt-16">
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 hidden size-10 place-items-center rounded-full border border-white bg-white/80 text-sm font-semibold text-violet shadow-sm md:grid"
                  >
                    {index + 1}
                  </span>
                  <div className="glass h-full rounded-[1.5rem] p-6">
                    <p className="text-sm font-semibold text-violet md:hidden">
                      Moment {index + 1}
                    </p>
                    <h3 className="display text-[1.9rem]">{moment.title}</h3>
                    <p className="mt-4 leading-7">{moment.sathi}</p>
                    <div className="mt-5 border-t border-line pt-4">
                      <p className="text-sm font-semibold text-ink-soft">
                        What you have today
                      </p>
                      <p className="mt-1 text-sm leading-6 text-ink-soft">
                        {moment.today}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* What the buyer says, what the seller gets */}
      <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker">In the buyer’s words</p>
          <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.6rem)] text-balance">
            Your buyer says it once. You get the fix.
          </h2>
        </div>
        <ul className="mt-14 divide-y divide-line border-y border-line">
          {outcomes.map((item) => (
            <li
              key={item.said}
              className="scroll-rise grid gap-4 py-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center md:gap-12"
            >
              <blockquote className="text-[clamp(1.4rem,2.8vw,2rem)] leading-snug font-light tracking-tight">
                <span className="sr-only">Buyer: </span>“{item.said}”
              </blockquote>
              <div>
                <p
                  className={`inline-flex rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-[0_4px_14px_-8px_rgba(58,42,158,0.35)] ${toneClass[item.tone]}`}
                >
                  {item.action}
                </p>
                <p className="mt-2.5 leading-7 text-ink-soft">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* What the seller gets */}
      <section className="field field-quiet">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <div>
            <p className="kicker">For the seller desk</p>
            <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.6rem)] text-balance">
              Works inside the flow you already run.
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-8 text-ink-soft">
              No new screen to watch, no portal to chase.
            </p>
          </div>
          <ul className="glass divide-y divide-line rounded-[1.75rem] px-6 sm:px-8">
            {contents.map((item) => (
              <li key={item.title} className="flex gap-4 py-6">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="mt-0.5 size-7 shrink-0"
                  fill="none"
                >
                  <circle cx="12" cy="12" r="12" fill="var(--violet)" />
                  <path
                    d="m7 12.5 3.5 3.5 6.5-7"
                    className="tick-path scroll-tick"
                    stroke="#fff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 leading-7 text-ink-soft">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="mx-auto grid w-full max-w-6xl scroll-mt-4 items-center gap-14 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      >
        <div>
          <p className="kicker">Pricing</p>
          <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.6rem)] text-balance">
            Costs less than one return.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-ink-soft">
            You pay only for the orders Sathi works on. A typical return costs
            you around ₹200.
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-2 gap-4">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-peach to-rose p-6">
              <dd className="display text-6xl tabular-nums">₹6</dd>
              <dt className="mt-3 text-sm leading-5 font-medium text-ink/75">
                per COD order Sathi handles
              </dt>
            </div>
            <div className="rounded-[1.5rem] bg-gradient-to-br from-lilac to-[#9d8cf0] p-6">
              <dd className="display text-6xl tabular-nums">₹20</dd>
              <dt className="mt-3 text-sm leading-5 font-medium text-ink/75">
                when a failed attempt becomes a delivery
              </dt>
            </div>
          </dl>
        </div>
        <ReturnsCalculator />
      </section>

      {/* Closing call */}
      <section className="field">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-28 text-center sm:px-8 sm:py-36">
          <h2 className="display max-w-4xl text-[clamp(2.6rem,7vw,5.2rem)] text-balance">
            Put Sathi on your next COD parcel.
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-ink-soft">
            Tell us your channel, courier, volume and buyer languages. It takes
            about ten answers on{" "}
            <a
              href="https://t.me/DeliverySathibot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-violet underline-offset-[6px] hover:underline"
            >
              @DeliverySathibot
            </a>
            . For sellers with their own store.
          </p>
          <a
            href="https://t.me/DeliverySathibot"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-ink px-7 text-base font-medium text-white shadow-[0_14px_30px_-14px_rgba(27,22,34,0.6)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-violet-deep active:translate-y-0"
          >
            Onboard your store
          </a>
        </div>
      </section>
    </>
  );
}
