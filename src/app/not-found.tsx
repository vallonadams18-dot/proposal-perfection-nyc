import Link from "next/link";
import { Container } from "@/components/Sections";
import { NAV } from "@/lib/site";

export default function NotFound() {
  return (
    <Container className="py-32 md:py-48">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 max-w-2xl text-[2.6rem] leading-[1.05] md:text-[4rem]">
        That page has moved, or never existed
      </h1>
      <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-soft">
        The site was rebuilt in August 2026 and a few addresses changed. Everything is still here —
        try one of these.
      </p>
      <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {NAV.map((item) => (
          <li key={item.href} className="border-t border-line pt-4">
            <Link href={item.href} className="link-quiet">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
