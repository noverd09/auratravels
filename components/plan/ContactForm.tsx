"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonClass } from "@/components/ui/Button";
import { sendContactAction } from "@/app/contact/actions";
import { contactSchema, type ContactValues } from "@/lib/contact/schema";

const TOPICS = ["General question", "An existing request", "Press and partnerships", "Feedback on the site"];

const field =
  "min-h-12 w-full rounded-xs border bg-bg px-4 py-3 text-base";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const confirmation = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", topic: "", message: "" },
  });

  useEffect(() => {
    if (sent) confirmation.current?.focus();
  }, [sent]);

  const onSubmit = handleSubmit((values) => {
    setError(null);
    startTransition(async () => {
      const result = await sendContactAction(values);
      if (result.ok) {
        setSent(true);
        reset();
      } else setError(result.error);
    });
  });

  if (sent) {
    return (
      <div role="status" className="border border-line p-8">
        <h2 ref={confirmation} tabIndex={-1} className="text-3xl tracking-[-0.02em] outline-none">
          Message received.
        </h2>
        <p className="mt-4 text-muted">
          Thank you. A member of the team will reply by email. (Portfolio demo: nothing was sent to a real
          server.)
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 inline-flex min-h-11 items-center font-bold underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-label="General inquiry" className="grid gap-6">
      <div>
        <label htmlFor="c-name" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Name
        </label>
        <input
          id="c-name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "c-name-error" : undefined}
          className={`${field} ${errors.name ? "border-danger" : "border-line focus:border-fg"}`}
          {...register("name")}
        />
        {errors.name && <p id="c-name-error" className="mt-2 text-sm font-bold text-danger">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="c-email" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Email
        </label>
        <input
          id="c-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "c-email-error" : undefined}
          className={`${field} ${errors.email ? "border-danger" : "border-line focus:border-fg"}`}
          {...register("email")}
        />
        {errors.email && <p id="c-email-error" className="mt-2 text-sm font-bold text-danger">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="c-topic" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Topic
        </label>
        <select
          id="c-topic"
          aria-invalid={!!errors.topic}
          aria-describedby={errors.topic ? "c-topic-error" : undefined}
          className={`${field} ${errors.topic ? "border-danger" : "border-line focus:border-fg"}`}
          {...register("topic")}
        >
          <option value="">Choose a topic</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.topic && <p id="c-topic-error" className="mt-2 text-sm font-bold text-danger">{errors.topic.message}</p>}
      </div>
      <div>
        <label htmlFor="c-message" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Message
        </label>
        <textarea
          id="c-message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "c-message-error" : undefined}
          className={`${field} resize-y ${errors.message ? "border-danger" : "border-line focus:border-fg"}`}
          {...register("message")}
        />
        {errors.message && <p id="c-message-error" className="mt-2 text-sm font-bold text-danger">{errors.message.message}</p>}
      </div>
      {error && (
        <p role="alert" className="border border-danger px-4 py-3 text-danger">
          {error}
        </p>
      )}
      <div>
        <button
          type="submit"
          disabled={pending}
          className={buttonClass("primary", "disabled:opacity-70")}
        >
          {pending ? "Sending message" : "Send message"}
        </button>
      </div>
    </form>
  );
}
