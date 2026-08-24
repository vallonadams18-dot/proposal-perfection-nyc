import fs from 'fs';

const ROOT = process.cwd();
const HERE = ROOT + '/scripts/catalog';
const catalog = JSON.parse(fs.readFileSync(HERE + '/catalog.source.json', 'utf8'));
const written = JSON.parse(fs.readFileSync(HERE + '/descriptions.json', 'utf8'));

// tidy the descriptions carried over from the old site
const clean = s => s
  .replace(/\s+/g, ' ')
  .replace(/^\s*[-–—]\s*/, '')
  .replace(/\bflower wall rentals?\b/gi, m => m)
  .trim();

let missing = [];
for (const p of catalog) {
  if (written[p.slug]) p.description = written[p.slug];
  else if (p.description) p.description = clean(p.description);
  else missing.push(p.slug + ' (' + p.name + ')');
}
if (missing.length) {
  console.log('STILL MISSING COPY (' + missing.length + '):');
  missing.forEach(m => console.log('   ' + m));
}

/* ---------------------------------------------------------------------------
   Cross-name check.

   The old site pasted descriptions between products constantly, so a card
   could describe something else entirely -- "Abigail" sold as a "viceroy
   flower wall", a spark machine sold as a flower wall. Eyeballing 151 cards
   does not catch that reliably, so: flag any description that names a
   DIFFERENT product in the catalogue, or that two different products share.
--------------------------------------------------------------------------- */
const names = [...new Set(catalog.map(p => p.name))]
  .filter(n => n.length > 3 && !/^\d/.test(n))          // skip "2 Hearts" etc, too generic
  .sort((a, b) => b.length - a.length);

/* Phrases that are ordinary English here and happen to collide with a product
   name -- "finished with floral accents" is a description, not a cross-sell. */
const INNOCENT = ['floral accents', 'paradise', 'custom packages'];

const suspect = [];
for (const p of catalog) {
  if (!p.description) continue;
  const d = p.description.toLowerCase();
  const own = p.name.toLowerCase();
  for (const other of names) {
    const o = other.toLowerCase();
    if (o === own) continue;
    if (INNOCENT.includes(o)) continue;
    // a shorter product name contained in this one ("Infinity" inside
    // "Infinity 360") is the product referring to itself
    if (own.includes(o) || o.includes(own)) continue;
    if (!new RegExp(`\\b${o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(d)) continue;
    // the product's own full trade name may legitimately contain another
    // product's name ("Salsa Digital Booth" on the Salsa Booth card)
    const ownWords = own.split(/\s+/);
    if (o.split(/\s+/).some((w) => ownWords.includes(w))) continue;
    suspect.push({ slug: p.slug, name: p.name, mentions: other });
    break;
  }
}
const shared = {};
for (const p of catalog) if (p.description) (shared[p.description] ||= new Set()).add(p.name);
const dupDesc = Object.entries(shared).filter(([, s]) => s.size > 1);

if (suspect.length || dupDesc.length) {
  console.log('\nCOPY PROBLEMS TO FIX:');
  suspect.forEach(s => console.log(`  "${s.name}" description talks about "${s.mentions}"  [${s.slug}]`));
  dupDesc.forEach(([, s]) => console.log(`  same description on: ${[...s].join(' / ')}`));
} else {
  console.log('\ncopy check: no description names another product, no duplicates');
}

// page -> collection membership
const PAGE_TO_ROUTE = {
  '_home': 'home',
  'proposals': 'proposals',
  'flower-arch-new-york': 'arches',
  'flower-walls-4': 'flower-walls',
  'event-rental-new-york': 'event-rentals',
  'customsigns': 'signs',
  'photo-booths-rentals': 'photo-booths',
  'corporate-events-3': 'corporate',
  'add-ons': 'add-ons',
  'nyc-flower-wall-rentals-2': 'about',
};

const esc = s => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const lines = catalog
  .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
  .map(p => {
    const collections = [...new Set(p.pages.map(x => PAGE_TO_ROUTE[x]).filter(Boolean))];
    const img = p.localImage.replace(/\.[^.]+$/, '');
    return `  {
    slug: "${esc(p.slug)}",
    name: "${esc(p.name)}",
    description: "${esc(p.description)}",
    image: "${esc(img)}",
    category: "${esc(p.category)}",
    collections: [${collections.map(c => `"${c}"`).join(', ')}],
    bookingUrl: "${esc(p.bookingUrl)}",${p.remapped ? `
    // remapped: originally ${p.originalUrl}` : ''}
  },`;
  });

const ts = `/**
 * Product catalogue, migrated from proposalperfectionnyc.com on 24 Aug 2026.
 *
 * \`bookingUrl\` is the destination the equivalent card pointed at on the old
 * site. Those were preserved verbatim wherever they already pointed into the
 * Proposal Perfection CheckCherry account. The handful marked \`remapped\`
 * pointed at a different company's booking account and could not be kept --
 * see docs/link-map.md for what each one was and why it changed.
 *
 * Some products appear more than once with different booking ids: the old site
 * booked, say, an arch as a proposal package on /proposals/ and as a rental on
 * /flower-arch-new-york/. That distinction is deliberate and is preserved via
 * \`collections\`.
 *
 * Generated file -- edit the source data, not this.
 */

export type Collection =
  | "home" | "proposals" | "arches" | "flower-walls" | "event-rentals"
  | "signs" | "photo-booths" | "corporate" | "add-ons" | "about";

export type Product = {
  slug: string;
  name: string;
  description: string;
  /** basename in /public/img/opt -- widths come from images.json */
  image: string;
  category: string;
  collections: Collection[];
  bookingUrl: string;
};

export const PRODUCTS: Product[] = [
${lines.join('\n')}
];

export const byCollection = (c: Collection): Product[] =>
  PRODUCTS.filter((p) => p.collections.includes(c));

export const byCategory = (c: string): Product[] =>
  PRODUCTS.filter((p) => p.category === c);
`;

fs.mkdirSync(ROOT + '/src/data', { recursive: true });
fs.writeFileSync(ROOT + '/src/data/catalog.ts', ts);

const cols = {};
for (const p of catalog) {
  const routes = new Set(p.pages.map((page) => PAGE_TO_ROUTE[page]).filter(Boolean));
  for (const route of routes) cols[route] = (cols[route] ?? 0) + 1;
}
console.log('\nemitted', catalog.length, 'products');
console.log('collection sizes:', JSON.stringify(cols, null, 1));
