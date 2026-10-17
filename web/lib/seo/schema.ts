/**
 * Schema.org Structured Data Generators & Canonical Invariants
 * Strictly compliant with Google UAE (google.ae) Rich Results Guidelines.
 * 
 * Provides validated Schema.org @graph generation for:
 * 1. Product (49.00 / 79.00 / 99.00 AED InStock; aggregateRating emitted only when real review data is supplied)
 * 2. FAQPage (High-intent UAE questions: 24-48h Dubai courier delivery, Arabic Tashkeel)
 * 3. BreadcrumbList (3-tier hierarchy: Home -> Hub -> Page)
 * 4. Organization (PersonalizedTales UAE, Dubai, AE)
 * 5. WebSite (Sitelinks SearchAction targeting /all-books?q={search_term_string})
 */

/**
 * Canonical base URL, environment-aware. Falls back to the production
 * domain when NEXT_PUBLIC_SITE_URL is unset (e.g. local dev).
 */
export const CANONICAL_BASE: string =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://personalizedtales.com').replace(/\/+$/, '');

/**
 * Escapes a string for safe embedding inside a JSON-LD <script> block.
 * Neutralizes `<` (and therefore `</script>` breakouts) via unicode escapes.
 * Apply to any user- or slug-derived string BEFORE JSON.stringify-ing the
 * JSON-LD payload into the page.
 */
export function escapeJsonLd(str: string): string {
  return str.replace(/</g, '\\u003c');
}

export interface SeoBreadcrumbItem {
  name: string;
  url: string;
}

export interface SeoFaqItem {
  q: string;
  a: string;
}

export interface BuildSeoPageJsonLdOptions {
  pageUrl: string;
  name: string;
  description: string;
  breadcrumbs: SeoBreadcrumbItem[];
  faqs?: SeoFaqItem[];
  lowPrice?: string;
  highPrice?: string;
  ratingValue?: string;
  reviewCount?: string;
}

/**
 * Normalizes absolute canonical URL without trailing slashes
 */
export function buildCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  const rawUrl = CANONICAL_BASE + cleanPath;
  return rawUrl === CANONICAL_BASE + '/' ? CANONICAL_BASE : rawUrl.replace(/\/+$/, '');
}

/**
 * Builds tri-fold hreflang alternates (en-AE, ar-AE, x-default)
 */
export function buildHreflangAlternates(cleanPath: string) {
  const normPath = cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath;
  const isArabic = normPath.startsWith('/ar/') || normPath === '/ar';
  
  const enPath = isArabic
    ? normPath.replace(/^\/ar/, '') || '/'
    : normPath;
  const arPath = isArabic
    ? normPath
    : normPath === '/' ? '/ar' : '/ar' + normPath;

  const enUrl = buildCanonicalUrl(enPath);
  const arUrl = buildCanonicalUrl(arPath);

  return {
    canonical: isArabic ? arUrl : enUrl,
    languages: {
      'en-AE': enUrl,
      'ar-AE': arUrl,
      'x-default': enUrl,
    },
  };
}

/**
 * Standard UAE High-Intent FAQ entries
 * Highlights local 24-48h courier delivery in Dubai/UAE and Arabic Tashkeel formatting.
 */
export const DEFAULT_UAE_FAQS: SeoFaqItem[] = [
  {
    q: 'How fast is delivery for personalized storybooks across Dubai and the UAE?',
    a: 'Instant 3D digital flipbook preview is generated within 5 minutes. Luxury printed physical heirloom hardcovers are printed locally in the UAE and dispatched via express courier with 24 to 48 hours delivery across Dubai, Abu Dhabi, and all 7 Emirates.',
  },
  {
    q: 'Does the storybook include authentic Arabic with full Tashkeel vowel markings?',
    a: 'Yes, every story features poetic Modern Standard Arabic formatted with 100% grammatically verified Tashkeel (harakat vowels), printed side-by-side with lyrical English rhymes.',
  },
  {
    q: 'Can I preview the personalized storybook before purchasing?',
    a: 'Yes, our interactive 3D WebGL flipbook lets you review every personalized page spread, cover format, and dedication before placing your order.',
  },
  {
    q: 'What is the pricing and payment options for UAE orders?',
    a: 'Entry softcover is 49.00 AED, classic hardcover is 79.00 AED, and deluxe layflat is 99.00 AED.',
  },
];

/**
 * Constructs complete Schema.org @graph entity payload
 */
export function buildSeoPageJsonLd(options: BuildSeoPageJsonLdOptions) {
  const {
    pageUrl,
    name,
    description,
    breadcrumbs,
    faqs = DEFAULT_UAE_FAQS,
    lowPrice = '49.00',
    highPrice = '99.00',
    ratingValue,
    reviewCount,
  } = options;

  const canonicalUrl = pageUrl.replace(/\/+$/, '');

  const productEntity: Record<string, unknown> = {
    '@type': 'Product',
    '@id': canonicalUrl + '#product',
    name,
    image: `${CANONICAL_BASE}/final_book_mockup_1788701924626.jpg`,
    description,
    brand: {
      '@type': 'Brand',
      name: 'PersonalizedTales',
    },
    ...(ratingValue && reviewCount
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue,
            reviewCount,
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AED',
      lowPrice,
      highPrice,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
      seller: {
        '@type': 'Organization',
        name: 'PersonalizedTales UAE',
      },
    },
  };

  const breadcrumbsEntity: Record<string, unknown> = {
    '@type': 'BreadcrumbList',
    '@id': canonicalUrl + '#breadcrumbs',
    itemListElement: breadcrumbs.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.name,
      item: b.url.startsWith('http') ? b.url.replace(/\/+$/, '') : buildCanonicalUrl(b.url),
    })),
  };

  const organizationEntity: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': `${CANONICAL_BASE}/#organization`,
    name: 'PersonalizedTales',
    alternateName: 'حكايات مخصصة',
    url: CANONICAL_BASE,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'AE',
      availableLanguage: ['English', 'Arabic'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
  };

  const webSiteEntity: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': `${CANONICAL_BASE}/#website`,
    name: 'PersonalizedTales UAE',
    url: CANONICAL_BASE,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${CANONICAL_BASE}/all-books?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const graph: Array<Record<string, unknown>> = [
    productEntity,
    breadcrumbsEntity,
    organizationEntity,
    webSiteEntity,
  ];

  if (faqs && faqs.length > 0) {
    const faqEntity: Record<string, unknown> = {
      '@type': 'FAQPage',
      '@id': canonicalUrl + '#faq',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    };
    graph.push(faqEntity);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
