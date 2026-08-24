/**
 * Generates a 1200x630 Open Graph image per page, into public/img/og/.
 *
 * The old site had none, so every share on Instagram, Facebook, WhatsApp or
 * iMessage rendered as a bare grey link. For a business whose main channel is
 * an Instagram link in bio, that is the single most-seen image it has.
 *
 * Each one is the page's own photograph, cropped to 1200x630 with attention
 * bias (so sharp keeps the subject rather than the centre of the frame), a
 * bottom gradient scrim, and the wordmark. Text is drawn as an SVG overlay in
 * Georgia -- a system serif everywhere this runs -- because the brand face is
 * a webfont and is not installed for librsvg.
 *
 * Incremental by mtime. Runs from `prebuild`.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

sharp.cache(false);

const SRC = path.join(process.cwd(), 'assets', 'originals');
const OUT = path.join(process.cwd(), 'public', 'img', 'og');
const W = 1200, H = 630;

fs.mkdirSync(OUT, { recursive: true });

/** page slug -> source image basename in assets/originals */
const PAGES = {
  'default':               'gallery-06',
  'proposals':             'gallery-03',
  'flower-arch-new-york':  'gallery-09',
  'flower-walls':          'gallery-11',
  'event-rental-new-york': 'gallery-01',
  'add-ons':               'gallery-04',
  'custom-signs':          'gallery-03',
  'photo-booth-rentals':   'gallery-08',
  'corporate-events':      'gallery-01',
  'about':                 'gallery-12',
  'contact':               'gallery-11',
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const overlay = (label) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="45%" stop-color="#241C18" stop-opacity="0"/>
      <stop offset="100%" stop-color="#241C18" stop-opacity="0.88"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <text x="64" y="${H - 92}" font-family="Georgia,'Times New Roman',serif" font-size="60"
        fill="#F8F5F0">Proposal Perfection</text>
  <text x="64" y="${H - 50}" font-family="Georgia,'Times New Roman',serif" font-size="21"
        letter-spacing="6" fill="#D8C3A5">NEW YORK CITY</text>
  <text x="${W - 64}" y="${H - 50}" text-anchor="end"
        font-family="Georgia,'Times New Roman',serif" font-size="21" letter-spacing="2"
        fill="#B98C88">${esc(label)}</text>
</svg>`);

const LABELS = {
  'default': 'Marriage proposal design',
  'proposals': 'Proposal setups',
  'flower-arch-new-york': 'Flower arches',
  'flower-walls': 'Flower walls',
  'event-rental-new-york': 'Event rentals',
  'add-ons': 'Enhancements',
  'custom-signs': 'Custom signs',
  'photo-booth-rentals': 'Photo booths',
  'corporate-events': 'Corporate events',
  'about': 'About us',
  'contact': 'Get in touch',
};

const resolveSource = (base) => {
  for (const ext of ['.jpg', '.jpeg', '.png', '.webp']) {
    const p = path.join(SRC, base + ext);
    if (fs.existsSync(p)) return p;
  }
  return null;
};

let made = 0, current = 0, missing = [];

for (const [slug, base] of Object.entries(PAGES)) {
  const source = resolveSource(base);
  if (!source) { missing.push(`${slug} (no source for "${base}")`); continue; }

  const dest = path.join(OUT, `${slug}.jpg`);
  if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(source).mtimeMs) { current++; continue; }

  await sharp(source)
    .resize(W, H, { fit: 'cover', position: sharp.strategy.attention })
    .composite([{ input: overlay(LABELS[slug] ?? ''), top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(dest);
  made++;
}

console.log(`og images: ${made} built, ${current} already current -> public/img/og/`);
if (missing.length) {
  console.error('missing sources:');
  for (const m of missing) console.error('  ' + m);
  process.exit(1);
}
