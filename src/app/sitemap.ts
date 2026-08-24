import type { MetadataRoute } from "next";
import { VENUES } from "@/data/venues";
import { SITE } from "@/lib/site";

/**
 * Derived from the same data the routes are, not hand-listed.
 *
 * The playbook's Phase 1 point: a competitor built 90+ pages and left them out
 * of their own sitemap. If the sitemap is generated from the venue array, a
 * new venue page physically cannot be missing from it.
 */
const FIXED = [
  { path: "/", priority: 1.0 },
  { path: "/proposals/", priority: 0.9 },
  { path: "/flower-arch-new-york/", priority: 0.9 },
  { path: "/flower-walls/", priority: 0.9 },
  { path: "/event-rental-new-york/", priority: 0.8 },
  { path: "/add-ons/", priority: 0.8 },
  { path: "/custom-signs/", priority: 0.8 },
  { path: "/photo-booth-rentals/", priority: 0.8 },
  { path: "/corporate-events/", priority: 0.7 },
  { path: "/about/", priority: 0.6 },
  { path: "/contact/", priority: 0.7 },
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-24");

  const venues = VENUES.map((v) => ({ path: `/${v.slug}/`, priority: 0.75 }));

  return [...FIXED, ...venues].map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
