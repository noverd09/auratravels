import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import type { ItineraryDay } from "@/types";

/** Day by day timeline. Numerals lead, photographs appear where a day has one. */
export function Itinerary({ days }: { days: ItineraryDay[] }) {
  if (days.length === 0) {
    return (
      <p className="text-muted">
        The detailed itinerary for this journey is being finalized. Plan your trip and we will send it
        with your proposal.
      </p>
    );
  }
  return (
    <ol className="border-t border-line">
      {days.map((day) => (
        <li key={day.id} className="border-b border-line">
          <Reveal>
            <div className="grid gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14">
              <div className="flex items-baseline gap-4 md:col-span-3 md:block">
                <span className="font-serif text-6xl leading-none tabular-nums text-accent md:text-8xl">
                  {String(day.day_number).padStart(2, "0")}
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted md:mt-4">
                  Day {day.day_number} · {day.location}
                </p>
              </div>
              <div className={day.image ? "md:col-span-5" : "md:col-span-9"}>
                <h3 className="text-3xl leading-9 tracking-[-0.02em] md:text-4xl md:leading-10">
                  {day.title}
                </h3>
                <p className="mt-4 max-w-[560px] text-lg text-muted">{day.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Activities">
                  {day.activities.map((a) => (
                    <li
                      key={a}
                      className="rounded-full bg-raised px-3 py-1 text-sm text-fg"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              {day.image && (
                <div className="md:col-span-4">
                  <Photo
                    src={day.image}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[4/3]"
                  />
                </div>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
