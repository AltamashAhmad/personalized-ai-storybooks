/**
 * Coming-soon product gating.
 *
 * These products have NO dedicated story manuscript yet: 12 of them are
 * currently aliased to ANOTHER book's spreads in BOOK_SPREADS_MAP and 11
 * have no entry at all (they would silently fall back to the flagship
 * story). Selling the wrong story is not acceptable, so these products
 * are honestly gated as "Coming Soon" across product pages, listings,
 * and the personalization wizard — instead of showing the wrong story.
 *
 * HOW TO LAUNCH ONE:
 * 1. Write (or generate) its dedicated StorySpread[] manuscript.
 * 2. Register it in BOOK_SPREADS_MAP (web/config/sampleBookData.ts)
 *    under the product's slug (and id).
 * 3. Remove its slug (and id) from COMING_SOON_SLUGS below.
 *
 * Both slugs and product ids are listed because getProductBySlug()
 * resolves either form.
 */
export const COMING_SOON_SLUGS: string[] = [
  // No spreads entry at all (would fall back to the flagship story)
  'the-child-who-found-the-golden-falcon',
  'lost-golden-falcon',
  'when-you-were-born-miracle-keepsake',
  'when-you-were-born',
  'knight-of-the-golden-oasis',
  'knight-golden-oasis',
  'bedtime-lullaby-under-the-arabian-moon',
  'bedtime-arabian-moon',
  'the-galactic-explorer-star-compass',
  'galactic-explorer',
  'the-little-child-who-lost-their-name',
  'lost-my-name',
  'where-are-you-search-and-find-adventure',
  'where-are-you',
  'name-o-saurus-dinosaur-adventure',
  'name-o-saurus',
  'me-and-my-big-sibling-adventure',
  'me-and-my-big-sibling',
  'treasury-of-nursery-rhymes-keepsake',
  'treasury-of-nursery-rhymes',
  'your-life-in-newspaper-headlines',
  'your-life-in-headlines',

  // Aliased to ANOTHER book's manuscript in BOOK_SPREADS_MAP
  'the-magical-garden-of-whispering-trees',
  'magical-trees-garden',
  'i-am-a-little-chef-feast-of-wonders',
  'little-chef-wonders',
  'grandpas-enchanted-workshop-flying-carpet',
  'grandpas-workshop-flying-carpet',
  'the-little-equestrian-golden-stallion',
  'equestrian-golden-stallion',
  'the-wildlife-rescuer-pink-flamingos',
  'wildlife-mangrove-flamingos',
  'the-time-traveling-dhow-ancient-cities',
  'time-traveling-dhow-cities',
  'my-musical-oud-melody-of-the-dunes',
  'musical-oud-melody',
  'the-little-botanist-desert-rose',
  'botanist-desert-rose',
  'the-starlit-pearl-festival-lantern-boat',
  'pearl-festival-lantern-boat',
  'the-great-date-palm-harvest-golden-baskets',
  'date-palm-harvest-baskets',
  'the-coral-reef-diver-hidden-lagoon',
  'diver-underwater-coral-pearls',
  'the-desert-astronomer-starlight-camp',
  'desert-astronomer-starlight-camp',
];

/**
 * Returns true when the given product slug (or id) has no dedicated
 * manuscript yet and must be shown as "Coming Soon".
 */
export function isComingSoon(slug: string): boolean {
  return COMING_SOON_SLUGS.includes(slug);
}
