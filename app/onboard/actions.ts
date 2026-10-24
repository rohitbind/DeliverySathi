"use server";

import { redirect } from "next/navigation";
import { parseOnboardingForm } from "@/lib/onboarding";

export type OnboardingActionState = {
  errors?: Record<string, string>;
};

export async function submitOnboarding(
  _prev: OnboardingActionState,
  formData: FormData,
): Promise<OnboardingActionState> {
  const result = parseOnboardingForm(formData);

  if (!result.ok) {
    return { errors: result.errors };
  }

  redirect(`/onboard/done?id=${encodeURIComponent(result.id)}`);
}
