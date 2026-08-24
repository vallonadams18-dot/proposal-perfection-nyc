import type { Metadata } from "next";
import { CollectionPage, crossSellExcept } from "@/components/CollectionPage";
import { pageMetadata } from "@/lib/seo";
import { category } from "@/lib/products";

export const metadata: Metadata = pageMetadata({
  title: "Proposal Enhancements & Add-Ons NYC",
  description:
    "Cold spark fountains, confetti machines, fog, candlelight, rose petals, floral runners, marquee letters and uplighting — add any of them to a proposal setup in NYC.",
  path: "/add-ons/",
});

export default function AddOnsPage() {
  return (
    <CollectionPage
      eyebrow="Signature enhancements"
      title="The details people actually remember"
      path="/add-ons/"
      breadcrumb="Enhancements"
      intro="Sparks at the moment of the yes, confetti a second later, candlelight along the walk in. Small additions, disproportionate effect — and every one of them can be added to any setup on the site."
      products={category("add-ons")}
      cta="Add to your evening"
      gridEyebrow="Enhancements"
      gridTitle="Add to any setup"
      gridIntro="Chosen once the main piece is settled, so everything is timed and placed around it."
      body={{
        title: "Timing is the whole trick",
        paragraphs: [
          "Cold sparks and confetti are cued to the moment, not left running. That is the difference between a photograph of a celebration and a photograph of a machine.",
          "Fog sits low and turns a floor into cloud. Uplighting in your colour holds the whole installation after dark, which matters more than people expect once the sun goes down.",
          "Candles, petals and floral runners work on the approach rather than the backdrop — they make the walk toward the question part of the moment instead of a walk across a roof.",
        ],
      }}
      crossSell={crossSellExcept("/add-ons/")}
      bandTitle="Add the finishing touches"
      bandImage="gallery-04"
    />
  );
}
