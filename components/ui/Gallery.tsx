import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

const SPANS = [
  "md:col-span-7 aspect-[3/2]",
  "md:col-span-5 aspect-[4/5] md:aspect-auto",
  "md:col-span-4 aspect-[4/3]",
  "md:col-span-8 aspect-[16/9]",
  "md:col-span-6 aspect-[3/2]",
  "md:col-span-6 aspect-[3/2]",
];

/** Asymmetric gallery. Each image is decorative-plus-informative, so alt text comes from the registry. */
export function Gallery({ images }: { images: string[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-12 md:gap-6">
      {images.map((src, i) => (
        <li key={src} className={`${SPANS[i % SPANS.length]} md:min-h-0`}>
          <Reveal delay={(i % 3) * 80} className="h-full">
            <Photo
              src={src}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="h-full min-h-[240px] w-full"
            />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
