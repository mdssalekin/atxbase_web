/**
 * Shared data for the Header's Products dropdown, Products.jsx (the
 * section-wise showcase), and ProductDetails.jsx (the individual product
 * page). PRODUCTS is the single source of truth — PRODUCTS_LINKS is
 * derived from it below, so the nav can never drift out of sync with the
 * actual product list.
 *
 * These are placeholder products — swap the copy, features, and images
 * for your real ones. The shape (slug, name, tagline, etc.) is meant to
 * be a drop-in target either way.
 *
 * ---------------------------------------------------------------------
 * ADDING REAL PRODUCT PHOTOS
 * ---------------------------------------------------------------------
 * Vite treats any imported image as a plain URL string, so you can import
 * images at the top of this file just like in a component:
 *
 *   import product1Cover from "../../assets/products/product-1.jpg";
 *
 * Then attach it to the matching product's `cover` field below, e.g.:
 *
 *   { slug: "product-1", ..., cover: product1Cover }
 *
 * Products.jsx and ProductDetails.jsx already check for `cover` and
 * render the real image when it's set, falling back to a placeholder
 * panel when it's null — so you can add these one product at a time.
 */

// import product1Cover from "../../assets/products/product-1.jpg";
// import product2Cover from "../../assets/products/product-2.jpg";
// import product3Cover from "../../assets/products/product-3.jpg";

export const PRODUCTS = [
  {
    slug: "product-1",
    name: "Product 1",
    tagline: "A one-line description of the problem this product solves.",
    category: "Software",
    summary:
      "Replace this with a short, honest summary of what Product 1 actually does and who it's built for.",
    description:
      "Expand here on how the product works day to day — the core workflow, what makes it different from alternatives, and why a customer would choose it. Two or three sentences is usually enough; this isn't the place for a full feature list.",
    features: [
      "Replace with a real feature or capability",
      "Replace with a real feature or capability",
      "Replace with a real feature or capability",
      "Replace with a real feature or capability",
    ],
    cover: null, // swap to `product1Cover` once imported above
  },
  {
    slug: "product-2",
    name: "Product 2",
    tagline: "A one-line description of the problem this product solves.",
    category: "Software",
    summary:
      "Replace this with a short, honest summary of what Product 2 actually does and who it's built for.",
    description:
      "Expand here on how the product works day to day — the core workflow, what makes it different from alternatives, and why a customer would choose it.",
    features: [
      "Replace with a real feature or capability",
      "Replace with a real feature or capability",
      "Replace with a real feature or capability",
      "Replace with a real feature or capability",
    ],
    cover: null, // swap to `product2Cover` once imported above
  },
  {
    slug: "product-3",
    name: "Product 3",
    tagline: "A one-line description of the problem this product solves.",
    category: "Software",
    summary:
      "Replace this with a short, honest summary of what Product 3 actually does and who it's built for.",
    description:
      "Expand here on how the product works day to day — the core workflow, what makes it different from alternatives, and why a customer would choose it.",
    features: [
      "Replace with a real feature or capability",
      "Replace with a real feature or capability",
      "Replace with a real feature or capability",
      "Replace with a real feature or capability",
    ],
    cover: null, // swap to `product3Cover` once imported above
  },
];

// Derived, not hand-maintained — the Header dropdown always matches PRODUCTS.
export const PRODUCTS_LINKS = PRODUCTS.map((p) => ({
  label: p.name,
  path: `/products/${p.slug}`,
}));

export const getProductBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const getRelatedProducts = (slug, limit = 2) =>
  PRODUCTS.filter((p) => p.slug !== slug).slice(0, limit);