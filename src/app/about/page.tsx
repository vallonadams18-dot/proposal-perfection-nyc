import type { Metadata } from "next";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { Container, InquiryBand, PageHeader, Section, SectionHeading } from "@/components/Sections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Proposal Perfection NYC designs, delivers and styles marriage proposal installations across New York City — floral arches, flower walls, signage and full custom décor.",
  path: "/about/",
});

const CAPABILITIES = [
  { title: "Floral installations", body: "Arches in every shape we stock, full-height flower walls, floral runners and accents, all in premium faux blooms." },
  { title: "Custom signage", body: "Neon, acrylic and timber lettering, plus banners, step and repeats and branded backdrops." },
  { title: "Event rentals", body: "Dimensional panels, ornamental gates and stainless frames that give a setup real architecture." },
  { title: "Atmosphere", body: "Cold sparks, confetti, fog, uplighting, candlelight and rose petals, cued to the moment." },
  { title: "Photo booths", body: "Mirror, 360, glam and roaming booths with custom backdrops and instant sharing." },
  { title: "Full production", body: "Design, delivery, installation, styling and strike-down by one team on one invoice." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="We only do this one thing, and we do it across New York"
        intro="Proposal Perfection NYC designs and builds the settings people propose in. Breathtaking, romantic, and tailored to your own story rather than assembled from a catalogue."
      />

      <Section className="pt-14 md:pt-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="frame aspect-[4/5]">
              <ResponsiveImage
                name="gallery-06"
                alt="A rooftop proposal in New York City with marquee letters, a rose heart arch and cold sparks"
                sizes="(max-width: 1024px) 92vw, 46vw"
                priority
              />
            </div>
            <div className="space-y-6 self-center">
              <p className="text-[1.0625rem] leading-relaxed text-ink-soft">
                We specialise in designing breathtaking, romantic settings tailored to your own love
                story — elegant floral arches, luxurious flower walls and personalised décor that
                turn a place you already love into the place you got engaged.
              </p>
              <p className="text-[1.0625rem] leading-relaxed text-ink-soft">
                Whether you have imagined something intimate for two on a quiet rooftop or a full
                installation with sparks, signage and thirty people waiting around the corner, the
                work is the same: understand the moment, then build for it.
              </p>
              <p className="text-[1.0625rem] leading-relaxed text-ink-soft">
                Beyond the florals we offer a full range of event services across the city —
                interactive photo booths, custom signage, premium rentals and branding elements
                including banners, step and repeats and tailored backdrops. One team handles all
                of it, from the first call to loading the last panel back into the van.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Everything the evening needs, from one place"
            intro="Nothing is subcontracted. The people who design your setup are the people who install it."
          />
          <dl className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="border-t border-line pt-6">
                <dt className="font-[family-name:var(--font-display)] text-[1.5rem] leading-snug text-espresso">
                  {c.title}
                </dt>
                <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{c.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Service area"
            title="All five boroughs, and the buildings in them"
            intro="Manhattan, Brooklyn, Queens, the Bronx and Staten Island. We plan around freight elevators, load-in windows, stair turns and rooftop access, because in this city that is most of the job."
          />
        </Container>
      </Section>

      <InquiryBand title="Tell us about your moment" image="gallery-12" />
    </>
  );
}
