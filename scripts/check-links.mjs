/**
 * Full link check over the exported site.
 *
 * Three things it will not let through:
 *   1. a booking link pointing at any CheckCherry account that is not ours
 *      (the old site had 46 of these, sending real leads to three other
 *      companies -- see docs/link-map.md),
 *   2. an internal link with no corresponding page in ./out,
 *   3. an href that is not a usable URL at all (the old /add-ons/ button had
 *      an entire embed snippet pasted into it).
 *
 * Pass --remote to additionally request every external destination and confirm
 * it still resolves and still belongs to Proposal Perfection.
 *
 *   node scripts/check-links.mjs
 *   node scripts/check-links.mjs --remote
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');
// Staging builds are served from <user>.github.io/<repo>/, so every internal
// href carries that prefix while the files on disk do not. Strip it before
// resolving, or every link looks broken. Empty for production builds.
let BASE = process.env.PAGES_BASE_PATH ?? '';
while (BASE.endsWith('/')) BASE = BASE.slice(0, -1);
const OURS = 'proposal-perfection-nyc.checkcherry.com';
const REMOTE = process.argv.includes('--remote');

if (!fs.existsSync(OUT)) {
  console.error('No ./out directory. Run `npm run build` first.');
  process.exit(1);
}

/* ---------- collect every html file and every route it produced ---------- */
const htmlFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
})(OUT);

const routes = new Set(
  htmlFiles.map((f) => {
    const rel = path.relative(OUT, f).split(path.sep).join('/');
    return '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
  }),
);

/* ---------- pull every href ---------- */
const links = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const page = '/' + path.relative(OUT, file).split(path.sep).join('/').replace(/index\.html$/, '');
  for (const m of html.matchAll(/<a\b[^>]*?href="([^"]*)"[^>]*>/gi)) {
    links.push({ page, href: m[1] });
  }
}

const problems = [];
const external = new Map();

for (const { page, href } of links) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;

  if (/^https?:\/\//i.test(href)) {
    let url;
    try { url = new URL(href); }
    catch { problems.push({ page, href, why: 'not a parseable URL' }); continue; }

    if (url.hostname.endsWith('checkcherry.com') && url.hostname !== OURS) {
      problems.push({ page, href, why: `books into a FOREIGN CheckCherry account (${url.hostname})` });
      continue;
    }
    if (!external.has(href)) external.set(href, page);
    continue;
  }

  if (href.startsWith('/')) {
    const withBase = href.split('#')[0].split('?')[0];
    const clean =
      BASE && (withBase === BASE || withBase.startsWith(BASE + '/'))
        ? withBase.slice(BASE.length) || '/'
        : withBase;
    const candidate = clean.endsWith('/') ? clean : clean + '/';
    // static assets live on disk rather than in the route table
    const asset = path.join(OUT, clean);
    if (routes.has(candidate) || fs.existsSync(asset)) continue;
    problems.push({ page, href, why: 'internal link has no matching page or file in ./out' });
    continue;
  }

  problems.push({ page, href, why: 'relative or malformed href' });
}

/* ---------- report ---------- */
const uniquePages = new Set(links.map((l) => l.page));
console.log(`checked ${links.length} links across ${uniquePages.size} pages (${routes.size} routes built)`);
console.log(`  internal: ${links.filter((l) => l.href.startsWith('/')).length}`);
console.log(`  external: ${external.size} unique destinations`);

/**
 * Hosts that answer every automated request with an error whether or not the
 * page exists -- facebook.com returns HTTP 400 even for facebook.com/meta.
 * Reported as unverified rather than failed: calling them broken would be
 * wrong, and skipping them silently would hide a genuinely dead profile link.
 */
const BOT_BLOCKED = ['facebook.com', 'instagram.com'];
const unverified = [];

if (REMOTE) {
  console.log('\nverifying external destinations...');
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
  const entries = [...external.entries()];
  let i = 0;
  async function worker() {
    while (i < entries.length) {
      const [href, page] = entries[i++];
      const host = new URL(href).hostname.replace(/^www\./, '');
      const blocked = BOT_BLOCKED.includes(host);
      try {
        const r = await fetch(href, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(40000) });
        const body = await r.text();
        if (!r.ok) {
          (blocked ? unverified : problems).push({
            page, href,
            why: blocked ? `HTTP ${r.status} — ${host} blocks automated requests, confirm by hand` : `HTTP ${r.status}`,
          });
          continue;
        }
        if (href.includes('checkcherry.com') && !/PROPOSAL PERFECTION NYC/i.test(body)) {
          problems.push({ page, href, why: 'CheckCherry page did not identify as Proposal Perfection NYC' });
        }
      } catch (err) {
        (blocked ? unverified : problems).push({
          page, href,
          why: blocked ? `blocked by ${host}, confirm by hand` : `request failed: ${String(err.message).slice(0, 60)}`,
        });
      }
      process.stderr.write(`\r  ${i}/${entries.length}`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  process.stderr.write('\n');
}

if (unverified.length) {
  console.log(`\n${unverified.length} link(s) could not be checked automatically:`);
  for (const u of unverified) console.log(`  ${u.href}\n     -> ${u.why}`);
}

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log(`  ${p.page}\n     ${p.href}\n     -> ${p.why}`);
  process.exit(1);
}

console.log('\nno broken links, no foreign booking accounts.');
