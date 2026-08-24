/**
 * Brand-level constants. Anything a human might need to change lives here.
 */

export const SITE = {
  name: "Proposal Perfection NYC",
  shortName: "Proposal Perfection",
  // Canonical origin. `www` matches the sibling site and keeps DNS on a CNAME
  // rather than GitHub's apex A records. Mirrored in scripts/canonical.mjs --
  // change both together.
  url: "https://www.proposalperfectionnyc.com",
  tagline: "We curate the perfect proposals",
  city: "New York City",
} as const;

/**
 * The old site had no phone number, no email address and no contact form --
 * the only real number on it was `011 322 44 56`, which is the placeholder
 * that ships with the The7 WordPress theme demo. Nothing there was migratable,
 * so the phone and email below came from the owner directly rather than from
 * the WordPress build.
 *
 * Every consumer (header, footer, contact page, JSON-LD) guards each field
 * independently, so a field left null is simply hidden and nothing false is
 * published. Fill in the remaining null and it appears automatically.
 */
export const CONTACT: { phone: string | null; email: string | null; hours: string | null } = {
  phone: "(347) 383-5851", // supplied by owner 2026-08-24
  email: "proposalperfectionnyc@gmail.com", // confirmed by owner 2026-08-24
  hours: null, // TODO: real hours -- the old site claimed "Monday - Friday 10 AM - 8 PM" beside the demo number
};

/**
 * `tel:` href in E.164. Dialers and international callers need the country
 * code; a bare 10-digit href is unreliable outside the US. Derived so the
 * display string above stays the single place the number is written.
 */
export const PHONE_HREF = CONTACT.phone
  ? `tel:+1${CONTACT.phone.replace(/[^0-9]/g, "")}`
  : null;

/**
 * Only the accounts that were verified to belong to Proposal Perfection.
 * The old header linked X and YouTube to "/" and mangled the Instagram and
 * Facebook hrefs, so those four were broken; Instagram and Facebook are
 * restored here with correct absolute URLs and the two dead ones are dropped.
 */
export const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/proposalperfectionnyc/" },
  { label: "Facebook", href: "https://www.facebook.com/proposalperfectionnyc" },
] as const;

export const NAV = [
  { label: "Proposals", href: "/proposals/" },
  { label: "Flower Arches", href: "/flower-arch-new-york/" },
  { label: "Flower Walls", href: "/flower-walls/" },
  { label: "Event Rentals", href: "/event-rental-new-york/" },
  { label: "Enhancements", href: "/add-ons/" },
  { label: "Custom Signs", href: "/custom-signs/" },
  { label: "Photo Booths", href: "/photo-booth-rentals/" },
  { label: "Corporate", href: "/corporate-events/" },
  { label: "About", href: "/about/" },
] as const;
