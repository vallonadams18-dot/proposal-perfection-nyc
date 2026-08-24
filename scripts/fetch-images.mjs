/**
 * One-off asset migration: pulls the images the rebuilt site uses out of the
 * old WordPress media library and into ./public/img.
 *
 * Source filenames are kept only as a lookup key -- the local name is derived
 * from the product slug, so nothing on the new site is called
 * "…-san-francisco-bay-area.jpg" or "…-new-jersey.jpg" any more.
 *
 * Safe to re-run: existing files are skipped.
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'img');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts', 'image-manifest.json'), 'utf8'));

fs.mkdirSync(OUT, { recursive: true });

let done = 0, skipped = 0, failed = [];
const entries = Object.entries(manifest);

async function grab([localName, remoteUrl]) {
  const dest = path.join(OUT, localName);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) { skipped++; return; }
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(remoteUrl, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(45000) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 1024) throw new Error('suspiciously small (' + buf.length + ' bytes)');
      fs.writeFileSync(dest, buf);
      done++;
      return;
    } catch (err) {
      if (attempt === 3) failed.push({ localName, remoteUrl, error: String(err.message) });
    }
  }
}

const CONCURRENCY = 6;
let cursor = 0;
async function worker() {
  while (cursor < entries.length) {
    await grab(entries[cursor++]);
    process.stderr.write(`\r  ${done + skipped + failed.length}/${entries.length}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

process.stderr.write('\n');
console.log(`downloaded ${done}, already present ${skipped}, failed ${failed.length}`);
if (failed.length) {
  fs.writeFileSync(path.join(process.cwd(), 'scripts', 'image-failures.json'), JSON.stringify(failed, null, 2));
  for (const f of failed) console.log('  FAILED ' + f.localName + '  ' + f.error);
  process.exitCode = 1;
}
