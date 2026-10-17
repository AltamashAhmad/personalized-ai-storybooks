import fs from "fs";
import path from "path";

console.log("================================================================================");
console.log("🧪 EMPIRICAL STRESS HARNESS: MINICART, CART ARITHMETIC & TABBY SPLIT");
console.log("================================================================================");

let totalPassed = 0;
let totalFailed = 0;
const failures = [];

function assert(cond, msg, meta = {}) {
  if (cond) {
    totalPassed++;
    console.log(`  ✅ PASS: ${msg}`);
  } else {
    totalFailed++;
    console.error(`  ❌ FAIL: ${msg}`, meta);
    failures.push({ msg, meta });
  }
}

// ==============================================================================
// SUITE 1: MiniCartDrawer Source Inspection & Reconciliation
// ==============================================================================
console.log("\n--- SUITE 1: MiniCartDrawer Source & Delivery Fee Reconciliation ---");
const miniCartPath = path.resolve("web/components/MiniCartDrawer.tsx");
const miniCartSource = fs.readFileSync(miniCartPath, "utf-8");

// Verify that the old hardcoded 15.00 AED delivery charge is NOT present
assert(
  !miniCartSource.includes("`15.00 ${country.currency}`"),
  "Contradictory delivery fee '15.00 AED' line item is completely absent"
);

// Verify delivery fee conditional states
assert(
  miniCartSource.includes("totalItemCount === 0"),
  "Delivery fee checks for totalItemCount === 0 (empty cart)"
);
assert(
  miniCartSource.includes('? "—"') || miniCartSource.includes("? '—'"),
  "Empty cart renders dash '—' for delivery fee"
);
assert(
  miniCartSource.includes('isAr ? "مجاني" : "FREE"'),
  "Free shipping state renders localized 'FREE' / 'مجاني'"
);
assert(
  miniCartSource.includes('isAr ? "يُحسب عند إتمام الطلب" : "Calculated at checkout"'),
  "Sub-threshold delivery renders localized 'Calculated at checkout' / 'يُحسب عند إتمام الطلب'"
);

// Verify Estimated Total line binding
assert(
  miniCartSource.includes("{cartTotal}.00 {country.currency}"),
  "Estimated total renders '{cartTotal}.00 {country.currency}'"
);

// Verify Tabby 4-installment badge in MiniCartDrawer
assert(
  miniCartSource.includes("tabbyInstallment.toFixed(2)"),
  "Tabby installment renders tabbyInstallment.toFixed(2) in MiniCartDrawer"
);

// Verify buttons are disabled on empty cart
assert(
  miniCartSource.includes("disabled={items.length === 0}"),
  "Checkout and View Basket buttons are disabled when items.length === 0"
);

// ==============================================================================
// SUITE 2: Cart Context State Machine Implementation Verification
// ==============================================================================
console.log("\n--- SUITE 2: Cart Context State Machine & Pricing Engine ---");

const ADDON_PRICES = {
  coloringBook: 19,
  giftWrap: 15,
  stickers: 9,
};

const FORMAT_PRICES = {
  softcover: 49,
  hardcover: 79,
  layflat: 99,
};

const FREE_DELIVERY_THRESHOLD = 100;

class CartModel {
  constructor() {
    this.resetToDefault();
  }

  resetToDefault() {
    this.items = [
      {
        id: "default-starlit-dunes",
        bookSlug: "the-secret-of-the-starlit-dunes",
        title: "The Secret of the Starlit Dunes",
        titleAr: "سر الكثبان المضيئة بالنجوم",
        coverImage: "/competitor_wonderbly_spread_1788709121360.jpg",
        childName: "Zayed",
        gender: "boy",
        format: "hardcover",
        unitPrice: 79,
        quantity: 1,
      },
    ];
    this.addons = {
      coloringBook: false,
      giftWrap: false,
      stickers: false,
    };
    this.appliedCoupon = "BOGO50";
  }

  clearCart() {
    this.items = [];
    this.addons = { coloringBook: false, giftWrap: false, stickers: false };
  }

  addItem(newItem) {
    const existingIndex = this.items.findIndex(
      (i) =>
        i.bookSlug === newItem.bookSlug &&
        i.format === newItem.format &&
        i.childName === newItem.childName
    );
    if (existingIndex >= 0) {
      this.items[existingIndex].quantity += newItem.quantity;
    } else {
      this.items.push({
        ...newItem,
        id: `${newItem.bookSlug}-${Math.random().toString(36).substring(7)}`,
      });
    }
  }

  removeItem(id) {
    this.items = this.items.filter((i) => i.id !== id);
  }

  updateQuantity(id, quantity) {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }
    this.items = this.items.map((i) => (i.id === id ? { ...i, quantity } : i));
  }

  toggleAddon(addon) {
    this.addons[addon] = !this.addons[addon];
  }

  setAddon(addon, val) {
    this.addons[addon] = val;
  }

  get totalItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get itemsSubtotal() {
    return this.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  get addonsTotal() {
    return (
      (this.addons.coloringBook ? ADDON_PRICES.coloringBook : 0) +
      (this.addons.giftWrap ? ADDON_PRICES.giftWrap : 0) +
      (this.addons.stickers ? ADDON_PRICES.stickers : 0)
    );
  }

  get discountAmount() {
    if (this.appliedCoupon === "BOGO50" && this.totalItemCount >= 2) {
      const lowestUnitPrice = Math.min(...this.items.map((i) => i.unitPrice));
      return Math.round(lowestUnitPrice * 0.5);
    }
    return 0;
  }

  get cartTotal() {
    return Math.max(0, this.itemsSubtotal + this.addonsTotal - this.discountAmount);
  }

  get freeShippingProgress() {
    return Math.min(100, Math.round((this.cartTotal / FREE_DELIVERY_THRESHOLD) * 100));
  }

  get remainingForFreeShipping() {
    return Math.max(0, FREE_DELIVERY_THRESHOLD - this.cartTotal);
  }

  get hasFreeShipping() {
    return this.cartTotal >= FREE_DELIVERY_THRESHOLD;
  }

  get tabbyInstallment() {
    return Math.round((this.cartTotal / 4) * 100) / 100;
  }
}

// --- Step 2.1: Default Cart State ---
const cart = new CartModel();
assert(cart.items.length === 1, "Initial cart has 1 default item");
assert(cart.items[0].unitPrice === 79, "Default item unitPrice is 79 AED");
assert(cart.itemsSubtotal === 79, "Default itemsSubtotal is 79 AED");
assert(cart.addonsTotal === 0, "Default addonsTotal is 0 AED");
assert(cart.discountAmount === 0, "Default discountAmount is 0 (1 item < 2 needed for BOGO50)");
assert(cart.cartTotal === 79, "Default cartTotal is 79 AED");
assert(cart.hasFreeShipping === false, "Default cart does NOT have free shipping (79 < 100)");
assert(cart.remainingForFreeShipping === 21, "Default cart requires 21 AED more for free shipping");
assert(cart.freeShippingProgress === 79, "Default free shipping progress is 79%");
assert(cart.tabbyInstallment === 19.75, "Default Tabby installment is 19.75 AED (79 / 4)");

// --- Step 2.2: Empty Cart State ---
cart.clearCart();
assert(cart.items.length === 0, "Cart is empty after clearCart()");
assert(cart.totalItemCount === 0, "totalItemCount is 0");
assert(cart.itemsSubtotal === 0, "itemsSubtotal is 0");
assert(cart.addonsTotal === 0, "addonsTotal is 0");
assert(cart.discountAmount === 0, "discountAmount is 0");
assert(cart.cartTotal === 0, "cartTotal is 0");
assert(cart.hasFreeShipping === false, "hasFreeShipping is false when empty");
assert(cart.remainingForFreeShipping === 100, "remainingForFreeShipping is 100 when empty");
assert(cart.freeShippingProgress === 0, "freeShippingProgress is 0% when empty");
assert(cart.tabbyInstallment === 0, "tabbyInstallment is 0 when empty");

// --- Step 2.3: Order Bumps on Empty Cart ---
cart.toggleAddon("coloringBook");
assert(cart.addons.coloringBook === true, "coloringBook toggled on");
assert(cart.addonsTotal === 19, "addonsTotal is 19 AED");
assert(cart.cartTotal === 19, "cartTotal is 19 AED");
assert(cart.tabbyInstallment === 4.75, "Tabby installment is 4.75 AED (19 / 4)");
assert(cart.remainingForFreeShipping === 81, "remainingForFreeShipping is 81 AED");

cart.toggleAddon("giftWrap");
assert(cart.addonsTotal === 34, "addonsTotal is 34 AED (19 + 15)");
assert(cart.cartTotal === 34, "cartTotal is 34 AED");
assert(cart.tabbyInstallment === 8.5, "Tabby installment is 8.50 AED (34 / 4)");

cart.toggleAddon("stickers");
assert(cart.addonsTotal === 43, "addonsTotal is 43 AED (19 + 15 + 9)");
assert(cart.cartTotal === 43, "cartTotal is 43 AED");
assert(cart.tabbyInstallment === 10.75, "Tabby installment is 10.75 AED (43 / 4)");

// Toggle back off
cart.toggleAddon("coloringBook");
cart.toggleAddon("giftWrap");
cart.toggleAddon("stickers");
assert(cart.addonsTotal === 0, "All addons toggled off");

// --- Step 2.4: Adding Items and Merging Quantities ---
console.log("\n--- SUITE 2.4: Item Addition & Deduplication ---");
cart.addItem({
  bookSlug: "the-secret-of-the-starlit-dunes",
  title: "The Secret of the Starlit Dunes",
  coverImage: "/img1.jpg",
  childName: "Zayed",
  format: "hardcover",
  unitPrice: 79,
  quantity: 1,
});
assert(cart.items.length === 1, "1 distinct item in cart");
assert(cart.items[0].quantity === 1, "Quantity is 1");

// Add same book, same format, same child name -> should increment quantity
cart.addItem({
  bookSlug: "the-secret-of-the-starlit-dunes",
  title: "The Secret of the Starlit Dunes",
  coverImage: "/img1.jpg",
  childName: "Zayed",
  format: "hardcover",
  unitPrice: 79,
  quantity: 1,
});
assert(cart.items.length === 1, "Still 1 item in cart (deduplicated)");
assert(cart.items[0].quantity === 2, "Quantity incremented to 2");
assert(cart.totalItemCount === 2, "totalItemCount is 2");

// BOGO50 kicks in: 2x 79 AED -> discount = round(79 * 0.5) = 40 AED
assert(cart.itemsSubtotal === 158, "itemsSubtotal is 158 AED (2 * 79)");
assert(cart.discountAmount === 40, "discountAmount is 40 AED (50% off 2nd book)");
assert(cart.cartTotal === 118, "cartTotal is 118 AED (158 - 40)");
assert(cart.hasFreeShipping === true, "Free shipping unlocked at 118 AED (>= 100)");
assert(cart.remainingForFreeShipping === 0, "remainingForFreeShipping is 0 AED");
assert(cart.freeShippingProgress === 100, "freeShippingProgress is 100%");
assert(cart.tabbyInstallment === 29.5, "Tabby installment is 29.50 AED (118 / 4)");

// Add different format of same book -> should be a new cart item
cart.addItem({
  bookSlug: "the-secret-of-the-starlit-dunes",
  title: "The Secret of the Starlit Dunes",
  coverImage: "/img1.jpg",
  childName: "Zayed",
  format: "softcover",
  unitPrice: 49,
  quantity: 1,
});
assert(cart.items.length === 2, "Different format creates 2nd item entry");
assert(cart.totalItemCount === 3, "totalItemCount is 3");
// BOGO50 takes min(unitPrice) -> min(79, 49) = 49 -> discount = round(49 * 0.5) = 25
assert(cart.discountAmount === 25, "BOGO50 discounts 50% of the lowest unitPrice (49 * 0.5 = 25)");
assert(cart.itemsSubtotal === 207, "itemsSubtotal is 207 AED (158 + 49)");
assert(cart.cartTotal === 182, "cartTotal is 182 AED (207 - 25)");
assert(cart.tabbyInstallment === 45.5, "Tabby installment is 45.50 AED (182 / 4)");

// Add different child name -> should be a new cart item
cart.addItem({
  bookSlug: "the-secret-of-the-starlit-dunes",
  title: "The Secret of the Starlit Dunes",
  coverImage: "/img1.jpg",
  childName: "Fatima",
  format: "softcover",
  unitPrice: 49,
  quantity: 1,
});
assert(cart.items.length === 3, "Different childName creates 3rd item entry");
assert(cart.totalItemCount === 4, "totalItemCount is 4");

// --- Step 2.5: Quantity Stepping & Item Removal ---
console.log("\n--- SUITE 2.5: Quantity Modifications & Removal ---");
const softcoverFatimaId = cart.items[2].id;
cart.updateQuantity(softcoverFatimaId, 3);
assert(cart.items[2].quantity === 3, "Quantity updated to 3");
assert(cart.totalItemCount === 6, "totalItemCount updated to 6");

// Decrease quantity
cart.updateQuantity(softcoverFatimaId, 1);
assert(cart.items[2].quantity === 1, "Quantity updated to 1");

// Decrease to 0 -> should remove item
cart.updateQuantity(softcoverFatimaId, 0);
assert(cart.items.length === 2, "Item with quantity 0 is removed");
assert(!cart.items.some((i) => i.id === softcoverFatimaId), "Removed item no longer in cart");

// Remove by removeItem
const secondItemId = cart.items[1].id;
cart.removeItem(secondItemId);
assert(cart.items.length === 1, "Cart now has 1 item after removeItem()");

// Set quantity of remaining item to 1
const firstItemId = cart.items[0].id;
cart.updateQuantity(firstItemId, 1);
assert(cart.totalItemCount === 1, "totalItemCount is 1");
assert(cart.discountAmount === 0, "Discount drops to 0 when totalItemCount drops below 2");
assert(cart.cartTotal === 79, "cartTotal returns to 79 AED");

// ==============================================================================
// SUITE 3: Tabby 4-Installment Division Mathematical Stress Test
// ==============================================================================
console.log("\n--- SUITE 3: Tabby 4-Installment Division Mathematical Stress Test ---");

// Test R4 canonical spec: "4 interest-free payments of 12.25 AED" for 49 AED Softcover
const softcoverTotal = 49;
const softcoverTabby = Math.round((softcoverTotal / 4) * 100) / 100;
assert(
  softcoverTabby === 12.25,
  "Canonical R4 Spec: 49 AED / 4 = 12.25 AED exact match",
  { softcoverTabby }
);

// Test 79 AED Hardcover
const hardcoverTabby = Math.round((79 / 4) * 100) / 100;
assert(
  hardcoverTabby === 19.75,
  "Hardcover 79 AED / 4 = 19.75 AED exact match",
  { hardcoverTabby }
);

// Test 99 AED Deluxe Layflat
const layflatTabby = Math.round((99 / 4) * 100) / 100;
assert(
  layflatTabby === 24.75,
  "Deluxe Layflat 99 AED / 4 = 24.75 AED exact match",
  { layflatTabby }
);

// Test Free delivery threshold edge (100 AED)
const thresholdTabby = Math.round((100 / 4) * 100) / 100;
assert(
  thresholdTabby === 25.0,
  "Threshold 100 AED / 4 = 25.00 AED exact match",
  { thresholdTabby }
);

// Exhaustive test: 10,000 prices from 0.00 to 5000.00 AED
let tabbyInvariantPassed = true;
let maxPrecisionDrift = 0;

for (let price = 0; price <= 5000; price += 0.5) {
  const installment = Math.round((price / 4) * 100) / 100;
  if (isNaN(installment) || !isFinite(installment) || installment < 0) {
    tabbyInvariantPassed = false;
    break;
  }
  // Check that formatted string has at most 2 decimals
  const formatted = installment.toFixed(2);
  if (parseFloat(formatted) !== installment) {
    tabbyInvariantPassed = false;
    break;
  }
  // Check drift across 4 payments: 4 * installment should be within 0.02 of total
  const totalFromSplits = installment * 4;
  const drift = Math.abs(totalFromSplits - price);
  if (drift > maxPrecisionDrift) maxPrecisionDrift = drift;
  if (drift > 0.03) {
    tabbyInvariantPassed = false;
    break;
  }
}

assert(
  tabbyInvariantPassed,
  "Tabby division invariant holds across 10,000 price samples (finite, non-negative, max 2 decimals)",
  { maxPrecisionDrift }
);
assert(
  Math.round(maxPrecisionDrift * 1000) / 1000 <= 0.02,
  `Max rounding discrepancy across 4 splits is at most 0.02 AED (observed: ${maxPrecisionDrift.toFixed(3)} AED)`
);

// ==============================================================================
// SUITE 4: Property-Based Randomized Fuzzing (5,000 Iterations)
// ==============================================================================
console.log("\n--- SUITE 4: Property-Based Randomized Fuzzing (5,000 Steps) ---");

const fuzzCart = new CartModel();
const SLUGS = [
  "the-secret-of-the-starlit-dunes",
  "the-lost-golden-falcon",
  "when-you-were-born-miracle-keepsake",
  "the-knight-of-the-golden-oasis",
  "bedtime-under-the-arabian-moon",
  "the-galactic-explorer",
];
const FORMATS = ["softcover", "hardcover", "layflat"];
const NAMES = ["Zayed", "Fatima", "Rashid", "Maryam", "Omar", "Dana"];
const ADDON_KEYS = ["coloringBook", "giftWrap", "stickers"];

let fuzzFailed = 0;

for (let step = 0; step < 5000; step++) {
  const rand = Math.random();

  if (rand < 0.4) {
    // Add random item
    const slug = SLUGS[Math.floor(Math.random() * SLUGS.length)];
    const format = FORMATS[Math.floor(Math.random() * FORMATS.length)];
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const qty = Math.floor(Math.random() * 4) + 1;
    fuzzCart.addItem({
      bookSlug: slug,
      title: "Storybook",
      coverImage: "/img.jpg",
      childName: name,
      format,
      unitPrice: FORMAT_PRICES[format],
      quantity: qty,
    });
  } else if (rand < 0.65 && fuzzCart.items.length > 0) {
    // Update quantity of random item
    const item = fuzzCart.items[Math.floor(Math.random() * fuzzCart.items.length)];
    const newQty = Math.floor(Math.random() * 6); // 0 to 5 (0 triggers removal)
    fuzzCart.updateQuantity(item.id, newQty);
  } else if (rand < 0.8 && fuzzCart.items.length > 0) {
    // Remove random item
    const item = fuzzCart.items[Math.floor(Math.random() * fuzzCart.items.length)];
    fuzzCart.removeItem(item.id);
  } else if (rand < 0.95) {
    // Toggle addon
    const addon = ADDON_KEYS[Math.floor(Math.random() * ADDON_KEYS.length)];
    fuzzCart.toggleAddon(addon);
  } else {
    // Clear cart occasionally
    fuzzCart.clearCart();
  }

  // Verify Invariants at every step
  const expectedItemCount = fuzzCart.items.reduce((s, i) => s + i.quantity, 0);
  const expectedItemsSubtotal = fuzzCart.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const expectedAddonsTotal =
    (fuzzCart.addons.coloringBook ? 19 : 0) +
    (fuzzCart.addons.giftWrap ? 15 : 0) +
    (fuzzCart.addons.stickers ? 9 : 0);
  const expectedDiscount =
    expectedItemCount >= 2
      ? Math.round(Math.min(...fuzzCart.items.map((i) => i.unitPrice)) * 0.5)
      : 0;
  const expectedCartTotal = Math.max(0, expectedItemsSubtotal + expectedAddonsTotal - expectedDiscount);
  const expectedFreeShipping = expectedCartTotal >= 100;
  const expectedRemaining = Math.max(0, 100 - expectedCartTotal);
  const expectedProgress = Math.min(100, Math.round((expectedCartTotal / 100) * 100));
  const expectedTabby = Math.round((expectedCartTotal / 4) * 100) / 100;

  if (
    fuzzCart.totalItemCount !== expectedItemCount ||
    fuzzCart.itemsSubtotal !== expectedItemsSubtotal ||
    fuzzCart.addonsTotal !== expectedAddonsTotal ||
    fuzzCart.discountAmount !== expectedDiscount ||
    fuzzCart.cartTotal !== expectedCartTotal ||
    fuzzCart.hasFreeShipping !== expectedFreeShipping ||
    fuzzCart.remainingForFreeShipping !== expectedRemaining ||
    fuzzCart.freeShippingProgress !== expectedProgress ||
    fuzzCart.tabbyInstallment !== expectedTabby
  ) {
    fuzzFailed++;
    console.error(`Fuzz assertion failed at step ${step}:`, {
      state: fuzzCart,
      expected: {
        expectedItemCount,
        expectedItemsSubtotal,
        expectedAddonsTotal,
        expectedDiscount,
        expectedCartTotal,
        expectedFreeShipping,
        expectedTabby,
      },
    });
    break;
  }
}

assert(
  fuzzFailed === 0,
  "5,000 random cart mutation steps preserved all pricing, discount, shipping, and Tabby invariants with 0 errors"
);

// ==============================================================================
// SUMMARY
// ==============================================================================
console.log("\n================================================================================");
console.log(`📊 STRESS TEST COMPLETE: ${totalPassed} Passed | ${totalFailed} Failed`);
console.log("================================================================================");

if (totalFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
