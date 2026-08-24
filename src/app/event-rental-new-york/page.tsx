import type { Metadata } from "next";
import { CollectionPage, crossSellExcept } from "@/components/CollectionPage";
import { collection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Event Rentals NYC",
  description:
    "Event rentals in New York City — layered 3D panels, rounded and rectangular backdrops, golden gates, stainless frames and full custom sets, delivered and installed.",
  alternates: { canonical: "/event-rental-new-york/" },
};

export default function EventRentalsPage() {
  return (
    <CollectionPage
      eyebrow="Event rentals · New York City"
      title="Structure, when flowers alone are not enough"
      intro="Layered dimensional panels, rounded and rectangular backdrops, golden gates and stainless frames. The pieces that give a proposal or an event real architecture behind it."
      products={collection("event-rentals")}
      gridEyebrow="The collection"
      gridTitle="Panels, frames and gates"
      gridIntro="Each of these can stand alone, sit behind a flower wall, or be layered together into a single composition."
      body={{
        title: "Looking for more than florals",
        paragraphs: [
          "We offer a wide range of event rentals beyond flower walls — dimensional panelling, archways, ornamental gates and beautiful stainless steel frames among them.",
          "These pieces are what let a setup scale. A single rounded panel suits an apartment; three layered panels with floral accents and a custom sign will fill a rooftop or a ballroom.",
          "Everything is delivered, installed, styled and struck down by our own team, so the pieces arrive together and leave together.",
        ],
      }}
      crossSell={crossSellExcept("/event-rental-new-york/")}
      bandTitle="Build the set"
      bandImage="gallery-01"
    />
  );
}
