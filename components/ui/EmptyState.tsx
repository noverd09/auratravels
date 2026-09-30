import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div
      role="status"
      className="border border-line px-6 py-16 text-center md:py-24"
    >
      <h2 className="font-serif text-3xl tracking-[-0.02em] md:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-[440px] text-muted">{body}</p>
      {action && <div className="mt-8 flex justify-center">{action}</div>}
    </div>
  );
}
