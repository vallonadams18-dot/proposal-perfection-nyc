import type { ReactNode } from "react";
import { INQUIRE } from "@/lib/booking";
import { ResponsiveImage } from "./ResponsiveImage";

/** Page shell — one consistent measure and gutter across the whole site. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1400px] px-5 md:px-10 ${className}`}>{children}</div>;
}

/** Vertical rhythm. Whitespace is the main design device here, so it is large. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} data-reveal className={`py-24 md:py-36 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`${eyebrow ? "mt-5" : ""} text-[2.4rem] leading-[1.06] md:text-[3.4rem]`}>{title}</h2>
      {intro && (
        <p className={`mt-6 text-[1.0625rem] leading-relaxed text-ink-soft ${centered ? "mx-auto" : ""} max-w-[62ch]`}>
          {intro}
        </p>
      )}
      <div className={`rule mt-9 w-24 ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}

/** Page header for interior pages: title over a hairline, no giant hero. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <Container className="pt-16 pb-4 md:pt-24">
      <div data-reveal className="max-w-4xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 text-[2.8rem] leading-[1.02] md:text-[4.6rem]">{title}</h1>
        <p className="mt-8 max-w-[64ch] text-[1.0625rem] leading-relaxed text-ink-soft md:text-[1.125rem]">
          {intro}
        </p>
      </div>
    </Container>
  );
}

/** The closing call to action, used at the foot of every page. */
export function InquiryBand({
  title = "Let's plan the moment",
  copy = "Tell us the date, the place and the person. We will design the rest, deliver it, style it and clear it away before you have stopped celebrating.",
  image = "gallery-05",
}: {
  title?: string;
  copy?: string;
  image?: string;
}) {
  return (
    <section data-reveal className="relative isolate mt-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ResponsiveImage
          name={image}
          alt=""
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-espresso/72" />
      </div>
      <Container className="py-28 text-center md:py-40">
        <p className="eyebrow text-champagne">The next step</p>
        <h2 className="mx-auto mt-6 max-w-3xl text-[2.6rem] leading-[1.05] text-ivory md:text-[4rem]">{title}</h2>
        <p className="mx-auto mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ivory/75">{copy}</p>
        <a
          href={INQUIRE}
          target="_blank"
          rel="noopener"
          className="cta mt-11 bg-champagne text-espresso hover:bg-rose hover:text-white"
        >
          Check your date
        </a>
      </Container>
    </section>
  );
}
