import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Every route the site builds. Emitted as a static sitemap.xml by `output: "export"`. */
const ROUTES = [
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
  return ROUTES.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
