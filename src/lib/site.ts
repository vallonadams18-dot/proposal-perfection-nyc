/**
 * Brand-level constants. Anything a human might need to change lives here.
 */

export const SITE = {
  name: "Proposal Perfection NYC",
  shortName: "Proposal Perfection",
  url: "https://proposalperfectionnyc.com",
  tagline: "We curate the perfect proposals",
  city: "New York City",
} as const;

/**
 * The old site had no phone number, no email address and no contact form --
 * the only real number on it was `011 322 44 56`, which is the placeholder
 * that ships with the The7 WordPress theme demo. There was nothing to migrate,
 * so rather than invent contact details the site renders the inquiry form as
 * the single call to action and hides the phone/email row entirely.
 *
 * Fill these in and they appear automatically in the header, footer and on the
 * contact page. Until then nothing false is published.
 */
export const CONTACT: { phone: string | null; email: string | null; hours: string | null } = {
  phone: null, // TODO: real number
  email: null, // TODO: real inbox
  hours: null, // TODO: real hours -- the old site claimed "Monday - Friday 10 AM - 8 PM" beside the demo number
};

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
