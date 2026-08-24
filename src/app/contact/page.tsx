import type { Metadata } from "next";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { Container, PageHeader, Section, SectionHeading } from "@/components/Sections";
import { BOOKING, INQUIRE } from "@/lib/booking";
import { CONTACT, SOCIAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Check your date with Proposal Perfection NYC. Tell us the date, the location and what you have in mind, and we will come back with a design and a quote.",
  alternates: { canonical: "/contact/" },
};

const HELPFUL = [
  { label: "The date", body: "Even an approximate one. Availability moves quickly around Valentine's Day, New Year's Eve and the whole of December." },
  { label: "The place", body: "A rooftop, a park, a restaurant, your apartment. If you have not decided, say so — we will suggest something." },
  { label: "The time", body: "Sunset and after dark change what we recommend, because lighting becomes half the design." },
  { label: "Anything you have already pictured", body: "A colour, a photograph you saved, a shape. It gives us somewhere to start." },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start with the date"
        intro="Every enquiry goes straight to the person who will design your setup. Send over what you know so far — a couple of lines is enough — and we will come back with options, a design and a price."
      />

      <Section className="pt-14 md:pt-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionHeading title="Check your date" />
              <p className="mt-8 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-soft">
                The fastest route is our booking form. It shows live availability, so you will know
                straight away whether the evening you want is open.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href={INQUIRE} target="_blank" rel="noopener" className="cta">
                  Send an enquiry
                </a>
                <a href={BOOKING.all} target="_blank" rel="noopener" className="cta cta-ghost">
                  Browse &amp; check availability
                </a>
              </div>

              {(CONTACT.phone || CONTACT.email || CONTACT.hours) && (
                <dl className="mt-14 space-y-5 border-t border-line pt-8">
                  {CONTACT.phone && (
                    <div>
                      <dt className="eyebrow">Telephone</dt>
                      <dd className="mt-1.5 text-[1.25rem]">
                        <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`}>{CONTACT.phone}</a>
                      </dd>
                    </div>
                  )}
                  {CONTACT.email && (
                    <div>
                      <dt className="eyebrow">Email</dt>
                      <dd className="mt-1.5 text-[1.25rem]">
                        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                      </dd>
                    </div>
                  )}
                  {CONTACT.hours && (
                    <div>
                      <dt className="eyebrow">Hours</dt>
                      <dd className="mt-1.5 text-[1.0625rem] text-ink-soft">{CONTACT.hours}</dd>
                    </div>
                  )}
                </dl>
              )}

              <div className="mt-14 border-t border-line pt-8">
                <p className="eyebrow">Elsewhere</p>
                <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                  {SOCIAL.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-quiet">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="frame aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[34rem]">
              <ResponsiveImage
                name="gallery-11"
                alt="A styled proposal setup with florals and candlelight in New York City"
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
            eyebrow="Before you write"
            title="Four things that speed everything up"
            intro="None of them are required. They just save a round of emails."
          />
          <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {HELPFUL.map((h) => (
              <div key={h.label} className="border-t border-line pt-6">
                <dt className="font-[family-name:var(--font-display)] text-[1.5rem] leading-snug text-espresso">
                  {h.label}
                </dt>
                <dd className="mt-2.5 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-soft">{h.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
    </>
  );
}
