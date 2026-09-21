const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '../../frontend/frontend/src/style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace the dashboard-hero section (from .dashboard-hero { up to .food-hero {)
const startMarker = '.dashboard-hero {';
const endMarker = '.food-hero {';

const startIdx = css.indexOf(startMarker);
const endIdx = css.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const newDashboardCss = `.dashboard-hero {
  position: relative;
  overflow: hidden;
  padding: 34px 28px 28px;
  border-radius: 30px;
  background: var(--hero-bg, linear-gradient(135deg, #be123c 0%, #e11d48 45%, #fb923c 100%));
  color: #fff;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.22);
  transition: background 0.85s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.85s ease;
}

/* Theme color variations */
.dashboard-hero.theme-crimson {
  background: linear-gradient(135deg, #be123c 0%, #e11d48 45%, #fb923c 100%);
  box-shadow: 0 20px 50px rgba(225, 29, 72, 0.28);
}
.dashboard-hero.theme-indigo {
  background: linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #7c3aed 100%);
  box-shadow: 0 20px 50px rgba(79, 70, 229, 0.28);
}
.dashboard-hero.theme-emerald {
  background: linear-gradient(135deg, #064e3b 0%, #059669 48%, #10b981 100%);
  box-shadow: 0 20px 50px rgba(5, 150, 105, 0.28);
}
.dashboard-hero.theme-sunset {
  background: linear-gradient(135deg, #9a3412 0%, #ea580c 50%, #f59e0b 100%);
  box-shadow: 0 20px 50px rgba(234, 88, 12, 0.28);
}
.dashboard-hero.theme-midnight {
  background: linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #312e81 100%);
  box-shadow: 0 20px 50px rgba(30, 27, 75, 0.35);
}

/* Ambient animated glowing orbs */
.dashboard-hero::before,
.dashboard-hero::after {
  position: absolute;
  content: "";
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 70%);
  animation: hero-orb-float 12s ease-in-out infinite alternate;
}

.dashboard-hero::before {
  width: 480px;
  height: 480px;
  top: -200px;
  left: -120px;
}

.dashboard-hero::after {
  width: 420px;
  height: 420px;
  right: -120px;
  bottom: -200px;
  animation-delay: -6s;
}

@keyframes hero-orb-float {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, 20px) scale(1.08); }
  100% { transform: translate(-20px, 40px) scale(0.95); }
}

/* Dashboard Top Status & Theme Control Bar */
.dashboard-top-bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.dashboard-live-badges {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.live-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
  animation: live-pulse 1.8s infinite;
}

@keyframes live-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

/* Theme Switcher Bar */
.theme-picker-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.theme-picker-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.92);
  margin-right: 2px;
}

.theme-swatch-btn {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.65);
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
}

.theme-swatch-btn:hover {
  transform: scale(1.25);
  border-color: #fff;
}

.theme-swatch-btn.active {
  transform: scale(1.3);
  border-color: #fff;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.4), 0 4px 10px rgba(0, 0, 0, 0.4);
}

.theme-auto-toggle {
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-auto-toggle.active {
  background: #fff;
  color: #0f172a;
}

/* Dashboard Copy & Navigation */
.dashboard-hero-copy,
.dashboard-promo-grid,
.dashboard-dots,
.dashboard-food-ticker {
  position: relative;
  z-index: 2;
}

.dashboard-hero-copy {
  width: min(840px, 100%);
  margin: 0 auto;
  text-align: center;
}

.dashboard-hero-nav-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 3;
}

.hero-nav-arrow:hover {
  background: #fff;
  color: #0f172a;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.hero-nav-arrow.prev { left: -52px; }
.hero-nav-arrow.next { right: -52px; }

@media (max-width: 900px) {
  .hero-nav-arrow { display: none; }
}

.dashboard-hero .eyebrow {
  color: rgba(255, 255, 255, 0.88);
  font-weight: 800;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
}

.dashboard-hero h1 {
  max-width: 820px;
  min-height: 2.1em;
  margin: 0 auto;
  color: #fff;
  font-size: clamp(2.2rem, 4.8vw, 4.2rem);
  line-height: 1.05;
  letter-spacing: -0.05em;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.18);
  animation: dashboard-copy-in 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.dashboard-hero-copy > p:not(.eyebrow) {
  margin: 12px auto 0;
  color: rgba(255, 255, 255, 0.92);
  font-size: 1.08rem;
  max-width: 600px;
  line-height: 1.55;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
}

/* Search Row */
.dashboard-search-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.location-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 52px;
  padding: 0 18px;
  border-radius: 14px;
  background: #fff;
  color: var(--ink);
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.location-pill:first-letter {
  color: #ea580c;
}

.dashboard-search-row .search-bar {
  width: min(420px, 100%);
  margin: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.country-filter {
  min-height: 52px;
  padding: 0 34px 0 16px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fff;
  color: var(--ink);
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.country-filter:focus {
  border-color: rgba(252, 128, 25, 0.55);
  outline: 2px solid rgba(252, 128, 25, 0.2);
}

/* Quick Filter Tag Chips Under Search */
.dashboard-quick-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.quick-tag-chip {
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.quick-tag-chip:hover,
.quick-tag-chip.active {
  background: #fff;
  color: #0f172a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Promo Cards Grid with Dynamic Multi-Image Reel */
.dashboard-promo-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 38px;
}

.dashboard-promo-card {
  position: relative;
  min-height: 195px;
  overflow: hidden;
  padding: 22px;
  border-radius: 26px;
  background: #ffffff;
  color: var(--ink);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  cursor: pointer;
}

.dashboard-promo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
}

.promo-card-info {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 58%;
  gap: 10px;
}

.promo-card-badge {
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.15;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.promo-card-offer {
  width: fit-content;
  padding: 5px 10px;
  border-radius: 999px;
  background: #fee2e2;
  color: #dc2626;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  box-shadow: 0 2px 6px rgba(220, 38, 38, 0.12);
}

.promo-card-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.35;
  margin: 0;
}

.promo-card-action {
  font-size: 0.82rem;
  font-weight: 700;
  color: #ea580c;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Card Auto-Scrolling Image Visual */
.promo-card-visual {
  position: relative;
  width: 140px;
  height: 140px;
  align-self: center;
  flex-shrink: 0;
}

.promo-image-frame {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.2);
  border: 3px solid #fff;
  background: #f1f5f9;
}

.promo-slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.promo-slide-img.active {
  opacity: 1;
  transform: scale(1);
  z-index: 1;
}

.promo-slide-img.inactive {
  opacity: 0;
  transform: scale(1.1);
  z-index: 0;
}

/* Floating dish caption tag */
.promo-dish-tag {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  z-index: 3;
}

/* Image indicators for promo card */
.promo-image-dots {
  position: absolute;
  top: -6px;
  right: 0;
  display: flex;
  gap: 3px;
  z-index: 3;
}

.promo-micro-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.25);
  transition: all 0.3s ease;
}

.promo-micro-dot.active {
  width: 14px;
  border-radius: 999px;
  background: #ea580c;
}

/* Infinite Auto-Scrolling Food Ticker Ribbon */
.dashboard-food-ticker {
  margin-top: 32px;
  padding: 12px 0;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  position: relative;
}

.ticker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px 8px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.92);
}

.ticker-track-container {
  display: flex;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.ticker-track {
  display: flex;
  gap: 14px;
  animation: food-ticker-scroll 32s linear infinite;
  white-space: nowrap;
  padding: 4px 8px;
}

.dashboard-food-ticker:hover .ticker-track {
  animation-play-state: paused;
}

@keyframes food-ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.ticker-dish-card {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 8px;
  border-radius: 999px;
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
  user-select: none;
}

.ticker-dish-card:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

.ticker-dish-card img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ea580c;
}

.ticker-dish-info {
  display: flex;
  flex-direction: column;
}

.ticker-dish-name {
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.1;
  color: #0f172a;
}

.ticker-dish-sub {
  font-size: 0.7rem;
  font-weight: 600;
  color: #ea580c;
}

/* Dots at bottom */
.dashboard-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}

.dashboard-dots button {
  width: 9px;
  height: 9px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dashboard-dots button:hover {
  background: rgba(255, 255, 255, 0.75);
}

.dashboard-dots button.active {
  width: 28px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

@keyframes dashboard-copy-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 992px) {
  .dashboard-promo-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .dashboard-promo-card {
    min-height: 150px;
  }
  .dashboard-top-bar {
    justify-content: center;
  }
}
`;

const updatedCss = css.substring(0, startIdx) + newDashboardCss + '\n' + css.substring(endIdx);
fs.writeFileSync(cssPath, updatedCss, 'utf8');
console.log('Successfully updated style.css! New length:', updatedCss.length);
