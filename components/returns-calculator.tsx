"use client";

import { useId, useState } from "react";
import { TweenedNumber } from "@/components/tweened-number";

const RETURN_RATE = 0.25;
const PREVENTED_SHARE = 0.2;
const AOV = 1200;
const RETURN_COST = 200;
const FEE_PER_ORDER = 6;
const FEE_PER_RECOVERY = 20;

const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
const count = new Intl.NumberFormat("en-IN");
const formatCount = (value: number) => count.format(value);
const formatRupees = (value: number) => rupees.format(value);

export function ReturnsCalculator() {
  const [orders, setOrders] = useState(1000);
  const sliderId = useId();

  const returns = Math.round(orders * RETURN_RATE);
  const prevented = Math.round(returns * PREVENTED_SHARE);
  const saved = prevented * RETURN_COST;
  const revenue = prevented * AOV;
  const fee = orders * FEE_PER_ORDER + prevented * FEE_PER_RECOVERY;

  return (
    <div className="glass scroll-rise mx-auto w-full max-w-md rounded-[1.75rem] p-6 sm:p-8">
      <p className="text-lg font-semibold">Your month with Sathi</p>
      <p className="mt-1 text-sm leading-6 text-ink-soft">
        Illustrative: 25% returns, ₹1,200 order value, ₹200 per return, and
        Sathi saves 1 in 5 of them.
      </p>

      <div className="mt-6">
        <label
          htmlFor={sliderId}
          className="flex items-baseline justify-between text-sm font-medium"
        >
          COD orders a month
          <span className="text-2xl font-semibold tabular-nums">
            {count.format(orders)}
          </span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={200}
          max={10000}
          step={100}
          value={orders}
          onChange={(event) => setOrders(Number(event.target.value))}
          className="mt-3 w-full cursor-pointer"
        />
      </div>

      <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
        <div className="flex justify-between gap-4 py-2.5">
          <dt className="text-ink-soft">Orders that would come back</dt>
          <dd className="font-medium tabular-nums">
            <TweenedNumber value={returns} format={formatCount} />
          </dd>
        </div>
        <div className="flex justify-between gap-4 py-2.5">
          <dt className="text-ink-soft">Returns Sathi prevents</dt>
          <dd className="font-medium tabular-nums">
            <TweenedNumber value={prevented} format={formatCount} />
          </dd>
        </div>
        <div className="flex justify-between gap-4 py-2.5">
          <dt className="text-ink-soft">Return costs saved</dt>
          <dd className="font-medium tabular-nums">
            <TweenedNumber value={saved} format={formatRupees} />
          </dd>
        </div>
        <div className="flex justify-between gap-4 py-2.5">
          <dt className="text-ink-soft">Sathi fees, at most</dt>
          <dd className="font-medium tabular-nums">
            −<TweenedNumber value={fee} format={formatRupees} />
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex items-end justify-between gap-4">
        <p className="text-sm leading-5 font-medium text-ink-soft">
          Extra revenue
          <br />
          delivered
        </p>
        <p className="bg-gradient-to-r from-violet to-[#b14f9a] bg-clip-text text-[2.6rem] leading-none font-semibold text-transparent tabular-nums">
          <TweenedNumber value={revenue} format={formatRupees} />
        </p>
      </div>
    </div>
  );
}
