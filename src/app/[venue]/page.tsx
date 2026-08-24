import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceGrid } from "@/components/ExperienceCard";
import { JsonLd } from "@/components/JsonLd";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { Container, InquiryBand, PageHeader, Section, SectionHeading } from "@/components/Sections";
import { VENUES, venueBySlug, type Venue } from "@/data/venues";
import { bySlugs } from "@/lib/products";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, placeServiceJsonLd } from "@/lib/seo";

/**
 * The venue axis of the coverage grid. One template, one data file, every page
 * generated — so a new venue cannot be missing from the sitemap or orphaned
 * from the internal linking (docs/seo-playbook.md, Phases 1, 2 and 5).
 */

export function generateStaticParams() {
  return VENUES.map((v) => ({ venue: v.slug }));
}

// Static export builds exactly the slugs above; anything else is a 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ venue: string }>;
}): Promise<Metadata> {
  const { venue } = await params;
  const v = venueBySlug(venue);
  if (!v) return {};
  return pageMetadata({
    title: v.metaTitle,
    description: v.metaDescription,
    path: `/${v.slug}/`,
  });
}

/**
 * Visible FAQ and FAQPage schema come from the same three fields, so the
 * markup can never claim something the page does not say.
 */
function faqsFor(v: Venue) {
  return [
    {
      q: `Can you set up a proposal at ${v.inSentence}?`,
      a: v.constraint.body,
    },
    {
      q: `When is the best time to propose at ${v.inSentence}?`,
      a: v.timing,
    },
    {
      q: `What kind of setup suits ${v.inSentence}?`,
      a: v.recommends.map((r) => `${r.name} — ${r.why}.`).join(" "),
    },
  ];
}

export default async function VenuePage({ params }: { params: Promise<{ venue: string }> }) {
  const { venue } = await params;
  const v = venueBySlug(venue);
  if (!v) notFound();

  const products = bySlugs(v.featured);
  const faqs = faqsFor(v);
  const others = VENUES.filter((o) => o.slug !== v.slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(v.short, `/${v.slug}/`)} />
      <JsonLd data={placeServiceJsonLd(v.title, v.short, `/${v.slug}/`, v.metaDescription)} />
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHeader eyebrow="Proposal locations · New York City" title={v.title} intro={v.intro} />

      <Section className="pt-14 md:pt-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionHeading eyebrow="The spots" title="Where people actually mean" />
              <ul className="mt-10 space-y-4">
                {v.spots.map((s) => (
                  <li key={s} className="border-t border-line pt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="frame aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[32rem]">
              <ResponsiveImage
                name={v.image}
                alt={`${v.title} — Proposal Perfection NYC`}
                sizes="(max-width: 1024px) 92vw, 46vw"
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <SectionHeading
            eyebrow="What suits it"
            title="What we would put there"
            intro="Chosen for this setting specifically — scale, shape and how it holds up in the conditions."
          />
          <dl className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {v.recommends.map((r) => (
              <div key={r.name} className="border-t border-line pt-6">
                <dt className="font-[family-name:var(--font-display)] text-[1.5rem] leading-snug text-espresso">
                  {r.name}
                </dt>
                <dd className="mt-2 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">{r.why}</dd>
              </div>
            ))}
          </dl>
          {products.length > 0 && (
            <div className="mt-20">
              <ExperienceGrid products={products} cta="Explore experience" />
            </div>
          )}
        </Container>
      </Section>

      {/* The honest constraint, rendered as the FAQ rather than as prose that
          the FAQ then repeats. One copy of each answer on the page: the
          playbook's rule is reusable structure, not reusable text, and that
          applies within a page as much as across the grid. */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading eyebrow="Worth knowing" title={v.constraint.heading} />
            <dl className="divide-y divide-line border-t border-line">
              {faqs.map((f) => (
                <div key={f.q} className="py-7 first:pt-8">
                  <dt className="font-[family-name:var(--font-display)] text-[1.45rem] leading-snug text-espresso">
                    {f.q}
                  </dt>
                  <dd className="mt-3 max-w-[68ch] text-[1.0625rem] leading-relaxed text-ink-soft">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Phase 5: every venue links to every other one, so none is orphaned. */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Elsewhere in the city"
            title="Other places people propose"
            intro="Each one has its own access, its own light and its own rules."
          />
          <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/${o.slug}/`} className="group border-t border-line pt-6">
                <h3 className="text-[1.4rem] leading-snug text-espresso">{o.short}</h3>
                <p className="mt-2.5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                  {o.constraint.heading}
                </p>
                <span className="link-quiet mt-4">Explore</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <InquiryBand title={`Plan your proposal at ${v.inSentence}`} image="gallery-03" />
    </>
  );
}
