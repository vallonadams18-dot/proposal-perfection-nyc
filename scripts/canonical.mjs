/**
 * The one place the canonical origin is defined for build scripts.
 *
 * `www` rather than the apex, matching magicmirrorbrooklyn.com. It also keeps
 * DNS simple: an apex domain cannot take a CNAME record, so pointing the apex
 * at GitHub Pages means hard-coding their four A records and re-doing it if
 * those ever change. A CNAME on www does not have that problem.
 *
 * To switch to the apex: change this, change SITE.url in src/lib/site.ts,
 * change public/CNAME, and re-run `npm run redirects:build`.
 */
export const SITE_ORIGIN = 'https://www.proposalperfectionnyc.com';
