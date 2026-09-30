import { Container } from "@/components/ui/Container";

/** Skeleton shaped like a listing page, shown while a route streams in. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      <Container className="py-16 md:py-24">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton mt-6 h-16 w-full max-w-[720px] md:h-24" />
        <div className="skeleton mt-6 h-6 w-full max-w-[520px]" />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton aspect-[3/2] w-full" />
              <div className="skeleton mt-5 h-4 w-24" />
              <div className="skeleton mt-3 h-8 w-3/4" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
