import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.14em] ${className}`}>{children}</p>
  );
}

/** Editorial section opener: index numeral, eyebrow, serif title, optional intro. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  className = "",
  titleClassName = "text-4xl md:text-6xl",
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <header className={`max-w-[680px] ${className}`}>
      {(index || eyebrow) && (
        <Eyebrow className="mb-6 flex items-center gap-4 text-muted">
          {index && <span className="tabular-nums text-accent">{index}</span>}
          {eyebrow && <span>{eyebrow}</span>}
        </Eyebrow>
      )}
      <Tag className={`${titleClassName} leading-none tracking-[-0.03em]`}>{title}</Tag>
      {intro && <p className="mt-6 text-lg text-muted md:text-xl">{intro}</p>}
    </header>
  );
}
