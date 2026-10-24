"use client";

import { useActionState, useState } from "react";
import {
  submitOnboarding,
  type OnboardingActionState,
} from "@/app/onboard/actions";
import { languages, sellingChannels, volumeBands } from "@/lib/onboarding";

const steps = [
  {
    id: "you",
    title: "You and the store",
    detail: "Who we talk to, and which brand is shipping.",
    fields: ["contactName", "storeName", "phone", "telegram", "city"],
  },
  {
    id: "sell",
    title: "Where you sell",
    detail: "Own-store sellers only for now.",
    fields: ["channel", "storeUrl"],
  },
  {
    id: "deliver",
    title: "How you deliver",
    detail: "Courier, volume, and the language buyers use.",
    fields: ["courier", "volume", "languages", "notes"],
  },
] as const;

const initialState: OnboardingActionState = {};

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-white/80 px-3.5 py-3 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-soft/60 focus:border-violet focus:shadow-[0_0_0_4px_rgba(79,60,201,0.14)] focus-visible:outline-none";

const labelClass = "block text-sm font-semibold text-ink";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm font-medium text-rto">{message}</p>;
}

export function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [state, formAction, pending] = useActionState(
    submitOnboarding,
    initialState,
  );
  const errors = state.errors ?? {};
  const errorCount = Object.keys(errors).length;

  return (
    <form action={formAction} className="space-y-8" noValidate>
      <ol className="flex flex-wrap gap-2">
        {steps.map((item, index) => {
          const active = index === step;
          const done = index < step;
          const hasError = item.fields.some((field) => Boolean(errors[field]));

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setStep(index)}
                aria-current={active ? "step" : undefined}
                className={`inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-ink bg-ink text-white"
                    : hasError
                      ? "border-rto text-rto"
                      : done
                        ? "border-delivered/40 text-delivered"
                        : "border-line bg-white/60 text-ink-soft hover:border-lilac"
                }`}
              >
                {index + 1}. {item.title}
              </button>
            </li>
          );
        })}
      </ol>

      <div>
        <h2 className="display text-3xl">{steps[step].title}</h2>
        <p className="mt-1 text-sm leading-6 text-ink-soft">
          {steps[step].detail}
        </p>
      </div>

      {errorCount > 0 ? (
        <p
          role="alert"
          className="rounded-sm border-2 border-rto/40 bg-rto/5 px-4 py-3 text-sm font-medium text-rto"
        >
          {errors.form ??
            "Some details still need fixing. Steps with issues are marked above."}
        </p>
      ) : null}

      <div
        className={step === 0 ? "space-y-5" : "hidden"}
        aria-hidden={step !== 0}
      >
        <div>
          <label className={labelClass} htmlFor="contactName">
            Your name
          </label>
          <input
            id="contactName"
            name="contactName"
            autoComplete="name"
            className={fieldClass}
            placeholder="Rohit"
          />
          <FieldError message={errors.contactName} />
        </div>
        <div>
          <label className={labelClass} htmlFor="storeName">
            Brand or store name
          </label>
          <input
            id="storeName"
            name="storeName"
            className={fieldClass}
            placeholder="Team 69 Store"
          />
          <FieldError message={errors.storeName} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="phone">
              WhatsApp number
            </label>
            <input
              id="phone"
              name="phone"
              inputMode="numeric"
              autoComplete="tel"
              className={fieldClass}
              placeholder="98XXXXXXXX"
            />
            <FieldError message={errors.phone} />
          </div>
          <div>
            <label className={labelClass} htmlFor="telegram">
              Telegram username
            </label>
            <input
              id="telegram"
              name="telegram"
              className={fieldClass}
              placeholder="optional"
            />
            <FieldError message={errors.telegram} />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="city">
            Shipping city
          </label>
          <input
            id="city"
            name="city"
            className={fieldClass}
            placeholder="Bengaluru"
          />
          <FieldError message={errors.city} />
        </div>
      </div>

      <div
        className={step === 1 ? "space-y-5" : "hidden"}
        aria-hidden={step !== 1}
      >
        <fieldset>
          <legend className={labelClass}>Where do you sell?</legend>
          <div className="mt-3 space-y-2">
            {sellingChannels.map((channel) => (
              <label
                key={channel.value}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-white/60 px-3.5 py-3 text-sm transition-colors hover:border-lilac has-[:checked]:border-violet has-[:checked]:bg-lilac/25"
              >
                <input
                  type="radio"
                  name="channel"
                  value={channel.value}
                  className="mt-0.5 accent-[var(--violet)]"
                />
                <span>{channel.label}</span>
              </label>
            ))}
          </div>
          <FieldError message={errors.channel} />
        </fieldset>
        <div>
          <label className={labelClass} htmlFor="storeUrl">
            Store URL
          </label>
          <input
            id="storeUrl"
            name="storeUrl"
            type="url"
            className={fieldClass}
            placeholder="https://yourstore.in"
          />
          <p className="mt-2 text-xs text-ink-soft">
            Skip if you do not have a live store link yet.
          </p>
          <FieldError message={errors.storeUrl} />
        </div>
      </div>

      <div
        className={step === 2 ? "space-y-5" : "hidden"}
        aria-hidden={step !== 2}
      >
        <div>
          <label className={labelClass} htmlFor="courier">
            Main courier
          </label>
          <input
            id="courier"
            name="courier"
            className={fieldClass}
            placeholder="Delhivery, Shadowfax, own fleet…"
          />
          <FieldError message={errors.courier} />
        </div>
        <fieldset>
          <legend className={labelClass}>Monthly COD volume</legend>
          <div className="mt-3 space-y-2">
            {volumeBands.map((band) => (
              <label
                key={band.value}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-white/60 px-3.5 py-3 text-sm transition-colors hover:border-lilac has-[:checked]:border-violet has-[:checked]:bg-lilac/25"
              >
                <input
                  type="radio"
                  name="volume"
                  value={band.value}
                  className="mt-0.5 accent-[var(--violet)]"
                />
                <span>{band.label}</span>
              </label>
            ))}
          </div>
          <FieldError message={errors.volume} />
        </fieldset>
        <fieldset>
          <legend className={labelClass}>Buyer languages</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((language) => (
              <label
                key={language.value}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white/60 px-3.5 py-2 text-sm transition-colors hover:border-lilac has-[:checked]:border-violet has-[:checked]:bg-lilac/25"
              >
                <input
                  type="checkbox"
                  name="languages"
                  value={language.value}
                  className="accent-[var(--violet)]"
                />
                {language.label}
              </label>
            ))}
          </div>
          <FieldError message={errors.languages} />
        </fieldset>
        <div>
          <label className={labelClass} htmlFor="notes">
            Anything else?
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className={fieldClass}
            placeholder="Peak cities, Shopify plan, courier pain…"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setStep((current) => Math.max(current - 1, 0))}
          disabled={step === 0 || pending}
          className="h-11 rounded-sm px-2 text-sm font-semibold text-ink-soft underline-offset-[6px] transition-colors hover:text-ink hover:underline disabled:opacity-40 disabled:hover:no-underline"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() =>
              setStep((current) => Math.min(current + 1, steps.length - 1))
            }
            className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-white transition-[transform,background-color] hover:-translate-y-px hover:bg-violet-deep"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-11 items-center rounded-full bg-gradient-to-r from-violet to-[#8a5bd6] px-5 text-sm font-semibold text-white shadow-[0_12px_26px_-12px_rgba(79,60,201,0.7)] transition-transform hover:-translate-y-px disabled:opacity-60"
          >
            {pending ? "Saving…" : "Finish onboarding"}
          </button>
        )}
      </div>
    </form>
  );
}
