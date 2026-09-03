# Going live

Hosting mirrors magicmirrorbrooklyn.com exactly: **GitHub Pages** serves the
static export and **DNS stays at GoDaddy**. No Cloudflare, no nameserver move.

That is not a guess — magicmirrorbrooklyn.com already runs this way, on GoDaddy
nameservers (`ns51`/`ns52.domaincontrol.com`) with a `www` CNAME to
`vallonadams18-dot.github.io`, and its apex 301s to `www` over HTTPS on its own.
GitHub Pages issues that redirect and the TLS certificate itself.

The one thing Cloudflare would have added is server-side 301s for the old
WordPress URLs, which GitHub Pages cannot do. `npm run build` emits static
redirect stubs for those instead — see stage 3. Weaker than a real 301, but it
costs nothing and needs no second provider. `docs/cloudflare-bulk-redirects.csv`
is kept in case Cloudflare is ever added later; nothing uses it today.

Canonical origin is `https://www.proposalperfectionnyc.com`. It is set in two
places that must agree — `scripts/canonical.mjs` and `SITE.url` in
`src/lib/site.ts`.

---

## Before anything: do not delete the WordPress site

Leave the current WordPress install running and paid up until the new site has
been live and taking inquiries for a couple of weeks. It is the only copy of
the original content and images outside this repo, and it is the rollback.

---

## Stage 0 — nothing to do

Kept as a heading so the stage numbers still line up with older notes.

The domain stays on **GoDaddy** (`ns75`/`ns76.domaincontrol.com`), today pointing
at GoDaddy shared hosting at `132.148.41.224`. Full snapshot in
[`dns-before-migration.md`](dns-before-migration.md).

There is no nameserver move, so the risky step is gone entirely. Worth knowing
anyway: this domain carries no MX, SPF, DKIM or DMARC records — confirmed
through two independent resolvers — so no mail is routed on it. Inquiries go to
the Gmail address in `src/lib/site.ts`, not to anything on this domain.

Go straight to stage 1.

---

## Stage 1 — get it onto a URL you can click (nothing public changes)

Independent of Stage 0 — run it while the nameservers propagate. It touches
GitHub only, not DNS.

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

   That missing CNAME is also what tells the build it is on a subpath. A
   project repo is served from `<user>.github.io/<repo>/`, so the workflow sets
   `PAGES_BASE_PATH` to the repo name while no CNAME exists, and Next prefixes
   every asset and internal link with it. Without that the page loads as
   unstyled HTML, because `/_next/...` resolves to the github.io root. Nothing
   to do by hand — it flips itself in stage 2.

### What to check while it is staged

Open it on your phone, not just a laptop — the mobile-only buttons are where
the old site's worst bug lived.

- Tap "Check your date" and confirm the CheckCherry form says **Proposal
  Perfection NYC**.
- Tap through a few experience cards on `/proposals/` and `/flower-walls/` and
  confirm the same.
- Confirm no *other company* is named -- the old site leaked traffic to South
  Jersey, New Jersey and Atlanta flower-wall brands. Two mentions are correct
  and must survive any brand scrub:
  - **Atlanta is the name of one flower wall**, `slug: atlanta` in
    `scripts/catalog/catalog.source.json`, confirmed by the owner. It is a
    product, not the Atlanta company. Leave it alone.
  - `/flower-walls/` links to the sister company **Flower Walls New Jersey**
    deliberately.

  So grep for the company names, not the bare words "Atlanta" or "New Jersey".

---

## Stage 2 — point the domain

Only once stage 1 looks right.

1. Add the CNAME file so Pages claims the domain. This also drops the staging
   subpath prefix automatically, since the workflow keys `PAGES_BASE_PATH` off
   whether this file exists:

   ```bash
   echo "www.proposalperfectionnyc.com" > public/CNAME
   git add public/CNAME && git commit -m "Point GitHub Pages at www.proposalperfectionnyc.com" && git push
   ```

2. In **GoDaddy → Domain → DNS → Manage Zones** for
   `proposalperfectionnyc.com`, make the records match magicmirrorbrooklyn.com:

   | Type | Name | Value |
   |---|---|---|
   | CNAME | `www` | `vallonadams18-dot.github.io` |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |

   Those four are GitHub's Pages IPs, read live off magicmirrorbrooklyn.com's
   apex rather than copied from documentation. Re-check them against
   [GitHub's docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
   if this runbook is old.

   The apex A records let `proposalperfectionnyc.com` without the `www` resolve;
   **GitHub Pages then 301s it to `www` by itself** — verified on the sibling
   domain, which returns `301 -> https://www.magicmirrorbrooklyn.com/` from a
   plain http apex request. No redirect rule needed anywhere.

   Delete the old `A @ -> 132.148.41.224` record pointing at WordPress shared
   hosting at the same time. **This is the cutover** — the moment that record
   changes, visitors start getting the new site.

3. In the repo: **Settings → Pages → Custom domain** → `www.proposalperfectionnyc.com`,
   then tick **Enforce HTTPS** once the certificate is issued (can take an hour).

---

## Stage 3 — the redirects (already done by the build)

Without these, every URL Google currently has indexed would 404.

Nothing to configure. `npm run build` writes a static stub at each old
WordPress path — 22 files covering 29 URL forms, reported at the end of the
build output. Each stub carries a canonical link to the new URL,
`robots: noindex, follow`, an instant `meta refresh`, and a JS
`location.replace` fallback.

Two honest caveats:

- A meta refresh is **not** as strong as a server-side 301. Google follows it
  and passes signals, but a real 301 is the better instrument. This is the
  trade for staying on one provider.
- Apex → www and http → https are **not** stubs. GitHub Pages does both itself
  once the custom domain is set, which is why no rule is needed.

Spot-check after cutover — each should reach the new URL and return `200`:

```bash
curl -sIL https://proposalperfectionnyc.com/customsigns/ | grep -E "^HTTP|^location"
```

```bash
curl -sL https://www.proposalperfectionnyc.com/customsigns/ | grep -o "<title>[^<]*</title>"
```

If you ever do want true 301s, `docs/cloudflare-bulk-redirects.csv` (44 rules)
is still generated by `npm run redirects:build` and ready to import.

---

## Stage 4 — after cutover

- Submit `https://www.proposalperfectionnyc.com/sitemap.xml` in Google Search
  Console, and add the new property if the domain is not already verified.
- Update the Instagram link in bio.
- Send a test email to `proposalperfectionnyc@gmail.com` and confirm it lands.
  The spelling is confirmed; that the mailbox receives is not.

---

## Still unresolved before launch

Contact details are **done** — `(347) 658-5848` and
`proposalperfectionnyc@gmail.com`, both confirmed by the owner and live in the
header, footer, contact page and the LocalBusiness JSON-LD. The Facebook URL is
confirmed too.

The number is a **dedicated Proposal Perfection line** as of 2026-09-03; each
business now has its own. It previously shared `(347) 383-5851` with the other
brands, so never copy a number between these sites.

Still open:

- `CONTACT.hours` is `null`, so that row stays hidden. Harmless, but the old
  site claimed "Monday – Friday 10 AM – 8 PM" next to a demo phone number, so
  there may be real hours worth publishing.
- Mi'Amor and Pink Blush book into their flower-wall **category** rather than
  their specific event. The buttons work; they just land a level too high.
- "Printing Services" has no page and no matching CheckCherry event.

The other open items are at the end of `docs/link-map.md`.
