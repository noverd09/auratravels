import { images } from "@/data/images";
import type { ImageAsset } from "@/types";

/** Look up alt text and attribution for an image path. Falls back gracefully for swapped-in assets. */
export function getImageAsset(src: string): ImageAsset {
  return (
    images[src] ?? {
      src,
      alt: "",
      caption: "",
      credit: "",
      license: "",
      source_url: "",
    }
  );
}

export function getAllImageAssets(): ImageAsset[] {
  return Object.values(images);
}
