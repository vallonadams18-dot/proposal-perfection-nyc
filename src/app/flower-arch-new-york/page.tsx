import type { Metadata } from "next";
import { CollectionPage, crossSellExcept } from "@/components/CollectionPage";
import { pageMetadata } from "@/lib/seo";
import { collection } from "@/lib/products";

export const metadata: Metadata = pageMetadata({
  title: "Flower Arch Rental NYC",
  description:
    "Flower arch rental in New York City — heart, circle, square, oval and half arches in reds, creams, whites, greens and blush. Delivered, installed and styled.",
  path: "/flower-arch-new-york/",
});

export default function FlowerArchPage() {
  return (
    <CollectionPage
      eyebrow="Flower arches · New York City"
      title="Flower arches, in every shape the moment might need"
      path="/flower-arch-new-york/"
      breadcrumb="Flower arches"
      intro="Hearts, full circles, squares, ovals and half arches, built in premium faux florals so they look identical in the last photograph of the night as in the first."
      products={collection("arches")}
      gridEyebrow="The collection"
      gridTitle="Choose your arch"
      gridIntro="Shapes read differently through a lens — hearts and circles flatter a couple, squares and half arches suit an architectural setting."
      body={{
        title: "Why faux florals",
        paragraphs: [
          "Every arch is built from premium faux blooms sourced from leading global manufacturers. They hold their colour under rooftop sun and hold their shape in wind, which fresh flowers do not.",
          "It also means the arch you see on this page is the arch that arrives. Nothing is substituted at the last minute because a grower was short.",
          "Arches pair naturally with a flower wall behind them, custom signage inside them, and candlelight or petals at the base. We will show you the full composition before you commit to anything.",
        ],
      }}
      crossSell={crossSellExcept("/flower-arch-new-york/")}
      bandTitle="Find your arch"
      bandImage="gallery-09"
    />
  );
}
