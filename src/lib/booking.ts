/**
 * Every booking destination on the site, in one place.
 *
 * All inquiries run through CheckCherry, exactly as they did on the old site.
 * These ids were read off the live site and each URL was requested and
 * confirmed to land in the Proposal Perfection account (page title
 * "... | PROPOSAL PERFECTION NYC") before being written down.
 *
 * The old site also had 46 buttons pointing at three OTHER companies'
 * CheckCherry accounts -- Atlanta, New Jersey and NYC Flower Walls. None of
 * those hosts appear anywhere in this codebase; scripts/check-links.mjs fails
 * the build if one ever reappears.
 */

const ACCOUNT = "https://proposal-perfection-nyc.checkcherry.com";

/** The general inquiry form -- the old site's primary CTA, preserved. */
export const INQUIRE = `${ACCOUNT}/contact/11423`;

/**
 * Category entry points, verified live:
 *   14078 -> Flower Walls / Arches / Proposals / Event Rentals (top-level)
 *   18117 -> Custom Signs Service
 *   18118 -> Event Branding & Event Rentals
 *   18120 -> Photo Booth Experience
 *   18124 -> Flower Walls
 *   35224 -> square & rounded flower archways
 *   35225 -> heart flower archways
 */
export const BOOKING = {
  all: `${ACCOUNT}/reservation/set_event?event_category_id=14078`,
  signs: `${ACCOUNT}/reservation/set_event?event_category_id=18117`,
  eventRentals: `${ACCOUNT}/reservation/set_event?event_category_id=18118`,
  photoBooths: `${ACCOUNT}/reservation/set_event?event_category_id=18120`,
  flowerWalls: `${ACCOUNT}/reservation/set_event?event_category_id=18124`,
  archesRounded: `${ACCOUNT}/reservation/set_event?package_group_id=35224`,
  archesHeart: `${ACCOUNT}/reservation/set_event?package_group_id=35225`,
} as const;

/** Hosts a booking link is allowed to use. Enforced by scripts/check-links.mjs. */
export const ALLOWED_BOOKING_HOST = "proposal-perfection-nyc.checkcherry.com";
