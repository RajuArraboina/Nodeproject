const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '../../frontend/frontend/src/style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const marker = '/* RESTAURANT DETAILS 2-COLUMN VIEW & RIGHT SHOWCASE SIDEBAR */';

if (!css.includes(marker)) {
  const stylesToAdd = `

/* ==========================================================================
   ${marker}
   ========================================================================== */

.restaurant-detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(350px, 430px);
  gap: 28px;
  align-items: start;
  margin-top: 18px;
}

.restaurant-detail-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.selected-restaurant-card {
  width: 100% !important;
  margin: 0 !important;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
}

.selected-restaurant-card .restaurant-panel-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 8px;
}

.selected-restaurant-card .restaurant-panel-heading h2 {
  margin: 0;
  font-size: 1.65rem;
  color: var(--ink);
  letter-spacing: -0.02em;
}

.selected-restaurant-card .restaurant-description {
  margin: 6px 0 14px;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.selected-restaurant-card .restaurant-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: 1px solid #f0f0f0;
  color: #4b5563;
  font-size: 0.88rem;
  font-weight: 600;
}

.menu-section-wrapper {
  margin-top: 20px;
}

.menu-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f3f3f3;
}

.menu-section-header h3 {
  margin: 0 !important;
  font-size: 1.18rem !important;
  font-weight: 800 !important;
  color: var(--ink) !important;
  letter-spacing: normal !important;
  text-transform: none !important;
}

.menu-count-badge {
  padding: 4px 12px;
  border-radius: 999px;
  background: #fff4ec;
  color: var(--brand-dark);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

/* RIGHT SIDEBAR (THE SHOWCASE CARD & LIVE CART) */
.restaurant-detail-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 86px;
}

/* 1. RESTAURANT HERO SHOWCASE CARD */
.restaurant-showcase-card {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.restaurant-showcase-card:hover {
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.12);
}

.showcase-image-container {
  position: relative;
  width: 100%;
  height: 235px;
  overflow: hidden;
  background: #0f172a;
}

.showcase-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.restaurant-showcase-card:hover .showcase-image {
  transform: scale(1.04);
}

.showcase-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.05) 45%, rgba(0, 0, 0, 0.85) 100%);
  color: #ffffff;
}

.showcase-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.showcase-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.showcase-pill.live {
  background: rgba(252, 128, 25, 0.95);
  color: #ffffff;
}

.showcase-pill.hygiene {
  background: rgba(22, 128, 60, 0.9);
  color: #ffffff;
}

.showcase-caption h4 {
  margin: 0 0 3px;
  font-size: 1.22rem;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
}

.showcase-caption p {
  margin: 0;
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

/* Showcase Food Gallery Strip */
.showcase-dish-gallery {
  padding: 14px 16px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.gallery-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.gallery-header small {
  text-transform: none;
  font-weight: 600;
  color: var(--brand-dark);
}

.gallery-chips {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.gallery-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 6px 4px 8px;
  border: 1.5px solid transparent;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
}

.gallery-chip:hover {
  border-color: var(--brand);
  transform: translateY(-2px);
}

.gallery-chip.active-chip {
  border-color: var(--brand);
  background: #fff8f2;
  box-shadow: 0 4px 12px rgba(252, 128, 25, 0.22);
}

.gallery-chip img {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  object-fit: cover;
}

.gallery-chip span {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--ink);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

/* Service Highlights Feature Tiles */
.showcase-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px;
  background: #ffffff;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.feature-icon {
  font-size: 1.35rem;
  line-height: 1;
}

.feature-item div {
  display: flex;
  flex-direction: column;
}

.feature-item strong {
  font-size: 0.84rem;
  color: var(--ink);
  line-height: 1.2;
}

.feature-item small {
  font-size: 0.72rem;
  color: var(--muted);
}

/* 2. SIDEBAR STICKY LIVE CART */
.sidebar-order-summary {
  margin-top: 0 !important;
  background: #ffffff !important;
  border: 1.5px solid rgba(252, 128, 25, 0.35) !important;
  border-radius: 22px !important;
  box-shadow: 0 12px 36px rgba(252, 128, 25, 0.12) !important;
  padding: 20px !important;
}

.sidebar-order-summary .order-summary-heading p {
  color: var(--brand-dark);
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.sidebar-order-summary .order-total {
  font-size: 1.3rem;
  font-weight: 800;
}

.cart-item-stepper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mini-qty-btn {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  background: #ffffff;
  color: var(--brand-dark);
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mini-qty-btn:hover {
  background: #fff2e8;
  border-color: var(--brand);
}

.cart-item-stepper span {
  min-width: 16px;
  text-align: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--ink);
}

/* EMPTY CART PROMO CARD */
.empty-cart-promo-card {
  padding: 22px 20px;
  border: 1.5px dashed rgba(252, 128, 25, 0.4);
  border-radius: 22px;
  background: linear-gradient(180deg, #fffbf7 0%, #ffffff 100%);
  text-align: center;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.03);
}

.empty-cart-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background: #fff2e6;
  color: var(--brand-dark);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.empty-cart-promo-card h4 {
  margin: 0 0 6px;
  font-size: 1.08rem;
  font-weight: 800;
  color: var(--ink);
}

.empty-cart-promo-card p {
  margin: 0 0 14px;
  font-size: 0.86rem;
  color: var(--muted);
  line-height: 1.5;
}

.empty-cart-coupon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(252, 128, 25, 0.25);
  box-shadow: 0 2px 8px rgba(252, 128, 25, 0.06);
}

.empty-cart-coupon span {
  font-size: 0.72rem;
  color: var(--muted);
  font-weight: 600;
}

.empty-cart-coupon strong {
  font-size: 1.15rem;
  color: var(--brand-dark);
  letter-spacing: 0.08em;
  font-family: monospace;
}

.empty-cart-coupon small {
  font-size: 0.75rem;
  color: #16803c;
  font-weight: 700;
}

/* RESPONSIVE BREAKDOWN */
@media (max-width: 960px) {
  .restaurant-detail-layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .restaurant-detail-sidebar {
    position: static;
  }
}
`;

  fs.appendFileSync(cssPath, stylesToAdd, 'utf8');
  console.log('style.css updated successfully with new styles!');
} else {
  console.log('style.css already contains the new styles.');
}
