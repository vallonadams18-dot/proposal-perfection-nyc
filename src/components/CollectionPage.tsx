import Link from "next/link";
import type { Product } from "@/data/catalog";
import { ExperienceGrid } from "./ExperienceCard";
import { Container, InquiryBand, PageHeader, Section, SectionHeading } from "./Sections";

export type CrossSell = { label: string; href: string; blurb: string };

/**
 * Shared layout for the eight category pages. Each one is a page header, a
 * grid of experiences, an optional block of body copy, a set of internal
 * cross-links and the closing inquiry band.
 *
 * The cross-links are internal routes on purpose. On the old site the
 * equivalent cards were "Inquire Now" buttons pointing at a different
 * company's CheckCherry account (see docs/link-map.md); a category teaser
 * belongs on the category page, not in a booking form.
 */
export function CollectionPage({
  eyebrow,
  title,
  intro,
  products,
  gridEyebrow,
  gridTitle,
  gridIntro,
  cta,
  body,
  crossSell,
  bandTitle,
  bandCopy,
  bandImage,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  products: Product[];
  gridEyebrow?: string;
  gridTitle?: string;
  gridIntro?: string;
  cta?: string;
  body?: { title: string; paragraphs: string[] };
  crossSell?: CrossSell[];
  bandTitle?: string;
  bandCopy?: string;
  bandImage?: string;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} />

      <Section className="pt-16 md:pt-20">
        <Container>
          {gridTitle && (
            <div className="mb-16">
              <SectionHeading eyebrow={gridEyebrow} title={gridTitle} intro={gridIntro} />
            </div>
          )}
          {products.length > 0 ? (
            <ExperienceGrid products={products} cta={cta} priorityCount={3} />
          ) : (
            <p className="text-ink-soft">This collection is being photographed. Ask us what is available.</p>
          )}
        </Container>
      </Section>

      {body && (
        <Section className="bg-cream">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <SectionHeading title={body.title} />
              <div className="space-y-6">
                {body.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="max-w-[68ch] text-[1.0625rem] leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {crossSell && crossSell.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Also available"
              title="Everything else we bring to the evening"
              intro="One team and one invoice, whichever of these you add."
            />
            <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {crossSell.map((c) => (
                <Link key={c.href} href={c.href} className="group border-t border-line pt-6">
                  <h3 className="text-[1.4rem] leading-snug text-espresso">{c.label}</h3>
                  <p className="mt-2.5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">{c.blurb}</p>
                  <span className="link-quiet mt-4">Explore</span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <InquiryBand title={bandTitle} copy={bandCopy} image={bandImage} />
    </>
  );
}

/** The full cross-sell set, minus whichever page is rendering it. */
export const ALL_CROSS_SELL: CrossSell[] = [
  { label: "Flower Arches", href: "/flower-arch-new-york/", blurb: "Hearts, circles, squares and half arches in every colourway we stock." },
  { label: "Flower Walls", href: "/flower-walls/", blurb: "Full-height backdrops in premium faux florals, built for photographs." },
  { label: "Event Rentals", href: "/event-rental-new-york/", blurb: "Panels, frames, gates and layered backdrops with real architecture." },
  { label: "Enhancements", href: "/add-ons/", blurb: "Cold sparks, confetti, candles, petals, marquee letters and uplighting." },
  { label: "Custom Signs", href: "/custom-signs/", blurb: "Neon, acrylic and wooden signage in your own words." },
  { label: "Photo Booths", href: "/photo-booth-rentals/", blurb: "Mirror, 360 and glam booths to catch the reaction as it happens." },
];

export const crossSellExcept = (href: string) => ALL_CROSS_SELL.filter((c) => c.href !== href);
