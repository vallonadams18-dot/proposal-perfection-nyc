import type { Metadata } from "next";
import { CollectionPage, crossSellExcept } from "@/components/CollectionPage";
import { pageMetadata } from "@/lib/seo";
import { collection } from "@/lib/products";

export const metadata: Metadata = pageMetadata({
  title: "Photo Booth Rental NYC",
  description:
    "Photo booth rental in New York City for proposals and celebrations — mirror, 360, glam and roaming booths with custom backdrops, props and instant sharing.",
  path: "/photo-booth-rentals/",
});

export default function PhotoBoothsPage() {
  return (
    <CollectionPage
      eyebrow="Photo booths · New York City"
      title="Catch the reaction, not just the setup"
      path="/photo-booth-rentals/"
      breadcrumb="Photo booths"
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
      footnote={
        <>
          Booths are also our sister company&rsquo;s whole business — if you are planning a
          wedding, party or corporate event rather than a proposal, see{" "}
          <a
            href="https://www.magicmirrorbrooklyn.com/"
            className="text-espresso underline decoration-champagne underline-offset-4"
          >
            Magic Mirror Brooklyn
          </a>
          , which runs the same booths across New York City.
        </>
      }
      crossSell={crossSellExcept("/photo-booth-rentals/")}
      bandTitle="Capture the whole night"
      bandImage="gallery-08"
    />
  );
}
