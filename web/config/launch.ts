/**
 * Launch configuration — single source of truth for launch-phase gating.
 *
 * DIGITAL_ONLY_LAUNCH = true
 *   The store sells ONLY the digital soft-copy edition at launch (49 AED,
 *   instant delivery to email & WhatsApp). All physical products —
 *   softcover / hardcover / layflat print formats, gift box, gift wrap,
 *   stickers, coloring book, audio keepsake, photo print — are "coming soon".
 *   They render as unavailable (never purchasable) until physical
 *   fulfillment is ready.
 *
 * HOW TO TURN PHYSICAL ON: flip this to `false`. Every gate reads this
 * flag, so no other change is needed:
 *   - app/create/formats: digital selectable; print formats disabled + badge
 *   - app/create/giftwraps: skipped (auto-redirects to /cart)
 *   - app/cart + MiniCartDrawer: physical add-ons disabled + badge
 *   - app/api/checkout: rejects non-digital formats and any add-ons (server)
 *   - ProductDetailView + CoverFormatSelector: format/add-on selectors gated
 *   - homepage / announcement / hero / SEO: digital-first copy
 *   - FAQ + delivery page: honest launch notes
 */
export const DIGITAL_ONLY_LAUNCH = true;
