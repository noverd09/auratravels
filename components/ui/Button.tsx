import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export type ButtonVariant = "primary" | "secondary" | "inverse" | "dark" | "outline";

const base =
  "wipe group inline-flex min-h-12 items-center justify-center gap-3 rounded-xs px-6 py-3 text-base font-bold tracking-[0.01em] active:scale-[0.96] [text-wrap:nowrap]";

const variants: Record<ButtonVariant, string> = {
  // Signal orange fill, near black label: the one loud action on a screen
  primary: "bg-signal text-fg [--wipe:var(--ink)] [--wipe-text:var(--paper)]",
  secondary: "bg-raised text-fg [--wipe:var(--ink)] [--wipe-text:var(--paper)]",
  // For dark bands
  inverse: "bg-bg text-fg [--wipe:var(--signal)] [--wipe-text:var(--ink)]",
  // For signal orange bands
  dark: "bg-inverse text-on-inverse [--wipe:var(--paper)] [--wipe-text:var(--ink)]",
  outline:
    "border border-current bg-transparent text-current [--wipe:var(--paper)] [--wipe-text:var(--ink)]",
};

/** Shared class string so plain <a> and <button> elements can match the button look. */
export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

interface CommonProps {
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  arrow = false,
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={buttonClass(variant, className)} {...rest}>
      {children}
      {arrow && <ArrowIcon />}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  arrow = false,
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass(variant, className)} {...rest}>
      {children}
      {arrow && <ArrowIcon />}
    </Link>
  );
}

function ArrowIcon() {
  return (
    <ArrowRight
      size={18}
      weight="regular"
      aria-hidden="true"
      className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
    />
  );
}

/** Quiet text link with a trailing arrow, for secondary paths */
export function TextLink({
  className = "",
  children,
  ...rest
}: Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      className={`group inline-flex min-h-11 items-center gap-2 text-base font-bold ${className}`}
      {...rest}
    >
      <span className="link-underline">{children}</span>
      <ArrowIcon />
    </Link>
  );
}
