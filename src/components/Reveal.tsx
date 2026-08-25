"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades sections in as they enter the viewport.
 *
 * The `js` class is added here rather than in the HTML so that the hidden
 * starting state only ever applies when this component is actually running.
 * Without JS every [data-reveal] block stays visible.
 *
 * Keyed on the pathname because this lives in the root layout, which the App
 * Router keeps mounted across client-side navigation. With an empty dependency
 * array the effect ran once, on the first page only -- every page reached by
 * clicking a link rendered its [data-reveal] blocks at opacity 0 with nothing
 * left to observe them, so the content stayed invisible for good.
 */
export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    root.classList.add("js");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    const targets = document.querySelectorAll("[data-reveal]");
    targets.forEach((el) => io.observe(el));

    // Anything already on screen at load reveals immediately.
    requestAnimationFrame(() => {
      targets.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      });
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
