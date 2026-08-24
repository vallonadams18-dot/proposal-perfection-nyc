# Going live

Hosting mirrors magicmirrorbrooklyn.com: **GitHub Pages** serves the static
export, **Cloudflare** sits in front and handles the 301s from the old
WordPress URLs (GitHub Pages cannot do redirects on its own).

Canonical origin is `https://www.proposalperfectionnyc.com`. It is set in two
places that must agree — `scripts/canonical.mjs` and `SITE.url` in
`src/lib/site.ts`.

---

## Before anything: do not delete the WordPress site

Leave the current WordPress install running and paid up until the new site has
been live and taking inquiries for a couple of weeks. It is the only copy of
the original content and images outside this repo, and it is the rollback.

---

## Stage 1 — get it onto a URL you can click (nothing public changes)

1. Create an empty GitHub repo, e.g. `vallonadams18-dot/proposal-perfection-nyc`.
   Do not add a README, licence or .gitignore — this repo already has them.

2. Push:

   ```bash
   git remote add origin https://github.com/vallonadams18-dot/proposal-perfection-nyc.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

4. The `Deploy to GitHub Pages` workflow runs on push. It builds, then runs the
   link check, and **fails the deploy** if any booking button points at another
   company's CheckCherry account. Watch it under the Actions tab.

5. It publishes to `https://vallonadams18-dot.github.io/proposal-perfection-nyc/`.

   Note: there is deliberately **no `public/CNAME` file yet**. Adding one makes
   Pages redirect the github.io URL to the custom domain, which would break
   staging before DNS exists.

### What to check while it is staged

Open it on your phone, not just a laptop — the mobile-only buttons are where
the old site's worst bug lived.

- Tap "Check your date" and confirm the CheckCherry form says **Proposal
  Perfection NYC**.
- Tap through a few experience cards on `/proposals/` and `/flower-walls/` and
  confirm the same.
- Confirm nothing anywhere mentions South Jersey, New Jersey or Atlanta.

---

## Stage 2 — point the domain

Only once stage 1 looks right.

1. Add the CNAME file so Pages claims the domain:

   ```bash
   echo "www.proposalperfectionnyc.com" > public/CNAME
   git add public/CNAME && git commit -m "Point GitHub Pages at www.proposalperfectionnyc.com" && git push
   ```

2. In Cloudflare DNS for `proposalperfectionnyc.com`:

   | Type | Name | Content | Proxy |
   |---|---|---|---|
   | CNAME | `www` | `vallonadams18-dot.github.io` | Proxied |
   | A | `@` | `185.199.108.153` | Proxied |
   | A | `@` | `185.199.109.153` | Proxied |
   | A | `@` | `185.199.110.153` | Proxied |
   | A | `@` | `185.199.111.153` | Proxied |

   The apex A records are so `proposalperfectionnyc.com` without the `www`
   still resolves; Cloudflare then redirects it to `www` (step 3).

   Remove the old records pointing at the WordPress host at the same time.

3. In the repo: **Settings → Pages → Custom domain** → `www.proposalperfectionnyc.com`,
   then tick **Enforce HTTPS** once the certificate is issued (can take an hour).

---

## Stage 3 — the redirects

Without this, every URL Google currently has indexed 404s.

1. Regenerate if anything changed:

   ```bash
   npm run redirects:build
   ```

2. Cloudflare → **Bulk Redirects** → create a list → **Import** →
   upload `docs/cloudflare-bulk-redirects.csv` (44 rules) → attach the list to
   a Bulk Redirect rule.

3. Add one more rule by hand, apex → www:
   `https://proposalperfectionnyc.com/*` → `https://www.proposalperfectionnyc.com/$1`, 301.

4. Spot-check a few after it propagates:

   ```bash
   curl -sI https://proposalperfectionnyc.com/customsigns/ | head -3
   curl -sI https://www.proposalperfectionnyc.com/flower-walls-4/ | head -3
   curl -sI https://www.proposalperfectionnyc.com/blog/ | head -3
   ```

   Each should be a single `301` to the new URL, then a `200`.

---

## Stage 4 — after cutover

- Submit `https://www.proposalperfectionnyc.com/sitemap.xml` in Google Search
  Console, and add the new property if the domain is not already verified.
- Update the Instagram link in bio.
- Verify the Facebook profile URL in `src/lib/site.ts` actually resolves — it
  could not be checked automatically (Facebook returns HTTP 400 to every
  automated request, even for pages that exist).

---

## Still unresolved before launch

`src/lib/site.ts` has `phone` and `email` set to `null`, so the header, footer
and contact page hide those rows entirely. The site will launch with the
CheckCherry form as the only way to reach you — which is what the WordPress
site does today, so it is not a regression, but it is worth fixing before you
spend money driving traffic.

The other open items are at the end of `docs/link-map.md`.
