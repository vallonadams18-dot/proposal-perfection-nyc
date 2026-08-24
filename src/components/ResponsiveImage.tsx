import manifest from "@/data/images.json";

type Manifest = Record<string, { widths: number[]; ratio: number }>;
const IMAGES = manifest as Manifest;

type Props = {
  /** basename of the image, e.g. "p-cloud-9" or "gallery-03" */
  name: string;
  alt: string;
  /** the `sizes` attribute — tell the browser how wide this renders */
  sizes: string;
  className?: string;
  /** first image in the viewport should not lazy-load */
  priority?: boolean;
};

/**
 * Static export means no image optimization server, so srcsets point at the
 * WebP variants written by scripts/build-image-variants.mjs. The available
 * widths differ per image (sources are never upscaled), so they are read from
 * the generated manifest instead of assumed.
 */
export function ResponsiveImage({ name, alt, sizes, className, priority }: Props) {
  const entry = IMAGES[name];

  if (!entry) {
    // A missing entry means the manifest and the catalogue disagree. Fail loudly
    // in development rather than shipping an invisible broken image.
    if (process.env.NODE_ENV !== "production") {
      throw new Error(`ResponsiveImage: "${name}" is not in images.json — run scripts/build-image-variants.mjs`);
    }
    return null;
  }

  const { widths, ratio } = entry;
  const largest = widths[widths.length - 1];

  return (
    // A plain <img> on purpose. This is a static export, so next/image would
    // run with `unoptimized: true` and serve the full-size original to every
    // device; the srcset below points at pre-generated WebP variants instead,
    // which is the whole reason build-image-variants.mjs exists.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/img/opt/${name}-${largest}.webp`}
      srcSet={widths.map((w) => `/img/opt/${name}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={largest}
      height={Math.round(largest / ratio)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      className={className}
    />
  );
}
