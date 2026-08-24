# The Coverage Grid Playbook

The SEO strategy used on magicmirrorbrooklyn.com (44 → 172 URLs across three audit
rounds), generalized so it can be run on any local service site.

**The thesis:** beat a bigger competitor inside your own market by owning the
**service × location grid** — generate those pages from a data model instead of writing
them by hand, never ship a page without schema or an internal link, and benchmark depth
against the competitor's actual equivalent page rather than an abstract word target.

**Where it applies:** any business that sells a catalogue of things (booths, walls,
arches, packages) into a defined geography. The grid is the product catalogue crossed
with the service area.

---

## The build order

Run these in order. Each phase depends on the one before it.

### Phase 0 — Benchmark one real competitor

Not "SEO best practices." Pick the single strongest site actually ranking for your money
terms and audit it side by side with yours.

- Pull both `sitemap.xml` files (and sub-sitemaps). Inventory every URL by category.
  Check the site's own human-readable `/sitemap/` page too — competitors often have
  pages that never made it into the XML.
- Sample their pages for title, meta, H1, word count, schema, and click depth from home.
- Trace click depth by actually clicking, not by reading link lists.
- Output: a **top-10 action list ranked by traffic gain ÷ effort**, with exact specs
  (URL, title, meta, H1) — not "improve content."
- Write it to a dated file in the repo. Never overwrite it. Each later round gets its
  own file, so you can score what shipped.

*Why it matters:* on the Brooklyn site this is what surfaced the one structural gap
worth chasing — the competitor had ~90 service+location pages and we had zero — and it
killed the assumption that their content was thin. It wasn't; they beat us on word count
on 4 of 5 topics. Auditing produced a different plan than intuition would have.

### Phase 1 — Make pages data, not files

Before building a single new page, the catalogue and the service area must be data.

- `services[]` (or booths / walls / packages) and `locations[]` as JSON or TS.
- One template component per page type. Pages read from data; they are not hand-authored
  files.
- **Generate `sitemap.ts` from the same data.** This is the part people skip. If the
  sitemap is derived, a new page physically cannot be missing from it.

*Why it matters:* the competitor built 90+ pages that were excluded from their own
sitemap and sat 4 clicks deep. Deriving both routes and sitemap from one array makes
that failure impossible.

### Phase 2 — Build the coverage grid

The core play. `/{service}-{location}` for every combination worth having.

Tier it — full grid in core markets, partial in secondary, a beachhead in fringe ones:

| Market tier | Services covered | Brooklyn site's actual |
|---|---|---|
| Core | Full catalogue | Brooklyn, Manhattan, Queens, Jersey City — 19 each |
| Secondary | 6–8 best sellers | Williamsburg, DUMBO — 8 each |
| Beachhead | 3–5 highest intent | Bronx, Staten Island — 5 each; Long Island, Westchester, CT — 3 each |

**The content rule that makes it work, not spam:** reusable *structure* is fine;
reusable *prose* is not. Every page names real local detail — venues, streets, transit,
physical constraints:

> Bronx: "Riverdale estate lawns, Throggs Neck catering halls, Mott Haven lofts"
> DUMBO: "carried in over cobblestone streets, waterfront lofts and archway venues"
> Williamsburg: "Wythe and Kent Avenue rooftops, a loft freight elevator off Berry Street"

Physical specs may repeat verbatim (booth dimensions, power requirements — those are
facts). Marketing prose dressed as local color may not. Round 3 caught exactly one
duplicated sentence across 102 pages; that's the standard to hold.

**Go below the level your competitor stops at.** They covered 5 boroughs; we added
neighborhoods (Williamsburg, DUMBO, Park Slope, Bushwick, Greenpoint, Crown Heights,
Bay Ridge, Red Hook, Gowanus) and suburbs they don't serve at all. Uncontested ground is
cheaper to win than a head-to-head fight.

### Phase 3 — Schema on every page type

Wire JSON-LD into the templates once, and every generated page inherits it.

| Scope | Schema |
|---|---|
| Sitewide (root layout) | `LocalBusiness` + industry type, `WebSite` |
| Service / product pages | `Service`, `FAQPage`, `BreadcrumbList` |
| Location pages | `LocalBusiness` (areaServed), `FAQPage`, `HowTo`, `BreadcrumbList` |
| Combo pages | `Service`, `FAQPage`, `BreadcrumbList`, `Place`, `OfferCatalog` |
| Blog | `BlogPosting` on posts, `CollectionPage` + `Blog` on the index |
| Real published prices | `Offer` / `AggregateOffer` |

**One deliberate omission: no `AggregateRating` or `Review` markup.** Google treats a
business marking up its own review score as self-serving and can issue a manual action.
Show the rating in the UI; don't mark it up.

**Only mark up prices that actually exist.** If a client's rule is "no prices," there are
no `Offer` nodes. Inventing one is worse than omitting it.

### Phase 4 — Depth pass, benchmarked

Set targets from the competitor's equivalent page, not from a round number.

- Location pages: match or beat the competing page's word count. Brooklyn went ~950 →
  ~2,900.
- FAQs are the cheapest lever, because `FAQPage` schema is already wired: 7 → 11 on every
  service page, 15 on the most contested one.
- Kill thin pages: the pricing/quote page and the catalogue hub are always the thinnest
  and are always the ones with the highest commercial intent. `/photo-booths` went ~800
  → ~2,500 words with a real "which one fits your event" guide.

**Verify word counts with a rendered DOM check, not an estimate.** Collapsed FAQ
accordions inflate raw HTML counts; one round reported 7,600 words for a page that
actually had ~2,900.

### Phase 5 — Zero orphans

- Header and footer render the *complete* service, event and location lists on every
  page. Everything is one click from everywhere.
- Auto-linking grids ("neighborhoods we cover", "also serving") connect the deeper tiers.
- Audit for orphans on every round. `node scripts/audit-export.mjs` on the Brooklyn site
  checks broken links, missing images, duplicate titles and H1 counts before every ship.

### Phase 6 — A blog that actually answers

Top-of-funnel, and the only lever that scales past the grid.

- Target high-intent questions you can genuinely answer: cost, space requirements,
  insurance/COI, venue rules, how to choose.
- **Publish the real number.** The first version of the "how much does it cost" post
  refused to give a price and deferred to the quote form — which defeats the entire
  point of the post. It now leads with a real anchor ($899/3hrs) and works.
- Don't chase the competitor's post count. They have 65 and have shipped nothing since
  May 2026; we went 0 → 7. Velocity beats backlog.

### Phase 7 — Off-site, where the ceiling actually is

Code stops mattering at some point. On the Brooklyn site it already has.

- Google Business Profile — usually the single biggest local-intent lever once the site
  is mature.
- Yelp, and category directories (The Knot, WeddingWire, etc.).
- Search Console: verification, sitemap submission, Change of Address on a domain move,
  and **indexing checks on new URLs** — crawled ≠ indexed.
- Consistent NAP (name / address / phone) everywhere. This requires a real phone and
  email to exist.
- Instagram bio link.

---

## Working rules (the audit discipline)

These came out of things that actually went wrong. They're not optional.

1. **Verify, don't trust.** Any claim about page content, a URL, or a bug is a hypothesis
   until you grep the repo or fetch the live page. A client brief written by an AI that
   never saw the site will cite pages and bugs that don't exist.
2. **Raw `curl` / `grep` beats AI-summarized fetch** for anything that decides a
   conclusion — schema presence, FAQ counts, titles, HTTP status. Summarized fetches
   under-reported schema and miscounted FAQs repeatedly, in both directions.
3. **Space your requests.** A rapid-fire loop against a CDN-fronted static host returned
   false 404s for 9 live pages. A 0.3s delay returned 200 for all of them.
4. **Re-check the competitor every round.** In one window they fixed their sitemap
   exclusion *and* added FAQ/HowTo schema to exactly the 5 pages where they compete with
   us — and nowhere else. If you only audit yourself, you'll think the gap closed when
   it didn't.
5. **Check whether their expansion is real.** 8 of their "new metro" pages were 301
   redirects to a stub. Sitemap padding isn't a competitive threat.
6. **Confirm live before calling it done.** build → audit script → commit → push → poll
   the Actions run → curl the live URLs. A push is not a deploy.
7. **Don't pad the action list.** When the code-side work is genuinely exhausted, say so
   and point at the off-site items instead of manufacturing busywork.

---

## Applying it: Flower Walls New Jersey

Repo `flower-walls-new-jersey-` · local clone `C:\Users\va1ky\Downloads\flower-walls-new-jersey`

**Already compliant with the playbook:**

- Data model exists — `services.ts` (3), `locations.ts` (5), `walls.json` (53, 12 with
  detail pages), `booths.ts` (2), `events.ts` (7), `faqs.ts`.
- `sitemap.ts` is already derived from that data with a comment saying exactly why. Phase
  1 and Phase 5's sitemap half are done.
- `jsonld.tsx` has `businessJsonLd`, `websiteJsonLd`, `faqJsonLd`, `catalogJsonLd`,
  `breadcrumbJsonLd`.

**Gaps, in build order:**

| Phase | Gap | Spec |
|---|---|---|
| 0 | No competitor benchmark exists | Audit the strongest NJ flower-wall / backdrop rental site. The old WordPress site is *not* the competitor — it's the thing being replaced. |
| 2 | **Zero combo pages** — the whole core play is missing | `/flower-wall-rental-{town}`, `/photo-booth-rental-{town}`, `/wedding-flower-wall-{town}` |
| 2 | Only 5 locations, and one is a region | Expand toward: Hoboken, Jersey City, Newark, Montclair, Princeton, Morristown, Red Bank, Asbury Park, Edison, Cherry Hill, Bergen County. Tier them core / secondary / beachhead. |
| 3 | No `Service`, `HowTo`, `Place` or `OfferCatalog` schema | Add to `jsonld.tsx` and wire into the location and wall templates. |
| 4 | FAQ depth not benchmarked | Set the target from the competitor's page, not a guess. |
| 6 | No blog | "What size flower wall do I need", "flower wall vs balloon backdrop", "NJ venues that require a COI". |

**Hard constraint — respect it:** no prices anywhere on this site, and **no `Offer` nodes
in the JSON-LD**. `walls.json` carries a `price` field for 16 walls; nothing renders it,
and nothing should. Same for booking URLs: the 16 imported booths have no real per-booth
CheckCherry links yet, and inventing one is worse than the CTA staying generic.

**Do first:** Phase 0 benchmark, then the location expansion, then the combo grid. The
data model is already in the right shape, so the grid is mostly a template plus content.

---

## Applying it: Proposal Perfection NYC

Repo `proposal-perfection-nyc` · local clone `C:\Users\va1ky\Downloads\proposal-perfection-nyc`

**Current state:** 11 static routes, hand-listed in `sitemap.ts`. `catalog.ts` holds a
large `PRODUCTS[]` array (arches, hearts, marquee letters, cold sparks, uplighting,
petals, neon signs). `seo.ts` has `breadcrumbJsonLd`, `faqJsonLd` and an `ItemList`
collection helper. **No locations data at all. No `LocalBusiness` schema. No blog.**

This site is the furthest from the playbook and has the most headroom.

**The tailoring that matters: the location axis here is venues, not towns.** Nobody
searches "proposal setup Queens." They search *"Central Park proposal setup," "rooftop
proposal NYC," "Brooklyn Bridge Park proposal."* The grid should be
**setup type × venue/experience**, which is a different second axis than the other two
sites use:

- Venue axis: Central Park, Brooklyn Bridge Park / DUMBO, Top of the Rock, Hudson Yards,
  Gantry Plaza LIC, private rooftop, hotel suite, beach / Jersey Shore, at-home.
- Service axis: heart arch, round arch, marquee letters, candle-and-petal path, flower
  wall, photo booth, custom sign.

`/central-park-proposal-setup`, `/rooftop-proposal-nyc`, `/dumbo-proposal-photographer-backdrop`
and so on. Venue-intent queries are lower volume than "photo booth Brooklyn" but far
higher intent — someone searching a specific venue is booking, not browsing.

**Build order for this site:**

| # | Action |
|---|---|
| 1 | Fix the lead leak first — it outranks every SEO item. See the repo's `docs/link-map.md`; the finding was 46 of 257 booking buttons on the live WordPress site routing into three other companies' CheckCherry accounts, 21 of them mobile-only, which is exactly where Instagram bio traffic lands. |
| 2 | Phase 0 benchmark against NYC proposal-planning competitors. |
| 3 | Phase 1 — build `locations.ts` (venues) and promote `catalog.ts` into a proper service axis; derive `sitemap.ts` from both instead of the hand-listed `ROUTES` array. |
| 4 | Phase 3 — add `LocalBusiness`, `Service`, `HowTo`, `Place` to `seo.ts`. A proposal-planning site is a near-perfect `HowTo` candidate ("how a Central Park proposal setup works"). |
| 5 | Phase 2 — the venue × setup grid. |
| 6 | Phase 6 — blog: "best NYC proposal spots by season", "Central Park permit rules", "how far ahead to book". |

**The blocker to raise with the owner:** `CONTACT.phone`, `CONTACT.email` and `hours` are
all still `null` in `src/lib/site.ts` — deliberately, because the old site's only number
was The7 theme's demo placeholder. **Phase 7 cannot run without them.** Google Business
Profile, NAP consistency and directory listings all require a real phone and address, and
`LocalBusiness` schema is thin without them. Everything in Phases 0–6 can proceed
meanwhile; the local-search ceiling stays low until those exist.

Also still open from the rebuild: whether the owner owns the Atlanta / NJ / NYC Flower
Walls CheckCherry accounts, the exact event ids for Mi'Amor and Pink Blush, and what
"Printing Services" should book.

---

## The scoreboard

Score each round honestly against the previous round's action list — fully done /
partial / untouched. The Brooklyn site went 4-of-10 in round 2 and 8-of-10 in round 3.
Writing down what *didn't* ship is what makes the next round's list real.
