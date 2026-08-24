import type { Metadata } from "next";
import manifest from "@/data/images.json";
import { SITE } from "./site";

const IMAGES = manifest as Record<string, { widths: number[]; ratio: number }>;

/**
 * Absolute URL of the largest variant that actually exists for an image.
 * Widths differ per image because sources are never upscaled, so a fixed
 * width here would emit URLs that 404 inside structured data.
 */
function largestVariant(name: string): string | null {
  const entry = IMAGES[name];
  if (!entry) return null;
  const width = entry.widths[entry.widths.length - 1];
  return `${SITE.url}/img/opt/${name}-${width}.webp`;
}

/**
 * One place that builds a page's metadata, so no page can ship without a
 * canonical URL or a share image.
 *
 * The old site had neither: no page carried a meta description, and nothing
 * carried an og:image, so every link shared to Instagram or iMessage rendered
 * as a bare grey rectangle. Share images are generated per page by
 * scripts/build-og-images.mjs into /img/og/<slug>.jpg.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogSlug,
}: {
  /** the <title>, without the brand suffix -- the layout template adds it */
  title: string;
  description: string;
  /** absolute path with trailing slash, e.g. "/proposals/" */
  path: string;
  /** basename in /img/og; defaults to the path's first segment */
  ogSlug?: string;
}): Metadata {
  const slug = ogSlug ?? (path === "/" ? "default" : path.replace(/^\/|\/$/g, ""));
  const image = `${SITE.url}/img/og/${slug}.jpg`;
  const url = `${SITE.url}${path}`;

  // Next applies the root layout's title template to child segments only, not
  // to the root page itself — so the homepage passes its own full title and
  // must not have the brand appended twice here.
  const social = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      url,
      title: social,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${title} — ${SITE.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
      images: [image],
    },
  };
}

/**
 * Breadcrumb structured data. Every interior page is one level under the
 * homepage, so the trail is short, but it is what puts the readable path
 * (proposalperfectionnyc.com › Flower arches) in a search result instead of a
 * bare URL.
 */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE.url}${path}` },
    ],
  };
}

/**
 * FAQPage structured data. Answers here must match the visible copy exactly --
 * Google treats a mismatch between the markup and the page as a violation, and
 * it is also just dishonest.
 */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/**
 * ItemList for a collection page. Describes the set of experiences on the page
 * so the listing can qualify for a carousel-style result, without claiming a
 * price or availability we do not have.
 */
export function collectionJsonLd(
  name: string,
  path: string,
  items: { name: string; description: string; image: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: `${SITE.url}${path}`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => {
      const image = largestVariant(item.image);
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: item.name,
          description: item.description,
          ...(image ? { image } : {}),
          brand: { "@type": "Brand", name: SITE.name },
        },
      };
    }),
  };
}
