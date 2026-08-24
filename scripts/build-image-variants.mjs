/**
 * Turns the raw media-library downloads into the responsive WebP variants the
 * site actually ships.
 *
 * Static export means there is no image-optimization server, so every size a
 * srcset can ask for has to exist on disk before the build.
 *
 * Originals live in assets/originals/ -- deliberately OUTSIDE public/, so the
 * 63MB of source material is not copied into the deployed site. Variants are
 * written to public/img/opt/<basename>-<width>.webp. Sources are never
 * upscaled, so the widths available differ per image; the exact list plus the
 * intrinsic aspect ratio is recorded in src/data/images.json for
 * <ResponsiveImage> to build a truthful srcset and reserve layout space.
 *
 * Re-running only rebuilds variants missing or older than their source.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.join(process.cwd(), 'assets', 'originals');
const OUT = path.join(process.cwd(), 'public', 'img', 'opt');
const MANIFEST = path.join(process.cwd(), 'src', 'data', 'images.json');
const WIDTHS = [480, 960, 1600];
const QUALITY = 78;

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });

const sources = fs.readdirSync(SRC).filter(f => /\.(jpe?g|png|gif|webp)$/i.test(f));
const manifest = {};
let built = 0, fresh = 0;

for (const file of sources) {
  const src = path.join(SRC, file);
  const base = file.replace(/\.[^.]+$/, '');
  const srcStat = fs.statSync(src);
  const meta = await sharp(src).metadata();
  const native = meta.width || WIDTHS[WIDTHS.length - 1];

  // Every width we can serve without upscaling, plus the native width when it
  // falls between two steps so large sources are not needlessly downgraded.
  const widths = [...new Set([
    ...WIDTHS.filter(w => w <= native),
    ...(native < WIDTHS[0] ? [native] : []),
    ...(native < WIDTHS[WIDTHS.length - 1] ? [native] : []),
  ])].sort((a, b) => a - b);

  for (const w of widths) {
    const dest = path.join(OUT, `${base}-${w}.webp`);
    if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= srcStat.mtimeMs) { fresh++; continue; }
    await sharp(src).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(dest);
    built++;
  }

  manifest[base] = {
    widths,
    ratio: meta.width && meta.height ? +(meta.width / meta.height).toFixed(4) : 1,
  };
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));

const dirSize = d => fs.readdirSync(d).reduce((n, f) => {
  const p = path.join(d, f);
  return fs.statSync(p).isFile() ? n + fs.statSync(p).size : n;
}, 0);
const mb = n => (n / 1024 / 1024).toFixed(1) + ' MB';

console.log(`variants built ${built}, already current ${fresh}`);
console.log(`${sources.length} images  ${mb(dirSize(SRC))} originals  ->  ${mb(dirSize(OUT))} shipped`);
