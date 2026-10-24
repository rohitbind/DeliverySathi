export const sellingChannels = [
  { value: "shopify", label: "Shopify" },
  { value: "custom", label: "Own website / custom store" },
  { value: "woocommerce", label: "WooCommerce" },
  { value: "marketplace_only", label: "Only Amazon / Flipkart / Meesho" },
  { value: "other", label: "Other" },
] as const;

export const languages = [
  { value: "hinglish", label: "Hinglish" },
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
] as const;

export const volumeBands = [
  { value: "under_100", label: "Under 100 COD orders / month" },
  { value: "100_500", label: "100 – 500" },
  { value: "500_2000", label: "500 – 2,000" },
  { value: "over_2000", label: "More than 2,000" },
] as const;

export type SellingChannel = (typeof sellingChannels)[number]["value"];
export type BuyerLanguage = (typeof languages)[number]["value"];
export type VolumeBand = (typeof volumeBands)[number]["value"];

export type OnboardingPayload = {
  contactName: string;
  storeName: string;
  phone: string;
  telegram: string;
  city: string;
  channel: SellingChannel;
  storeUrl: string;
  courier: string;
  volume: VolumeBand;
  languages: BuyerLanguage[];
  notes: string;
};

export type OnboardingFieldErrors = Partial<
  Record<keyof OnboardingPayload | "form", string>
>;

export type OnboardingResult =
  | { ok: true; id: string }
  | { ok: false; errors: OnboardingFieldErrors };

const phonePattern = /^[6-9]\d{9}$/;
const urlPattern = /^https?:\/\/.+/i;

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isSellingChannel(value: string): value is SellingChannel {
  return sellingChannels.some((channel) => channel.value === value);
}

function isVolumeBand(value: string): value is VolumeBand {
  return volumeBands.some((band) => band.value === value);
}

function isBuyerLanguage(value: string): value is BuyerLanguage {
  return languages.some((language) => language.value === value);
}

export function parseOnboardingForm(formData: FormData): OnboardingResult {
  const contactName = readString(formData, "contactName");
  const storeName = readString(formData, "storeName");
  const phoneRaw = readString(formData, "phone").replace(/[\s-]/g, "");
  const phone = phoneRaw.replace(/^\+?91/, "");
  const telegram = readString(formData, "telegram").replace(/^@/, "");
  const city = readString(formData, "city");
  const channelRaw = readString(formData, "channel");
  const storeUrl = readString(formData, "storeUrl");
  const courier = readString(formData, "courier");
  const volumeRaw = readString(formData, "volume");
  const notes = readString(formData, "notes");
  const languageValues = formData
    .getAll("languages")
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);

  const errors: OnboardingFieldErrors = {};

  if (!contactName) errors.contactName = "Add the person we should talk to.";
  if (!storeName) errors.storeName = "Add your brand or store name.";
  if (!phonePattern.test(phone)) {
    errors.phone = "Use a 10-digit Indian mobile number.";
  }
  if (!city) errors.city = "Add the city you ship from.";

  if (!isSellingChannel(channelRaw)) {
    errors.channel = "Pick where you sell.";
  } else if (channelRaw === "marketplace_only") {
    errors.channel =
      "Delivery Sathi is for D2C and own-store sellers. Marketplace-only sellers are turned away for now.";
  }

  if (storeUrl && !urlPattern.test(storeUrl)) {
    errors.storeUrl = "Use a full URL starting with https://";
  }

  if (!courier) {
    errors.courier = "Tell us which courier you use most.";
  }

  if (!isVolumeBand(volumeRaw)) {
    errors.volume = "Pick your monthly COD volume.";
  }

  const selectedLanguages = languageValues.filter(isBuyerLanguage);
  if (selectedLanguages.length === 0) {
    errors.languages = "Pick at least one buyer language.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const payload: OnboardingPayload = {
    contactName,
    storeName,
    phone,
    telegram,
    city,
    channel: channelRaw as SellingChannel,
    storeUrl,
    courier,
    volume: volumeRaw as VolumeBand,
    languages: selectedLanguages,
    notes,
  };

  const id = `ds_${Date.now().toString(36)}`;

  // Supabase insert lands here once the project is connected.
  console.info("[onboarding]", id, payload);

  return { ok: true, id };
}
