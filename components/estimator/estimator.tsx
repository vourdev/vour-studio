"use client";

import {
  CheckIcon,
  InfoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";
import { track } from "@vercel/analytics";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import {
  ESTIMATE_DISCLAIMER,
  complexityLevels,
  type ComplexityId,
  type ProjectTypeId,
} from "@/lib/data/estimator";
import {
  addonsFor,
  buildWhatsappMessage,
  calculateEstimate,
  complexityById,
  emptySelection,
  featuresFor,
  formatRange,
  projectTypeById,
  selectableProjectTypes,
  type EstimatorSelection,
} from "@/lib/estimator";
import { whatsappLink } from "@/lib/site";

const FORM_ID = "estimator-form";

export function Estimator() {
  const [selection, setSelection] = useState<EstimatorSelection>(emptySelection);
  const [lead, setLead] = useState({ name: "", email: "", note: "" });

  const startedRef = useRef(false);
  const generatedRef = useRef(false);
  const nameId = useId();
  const emailId = useId();
  const noteId = useId();

  const selected = projectTypeById(selection.projectType);
  // A coming-soon type is never "selected" as far as the rest of the form is
  // concerned, so the later steps and the summary cannot half-open on it.
  const type = selected && !selected.comingSoon ? selected : null;
  const availableFeatures = useMemo(
    () => featuresFor(selection.projectType),
    [selection.projectType],
  );
  const availableAddons = useMemo(
    () => addonsFor(selection.projectType),
    [selection.projectType],
  );
  const estimate = useMemo(() => calculateEstimate(selection), [selection]);

  useEffect(() => {
    if (estimate && !generatedRef.current) {
      generatedRef.current = true;
      track("estimate_generated");
    }
  }, [estimate]);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("estimator_started");
  }

  function selectProjectType(id: ProjectTypeId) {
    if (projectTypeById(id)?.comingSoon) return;
    markStarted();
    track("project_type_selected", { project_type: id });
    // Features and add-ons are scoped to a project type, so carrying the old
    // selection over would price things the new type does not offer.
    setSelection({ ...emptySelection, projectType: id });
  }

  function toggleFeature(id: string) {
    markStarted();
    setSelection((prev) => {
      const selected = prev.featureIds.includes(id);
      if (!selected) track("feature_selected", { feature: id });
      return {
        ...prev,
        featureIds: selected
          ? prev.featureIds.filter((f) => f !== id)
          : [...prev.featureIds, id],
      };
    });
  }

  function toggleAddon(id: string) {
    markStarted();
    setSelection((prev) => ({
      ...prev,
      addonIds: prev.addonIds.includes(id)
        ? prev.addonIds.filter((a) => a !== id)
        : [...prev.addonIds, id],
    }));
  }

  function selectComplexity(id: ComplexityId) {
    markStarted();
    setSelection((prev) => ({ ...prev, complexity: id }));
  }

  const waHref =
    estimate && type
      ? whatsappLink(
          buildWhatsappMessage(selection, estimate, {
            name: lead.name.trim() || undefined,
            email: lead.email.trim() || undefined,
            note: lead.note.trim() || undefined,
          }),
        )
      : undefined;

  function handleWhatsappClick() {
    if (!type || !estimate) return;
    track("whatsapp_clicked", {
      project_type: type.id,
      complexity: selection.complexity,
      estimate_min: estimate.oneTime.min,
      estimate_max: estimate.oneTime.max,
    });
  }

  const selectedFeatures = availableFeatures.filter(
    (feature) => feature.included || selection.featureIds.includes(feature.id),
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-12">
      <form
        id={FORM_ID}
        className="min-w-0 space-y-14 pb-20 lg:pb-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <Step index="01" legend="Apa yang ingin Anda bangun?">
          <div className="grid gap-3 sm:grid-cols-2">
            {selectableProjectTypes.map((option) => (
              <OptionCard
                key={option.id}
                type="radio"
                name="project-type"
                checked={selection.projectType === option.id}
                onChange={() => selectProjectType(option.id)}
                title={option.label}
                description={option.description}
              >
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {option.examples.map((example) => (
                    <li
                      key={example}
                      className="rounded-control border border-border px-2 py-0.5 font-mono text-[10px] text-text-faint"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </OptionCard>
            ))}
          </div>
        </Step>

        {type ? (
          <>
            <Step index="02" legend="Fitur apa saja yang dibutuhkan?">
              <div className="grid gap-3 sm:grid-cols-2">
                {availableFeatures.map((feature) => (
                  <OptionCard
                    key={feature.id}
                    type="checkbox"
                    name="feature"
                    checked={
                      feature.included || selection.featureIds.includes(feature.id)
                    }
                    disabled={feature.included}
                    onChange={() => toggleFeature(feature.id)}
                    title={feature.label}
                    description={feature.description}
                    badge={feature.included ? "Termasuk" : undefined}
                  />
                ))}
              </div>
            </Step>

            <Step index="03" legend="Seberapa kompleks kebutuhannya?">
              <div className="grid gap-3 sm:grid-cols-3">
                {complexityLevels.map((level) => (
                  <OptionCard
                    key={level.id}
                    type="radio"
                    name="complexity"
                    checked={selection.complexity === level.id}
                    onChange={() => selectComplexity(level.id)}
                    title={level.label}
                    description={level.description}
                  />
                ))}
              </div>
            </Step>

            {availableAddons.length > 0 ? (
              <Step index="04" legend="Ada tambahan yang diperlukan?" optional>
                <div className="grid gap-3 sm:grid-cols-2">
                  {availableAddons.map((addon) => (
                    <OptionCard
                      key={addon.id}
                      type="checkbox"
                      name="addon"
                      checked={selection.addonIds.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      title={addon.label}
                      description={addon.description}
                      badge={addon.billing === "monthly" ? "Bulanan" : undefined}
                    />
                  ))}
                </div>
              </Step>
            ) : null}

            <details className="rounded-surface border border-border bg-bg-subtle/40 px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-text">
                Tambahkan detail Anda
                <span className="font-mono text-xs font-normal text-text-faint">
                  opsional
                </span>
              </summary>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Nama" htmlFor={nameId}>
                  <Input
                    id={nameId}
                    value={lead.name}
                    autoComplete="name"
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  />
                </Field>
                <Field label="Email" htmlFor={emailId}>
                  <Input
                    id={emailId}
                    type="email"
                    value={lead.email}
                    autoComplete="email"
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field
                    label="Deskripsi singkat project"
                    htmlFor={noteId}
                    hint="Satu atau dua kalimat sudah cukup."
                  >
                    <Textarea
                      id={noteId}
                      value={lead.note}
                      className="min-h-24"
                      onChange={(e) => setLead({ ...lead, note: e.target.value })}
                    />
                  </Field>
                </div>
              </div>
            </details>
          </>
        ) : null}
      </form>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-surface border border-border bg-bg-subtle/60 p-6">
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-text-faint">
            Estimasi Biaya
          </h2>

          {estimate && type ? (
            <>
              <p className="mt-4 font-mono text-2xl font-semibold leading-tight tracking-tight tabular-nums text-text">
                {formatRange(estimate.oneTime, estimate.openEnded)}
              </p>
              {estimate.monthly ? (
                <p className="mt-2 font-mono text-sm tabular-nums text-text-muted">
                  {formatRange(estimate.monthly)}
                  <span className="text-text-faint"> / bulan</span>
                </p>
              ) : null}

              <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                <SummaryRow label="Jenis project" value={type.label} />
                <SummaryRow
                  label="Kompleksitas"
                  value={complexityById(selection.complexity).label}
                />
                <div>
                  <dt className="text-xs text-text-faint">Fitur</dt>
                  <dd className="mt-1.5 text-text-muted">
                    {selectedFeatures.length > 0 ? (
                      <ul className="space-y-1">
                        {selectedFeatures.map((feature) => (
                          <li
                            key={feature.id}
                            className="flex items-start gap-2 text-[13px]"
                          >
                            <CheckIcon
                              weight="bold"
                              className="mt-0.5 size-3 shrink-0 text-accent-text"
                              aria-hidden
                            />
                            {feature.label}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[13px] text-text-faint">Belum ada</span>
                    )}
                  </dd>
                </div>
              </dl>

              <Button asChild className="mt-6 w-full" onClick={handleWhatsappClick}>
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogoIcon weight="fill" className="size-4" aria-hidden />
                  Diskusikan via WhatsApp
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
                <a href={`#${FORM_ID}`}>Ubah Pilihan</a>
              </Button>
            </>
          ) : (
            <div className="mt-4">
              <p className="text-sm leading-relaxed text-text-muted">
                Pilih jenis project untuk melihat kisaran estimasinya.
              </p>
              <div className="mt-6 h-px w-full bg-border" aria-hidden />
              <p className="mt-6 text-[13px] leading-relaxed text-text-faint">
                Estimasi muncul otomatis begitu Anda memilih. Tidak ada form
                panjang dan tidak perlu membuat akun.
              </p>
            </div>
          )}

          <p className="mt-6 flex gap-2.5 border-t border-border pt-5 text-[13px] leading-relaxed text-text-faint">
            <InfoIcon weight="bold" className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <span>
              <strong className="font-medium text-text-muted">
                Estimasi awal, bukan harga final.
              </strong>{" "}
              {ESTIMATE_DISCLAIMER}
            </span>
          </p>
        </div>
      </aside>

      {estimate && type ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-faint">
                Estimasi
              </p>
              <p className="truncate font-mono text-sm font-semibold tabular-nums text-text">
                {formatRange(estimate.oneTime, estimate.openEnded)}
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="ml-auto shrink-0"
              onClick={handleWhatsappClick}
            >
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <WhatsappLogoIcon weight="fill" className="size-4" aria-hidden />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Step({
  index,
  legend,
  optional,
  children,
}: {
  index: string;
  legend: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-xs tabular-nums text-accent-text">{index}</span>
        <span className="text-lg font-semibold tracking-tight text-text">{legend}</span>
        {optional ? (
          <span className="font-mono text-xs text-text-faint">opsional</span>
        ) : null}
      </legend>
      {children}
    </fieldset>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-text-faint">{label}</dt>
      <dd className="mt-0.5 text-[13px] text-text-muted">{value}</dd>
    </div>
  );
}

function OptionCard({
  type,
  name,
  checked,
  disabled,
  onChange,
  title,
  description,
  badge,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <label
      className={[
        "relative flex min-h-11 cursor-pointer flex-col rounded-surface border p-5",
        "transition-colors duration-150",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40",
        disabled ? "cursor-default" : "",
        checked
          ? "border-accent/50 bg-accent-soft"
          : disabled
            ? "border-border bg-bg-subtle/20"
            : "border-border bg-bg-subtle/40 hover:border-border-strong",
      ].join(" ")}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
      />
      <span className="flex items-start justify-between gap-3">
        <span
          className={[
            "text-sm font-medium",
            disabled && !checked ? "text-text-muted" : "text-text",
          ].join(" ")}
        >
          {title}
        </span>
        {disabled && !checked ? null : (
          <span
            className={[
              "mt-0.5 flex size-4 shrink-0 items-center justify-center border",
              type === "radio" ? "rounded-full" : "rounded-[4px]",
              checked
                ? "border-accent bg-accent text-accent-fg"
                : "border-border-strong bg-transparent text-transparent",
            ].join(" ")}
            aria-hidden
          >
            <CheckIcon weight="bold" className="size-2.5" />
          </span>
        )}
      </span>
      <span
        className={[
          "mt-1.5 text-[13px] leading-relaxed",
          disabled && !checked ? "text-text-faint" : "text-text-muted",
        ].join(" ")}
      >
        {description}
      </span>
      {badge ? (
        <span className="mt-2 w-fit rounded-control border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-text-faint">
          {badge}
        </span>
      ) : null}
      {children}
    </label>
  );
}
