import {
  ROUNDING_STEP,
  addons,
  complexityLevels,
  features,
  projectTypes,
  type Addon,
  type ComplexityId,
  type Feature,
  type PriceRange,
  type ProjectType,
  type ProjectTypeId,
} from "@/lib/data/estimator";

export type EstimatorSelection = {
  projectType: ProjectTypeId | null;
  featureIds: string[];
  complexity: ComplexityId;
  addonIds: string[];
};

export type Estimate = {
  oneTime: PriceRange;
  monthly: PriceRange | null;
  openEnded: boolean;
};

export const emptySelection: EstimatorSelection = {
  projectType: null,
  featureIds: [],
  complexity: "basic",
  addonIds: [],
};

/**
 * What the estimator is allowed to offer. A type that is not sellable yet is
 * left out of the form entirely rather than shown as a dead option.
 */
export const selectableProjectTypes: ProjectType[] = projectTypes.filter(
  (type) => !type.comingSoon,
);

export function featuresFor(type: ProjectTypeId | null): Feature[] {
  if (!type) return [];
  return features.filter((feature) => feature.availableFor.includes(type));
}

export function addonsFor(type: ProjectTypeId | null): Addon[] {
  if (!type) return [];
  return addons.filter((addon) => addon.availableFor.includes(type));
}

export function projectTypeById(id: ProjectTypeId | null): ProjectType | null {
  return projectTypes.find((type) => type.id === id) ?? null;
}

export function complexityById(id: ComplexityId) {
  // The config always carries every level, so the fallback is unreachable in
  // practice; it exists so the return type stays non-nullable.
  return complexityLevels.find((level) => level.id === id) ?? complexityLevels[0];
}

/** Rounds a range outward: floor the low end, ceil the high end. */
function roundRange(range: PriceRange): PriceRange {
  const min = Math.floor(range.min / ROUNDING_STEP) * ROUNDING_STEP;
  const max = Math.ceil(range.max / ROUNDING_STEP) * ROUNDING_STEP;
  return {
    min: Math.max(min, range.min > 0 ? ROUNDING_STEP : 0),
    max: Math.max(max, min + ROUNDING_STEP),
  };
}

function sumRanges(items: { price: PriceRange }[]): PriceRange {
  return items.reduce(
    (total, item) => ({
      min: total.min + item.price.min,
      max: total.max + item.price.max,
    }),
    { min: 0, max: 0 },
  );
}

/**
 * Complexity positions the estimate inside the project type's base range rather
 * than scaling it. A multiplier compounds against a base whose upper bound
 * already describes a complex build, which produced ranges so wide (3x from low
 * to high) that they told the visitor nothing.
 */
export function calculateEstimate(selection: EstimatorSelection): Estimate | null {
  const type = projectTypeById(selection.projectType);
  // A type that is not offered yet must never produce a number, whatever state
  // the UI is in.
  if (!type || type.comingSoon) return null;

  const available = featuresFor(type.id);
  const selectedFeatures = available.filter(
    (feature) => feature.included || selection.featureIds.includes(feature.id),
  );
  const featureTotal = sumRanges(selectedFeatures);

  const { band } = complexityById(selection.complexity);
  const baseSpan = type.base.max - type.base.min;
  const scaled: PriceRange = {
    min: type.base.min + baseSpan * band.from + featureTotal.min,
    max: type.base.min + baseSpan * band.to + featureTotal.max,
  };

  const selectedAddons = addonsFor(type.id).filter((addon) =>
    selection.addonIds.includes(addon.id),
  );
  const onceTotal = sumRanges(selectedAddons.filter((a) => a.billing === "once"));
  const monthlyAddons = selectedAddons.filter((a) => a.billing === "monthly");
  const monthlyTotal = sumRanges(monthlyAddons);

  return {
    oneTime: roundRange({
      min: scaled.min + onceTotal.min,
      max: scaled.max + onceTotal.max,
    }),
    monthly: monthlyAddons.length > 0 ? roundRange(monthlyTotal) : null,
    openEnded: Boolean(type.openEnded),
  };
}

const idr = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatIDR(value: number) {
  // Intl emits a non-breaking space after "Rp"; keep it so the currency
  // symbol never wraps away from its amount.
  return idr.format(value);
}

export function formatRange(range: PriceRange, openEnded = false) {
  return `${formatIDR(range.min)} - ${formatIDR(range.max)}${openEnded ? "+" : ""}`;
}

export type LeadDetails = {
  name?: string;
  email?: string;
  note?: string;
};

export function buildWhatsappMessage(
  selection: EstimatorSelection,
  estimate: Estimate,
  lead: LeadDetails = {},
) {
  const type = projectTypeById(selection.projectType);
  if (!type || type.comingSoon) return "";

  const selectedFeatures = featuresFor(type.id).filter(
    (feature) => feature.included || selection.featureIds.includes(feature.id),
  );
  const selectedAddons = addonsFor(type.id).filter((addon) =>
    selection.addonIds.includes(addon.id),
  );

  const lines = [
    "Halo Vour, saya ingin mendiskusikan project.",
    "",
    "Jenis project:",
    type.label,
    "",
    "Kompleksitas:",
    complexityById(selection.complexity).label,
  ];

  if (selectedFeatures.length > 0) {
    lines.push("", "Fitur:");
    selectedFeatures.forEach((feature) => lines.push(`- ${feature.label}`));
  }

  if (selectedAddons.length > 0) {
    lines.push("", "Tambahan:");
    selectedAddons.forEach((addon) =>
      lines.push(`- ${addon.label}${addon.billing === "monthly" ? " (bulanan)" : ""}`),
    );
  }

  lines.push("", "Estimasi:", formatRange(estimate.oneTime, estimate.openEnded));
  if (estimate.monthly) {
    lines.push(`${formatRange(estimate.monthly)} / bulan`);
  }

  if (lead.name) lines.push("", "Nama:", lead.name);
  if (lead.email) lines.push("", "Email:", lead.email);
  if (lead.note) lines.push("", "Catatan:", lead.note);

  lines.push("", "Saya ingin mengetahui detail dan scope project lebih lanjut.");

  return lines.join("\n");
}
