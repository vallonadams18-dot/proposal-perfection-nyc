import type { Metadata } from "next";
import { CollectionPage, crossSellExcept } from "@/components/CollectionPage";
import { collection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Marriage Proposal Setups NYC",
  description:
    "Every proposal setup we build in New York City — flower arches, heart frames, flower walls and full custom installations, delivered and styled for the evening.",
  alternates: { canonical: "/proposals/" },
};

export default function ProposalsPage() {
  return (
    <CollectionPage
      eyebrow="Proposals"
      title="Every setup we build for the question"
      intro="Arches, hearts, walls and full custom installations. Each one is delivered, installed and styled by our own team, and taken away again the same night so you never have to think about it."
      products={collection("proposals")}
      gridEyebrow="The collection"
      gridTitle="Choose your setting"
      gridIntro="Pick a piece to start from. Colour, scale and styling are all adjustable once we know the location."
      body={{
        title: "What arrives on the night",
        paragraphs: [
          "Our proposal installations are designed to elevate the moment rather than compete with it — visually striking, but built so the two of you stay the subject of every photograph.",
          "Add cold spark fountains, showers of confetti, a low sea of cloud from a fog machine, candlelight along the approach or rose petals underfoot. These pair with any setup on this page and are decided once the main piece is chosen.",
          "If nothing here is quite right, we design from scratch. Tell us the location, the date and the idea, and we will build the installation around it.",
        ],
      }}
      crossSell={crossSellExcept("/proposals/")}
      bandTitle="Ask her properly"
      bandImage="gallery-03"
    />
  );
}
