const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../frontend/frontend/src');
const styleCssPath = path.join(srcDir, 'style.css');

const modernDesignCss = `
/* ==========================================================================
   SR RESTAURANTS - PROFESSIONAL MODERN FOOD PLATFORM DESIGN SYSTEM
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');

:root {
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-serif: 'Fraunces', Georgia, serif;
  
  /* Palette */
  --brand-primary: #ea580c;
  --brand-light: #ffedd5;
  --brand-hover: #c2410c;
  --brand-gradient: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  
  --surface-bg: #f8fafc;
  --surface-card: #ffffff;
  --surface-subtle: #f1f5f9;
  
  --text-main: #0f172a;
  --text-muted: #64748b;
  --text-subtle: #94a3b8;
  
  --border-light: #e2e8f0;
  --border-focus: #ea580c;
  
  --success: #16a34a;
  --success-light: #dcfce7;
  --danger: #dc2626;
  --danger-light: #fee2e2;
  
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 9999px;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 16px -1px rgba(15, 23, 42, 0.08);
  --shadow-lg: 0 16px 36px -4px rgba(15, 23, 42, 0.1);
  --shadow-hover: 0 20px 40px -10px rgba(234, 88, 12, 0.14);
}

/* Global Reset & Base Setup */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-sans);
  color: var(--text-main);
  background-color: var(--surface-bg);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--surface-bg);
  min-height: 100vh;
  overflow-x: hidden;
  width: 100%;
}

#app {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1 0 auto;
  width: 100%;
}

/* Typography Base */
h1, h2, h3, h4, h5, h6 {
  color: var(--text-main);
  font-weight: 700;
  line-height: 1.25;
}

p {
  line-height: 1.6;
  color: var(--text-muted);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
}

/* Buttons Base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-primary {
  background: var(--brand-gradient);
  color: white;
  box-shadow: 0 4px 14px rgba(234, 88, 12, 0.28);
}
.btn-primary:hover {
  opacity: 0.94;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(234, 88, 12, 0.35);
}

.btn-outline {
  background: transparent;
  border-color: var(--border-light);
  color: var(--text-main);
}
.btn-outline:hover {
  background: var(--surface-subtle);
  border-color: var(--text-muted);
}

.btn-danger {
  background: var(--danger-light);
  color: var(--danger);
  border-color: rgba(220, 38, 38, 0.2);
}
.btn-danger:hover {
  background: var(--danger);
  color: white;
}

/* ==========================================================================
   1. NAVBAR (site-header)
   ========================================================================== */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border-light);
  box-shadow: 0 2px 14px rgba(15, 23, 42, 0.04);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1360px;
  margin: 0 auto;
  padding: 14px 24px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--brand-gradient);
  color: white;
  font-size: 22px;
  box-shadow: 0 4px 14px rgba(234, 88, 12, 0.32);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--brand-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 6px;
  list-style: none;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
}

.nav-link:hover {
  color: var(--brand-primary);
  background: var(--brand-light);
}

.nav-link.active {
  color: var(--brand-primary);
  background: var(--brand-light);
}

.nav-user-cluster {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface-bg);
  border: 1px solid var(--border-light);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
}

.user-icon {
  font-size: 1.1rem;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-main);
}

.badge-admin-tag {
  background: var(--brand-primary);
  color: white;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}

.btn-nav-logout {
  background: transparent;
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-nav-logout:hover {
  background: var(--danger-light);
  border-color: rgba(220, 38, 38, 0.3);
  color: var(--danger);
}

.nav-auth-cluster {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-nav-register {
  background: var(--brand-gradient);
  color: white;
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.25);
  transition: all 0.2s;
}

.btn-nav-register:hover {
  opacity: 0.94;
  transform: translateY(-1px);
}

.mobile-nav-toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font-size: 1.25rem;
  color: var(--text-main);
}

/* ==========================================================================
   2. HOME PAGE
   ========================================================================== */
.home-container {
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
  padding-bottom: 80px;
}

.hero-section {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;
  max-width: 1360px;
  margin: 24px auto 0;
  padding: 54px 44px;
  background: linear-gradient(135deg, #fffaf5 0%, #ffffff 50%, #fff7ed 100%);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(254, 215, 170, 0.5);
  box-shadow: 0 20px 40px -15px rgba(234, 88, 12, 0.08);
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.hero-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: #ffedd5;
  color: #c2410c;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 700;
  width: fit-content;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand-primary);
  box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.7);
  animation: pulse-ring 1.8s infinite;
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.7); }
  70% { box-shadow: 0 0 0 8px rgba(234, 88, 12, 0); }
  100% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0); }
}

.hero-title {
  font-size: clamp(2.4rem, 4.2vw, 3.6rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--text-main);
  letter-spacing: -0.03em;
}

.hero-title span {
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 560px;
}

.hero-search {
  max-width: 580px;
  width: 100%;
}

.hero-quick-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.88rem;
}

.tags-label {
  color: var(--text-subtle);
  font-weight: 600;
}

.tag-pill {
  background: white;
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  padding: 5px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.2s;
}

.tag-pill:hover {
  background: var(--brand-light);
  border-color: rgba(234, 88, 12, 0.3);
  color: var(--brand-primary);
  transform: translateY(-1px);
}

.hero-stats-row {
  display: flex;
  align-items: center;
  gap: 28px;
  padding-top: 18px;
  border-top: 1px solid var(--border-light);
}

.hero-stat-item {
  display: flex;
  flex-direction: column;
}

.hero-stat-item strong {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-main);
}

.hero-stat-item span {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 600;
}

.hero-stat-divider {
  width: 1px;
  height: 38px;
  background: var(--border-light);
}

.hero-visual-card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-image-wrapper {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 4px solid white;
  max-height: 440px;
  width: 100%;
}

.visual-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.visual-image-wrapper:hover .visual-main-img {
  transform: scale(1.03);
}

.visual-glass-badge {
  position: absolute;
  bottom: -18px;
  left: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: var(--radius-md);
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-md);
}

.badge-icon {
  font-size: 1.4rem;
}

.visual-floating-card {
  position: absolute;
  top: 24px;
  right: -10px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: var(--radius-md);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: var(--shadow-md);
}

.floating-star {
  font-size: 1.2rem;
}

/* Home Section Blocks */
.home-block {
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
}

.block-eyebrow {
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--brand-primary);
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}

.block-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.block-subtitle {
  font-size: 0.98rem;
  color: var(--text-muted);
  margin-top: 6px;
}

/* Cuisines Grid */
.cuisine-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 18px;
}

.cuisine-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 12px;
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  text-decoration: none;
  color: inherit;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
}

.cuisine-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
  border-color: rgba(234, 88, 12, 0.35);
}

.cuisine-img-frame {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 12px;
  background: var(--brand-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.cuisine-img-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cuisine-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-main);
  text-align: center;
}

.cuisine-count {
  font-size: 0.75rem;
  color: var(--text-subtle);
  margin-top: 2px;
}

/* Featured Dishes Grid */
.featured-dishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 26px;
}

.featured-dish-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-dish-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(234, 88, 12, 0.3);
}

.dish-img-wrap {
  position: relative;
  height: 190px;
  overflow: hidden;
  background: var(--surface-subtle);
}

.dish-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.featured-dish-card:hover .dish-img-wrap img {
  transform: scale(1.05);
}

.dish-rating-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  color: white;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  font-weight: 700;
}

.dish-cuisine-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: white;
  color: var(--brand-primary);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 800;
  box-shadow: var(--shadow-sm);
}

.dish-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dish-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 4px;
}

.dish-restaurant {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.dish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--border-light);
}

.dish-price {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-main);
}

.btn-order-link {
  background: var(--brand-light);
  color: var(--brand-primary);
  font-weight: 700;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  transition: all 0.2s;
}

.btn-order-link:hover {
  background: var(--brand-primary);
  color: white;
}

/* Why Choose Section */
.why-choose-section {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: var(--radius-xl);
  padding: 60px 40px;
  margin: 0 auto;
  max-width: 1360px;
  width: 100%;
}

.why-choose-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 44px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}

.feature-box {
  background: white;
  border-radius: var(--radius-lg);
  padding: 32px 26px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-box:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: rgba(234, 88, 12, 0.25);
}

.feature-icon-circle {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-md);
  background: var(--brand-light);
  color: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 18px;
}

.feature-box h4 {
  font-size: 1.18rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.feature-box p {
  font-size: 0.92rem;
  line-height: 1.6;
}

/* Partner CTA Section */
.partner-cta-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: var(--radius-xl);
  padding: 60px 48px;
  color: white;
  max-width: 1360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
  box-shadow: var(--shadow-lg);
}

.partner-cta-content h3 {
  font-size: 2.2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.partner-cta-content p {
  color: #94a3b8;
  font-size: 1.05rem;
  max-width: 580px;
}

.partner-cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.partner-cta-buttons .btn-primary {
  padding: 12px 26px;
  font-size: 1rem;
}

.partner-cta-buttons .btn-outline {
  border-color: #475569;
  color: white;
}
.partner-cta-buttons .btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* ==========================================================================
   3. RESTAURANTS CATALOG PAGE
   ========================================================================== */
.restaurants-page-view {
  max-width: 1360px;
  margin: 0 auto;
  padding: 36px 24px 80px;
  width: 100%;
}

.catalog-header-wrap {
  margin-bottom: 30px;
}

.catalog-main-title {
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.catalog-sub-text {
  font-size: 1.05rem;
  color: var(--text-muted);
}

.catalog-control-bar {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 24px 28px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.filter-controls-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.control-field {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 10px 16px;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-main);
}

.control-field select {
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-main);
  outline: none;
  cursor: pointer;
}

.cuisine-tabs-container {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.cuisine-pill-button {
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
  font-weight: 600;
  border: 1px solid var(--border-light);
  background: white;
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.cuisine-pill-button:hover {
  border-color: var(--brand-primary);
  color: var(--brand-primary);
}

.cuisine-pill-button.active {
  background: var(--brand-primary);
  color: white;
  border-color: var(--brand-primary);
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.28);
}

.active-filter-chips {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 0.88rem;
  padding-top: 4px;
}

.btn-clear-chips {
  background: transparent;
  border: none;
  color: var(--brand-primary);
  font-weight: 700;
  cursor: pointer;
  font-size: 0.85rem;
  text-decoration: underline;
}

/* Restaurant Cards Grid */
.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 30px;
}

.restaurant-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}

.restaurant-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
  border-color: rgba(234, 88, 12, 0.35);
}

.restaurant-card-image-wrapper {
  position: relative;
  height: 210px;
  overflow: hidden;
  background: var(--surface-subtle);
}

.restaurant-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.restaurant-card:hover .restaurant-card-image {
  transform: scale(1.05);
}

.restaurant-rating-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  color: white;
  padding: 5px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 4px;
}

.restaurant-status-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.74rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.status-open {
  background: var(--success-light);
  color: var(--success);
}

.status-closed {
  background: var(--danger-light);
  color: var(--danger);
}

.restaurant-card-content {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.restaurant-card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.restaurant-card-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.25;
}

.restaurant-card-cuisine {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--brand-primary);
  background: var(--brand-light);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
}

.restaurant-card-description {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.restaurant-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.82rem;
  color: var(--text-subtle);
  padding-top: 14px;
  border-top: 1px solid var(--border-light);
  margin-top: auto;
}

.card-location {
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-menu-count {
  font-weight: 700;
  color: var(--text-muted);
}

/* ==========================================================================
   4. RESTAURANT DETAILS PAGE
   ========================================================================== */
.restaurant-details-view {
  max-width: 1360px;
  margin: 0 auto;
  padding: 24px 24px 80px;
  width: 100%;
}

.details-breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
  font-size: 0.92rem;
}

.breadcrumb-back {
  color: var(--brand-primary);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}

.breadcrumb-path {
  color: var(--text-subtle);
}

.breadcrumb-path .current {
  color: var(--text-main);
  font-weight: 700;
}

.order-notification-banner {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #065f46;
  padding: 14px 20px;
  border-radius: var(--radius-md);
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.12);
}

.restaurant-showcase-banner {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  min-height: 300px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 36px;
  box-shadow: var(--shadow-lg);
}

.showcase-cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.showcase-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.88) 100%);
}

.showcase-info {
  position: relative;
  z-index: 2;
  padding: 36px 40px;
  color: white;
  width: 100%;
}

.showcase-status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-right: 12px;
}

.showcase-cuisine {
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(8px);
  padding: 4px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 700;
}

.showcase-rating {
  margin-left: 14px;
  font-weight: 800;
  color: #fde047;
}

.showcase-name {
  font-size: clamp(2.2rem, 3.8vw, 3rem);
  font-weight: 800;
  margin: 14px 0 8px;
  letter-spacing: -0.02em;
  color: white;
}

.showcase-desc {
  font-size: 1.05rem;
  opacity: 0.92;
  max-width: 720px;
  margin-bottom: 14px;
  line-height: 1.5;
  color: #e2e8f0;
}

.showcase-meta-line {
  display: flex;
  gap: 22px;
  font-size: 0.92rem;
  opacity: 0.9;
  flex-wrap: wrap;
}

/* Two-column Menu & Sticky Cart Layout */
.details-split-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 36px;
  align-items: start;
}

.menu-column {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.menu-toolbar-panel {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}

.menu-heading-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-heading-group h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-main);
}

.menu-badge-count {
  background: var(--surface-subtle);
  color: var(--text-muted);
  padding: 3px 12px;
  border-radius: var(--radius-pill);
  font-size: 0.82rem;
  font-weight: 700;
}

.menu-filter-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  font-size: 0.92rem;
  outline: none;
  transition: border-color 0.2s;
}
.menu-filter-input:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.12);
}

.menu-cat-pills {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.menu-cat-btn {
  padding: 6px 16px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-light);
  background: var(--surface-bg);
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.menu-cat-btn:hover {
  border-color: var(--brand-primary);
  color: var(--brand-primary);
}

.menu-cat-btn.active {
  background: var(--brand-primary);
  color: white;
  border-color: var(--brand-primary);
  box-shadow: 0 4px 10px rgba(234, 88, 12, 0.25);
}

.menu-card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Sticky Cart Sidebar */
.cart-column {
  position: sticky;
  top: 96px;
}

.cart-card-sticky {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 26px;
  box-shadow: var(--shadow-md);
}

.cart-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-light);
}

.cart-card-header h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-main);
}

.cart-items-tag {
  background: var(--brand-light);
  color: var(--brand-primary);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 800;
}

.cart-empty-block {
  text-align: center;
  padding: 40px 16px;
  color: var(--text-subtle);
}

.cart-empty-graphic {
  font-size: 2.8rem;
  margin-bottom: 10px;
}

.cart-rows-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 290px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 4px;
}

.cart-product-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.92rem;
}

.cart-product-name {
  font-weight: 700;
  color: var(--text-main);
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dot-veg {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  margin-right: 6px;
}

.cart-product-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-stepper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 3px 8px;
}

.cart-stepper button {
  border: none;
  background: transparent;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  color: var(--brand-primary);
  line-height: 1;
}

.cart-product-price {
  font-weight: 800;
  color: var(--text-main);
  min-width: 50px;
  text-align: right;
}

.cart-summary-breakdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 0;
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.summary-line {
  display: flex;
  justify-content: space-between;
}

.summary-line.total {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-main);
  margin-top: 6px;
}

.btn-order-checkout {
  width: 100%;
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: 14px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(22, 163, 74, 0.32);
  transition: all 0.2s;
}

.btn-order-checkout:hover {
  opacity: 0.95;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(22, 163, 74, 0.4);
}

.cart-micro-guarantee {
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-subtle);
  margin-top: 12px;
}

/* ==========================================================================
   5. SEARCHBAR COMPONENT
   ========================================================================== */
.modern-search-bar {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-pill);
  padding: 6px 8px 6px 18px;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
  width: 100%;
}

.modern-search-bar:focus-within {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.15);
}

.search-icon-svg {
  color: var(--text-subtle);
  margin-right: 10px;
  flex-shrink: 0;
}

.search-input-field {
  flex: 1;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--text-main);
  outline: none;
}

.search-input-field::placeholder {
  color: var(--text-subtle);
}

.search-clear-btn {
  background: transparent;
  border: none;
  color: var(--text-subtle);
  font-size: 1.1rem;
  padding: 4px 8px;
  cursor: pointer;
}

.search-submit-btn {
  background: var(--brand-gradient);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.search-submit-btn:hover {
  opacity: 0.94;
  transform: translateY(-1px);
}

/* ==========================================================================
   6. AUTHENTICATION & FORMS
   ========================================================================== */
.auth-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
  padding: 40px 20px;
  background: linear-gradient(180deg, var(--surface-bg) 0%, #f1f5f9 100%);
}

.auth-card {
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  padding: 44px 40px;
  width: 100%;
  max-width: 480px;
}

.auth-card-header {
  text-align: center;
  margin-bottom: 28px;
}

.auth-card-header h2 {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 8px;
}

.auth-card-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-main);
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 0.95rem;
  background: var(--surface-bg);
  color: var(--text-main);
  outline: none;
  transition: all 0.2s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  background: white;
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.12);
}

.form-input.is-invalid {
  border-color: var(--danger);
  background: #fff5f5;
}

.form-error {
  font-size: 0.82rem;
  color: var(--danger);
  font-weight: 600;
}

.form-hint {
  font-size: 0.8rem;
  color: var(--text-subtle);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

/* Admin Restaurant Form */
.admin-restaurant-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-section-card {
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  padding: 28px;
  box-shadow: var(--shadow-sm);
}

.form-section-header {
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
}

.form-section-header h3 {
  font-size: 1.25rem;
  font-weight: 800;
}

/* ==========================================================================
   7. PROFILE DASHBOARD
   ========================================================================== */
.profile-dashboard-view {
  max-width: 1080px;
  margin: 0 auto;
  padding: 36px 24px 80px;
  width: 100%;
}

.profile-hero-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: var(--radius-xl);
  padding: 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  box-shadow: var(--shadow-lg);
}

.profile-avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--brand-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  font-weight: 800;
  box-shadow: 0 4px 16px rgba(234, 88, 12, 0.4);
}

.profile-info-group h2 {
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
}

.profile-info-group p {
  color: #94a3b8;
  font-size: 0.95rem;
}

.profile-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.profile-stat-box {
  background: white;
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-stat-icon {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  background: var(--brand-light);
  color: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

/* ==========================================================================
   8. SKELETONS, EMPTY STATES & ERROR MESSAGES
   ========================================================================== */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-shimmer {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.restaurant-card-skeleton {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
  height: 380px;
  display: flex;
  flex-direction: column;
}

.skeleton-image {
  height: 210px;
  width: 100%;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-content {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.skeleton-line {
  height: 14px;
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-title { width: 70%; height: 20px; }
.skeleton-cuisine { width: 35%; height: 14px; }
.skeleton-desc { width: 90%; height: 14px; }
.skeleton-meta { width: 50%; height: 12px; margin-top: auto; }

/* Empty States */
.empty-state-card {
  text-align: center;
  padding: 60px 24px;
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  max-width: 580px;
  margin: 40px auto;
}

.empty-state-icon {
  font-size: 3.5rem;
  margin-bottom: 16px;
}

.empty-state-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 8px;
}

.empty-state-message {
  color: var(--text-muted);
  font-size: 0.95rem;
  max-width: 440px;
  margin: 0 auto 24px;
  line-height: 1.6;
}

/* Error Messages */
.error-message-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--radius-lg);
  padding: 24px;
  margin: 24px 0;
}

.error-card-icon {
  font-size: 2rem;
  line-height: 1;
}

.error-card-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #991b1b;
  margin-bottom: 4px;
}

.error-card-message {
  color: #b91c1c;
  font-size: 0.92rem;
  line-height: 1.5;
}

/* ==========================================================================
   9. FOOTER
   ========================================================================== */
.site-footer {
  background: #0b1120;
  color: #94a3b8;
  padding: 60px 24px 30px;
  margin-top: auto;
  border-top: 1px solid #1e293b;
}

.footer-container {
  max-width: 1360px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: 40px;
  margin-bottom: 48px;
}

.footer-brand h4 {
  font-size: 1.4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 12px;
}

.footer-brand p {
  color: #64748b;
  font-size: 0.92rem;
  line-height: 1.6;
  max-width: 320px;
}

.footer-col h5 {
  font-size: 0.95rem;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 18px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: #94a3b8;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--brand-primary);
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #64748b;
}

/* ==========================================================================
   10. RESPONSIVE BREAKPOINTS (375px to 1920px)
   ========================================================================== */
@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    padding: 40px 28px;
    gap: 36px;
  }
  .details-split-layout {
    grid-template-columns: 1fr;
  }
  .cart-column {
    position: static;
  }
  .partner-cta-section {
    flex-direction: column;
    text-align: center;
    padding: 40px 24px;
  }
  .partner-cta-content p {
    margin: 0 auto;
  }
  .partner-cta-buttons {
    justify-content: center;
  }
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .mobile-nav-toggle {
    display: block;
  }
  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    border-bottom: 1px solid var(--border-light);
    box-shadow: var(--shadow-lg);
    flex-direction: column;
    padding: 20px;
    gap: 12px;
  }
  .nav-menu.nav-menu-open {
    display: flex;
  }
  .nav-user-cluster {
    width: 100%;
    justify-content: space-between;
  }
  .hero-title {
    font-size: 2.2rem;
  }
  .block-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .catalog-control-bar {
    padding: 16px;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-stats-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
  .hero-stat-divider {
    display: none;
  }
  .auth-card {
    padding: 28px 20px;
  }
}
`;

fs.writeFileSync(styleCssPath, modernDesignCss, 'utf8');
console.log('Successfully written clean, modern production CSS system to style.css!');
