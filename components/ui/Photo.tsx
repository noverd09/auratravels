import Image from "next/image";
import { getImageAsset } from "@/lib/images";

/**
 * Photograph with alt text pulled from the image registry, so swapping the file
 * for client photography is a one line data change.
 */
export function Photo({
  src,
  alt,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
  imgClassName = "",
  outline = true,
  bgClass = "bg-raised",
}: {
  src: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  outline?: boolean;
  bgClass?: string;
}) {
  const asset = getImageAsset(src);
  // Callers can position the frame themselves (for example absolute, as a full bleed background)
  const position = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";
  return (
    <div
      className={`${position} overflow-hidden ${bgClass} ${outline ? "img-outline" : ""} ${className}`}
    >
      <Image
        src={src}
        alt={alt ?? asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
