import { PRODUCTS, type Collection, type Product } from "@/data/catalog";

/**
 * The catalogue deliberately keeps the same item more than once when the old
 * site booked it through different CheckCherry events on different pages.
 * That is right for the data and wrong for a single grid, where it just looks
 * like the page repeated itself -- so collapse by display name at render time.
 */
export function dedupeByName(products: Product[]): Product[] {
  const seen = new Set<string>();
  return products.filter((p) => {
    const key = p.name.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Products in a collection, with per-page duplicates collapsed. */
export function collection(name: Collection): Product[] {
  return dedupeByName(PRODUCTS.filter((p) => p.collections.includes(name)));
}

/** Products in a category, with duplicates collapsed. */
export function category(name: string): Product[] {
  return dedupeByName(PRODUCTS.filter((p) => p.category === name));
}

/**
 * Homepage picks. The old site's homepage led with confetti machines and spark
 * fountains, which sells the add-on before the thing it attaches to, so the
 * headline setups come first here and the enhancements get their own section.
 */
/**
 * The old corporate page carried exactly one product card, which is too thin
 * to be a page. The pieces that actually get booked for corporate work are the
 * booths, the signage and the structural rentals, so the page shows those.
 */
export function corporateSelection(limit = 9): Product[] {
  return dedupeByName([
    ...collection("corporate"),
    ...collection("photo-booths"),
    ...collection("signs"),
    ...collection("event-rentals"),
  ]).slice(0, limit);
}

export function featured(limit = 6): Product[] {
  const home = collection("home").filter((p) => p.category !== "add-ons");
  if (home.length >= limit) return home.slice(0, limit);
  // top up from the arch collection so the grid is never short
  const rest = collection("arches").filter((p) => !home.some((h) => h.name === p.name));
  return dedupeByName([...home, ...rest]).slice(0, limit);
}
