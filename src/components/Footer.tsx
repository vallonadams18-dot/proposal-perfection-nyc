import Link from "next/link";
import { VENUES } from "@/data/venues";
import { INQUIRE } from "@/lib/booking";
import { CONTACT, NAV, PHONE_HREF, SITE, SOCIAL } from "@/lib/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="mt-32 bg-espresso text-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        {/* Every service and every venue is linked from every page, so nothing
            in the grid is more than one click from anywhere (playbook Phase 5). */}
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[2rem] leading-none">
              Proposal Perfection
            </p>
            <p className="mt-2 text-[0.5625rem] font-medium uppercase tracking-[0.42em] text-champagne">
              New York City
            </p>
            <p className="mt-7 max-w-sm text-[0.95rem] leading-relaxed text-ivory/70">
              Flower arches, flower walls and full proposal design across the five boroughs.
              One team, one evening, and a photograph you will keep for the rest of your life.
            </p>
            <a href={INQUIRE} className="cta mt-9 bg-champagne text-espresso hover:bg-rose" target="_blank" rel="noopener">
              Start planning
            </a>
          </div>

          <div>
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.24em] text-champagne">Explore</p>
            <ul className="mt-6 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[0.95rem] text-ivory/70 transition-colors duration-300 hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.24em] text-champagne">Where to propose</p>
            <ul className="mt-6 space-y-3">
              {VENUES.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/${v.slug}/`}
                    className="text-[0.95rem] text-ivory/70 transition-colors duration-300 hover:text-ivory"
                  >
                    {v.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.24em] text-champagne">Get in touch</p>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/contact/" className="text-[0.95rem] text-ivory/70 transition-colors duration-300 hover:text-ivory">
                  Contact
                </Link>
              </li>
              {CONTACT.phone && (
                <li>
                  <a href={PHONE_HREF!} className="text-[0.95rem] text-ivory/70 hover:text-ivory">
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              {CONTACT.email && (
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="text-[0.95rem] text-ivory/70 hover:text-ivory">
                    {CONTACT.email}
                  </a>
                </li>
              )}
              {SOCIAL.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.95rem] text-ivory/70 transition-colors duration-300 hover:text-ivory"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-ivory/12 pt-8 text-[0.75rem] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {SITE.name}. All rights reserved.</p>
          <p>Proposal design and event rentals across New York City.</p>
        </div>
      </div>
    </footer>
  );
}
