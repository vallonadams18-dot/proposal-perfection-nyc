/**
 * Generates redirect pages for the old WordPress URLs, into ./out after the
 * static export.
 *
 * GitHub Pages serves files and nothing else: no redirect rules, no _redirects
 * file, no status codes other than 200 and 404. So every legacy URL that is
 * not given a real file simply 404s, and the search ranking attached to it is
 * lost.
 *
 * The standard workaround is a stub page at each old path carrying:
 *   - <link rel="canonical"> to the new URL, which is what actually transfers
 *     ranking signal,
 *   - <meta name="robots" content="noindex"> so the stub itself never ranks,
 *   - <meta http-equiv="refresh" content="0; url=..."> to move the visitor,
 *   - a real, clickable link as the no-JS / no-refresh fallback.
 *
 * Google treats a zero-delay meta refresh as a redirect and honours the
 * canonical. It is weaker than a true 301 — which is why public/_redirects and
 * the Cloudflare bulk-redirect CSV still exist and should be used if anything
 * ever sits in front of Pages — but it works with no infrastructure at all.
 *
 * Reads the same public/_redirects file so there is one source of truth.
 */
import fs from 'node:fs';
import path from 'node:path';
import { SITE_ORIGIN } from './canonical.mjs';

const OUT = path.join(process.cwd(), 'out');
const SRC = path.join(process.cwd(), 'public', '_redirects');

if (!fs.existsSync(OUT)) {
  console.error('No ./out — run `next build` first.');
  process.exit(1);
}

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stub = (target) => {
  const abs = target.startsWith('http') ? target : SITE_ORIGIN + target;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="${escape(abs)}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${escape(abs)}">
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f8f5f0;color:#241c18;
font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;padding:2rem}
a{color:#b98c88}
</style>
</head>
<body>
<p>This page has moved. <a href="${escape(abs)}">Continue to Proposal Perfection NYC</a>.</p>
<script>window.location.replace(${JSON.stringify(abs)});</script>
</body>
</html>
`;
};

const written = [];
const duplicates = [];   // second rule resolving to a path this script already wrote
const collisions = [];   // rule pointing at a path the real site occupies -- a stale rule
const writtenPaths = new Set();

for (const raw of fs.readFileSync(SRC, 'utf8').split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  const [from, to] = line.split(/\s+/);
  if (!from || !to || !from.startsWith('/')) continue;

  // Directory form so the URL works with and without a trailing slash.
  const dir = path.join(OUT, from.replace(/^\/+|\/+$/g, ''));
  const file = path.join(dir, 'index.html');

  // `_redirects` lists both /foo and /foo/ so Cloudflare matches either; both
  // resolve to the same file here, so the second is simply a no-op.
  if (writtenPaths.has(file)) { duplicates.push(from); continue; }

  // Never clobber a real page. If the *export* produced something here, the
  // redirect rule is stale and would take a live page offline.
  if (fs.existsSync(file)) { collisions.push({ from, to }); continue; }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, stub(to));
  writtenPaths.add(file);
  written.push(from);
}

console.log(`redirect stubs: ${written.length} written into ./out`);
if (duplicates.length) {
  console.log(`  ${duplicates.length} slash-variants collapsed onto stubs already written`);
}
if (collisions.length) {
  console.error(`\n${collisions.length} STALE REDIRECT RULE(S) -- these paths are real pages on the new site:`);
  for (const c of collisions) console.error(`  ${c.from} -> ${c.to}`);
  console.error('Remove them from public/_redirects; as written they would hide a live page.');
  process.exit(1);
}
