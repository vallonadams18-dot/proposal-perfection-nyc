# DNS snapshot — proposalperfectionnyc.com

Taken **24 August 2026**, before moving the domain to Cloudflare. Queried
through both Google and Cloudflare public resolvers; they agree.

Keep this. After the nameserver change, every record below should still exist
in Cloudflare, and anything Cloudflare's importer invented should be checked
against it.

## Current state

| Type | Name | Value | What it is |
|---|---|---|---|
| NS | `@` | `ns75.domaincontrol.com` | GoDaddy nameservers |
| NS | `@` | `ns76.domaincontrol.com` | GoDaddy nameservers |
| A | `@` | `132.148.41.224` | GoDaddy shared hosting — the WordPress install |
| CNAME | `www` | `proposalperfectionnyc.com` | points back at the apex |
| A | `mail` | `132.148.41.224` | GoDaddy's default cPanel record. Inert — see below |

## What is NOT there

Verified absent through two independent resolvers:

- **No MX records.** No inbound mail is configured for this domain at all.
- **No TXT records** — so no SPF, and no domain verification tokens.
- **No DMARC** (`_dmarc`), **no DKIM** at the default selector.
- No AAAA, no FTP subdomain.

### Why that matters

Moving nameservers is the step that usually breaks a business, because it
silently takes email with it. **Here there is nothing to break.** No mail is
routed on this domain today, so the move only affects the website.

The `mail.` A record looks like mail but is not — without an MX record nothing
delivers there. It is GoDaddy boilerplate and can be dropped.

### The flip side

You have no email address on your own domain. That is one of the four things
blocking launch (`docs/link-map.md`), and the cleanest time to fix it is during
this move, while you are in the DNS anyway. Adding MX + SPF + DKIM for a
`hello@proposalperfectionnyc.com` mailbox is a normal part of Cloudflare
onboarding — Cloudflare Email Routing will forward to a Gmail address for free
if you do not want a separate inbox.

## Records after the move

Only these should exist for the website:

| Type | Name | Value | Proxy |
|---|---|---|---|
| CNAME | `www` | `vallonadams18-dot.github.io` | Proxied |
| A | `@` | `185.199.108.153` | Proxied |
| A | `@` | `185.199.109.153` | Proxied |
| A | `@` | `185.199.110.153` | Proxied |
| A | `@` | `185.199.111.153` | Proxied |

Plus whatever mail records you decide to add.
