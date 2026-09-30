/** The brand mark: a halo with a point of light on its edge. */
export function AuraMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24.6" cy="6.4" r="3.4" fill="var(--signal)" />
    </svg>
  );
}

/** Small aura marker in a destination's signature light */
export function AuraDot({
  aura,
  size = 10,
  className = "",
}: {
  aura: "japan" | "bali" | "italy" | "palawan";
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 rounded-full ${className}`}
      style={{ width: size, height: size, background: `var(--aura-${aura})` }}
    />
  );
}
