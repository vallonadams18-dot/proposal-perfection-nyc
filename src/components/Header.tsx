"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { INQUIRE } from "@/lib/booking";
import { CONTACT, NAV, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ivory/95 backdrop-blur-sm shadow-[0_1px_0_0_var(--color-line)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-5 md:px-10 md:py-6">
        <Link href="/" className="shrink-0" aria-label={`${SITE.name} — home`}>
          <span className="block font-[family-name:var(--font-display)] text-[1.35rem] leading-none tracking-[0.02em] md:text-[1.6rem]">
            Proposal Perfection
          </span>
          <span className="mt-1 block text-[0.5625rem] font-medium uppercase tracking-[0.42em] text-rose">
            New York City
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink-soft transition-colors duration-300 hover:text-espresso"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {CONTACT.phone && (
            <a
              href={`tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`}
              className="hidden text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink-soft hover:text-espresso lg:block"
            >
              {CONTACT.phone}
            </a>
          )}
          <a href={INQUIRE} className="cta hidden md:inline-flex" target="_blank" rel="noopener">
            Begin
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center xl:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-full bg-espresso transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-espresso transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-ivory xl:hidden"
      >
        <nav className="mx-auto flex max-w-[1400px] flex-col px-5 py-4 md:px-10" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-[family-name:var(--font-display)] text-2xl text-espresso last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <a href={INQUIRE} className="cta mt-6 mb-3 justify-center" target="_blank" rel="noopener">
            Begin your proposal
          </a>
        </nav>
      </div>
    </header>
  );
}
