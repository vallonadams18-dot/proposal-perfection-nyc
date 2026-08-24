import { CONTACT, SITE, SOCIAL } from "@/lib/site";

/** Renders any structured-data object as a JSON-LD script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Structured data for the business.
 *
 * Deliberately minimal: no aggregateRating (there are no collected reviews to
 * base one on), no address and no telephone until real ones exist. Inventing
 * any of those would be publishing a false claim to Google.
 */
export function BusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
    description:
      "Marriage proposal design and event rentals in New York City — flower arches, flower walls, custom signage, photo booths and full proposal styling.",
    areaServed: [
      { "@type": "City", name: "New York City" },
      { "@type": "AdministrativeArea", name: "Manhattan" },
      { "@type": "AdministrativeArea", name: "Brooklyn" },
      { "@type": "AdministrativeArea", name: "Queens" },
      { "@type": "AdministrativeArea", name: "The Bronx" },
      { "@type": "AdministrativeArea", name: "Staten Island" },
    ],
    sameAs: SOCIAL.map((s) => s.href),
  };

  if (CONTACT.phone) data.telephone = CONTACT.phone;
  if (CONTACT.email) data.email = CONTACT.email;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
