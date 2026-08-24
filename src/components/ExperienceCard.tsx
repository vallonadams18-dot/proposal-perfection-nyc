import type { Product } from "@/data/catalog";
import { ResponsiveImage } from "./ResponsiveImage";

const CARD_SIZES = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw";

/**
 * One experience. Deliberately not an ecommerce tile: no price, no badge, no
 * border, no button — a large photograph, a serif name, a line of copy and a
 * quiet rule that draws itself in on hover.
 *
 * The whole card is the link, and it goes wherever this item pointed on the
 * old site (see src/data/catalog.ts).
 */
export function ExperienceCard({
  product,
  cta = "Explore experience",
  priority,
}: {
  product: Product;
  cta?: string;
  priority?: boolean;
}) {
  return (
    <a
      href={product.bookingUrl}
      target="_blank"
      rel="noopener"
      className="group block"
    >
      <div className="frame aspect-[4/5]">
        <ResponsiveImage
          name={product.image}
          alt={`${product.name} — proposal setup by Proposal Perfection NYC`}
          sizes={CARD_SIZES}
          priority={priority}
        />
      </div>

      <h3 className="mt-6 font-[family-name:var(--font-display)] text-[1.6rem] leading-tight text-espresso">
        {product.name}
      </h3>

      {product.description && (
        <p className="mt-2.5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-ink-soft">
          {product.description}
        </p>
      )}

      <span className="link-quiet mt-5">{cta}</span>
    </a>
  );
}

/** A responsive grid of experiences with generous gutters. */
export function ExperienceGrid({
  products,
  cta,
  priorityCount = 0,
}: {
  products: Product[];
  cta?: string;
  priorityCount?: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <ExperienceCard key={p.slug} product={p} cta={cta} priority={i < priorityCount} />
      ))}
    </div>
  );
}
