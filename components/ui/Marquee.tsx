import type { ReactNode } from "react";

/** Endless band of large type. Content is duplicated for a seamless loop; the copy is hidden from assistive tech. */
export function Marquee({
  items,
  className = "",
}: {
  items: ReactNode[];
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex shrink-0 items-center whitespace-nowrap px-6 md:px-10">
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
