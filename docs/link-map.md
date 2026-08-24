# Link map

Every call to action on proposalperfectionnyc.com as it stood on **24 August 2026**, what it
pointed at, and where the rebuild points it instead.

The rule for the migration was: **keep the existing destination**. Anything already booking
into the Proposal Perfection CheckCherry account was carried across byte for byte. Only the
links that pointed somewhere else were changed, and every one of those changes is listed below.

## Summary

| | |
|---|---|
| Pages crawled | 12 |
| Buttons found | 257 |
| Unique destinations | 149 |
| Kept unchanged | 211 |
| **Had to change** | **46** |
| Products migrated | 151 |
| Images migrated | 138 |

## Why 46 links had to change

Every "Inquire Now" button on the old site opened a CheckCherry booking form. 46 of them
opened a CheckCherry account belonging to a **different company**. Each one worked perfectly —
it just delivered the lead to someone else.

| Destination account | Buttons | What it actually is |
|---|---:|---|
| `atlanta-flower-wall-rentals.checkcherry.com` | 39 | "Flower Wall Rentals" (Atlanta) |
| `new-jersey-flower-wall-photo-booth-rentals.checkcherry.com` | 4 | "New Jersey Flower Wall & Photo booth Rentals" |
| `nyc-flower-walls-rental.checkcherry.com` | 2 | "NYC FLOWER WALLS RENTAL" |
| *(malformed)* | 1 | an embed snippet pasted into the `href` — a dead button |

21 of the 46 were **mobile-only** buttons. The theme renders a separate CTA for small screens,
and on five pages that mobile button went to Atlanta while the desktop one was correct — so the
fault was invisible on a desktop and only fired on phones, which is where the Instagram
link-in-bio traffic lands.

## The Proposal Perfection booking taxonomy

Read off the live account and used for every remap. Each was requested and confirmed to
return a page titled `... | PROPOSAL PERFECTION NYC`.

| Id | Contains |
|---|---|
| `event_category_id=14078` | top level — Flower Walls / Arches / Proposals / Event Rentals |
| `event_category_id=18117` | Custom Signs Service |
| `event_category_id=18118` | Event Branding & Event Rentals |
| `event_category_id=18120` | Photo Booth Experience |
| `event_category_id=18124` | Flower Walls |
| `package_group_id=35224` | square & rounded flower archways |
| `package_group_id=35225` | heart flower archways |
| `contact/11423` | general inquiry form |

## Every changed link

| Old page | Card | Shown on | Old destination | New destination | Why |
|---|---|---|---|---|---|
| `/` | Custom Marriage Proposal Services New York: | desktop only | `nyc-flower-walls-rental` | inquiry form | off-brand account with no event id to preserve |
| `/` | Ready to Pop The Big Question? | all | `atlanta-flower-wall-rentals` `package_group_id=32605` | inquiry form | Atlanta event-rental package → PPNYC Event Branding & Event Rentals |
| `/add-ons/` | Make your Event Shine With Our Event Rentals! | all | *(malformed href)* | inquiry form | button was dead; an embed snippet had been pasted into the href |
| `/corporate-events-3/` | Magically Booth | all | `new-jersey-flower-wall-photo-booth-rentals` `event_category_id=18120` | `event_category_id=18120` | identical category id exists in the PPNYC account |
| `/corporate-events-3/` | Connect with Us | all | `new-jersey-flower-wall-photo-booth-rentals` `event_category_id=18120` | `event_category_id=18120` | identical category id exists in the PPNYC account |
| `/customsigns/` | Flower Wall Rentals | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-walls/ | category teaser — now links to the internal category page |
| `/customsigns/` | Printing Services | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | CheckCherry inquiry form (no matching event exists) | no matching event in the PPNYC account |
| `/customsigns/` | Photo Booth Rentals | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /photo-booth-rentals/ | category teaser — now links to the internal category page |
| `/customsigns/` | Custom Signs | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /custom-signs/ | category teaser — now links to the internal category page |
| `/customsigns/` | Flower Arches | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/customsigns/` | Flower Arches | desktop only | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/event-rental-new-york/` | (no heading) | all | `atlanta-flower-wall-rentals` `package_group_id=32605` | `event_category_id=18118` | Atlanta event-rental package → PPNYC Event Branding & Event Rentals |
| `/event-rental-new-york/` | Our add-on services will complete your flower  | all | `atlanta-flower-wall-rentals` `package_group_id=32605` | `event_category_id=18118` | Atlanta event-rental package → PPNYC Event Branding & Event Rentals |
| `/event-rental-new-york/` | Flower Arches | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/flower-arch-new-york/` | Snowflake | all | `atlanta-flower-wall-rentals` `event_type_id=113035` | `event_type_id=123071` | the same "Snow Flake" arch exists in the PPNYC account |
| `/flower-arch-new-york/` | Mi'Amor | all | `atlanta-flower-wall-rentals` `event_type_id=113046` | `package_group_id=35224` | **needs confirming** — no PPNYC event id found for Mi'Amor |
| `/flower-arch-new-york/` | Our add-on services will complete your flower  | all | `atlanta-flower-wall-rentals` `package_group_id=32605` | `event_category_id=18118` | Atlanta event-rental package → PPNYC Event Branding & Event Rentals |
| `/flower-arch-new-york/` | Flower Wall Rentals | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-walls/ | category teaser — now links to the internal category page |
| `/flower-arch-new-york/` | Printing Services | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | CheckCherry inquiry form (no matching event exists) | no matching event in the PPNYC account |
| `/flower-arch-new-york/` | Photo Booth Rentals | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /photo-booth-rentals/ | category teaser — now links to the internal category page |
| `/flower-arch-new-york/` | Custom Signs | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /custom-signs/ | category teaser — now links to the internal category page |
| `/flower-arch-new-york/` | Flower Arches | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/flower-arch-new-york/` | Flower Arches | desktop only | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/flower-arch-new-york/` | Flower Arches | desktop only | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/flower-arch-new-york/` | Event Rentals NYC | all | `atlanta-flower-wall-rentals` `package_group_id=32605` | `event_category_id=18118` | Atlanta event-rental package → PPNYC Event Branding & Event Rentals |
| `/flower-walls-4/` | Pink Blush | all | `new-jersey-flower-wall-photo-booth-rentals` `event_type_id=61435` | `event_category_id=18124` | **needs confirming** — Pink Blush exists in PPNYC Flower Walls, exact id unknown |
| `/flower-walls-4/` | Pink Arcadia | all | `new-jersey-flower-wall-photo-booth-rentals` `event_type_id=61435` | `event_category_id=18124` | **needs confirming** — Pink Blush exists in PPNYC Flower Walls, exact id unknown |
| `/nyc-flower-wall-rentals-2/` | About Proposal Perfection | all | `nyc-flower-walls-rental` | inquiry form | off-brand account with no event id to preserve |
| `/nyc-flower-wall-rentals-2/` | Flower Wall Rentals | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-walls/ | category teaser — now links to the internal category page |
| `/nyc-flower-wall-rentals-2/` | Printing Services | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | CheckCherry inquiry form (no matching event exists) | no matching event in the PPNYC account |
| `/nyc-flower-wall-rentals-2/` | Photo Booth Rentals | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /photo-booth-rentals/ | category teaser — now links to the internal category page |
| `/nyc-flower-wall-rentals-2/` | Custom Signs | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /custom-signs/ | category teaser — now links to the internal category page |
| `/nyc-flower-wall-rentals-2/` | Flower Arches | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/nyc-flower-wall-rentals-2/` | Flower Arches | desktop only | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/nyc-flower-wall-rentals-2/` | Flower Arches | desktop only | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/nyc-flower-wall-rentals-2/` | Flower Arches | desktop only | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/nyc-flower-wall-rentals-2/` | Flower Arches | desktop only | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/nyc-flower-wall-rentals-2/` | Flower Arches | desktop only | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/nyc-flower-wall-rentals-2/` | Event Rentals NYC | all | `atlanta-flower-wall-rentals` `package_group_id=32605` | `event_category_id=18118` | Atlanta event-rental package → PPNYC Event Branding & Event Rentals |
| `/proposals/` | Our add-on services will complete your flower  | all | `atlanta-flower-wall-rentals` `package_group_id=32605` | `event_category_id=18118` | Atlanta event-rental package → PPNYC Event Branding & Event Rentals |
| `/proposals/` | Flower Wall Rentals | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-walls/ | category teaser — now links to the internal category page |
| `/proposals/` | Printing Services | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | CheckCherry inquiry form (no matching event exists) | no matching event in the PPNYC account |
| `/proposals/` | Photo Booth Rentals | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /photo-booth-rentals/ | category teaser — now links to the internal category page |
| `/proposals/` | Custom Signs | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /custom-signs/ | category teaser — now links to the internal category page |
| `/proposals/` | Flower Arches | **mobile only** | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |
| `/proposals/` | Flower Arches | desktop only | `atlanta-flower-wall-rentals` `event_type_id=70211` | /flower-arch-new-york/ | category teaser — now links to the internal category page |

## URL changes

Nine of the twelve slugs were kept. The redirects are in `public/_redirects`.

| Old URL | New URL | |
|---|---|---|
| `/` | `/` | kept |
| `/proposals/` | `/proposals/` | kept |
| `/flower-arch-new-york/` | `/flower-arch-new-york/` | kept |
| `/flower-walls-4/` | `/flower-walls/` | **301** |
| `/event-rental-new-york/` | `/event-rental-new-york/` | kept |
| `/add-ons/` | `/add-ons/` | kept |
| `/customsigns/` | `/custom-signs/` | **301** |
| `/photo-booths-rentals/` | `/photo-booth-rentals/` | **301** |
| `/corporate-events-3/` | `/corporate-events/` | **301** |
| `/nyc-flower-wall-rentals-2/` | `/about/` | **301** |
| `/contact/` | `/contact/` | kept |
| `/blog/` | `(removed)` | **301** |
| `/flower-wall-rentals-nj/` | `/` | **301** (already redirected on WordPress) |

## Still open

Four things were decided by default because there was no way to check them. All four are
one-line changes — the booking destinations all live in `src/lib/booking.ts` and
`src/data/catalog.ts`.

1. **Do you own the Atlanta / New Jersey / NYC Flower Walls CheckCherry accounts?** The rebuild
   assumes proposal leads should never go to them and links nowhere off-brand.
2. **Mi'Amor** and **Pink Blush / Pink Arcadia** were remapped to their category rather than a
   specific event, because no matching PPNYC event id could be found. Give me the ids and they
   become exact.
3. **Printing Services** has no page and no PPNYC event. It currently points at the inquiry form.
4. **Phone number and email address.** Neither exists anywhere on the old site — the only number
   on it, `011 322 44 56`, is the The7 theme demo placeholder. They are `null` in
   `src/lib/site.ts` and the UI hides those rows until they are filled in.

## Content that was not migrated

| What | Why |
|---|---|
| 12 blog posts | All lorem ipsum, authored "by admin", dated April 2020 |
| `011 322 44 56` | The7 theme demo phone number, published on all 12 pages |
| "Hey! I am first heading line feel free to change me" | Unedited theme placeholder on `/add-ons/` |
| South Jersey / NJ / Atlanta / Bay Area copy | Other brands' names in the body text of six pages |
| 13 product descriptions | Described a different product than the card they sat on (a spark machine sold as a flower wall). Rewritten from the product photograph. |
| X and YouTube links | Both pointed at `/` |
| WooCommerce cart & checkout | Installed with zero products |
