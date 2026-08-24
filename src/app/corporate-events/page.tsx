import type { Metadata } from "next";
import { CollectionPage, crossSellExcept } from "@/components/CollectionPage";
import { pageMetadata } from "@/lib/seo";
import { corporateSelection } from "@/lib/products";

export const metadata: Metadata = pageMetadata({
  title: "Corporate Event Décor & Branding NYC",
  description:
    "Corporate event décor in New York City — branded backdrops, step and repeats, custom signage, flower walls and photo booth activations for launches and galas.",
  path: "/corporate-events/",
});

export default function CorporateEventsPage() {
  return (
    <CollectionPage
      eyebrow="Corporate events · New York City"
      title="Your brand is too particular to blend into the room"
      path="/corporate-events/"
      breadcrumb="Corporate events"
      intro="Branded backdrops, step and repeats, custom signage and photo activations for launches, galas, conferences and openings — designed so the photographs that circulate afterwards look like they were art-directed, because they were."
      products={corporateSelection(9)}
      cta="Discuss this activation"
      gridEyebrow="Activations"
      gridTitle="Branded experiences"
      gridIntro="Every piece we build for proposals can be rebuilt in your colours, with your logo, at your scale."
      body={{
        title: "What we bring to a corporate event",
        paragraphs: [
          "Distinctive, attention-holding event décor and personalised signage, executed cleanly enough that the branding reads in every photograph without dominating the room.",
          "Step and repeats, branded backdrops, custom logo signage, flower walls in corporate colours, dimensional panelling and photo booth activations that collect opt-in guest data if you want them to.",
          "Whether it is a first event or a milestone, the same team designs it, installs it, staffs it and strikes it down — so there is one point of contact and one invoice.",
        ],
      }}
      crossSell={crossSellExcept("/corporate-events/")}
      bandTitle="Let's talk about your event"
      bandCopy="Send us the date, the venue and what the evening needs to achieve. We will come back with a design and a number."
      bandImage="gallery-01"
    />
  );
}
