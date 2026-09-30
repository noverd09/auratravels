"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Controller, useForm, useWatch, type FieldPath } from "react-hook-form";
import { ArrowLeft, ArrowRight, Check, Minus, PencilSimple, Plus } from "@phosphor-icons/react";
import { submitInquiryAction } from "@/app/plan-your-trip/actions";
import { AuraMark } from "@/components/ui/AuraMark";
import { buttonClass } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import {
  BUDGET_OPTIONS,
  COMPANY_OPTIONS,
  CONTACT_METHODS,
  INTEREST_OPTIONS,
  PLANNER_DESTINATIONS,
  STEP_FIELDS,
  STYLE_OPTIONS,
  baseInquirySchema,
  crossFieldIssues,
  type InquiryFormValues,
} from "@/lib/inquiries/validation";
import type { TripInquiry } from "@/types";

const STEPS = [
  { title: "Destination", question: "Where do you want to go?", hint: "Choose as many as you like." },
  { title: "Dates", question: "When are you thinking of traveling?", hint: "An approximate window is fine." },
  { title: "Travelers", question: "Who are you traveling with?", hint: "This shapes the pace and the stays." },
  { title: "Style", question: "What kind of trip are you looking for?", hint: "Choose as many as you like." },
  { title: "Budget", question: "What is your approximate budget per person?", hint: "An approximate planning range, not a commitment." },
  { title: "Interests", question: "What would make this trip memorable?", hint: "Optional. Pick what stands out." },
  { title: "Details", question: "Tell us more about your ideal trip.", hint: "Optional, but it helps us more than anything else." },
  { title: "Contact", question: "How can we reach you?", hint: "We only use this to reply to your request." },
  { title: "Review", question: "Review your travel request.", hint: "Check the details, edit anything, then send." },
] as const;

export interface PlanPrefill {
  destinations: string[];
  travel_style: string[];
  trip_id: string | null;
  trip_label: string | null;
}

const todayIso = () => new Date().toISOString().slice(0, 10);

export function PlanForm({ prefill }: { prefill: PlanPrefill }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [pending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState<TripInquiry | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(baseInquirySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      destinations: prefill.destinations,
      flexible_dates: false,
      departure_date: "",
      return_date: "",
      travelers_type: undefined,
      travelers: 2,
      travel_style: prefill.travel_style,
      budget: "",
      interests: [],
      message: "",
      name: "",
      email: "",
      phone: "",
      contact_method: "email",
      trip_id: prefill.trip_id,
    },
  });
  const {
    control,
    register,
    trigger,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = form;

  // Move focus to the step heading after each change so keyboard and screen reader users land in the right place
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [step, done]);

  const goTo = (n: number) => {
    setDirection(n > step ? 1 : -1);
    setStep(n);
  };

  /** Field rules via zod, then rules that compare fields (dates, phone for a call back) */
  const validateStep = async (n: number) => {
    const fields = STEP_FIELDS[n] as FieldPath<InquiryFormValues>[];
    const okFields = fields.length === 0 ? true : await trigger(fields, { shouldFocus: true });
    const cross = crossFieldIssues(getValues()).filter((i) => fields.includes(i.path));
    cross.forEach((issue, idx) =>
      setError(issue.path, { type: "custom", message: issue.message }, { shouldFocus: idx === 0 && okFields }),
    );
    return okFields && cross.length === 0;
  };

  const next = async () => {
    if (await validateStep(step)) goTo(Math.min(step + 1, STEPS.length - 1));
  };

  const onSubmit = handleSubmit(
    (values) => {
      const cross = crossFieldIssues(values);
      if (cross.length > 0) {
        cross.forEach((issue) => setError(issue.path, { type: "custom", message: issue.message }));
        goTo(STEP_FIELDS.findIndex((fields) => fields.includes(cross[0].path)));
        return;
      }
      setSubmitError(null);
      startTransition(async () => {
        const result = await submitInquiryAction(values);
        if (result.ok) setDone(result.inquiry);
        else setSubmitError(result.error);
      });
    },
    (fieldErrors) => {
      // Send the visitor back to the first step that has an error
      const bad = STEP_FIELDS.findIndex((fields) => fields.some((f) => fieldErrors[f]));
      if (bad >= 0) goTo(bad);
    },
  );

  const values = useWatch({ control }) as InquiryFormValues;

  if (done) return <Confirmation inquiry={done} />;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="step-heading" className="pb-32 md:pb-0">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-baseline justify-between gap-4">
          <Eyebrow className="text-muted">
            Step <span className="tabular-nums text-fg">{step + 1}</span> of{" "}
            <span className="tabular-nums">{STEPS.length}</span>
          </Eyebrow>
          <Eyebrow className="text-accent">{current.title}</Eyebrow>
        </div>
        <div
          role="progressbar"
          aria-label="Questionnaire progress"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-valuetext={`Step ${step + 1} of ${STEPS.length}: ${current.title}`}
          className="mt-4 h-[3px] w-full bg-line"
        >
          <div
            className="h-full bg-signal transition-[width] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        {prefill.trip_label && (
          <p className="mt-5 flex items-center gap-3 text-sm text-muted">
            <AuraMark size={18} />
            Planning: <span className="font-bold text-fg">{prefill.trip_label}</span>
          </p>
        )}
      </div>

      <div key={step} className="step-in" style={{ "--dir": direction } as React.CSSProperties}>
          <h2
            id="step-heading"
            ref={heading}
            tabIndex={-1}
            className="text-4xl leading-none tracking-[-0.03em] outline-none md:text-6xl"
          >
            {current.question}
          </h2>
          <p className="mt-4 text-lg text-muted">{current.hint}</p>

          <div className="mt-10">
            {step === 0 && (
              <Controller
                control={control}
                name="destinations"
                render={({ field }) => (
                  <ChoiceGrid
                    legend="Destinations"
                    type="checkbox"
                    options={PLANNER_DESTINATIONS.map((d) => ({ value: d, label: d }))}
                    value={field.value}
                    onChange={(v, picked) => {
                      // "Not sure yet" is exclusive
                      if (picked === "Not sure yet" && v.includes("Not sure yet")) field.onChange(["Not sure yet"]);
                      else field.onChange(v.filter((x) => x !== "Not sure yet"));
                    }}
                    error={errors.destinations?.message}
                    columns="sm:grid-cols-2 lg:grid-cols-3"
                  />
                )}
              />
            )}

            {step === 1 && (
              <div className="grid gap-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Departure date" error={errors.departure_date?.message} htmlFor="departure_date">
                    <input
                      id="departure_date"
                      type="date"
                      min={todayIso()}
                      aria-invalid={!!errors.departure_date}
                      aria-describedby={errors.departure_date ? "departure_date-error" : undefined}
                      className={inputClass(!!errors.departure_date)}
                      {...register("departure_date")}
                    />
                  </Field>
                  <Field label="Return date" error={errors.return_date?.message} htmlFor="return_date">
                    <input
                      id="return_date"
                      type="date"
                      min={values.departure_date || todayIso()}
                      aria-invalid={!!errors.return_date}
                      aria-describedby={errors.return_date ? "return_date-error" : undefined}
                      className={inputClass(!!errors.return_date)}
                      {...register("return_date")}
                    />
                  </Field>
                </div>
                <label className="flex min-h-11 cursor-pointer items-center gap-4">
                  <input type="checkbox" className="peer sr-only" {...register("flexible_dates")} />
                  <span
                    aria-hidden="true"
                    className="flex size-6 shrink-0 items-center justify-center border border-fg bg-bg text-bg peer-checked:bg-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
                  >
                    <Check size={16} weight="bold" className={values.flexible_dates ? "opacity-100" : "opacity-0"} />
                  </span>
                  <span className="text-lg">My dates are flexible</span>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-10">
                <Controller
                  control={control}
                  name="travelers_type"
                  render={({ field }) => (
                    <ChoiceGrid
                      legend="Who is traveling"
                      type="radio"
                      options={COMPANY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                      value={field.value ? [field.value] : []}
                      onChange={(v) => field.onChange(v[0])}
                      error={errors.travelers_type?.message}
                      columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="travelers"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="travelers" className="mb-3 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                        Number of travelers
                      </label>
                      <div className="inline-flex items-center border border-line">
                        <button
                          type="button"
                          aria-label="Fewer travelers"
                          onClick={() => field.onChange(Math.max(1, (Number(field.value) || 1) - 1))}
                          className="flex size-12 items-center justify-center transition-[background-color,scale] hover:bg-raised active:scale-[0.96]"
                        >
                          <Minus size={18} />
                        </button>
                        <input
                          id="travelers"
                          inputMode="numeric"
                          type="text"
                          value={field.value ?? ""}
                          aria-invalid={!!errors.travelers}
                          aria-describedby={errors.travelers ? "travelers-error" : undefined}
                          onChange={(e) => {
                            const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
                            field.onChange(Number.isNaN(n) ? undefined : n);
                          }}
                          className="h-12 w-16 border-x border-line bg-bg text-center text-lg font-bold tabular-nums"
                        />
                        <button
                          type="button"
                          aria-label="More travelers"
                          onClick={() => field.onChange(Math.min(30, (Number(field.value) || 0) + 1))}
                          className="flex size-12 items-center justify-center transition-[background-color,scale] hover:bg-raised active:scale-[0.96]"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      {errors.travelers && <ErrorText id="travelers-error">{errors.travelers.message}</ErrorText>}
                    </div>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <Controller
                control={control}
                name="travel_style"
                render={({ field }) => (
                  <ChoiceGrid
                    legend="Trip style"
                    type="checkbox"
                    options={STYLE_OPTIONS.map((s) => ({ value: s, label: s }))}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                    error={errors.travel_style?.message}
                    columns="sm:grid-cols-2 lg:grid-cols-3"
                  />
                )}
              />
            )}

            {step === 4 && (
              <Controller
                control={control}
                name="budget"
                render={({ field }) => (
                  <ChoiceGrid
                    legend="Budget per person"
                    type="radio"
                    options={BUDGET_OPTIONS.map((b) => ({ value: b, label: b }))}
                    value={field.value ? [field.value] : []}
                    onChange={(v) => field.onChange(v[0] ?? "")}
                    error={errors.budget?.message}
                    columns="sm:grid-cols-2 lg:grid-cols-3"
                  />
                )}
              />
            )}

            {step === 5 && (
              <Controller
                control={control}
                name="interests"
                render={({ field }) => (
                  <ChoiceGrid
                    legend="Interests"
                    type="checkbox"
                    options={INTEREST_OPTIONS.map((i) => ({ value: i, label: i }))}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                    columns="grid-cols-2 lg:grid-cols-3"
                  />
                )}
              />
            )}

            {step === 6 && (
              <Field label="Your ideal trip" error={errors.message?.message} htmlFor="message">
                <textarea
                  id="message"
                  rows={7}
                  maxLength={1600}
                  placeholder="Tell us anything that would help us understand the experience you are looking for."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${inputClass(!!errors.message)} resize-y`}
                  {...register("message")}
                />
                <p className="mt-2 text-sm text-muted tabular-nums">{(values.message ?? "").length} / 1,500</p>
              </Field>
            )}

            {step === 7 && (
              <div className="grid gap-6 md:max-w-[560px]">
                <Field label="Full name" error={errors.name?.message} htmlFor="name">
                  <input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={inputClass(!!errors.name)} {...register("name")} />
                </Field>
                <Field label="Email" error={errors.email?.message} htmlFor="email">
                  <input id="email" type="email" autoComplete="email" inputMode="email" placeholder="name@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={inputClass(!!errors.email)} {...register("email")} />
                </Field>
                <Field label="Phone (optional)" error={errors.phone?.message} htmlFor="phone">
                  <input id="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+1 415 555 0100" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} className={inputClass(!!errors.phone)} {...register("phone")} />
                </Field>
                <Controller
                  control={control}
                  name="contact_method"
                  render={({ field }) => (
                    <ChoiceGrid
                      legend="Preferred contact method"
                      type="radio"
                      options={CONTACT_METHODS.map((c) => ({ value: c.value, label: c.label }))}
                      value={[field.value]}
                      onChange={(v) => field.onChange(v[0] ?? "email")}
                      columns="grid-cols-1 sm:grid-cols-3"
                      compact
                    />
                  )}
                />
              </div>
            )}

            {step === 8 && <Review values={getValues()} onEdit={goTo} tripLabel={prefill.trip_label} />}
          </div>
      </div>

      {submitError && (
        <p role="alert" className="mt-8 border border-danger px-4 py-3 text-danger">
          {submitError}
        </p>
      )}

      {/* Actions: sticky on mobile so they are always in thumb reach */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg px-6 py-3 md:static md:mt-12 md:border-0 md:bg-transparent md:p-0">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            disabled={step === 0 || pending}
            className="inline-flex min-h-12 items-center gap-2 px-4 font-bold transition-[opacity,scale] active:scale-[0.96] disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back
          </button>
          {isLast ? (
            <button
              type="submit"
              disabled={pending}
              className={buttonClass("primary", "disabled:opacity-70")}
            >
              {pending ? "Sending your request" : "Send my travel request"}
              {!pending && <ArrowRight size={18} aria-hidden="true" />}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className={buttonClass("primary")}
            >
              {step === 5 && values.interests.length === 0 ? "Skip" : "Continue"}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {pending ? "Sending your travel request" : ""}
      </p>
    </form>
  );
}

/* ---------- pieces ---------- */

function inputClass(invalid: boolean) {
  return `min-h-12 w-full rounded-xs border bg-bg px-4 py-3 text-base ${
    invalid ? "border-danger" : "border-line focus:border-fg"
  }`;
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-sm font-bold text-danger">
      {children}
    </p>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      {children}
      {error && <ErrorText id={`${htmlFor}-error`}>{error}</ErrorText>}
    </div>
  );
}

/** Large tappable choices. Real inputs sit inside, so keyboard and screen readers work natively. */
function ChoiceGrid({
  legend,
  type,
  options,
  value,
  onChange,
  error,
  columns,
  compact = false,
}: {
  legend: string;
  type: "checkbox" | "radio";
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[], picked: string) => void;
  error?: string;
  columns: string;
  compact?: boolean;
}) {
  const errorId = `${legend.replace(/\W+/g, "-").toLowerCase()}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="sr-only">{legend}</legend>
      <div className={`grid gap-3 ${columns}`}>
        {options.map((o) => {
          const checked = value.includes(o.value);
          return (
            <label
              key={o.value}
              className={`group relative flex cursor-pointer items-center justify-between gap-4 border px-5 transition-[background-color,border-color,color,scale] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                compact ? "min-h-12 py-3" : "min-h-16 py-4"
              } ${checked ? "border-fg bg-fg text-bg" : "border-line bg-bg hover:border-fg"}`}
            >
              <input
                type={type}
                name={legend}
                value={o.value}
                checked={checked}
                onChange={() => {
                  if (type === "radio") onChange([o.value], o.value);
                  else onChange(checked ? value.filter((v) => v !== o.value) : [...value, o.value], o.value);
                }}
                className="sr-only"
              />
              <span className={compact ? "text-base font-bold" : "font-serif text-2xl leading-none tracking-[-0.01em]"}>
                {o.label}
              </span>
              <span
                aria-hidden="true"
                className={`flex size-6 shrink-0 items-center justify-center border ${
                  type === "radio" ? "rounded-full" : ""
                } ${checked ? "border-bg" : "border-line"}`}
              >
                {checked && <Check size={14} weight="bold" />}
              </span>
            </label>
          );
        })}
      </div>
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </fieldset>
  );
}

function Review({
  values,
  onEdit,
  tripLabel,
}: {
  values: InquiryFormValues;
  onEdit: (step: number) => void;
  tripLabel: string | null;
}) {
  const dates = values.flexible_dates
    ? [values.departure_date && `Around ${fmt(values.departure_date)}`, "Flexible dates"].filter(Boolean).join(", ")
    : [fmt(values.departure_date), values.return_date && fmt(values.return_date)].filter(Boolean).join(" to ");
  const company = COMPANY_OPTIONS.find((c) => c.value === values.travelers_type)?.label ?? "";
  const rows: { label: string; step: number; value: string }[] = [
    { label: "Destination", step: 0, value: values.destinations.join(", ") },
    { label: "Travel dates", step: 1, value: dates || "Not specified" },
    { label: "Travelers", step: 2, value: `${values.travelers} · ${company}` },
    { label: "Travel style", step: 3, value: values.travel_style.join(", ") },
    { label: "Budget per person", step: 4, value: values.budget },
    { label: "Interests", step: 5, value: values.interests.join(", ") || "None selected" },
    { label: "Additional details", step: 6, value: values.message.trim() || "None added" },
    {
      label: "Contact",
      step: 7,
      value: [values.name, values.email, values.phone, `Prefers ${values.contact_method}`].filter(Boolean).join("\n"),
    },
  ];
  return (
    <div>
      {tripLabel && <p className="mb-6 text-sm text-muted">Based on: <span className="font-bold text-fg">{tripLabel}</span></p>}
      <dl className="border-t border-line">
        {rows.map((r) => (
          <div key={r.label} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[200px_1fr_auto] sm:gap-6">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{r.label}</dt>
            <dd className="whitespace-pre-line break-words text-lg">{r.value}</dd>
            <dd>
              <button
                type="button"
                onClick={() => onEdit(r.step)}
                aria-label={`Edit ${r.label.toLowerCase()}`}
                className="inline-flex min-h-11 items-center gap-2 font-bold text-accent underline underline-offset-4"
              >
                <PencilSimple size={16} aria-hidden="true" />
                Edit
              </button>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 max-w-[560px] text-sm text-muted">
        This is a travel request, not a booking. Nothing is confirmed or charged, and a travel specialist will
        contact you to talk it through.
      </p>
    </div>
  );
}

function fmt(iso: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(iso));
}

function Confirmation({ inquiry }: { inquiry: TripInquiry }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  const dates = inquiry.flexible_dates
    ? "Flexible"
    : [inquiry.travel_date && fmt(inquiry.travel_date), inquiry.return_date && fmt(inquiry.return_date)]
        .filter(Boolean)
        .join(" to ");
  return (
    <div role="status">
      <AuraMark size={44} />
      <h2
        ref={heading}
        tabIndex={-1}
        className="mt-8 text-5xl leading-none tracking-[-0.035em] outline-none md:text-7xl"
      >
        Your journey starts here.
      </h2>
      <p className="mt-6 max-w-[620px] text-xl text-muted">
        Your travel request has been received. AURA TRAVEL will review your preferences and contact you about
        your journey.
      </p>
      <p className="mt-4 max-w-[620px] text-sm text-muted">
        This is a travel request, not an instant booking or a confirmed reservation. Nothing has been charged.
        (Portfolio demo: no data was sent to a real server.)
      </p>

      <dl className="mt-12 max-w-[760px] border-t border-line">
        {[
          ["Reference", inquiry.id],
          ["Destination", inquiry.destination.join(", ")],
          ["Travel dates", dates || "Not specified"],
          ["Travelers", `${inquiry.travelers} (${inquiry.travelers_type})`],
          ["Travel style", inquiry.travel_style.join(", ")],
          ["Budget per person", inquiry.budget],
          ["Interests", inquiry.interests.join(", ") || "None selected"],
          ["Contact", `${inquiry.name}, ${inquiry.email}`],
        ].map(([k, v]) => (
          <div key={k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{k}</dt>
            <dd className="break-words">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/journal"
          className="inline-flex min-h-12 items-center justify-center rounded-xs bg-raised px-6 py-3 font-bold text-brand transition-[background-color,scale] hover:bg-line active:scale-[0.96]"
        >
          Read the journal
        </Link>
        <Link
          href="/destinations"
          className="inline-flex min-h-12 items-center justify-center rounded-xs border border-fg px-6 py-3 font-bold transition-[background-color,color,scale] hover:bg-fg hover:text-bg active:scale-[0.96]"
        >
          Keep exploring
        </Link>
      </div>
    </div>
  );
}
