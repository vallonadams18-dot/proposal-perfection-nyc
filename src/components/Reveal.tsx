"use client";

import { useEffect } from "react";

/**
 * Fades sections in as they enter the viewport.
 *
 * The `js` class is added here rather than in the HTML so that the hidden
 * starting state only ever applies when this component is actually running.
 * Without JS every [data-reveal] block stays visible.
 */
export function RevealProvider() {
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
  }, []);

  return null;
}
