import type { Metadata } from "next";
import { CollectionPage, crossSellExcept } from "@/components/CollectionPage";
import { pageMetadata } from "@/lib/seo";
import { collection } from "@/lib/products";

export const metadata: Metadata = pageMetadata({
  title: "Flower Wall Rental NYC",
  description:
    "Flower wall rental in New York City. Full-height floral backdrops in premium faux blooms — reds, blush, ombré, greenery and rose gold — delivered and installed.",
  path: "/flower-walls/",
});

export default function FlowerWallsPage() {
  return (
    <CollectionPage
      eyebrow="Flower walls · New York City"
      title="A wall of flowers, floor to frame edge"
      path="/flower-walls/"
      breadcrumb="Flower walls"
      intro="Full-height floral backdrops that turn any room, roof or garden into somewhere worth photographing. Every wall is crafted in premium faux florals and built to a colour palette rather than assembled from whatever is in season."
      products={collection("flower-walls")}
      gridEyebrow="The collection"
      gridTitle="Choose your wall"
      gridIntro="An extensive range of colours and textures, so the backdrop can be matched to a dress, a season or a room."
      body={{
        title: "Built for the photograph",
        paragraphs: [
          "Each wall is crafted using premium faux florals sourced from leading global manufacturers, designed to complement a wide range of themes and colour palettes.",
          "Walls work as a backdrop on their own, behind an arch for depth, or flanked by panels to widen the set so a whole group can stand inside it.",
          "We deliver, install and style the wall, then strike it down afterwards. In apartments and lofts we build to fit the freight elevator and the doorway, which is a conversation worth having early.",
        ],
      }}
      footnote={
        <>
          Proposing in New Jersey rather than New York? Our sister company{" "}
          <a
            href="https://www.flowerwallsnewjersey.com/"
            className="text-espresso underline decoration-champagne underline-offset-4"
          >
            Flower Walls New Jersey
          </a>{" "}
          covers the same collections across the river.
        </>
      }
      crossSell={crossSellExcept("/flower-walls/")}
      bandTitle="Choose your backdrop"
      bandImage="gallery-11"
    />
  );
}
