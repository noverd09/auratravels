"use client";

/** A single choice group rendered as toggle buttons. aria-pressed marks the active option. */
export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">{label}</p>
      <ul className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        {options.map((o) => {
          const pressed = o.value === value;
          return (
            <li key={o.value} className="shrink-0">
              <button
                type="button"
                aria-pressed={pressed}
                onClick={() => onChange(o.value)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-bold transition-[background-color,color,border-color,scale] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96] ${
                  pressed
                    ? "border-fg bg-fg text-bg"
                    : "border-line bg-transparent text-fg hover:border-fg"
                }`}
              >
                {o.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
