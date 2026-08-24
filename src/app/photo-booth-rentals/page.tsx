import type { Metadata } from "next";
import { CollectionPage, crossSellExcept } from "@/components/CollectionPage";
import { collection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Photo Booth Rental NYC",
  description:
    "Photo booth rental in New York City for proposals and celebrations — mirror, 360, glam and roaming booths with custom backdrops, props and instant sharing.",
  alternates: { canonical: "/photo-booth-rentals/" },
};

export default function PhotoBoothsPage() {
  return (
    <CollectionPage
      eyebrow="Photo booths · New York City"
      title="Catch the reaction, not just the setup"
      intro="The installation is what she walks into. The booth is what everyone who arrives afterwards remembers. Mirror, 360, glam and roaming booths, all fully customisable."
      products={collection("photo-booths")}
      cta="See this booth"
      gridEyebrow="The collection"
      gridTitle="Choose your booth"
      gridIntro="Every experience is customisable — personalised backdrops, themed props, branded prints and digital sharing."
      body={{
        title: "Built for the hour after the yes",
        paragraphs: [
          "A proposal photo booth is designed to make the celebration afterwards as memorable as the moment itself. Friends and family arrive, and there is something for everyone to do that produces a photograph you actually keep.",
          "Each booth is fully customisable: choose the backdrop, the props, the print design and how guests receive their images. Prints, texts, AirDrop or a gallery link.",
          "For the biggest effect, combine a booth with a flower arch, a flower wall and a custom neon sign — the booth then shoots against the same set as the proposal itself.",
        ],
      }}
      crossSell={crossSellExcept("/photo-booth-rentals/")}
      bandTitle="Capture the whole night"
      bandImage="gallery-08"
    />
  );
}
