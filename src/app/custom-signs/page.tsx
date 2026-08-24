import type { Metadata } from "next";
import { CollectionPage, crossSellExcept } from "@/components/CollectionPage";
import { pageMetadata } from "@/lib/seo";
import { collection } from "@/lib/products";

export const metadata: Metadata = pageMetadata({
  title: "Custom Signs NYC",
  description:
    "Custom signage in New York City — neon, acrylic, wooden, ceremony, logo and table signs. Bespoke lettering for proposals, weddings and brand activations.",
  path: "/custom-signs/",
});

export default function CustomSignsPage() {
  return (
    <CollectionPage
      eyebrow="Custom signs · New York City"
      title="Say it in your own words, in your own handwriting"
      path="/custom-signs/"
      breadcrumb="Custom signs"
      intro="From bold neon to handcrafted timber, bespoke signage adds the one detail that makes a setup unmistakably yours. Most couples put four words on it. Some put forty."
      products={collection("signs")}
      gridEyebrow="The collection"
      gridTitle="Choose your material"
      gridIntro="Neon glows and carries a photograph after dark; acrylic is crisp and modern; timber is warm and reads beautifully outdoors."
      body={{
        title: "Where signage earns its place",
        paragraphs: [
          "Custom signs pair beautifully with flower walls, heart frames and photo-worthy backdrops. A sign set inside a circle arch turns a lovely photograph into one that tells the whole story without a caption.",
          "Expertly made using premium materials, and built for the specific setting — a rooftop needs different mounting and different weight to an intimate indoor venue.",
          "Signage is not only for proposals. The same pieces work for weddings, anniversaries, brand activations and corporate events.",
        ],
      }}
      crossSell={crossSellExcept("/custom-signs/")}
      bandTitle="Put it in writing"
      bandImage="gallery-03"
    />
  );
}
