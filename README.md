# Proposal Perfection NYC

Rebuild of [proposalperfectionnyc.com](https://proposalperfectionnyc.com), migrated off WordPress
(The7 + WPBakery + WooCommerce) to a statically exported Next.js site.

Every product, image and booking destination was taken from the live site on **24 August 2026**.
What changed, and why, is in [`docs/link-map.md`](docs/link-map.md).

## The important part: booking links

Each experience card opens the same CheckCherry booking form the equivalent card opened on the old
site. Those were preserved exactly.

The exception is 46 buttons that pointed at CheckCherry accounts belonging to **three other
companies** — Atlanta, New Jersey and NYC Flower Walls. They all worked; they just delivered the
lead to someone else's inbox. 21 of them were mobile-only, so the fault never showed on a desktop.
Every one is listed in the link map with its replacement and the reasoning.

`npm run links:check` fails the build if a foreign booking host ever reappears.

## Commands

```bash
npm run dev                      # dev server
npm run build                    # static export to ./out
npm run links:check              # broken links + foreign booking accounts
npm run links:check -- --remote  # also request every external destination
```

Asset pipeline, run when the catalogue changes:

```bash
node scripts/fetch-images.mjs           # pull originals from the old media library
node scripts/build-image-variants.mjs   # responsive WebP + src/data/images.json
```

## Layout

```
src/
  app/           one directory per route, all statically exported
  components/    Header, Footer, ExperienceCard, CollectionPage, Sections
  data/
    catalog.ts   151 products — generated, includes each booking destination
    images.json  available widths + aspect ratio per image — generated
  lib/
    booking.ts   every CheckCherry destination, in one file
    site.ts      brand constants, contact details, nav
    products.ts  collection / category / dedupe helpers
public/
  img/           originals pulled from WordPress
  img/opt/       responsive WebP variants that actually ship
  _redirects     301s from the old WordPress URLs
docs/
  link-map.md         what every button pointed at, before and after
  link-map.csv        all 257 original CTAs
  product-catalog.csv all 188 original product cards
```

## Things that need a human

Listed in full at the end of `docs/link-map.md`. The short version:

1. **Phone number and email** are `null` in `src/lib/site.ts`. The old site had neither — its only
   number, `011 322 44 56`, is the The7 demo placeholder. The header, footer and contact page hide
   those rows until real values are set, so nothing false ships.
2. **No testimonials.** The old site had none, so none were written. The homepage has no
   testimonial section rather than a fabricated one.
3. **Two remaps need confirming** — Mi'Amor, and Pink Blush / Pink Arcadia — where no matching
   Proposal Perfection event id could be found and the category page is used instead.
4. **The Facebook URL could not be verified.** Facebook answers every automated request with HTTP
   400, including for pages that exist. Instagram was confirmed live.

## Notes on the source material

- 8 product photographs are under 600px wide and will look soft in a large card:
  `digital-booth`, `fog-machine`, `infinity-360`, `magically-booth-2`,
  `mirror-x-infinity-photo-booth`, `ruby-red`, `salsa-booth`, `table-signs`. Reshoots would help.
- The brand's own proposal photography is 700px wide, which is why the homepage hero is a split
  layout rather than a full-bleed image — at full width it would visibly soften.
- Several products share a display name (five different arches are all called "Infinity", three are
  "Cloud 9"). Names were kept as-is per the brief and slugs are disambiguated, so all of them still
  appear — grids dedupe on name *and* photograph rather than name alone, otherwise four real arches
  and a flower wall would silently vanish from the site. Renaming them at source would be better.
- Some products appear twice with different booking ids because the old site booked them as a
  proposal package on `/proposals/` and as a rental on the category page. That distinction is
  deliberate and preserved via `collections` in the catalogue.
