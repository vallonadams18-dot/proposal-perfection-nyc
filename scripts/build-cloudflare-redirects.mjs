/**
 * Converts public/_redirects into a Cloudflare Bulk Redirects import file.
 *
 * GitHub Pages serves static files and nothing else -- it has no support for
 * a `_redirects` file, so the 301s from the old WordPress URLs have to live in
 * Cloudflare in front of it. This emits the CSV that Cloudflare's
 * Bulk Redirects importer expects:
 *
 *   Source URL,Target URL,Status,Parameters
 *
 * Every rule is a single hop to the canonical host. The script refuses to emit
 * a file containing a redirect chain (a target that is itself a source) or a
 * duplicated source, because either one is a loop waiting to happen.
 *
 *   node scripts/build-cloudflare-redirects.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { SITE_ORIGIN } from './canonical.mjs';

const SRC = path.join(process.cwd(), 'public', '_redirects');
const OUT = path.join(process.cwd(), 'docs', 'cloudflare-bulk-redirects.csv');

const lines = fs.readFileSync(SRC, 'utf8').split(/\r?\n/);
const rows = [];

for (const raw of lines) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  const [from, to, code = '301'] = line.split(/\s+/);
  if (!from || !to) continue;
  rows.push({
    source: SITE_ORIGIN + from,
    target: to.startsWith('http') ? to : SITE_ORIGIN + to,
    status: code,
  });
  // Cloudflare matches the literal URL, so a rule written with a trailing
  // slash will not catch the bare path (and vice versa). Emit both unless
  // the variant collides with the rule's own target.
  const variant = from.endsWith('/') && from !== '/' ? from.slice(0, -1) : from + '/';
  const variantUrl = SITE_ORIGIN + variant;
  const targetUrl = to.startsWith('http') ? to : SITE_ORIGIN + to;
  if (variant !== '/' && variantUrl !== targetUrl) {
    rows.push({ source: variantUrl, target: targetUrl, status: code });
  }
}

// de-duplicate on source, keeping the first rule that claimed it
const bySource = new Map();
const duplicates = [];
for (const r of rows) {
  if (bySource.has(r.source)) { duplicates.push(r.source); continue; }
  bySource.set(r.source, r);
}

const final = [...bySource.values()];
const sources = new Set(final.map((r) => r.source));
const chains = final.filter((r) => sources.has(r.target));

if (chains.length) {
  console.error('Redirect chains found -- a target is also a source:');
  for (const c of chains) console.error(`  ${c.source} -> ${c.target}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(
  OUT,
  ['Source URL,Target URL,Status,Parameters', ...final.map((r) => `${r.source},${r.target},${r.status},ignore`)].join('\n') + '\n',
);

console.log(`${final.length} redirect rules -> docs/cloudflare-bulk-redirects.csv`);
console.log(`canonical origin: ${SITE_ORIGIN}`);
if (duplicates.length) console.log(`(${duplicates.length} duplicate sources collapsed)`);
