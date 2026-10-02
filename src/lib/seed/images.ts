function seedFor(categoryId: string, subcategoryId: string | undefined, index: number, title?: string) {
  return `${title?.trim() || subcategoryId || categoryId || "marketplace"}-${index}`;
}

export function dummyAdImage(categoryId: string, subcategoryId?: string, index = 0, title?: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seedFor(categoryId, subcategoryId, index, title))}/800/600`;
}

export function dummyAdImageSet(categoryId: string, subcategoryId?: string, title?: string) {
  return [0, 1, 2].map((i) => dummyAdImage(categoryId, subcategoryId, i, title));
}
