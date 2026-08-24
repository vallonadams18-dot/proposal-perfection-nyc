import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceGrid } from "@/components/ExperienceCard";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { Container, InquiryBand, Section, SectionHeading } from "@/components/Sections";
import { BOOKING, INQUIRE } from "@/lib/booking";
import { category, featured as featuredProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Marriage Proposal Planning NYC | Flower Arches & Proposal Décor",
  description:
    "Luxury marriage proposal planning in New York City. Flower arches, flower walls, marquee letters and custom signage — designed, delivered, styled and cleared away by one team.",
  alternates: { canonical: "/" },
};

const STEPS = [
  {
    title: "Tell us the moment",
    body: "Send over the date, the location and anything you already have in mind. A few lines is enough to start.",
  },
  {
    title: "A call with a designer",
    body: "We talk through the setting, the light, the timing and how the two of you actually want it to feel.",
  },
  {
    title: "Choose your pieces",
    body: "An arch, a wall, signage, sparks, petals, candlelight. We show you exactly what your setup will look like.",
  },
  {
    title: "We handle the evening",
    body: "Delivery, installation, styling and a clean strike-down afterwards. You only have to show up and ask.",
  },
];

const REASONS = [
  {
    title: "One team, start to finish",
    body: "The people who design your setup are the people who deliver it, install it and take it away. Nothing is subcontracted out and nothing gets lost between two companies.",
  },
  {
    title: "Built for the photograph",
    body: "Every arch, wall and sign is chosen for how it reads through a lens — shape, scale and how it holds up after dark. You will be looking at these pictures for decades.",
  },
  {
    title: "New York, specifically",
    body: "Rooftops, parks, lofts, waterfronts and small apartments. We build for freight elevators, narrow stairwells and short load-in windows because that is what this city gives you.",
  },
  {
    title: "Nothing off the shelf",
    body: "If none of the collections is right, we design the installation around your idea instead of talking you into the nearest thing that already exists.",
  },
];

const LOCATIONS = [
  {
    name: "DUMBO & Brooklyn Bridge Park",
    body: "Cobblestones, the bridge and the Manhattan skyline behind you. Best at golden hour, and a heart arch reads beautifully against the stone.",
  },
  {
    name: "Central Park",
    body: "The Bow Bridge, Bethesda Terrace, the Conservatory Garden. Green, quiet and classic — pair it with white florals and candlelight.",
  },
  {
    name: "Rooftops & penthouses",
    body: "The setting our marquee letters and cold sparks were made for. City lights do half the work; we light the rest.",
  },
  {
    name: "At home",
    body: "The most personal option, and the most underrated. A full flower wall fits a living room more easily than people expect.",
  },
];

export default function HomePage() {
  const featured = featuredProducts(6);
  const enhancements = category("add-ons").slice(0, 6);
  const gallery = ["gallery-03", "gallery-09", "gallery-01", "gallery-11", "gallery-04", "gallery-08"];

  return (
    <>
      {/* ------------------------------------------------------------------ hero */}
      <section className="border-b border-line">
        {/* The photograph is landscape (3:2). If it stretched to match the
            height of the copy it would be cropped into a portrait strip and
            lose the marquee letters, so the two columns are centred against
            each other and the image keeps its own height. */}
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[0.9fr_1.15fr] lg:items-center">
          <div className="flex items-center px-5 py-20 md:px-10 md:py-24 xl:pl-20">
            <div className="max-w-xl">
              <p className="eyebrow">Marriage proposal design &middot; New York City</p>
              <h1 className="mt-7 text-[3rem] leading-[1.01] md:text-[4.5rem] xl:text-[5.25rem]">
                {/* Explicit spaces so the accessible name and any text
                    extraction read "She will remember every second of it."
                    rather than running the lines together. */}
                She will remember{" "}
                <span className="block italic text-rose">every second</span>{" "}
                of it.
              </h1>
              <p className="mt-8 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-soft md:text-[1.125rem]">
                Flower arches, flower walls, marquee letters and candlelight, designed around the
                place you have chosen and built the same evening you propose. You ask the question.
                We take care of absolutely everything else.
              </p>
              <div className="mt-11 flex flex-wrap items-center gap-4">
                <a href={INQUIRE} target="_blank" rel="noopener" className="cta">
                  Check your date
                </a>
                <Link href="/proposals/" className="cta cta-ghost">
                  See the collections
                </Link>
              </div>
            </div>
          </div>

          <div className="frame relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[30rem] xl:h-[33rem]">
            <ResponsiveImage
              name="gallery-06"
              alt="A night-time rooftop proposal in New York City — illuminated marquee letters, a red rose heart arch, cold spark fountains and candlelight"
              sizes="(max-width: 1024px) 100vw, 56vw"
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- featured experiences */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The collections"
            title="Featured proposal experiences"
            intro="A starting point, not a menu. Every setup below can be scaled up, restyled or rebuilt around the location you have in mind."
          />
          <div className="mt-16">
            <ExperienceGrid products={featured} />
          </div>
          <div className="mt-16">
            <Link href="/proposals/" className="link-quiet">
              View every proposal setup
            </Link>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ how it works */}
      <Section className="bg-cream">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Four steps, and none of them are yours to worry about"
          />
          {/* Numbered because this genuinely is a sequence — each step depends on the last. */}
          <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="block font-[family-name:var(--font-display)] text-[2.6rem] leading-none text-champagne">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[1.4rem] leading-snug text-espresso">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- gallery */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Real proposals"
            title="Evenings we have built"
            intro="Photographed on the night, in the city, exactly as they were delivered."
            align="center"
          />
        </Container>
        <Container className="mt-16">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {gallery.map((name, i) => (
              <div
                key={name}
                className={`frame ${i === 0 || i === 3 ? "aspect-[3/4] md:aspect-[3/2]" : "aspect-[3/4]"}`}
              >
                <ResponsiveImage
                  name={name}
                  alt="A proposal setup by Proposal Perfection NYC"
                  sizes="(max-width: 768px) 48vw, 31vw"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- enhancements */}
      <Section className="bg-cream">
        <Container>
          <SectionHeading
            eyebrow="Signature enhancements"
            title="The details people remember"
            intro="Small additions that change the temperature of the whole evening. Add any of them to any setup."
          />
          <div className="mt-16">
            <ExperienceGrid products={enhancements} cta="Add to your evening" />
          </div>
          <div className="mt-16">
            <Link href="/add-ons/" className="link-quiet">
              All enhancements
            </Link>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------------------- why us */}
      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div>
              <SectionHeading eyebrow="Why us" title="Why Proposal Perfection NYC" />
              <div className="frame mt-12 hidden aspect-[4/5] lg:block">
                <ResponsiveImage
                  name="gallery-12"
                  alt="A styled proposal setup with florals and candlelight"
                  sizes="40vw"
                />
              </div>
            </div>
            <dl className="grid gap-y-12 sm:grid-cols-2 sm:gap-x-10">
              {REASONS.map((r) => (
                <div key={r.title}>
                  <dt className="font-[family-name:var(--font-display)] text-[1.5rem] leading-snug text-espresso">
                    {r.title}
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{r.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- locations */}
      <Section className="bg-cream">
        <Container>
          <SectionHeading
            eyebrow="Where to propose"
            title="New York gives you a lot to work with"
            intro="A few of the settings we are asked about most, and what tends to suit each one."
          />
          <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {LOCATIONS.map((loc) => (
              <div key={loc.name} className="border-t border-line pt-7">
                <h3 className="text-[1.5rem] leading-snug text-espresso">{loc.name}</h3>
                <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-soft">{loc.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-soft">
            Somewhere else in mind? We deliver across all five boroughs.{" "}
            <a href={BOOKING.all} target="_blank" rel="noopener" className="text-espresso underline decoration-champagne underline-offset-4">
              Tell us where
            </a>
            .
          </p>
        </Container>
      </Section>

      <InquiryBand image="gallery-06" />
    </>
  );
}
