const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../frontend/frontend/src');
const styleCssPath = path.join(srcDir, 'style.css');

const remainingStyles = `
/* ==========================================================================
   11. COMPONENT-SPECIFIC STYLES (MenuCard, RestaurantCard, FormBuilder, Profile)
   ========================================================================== */

/* State Message & Loading */
.state-message-container, .state-message-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 24px;
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  max-width: 600px;
  margin: 40px auto;
}

.food-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.spinner-icon {
  font-size: 3rem;
  animation: spin-pulse 2s infinite linear;
}

@keyframes spin-pulse {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.15) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); }
}

.state-message-text {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  margin-top: 8px;
}

.skeleton-preview-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  width: 100%;
}

/* MenuCard Component */
.menu-card-item {
  display: flex;
  gap: 20px;
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 18px;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-card-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: rgba(234, 88, 12, 0.3);
}

.menu-card-thumb {
  width: 110px;
  height: 110px;
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--surface-subtle);
}

.menu-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-card-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.menu-card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}

.menu-dish-identity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.veg-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 800;
}

.veg-badge.veg {
  border: 1.5px solid var(--success);
  color: var(--success);
}
.veg-badge.veg::after {
  content: '●';
  font-size: 10px;
  color: var(--success);
}

.veg-badge.non-veg {
  border: 1.5px solid var(--danger);
  color: var(--danger);
}
.veg-badge.non-veg::after {
  content: '▲';
  font-size: 8px;
  color: var(--danger);
}

.menu-category-pill {
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--brand-primary);
  background: var(--brand-light);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}

.menu-card-price {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-main);
}

.menu-dish-name {
  font-size: 1.12rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 4px;
}

.menu-dish-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.45;
  margin-bottom: 12px;
}

.menu-card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

.quantity-counter {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--brand-light);
  border: 1px solid rgba(234, 88, 12, 0.3);
  border-radius: var(--radius-md);
  padding: 4px 10px;
}

.qty-btn {
  background: transparent;
  border: none;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--brand-primary);
  cursor: pointer;
  line-height: 1;
}

.qty-value {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--brand-primary);
  min-width: 18px;
  text-align: center;
}

.btn-add-item {
  background: white;
  border: 1.5px solid var(--brand-primary);
  color: var(--brand-primary);
  font-size: 0.88rem;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add-item:hover {
  background: var(--brand-primary);
  color: white;
}

/* Modern Restaurant Card Alternate */
.restaurant-card-modern {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.restaurant-card-modern:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
  border-color: rgba(234, 88, 12, 0.35);
}

.card-status-pill {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.74rem;
  font-weight: 800;
  text-transform: uppercase;
}

.card-rating-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  color: white;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  font-weight: 800;
}

.card-title-group {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.card-delivery {
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-footer-action {
  padding-top: 14px;
  border-top: 1px solid var(--border-light);
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-view-menu {
  background: var(--brand-light);
  color: var(--brand-primary);
  padding: 6px 14px;
  border-radius: var(--radius-md);
  font-size: 0.84rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-view-menu:hover {
  background: var(--brand-primary);
  color: white;
}

.showcase-badges {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.grand-total {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--brand-primary);
}

.catalog-search {
  max-width: 600px;
  width: 100%;
}

/* Authentication Page Elements */
.auth-header {
  text-align: center;
  margin-bottom: 24px;
}

.auth-brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--brand-primary);
  margin-bottom: 12px;
}

.auth-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 6px;
}

.auth-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-toggle-password {
  background: transparent;
  border: none;
  color: var(--text-subtle);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-block {
  width: 100%;
  padding: 13px;
  font-size: 1rem;
}

.auth-footer {
  text-align: center;
  margin-top: 22px;
  font-size: 0.92rem;
  color: var(--text-muted);
}

.auth-link {
  color: var(--brand-primary);
  font-weight: 700;
  text-decoration: underline;
}

.auth-demo-hint {
  margin-top: 18px;
  padding: 12px 16px;
  background: var(--surface-bg);
  border: 1px dashed var(--border-light);
  border-radius: var(--radius-md);
  font-size: 0.84rem;
  color: var(--text-muted);
  text-align: center;
}

/* Profile Page Layout */
.profile-page-container {
  max-width: 980px;
  margin: 36px auto 80px;
  padding: 0 24px;
  width: 100%;
}

.profile-card-wrapper {
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.profile-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-email {
  color: #94a3b8;
  font-size: 0.95rem;
}

.profile-role-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: fit-content;
}

.profile-role-badge.admin {
  background: #ffedd5;
  color: #ea580c;
}

.profile-role-badge.user {
  background: #e0f2fe;
  color: #0369a1;
}

.stat-number {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.2;
}

.stat-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 600;
}

.profile-details-section {
  padding: 32px 36px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.profile-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
}

.info-label {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 600;
}

.info-value {
  font-size: 0.95rem;
  color: var(--text-main);
  font-weight: 700;
}

.profile-actions-bar {
  padding: 24px 36px;
  background: var(--surface-bg);
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

/* Create Restaurant Page Form */
.form-page-container {
  max-width: 920px;
  margin: 36px auto 80px;
  padding: 0 24px;
  width: 100%;
}

.form-card-wrapper {
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-md);
  padding: 40px;
}

.form-header {
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-light);
}

.btn-back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--brand-primary);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 14px;
}

.form-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--brand-light);
  color: var(--brand-primary);
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.form-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 6px;
}

.form-subtitle {
  font-size: 1rem;
  color: var(--text-muted);
}

.alert-banner {
  padding: 14px 18px;
  border-radius: var(--radius-md);
  font-size: 0.92rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.alert-banner.error {
  background: var(--danger-light);
  color: var(--danger);
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.form-section-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-light);
}

.flex-1 { flex: 1; }
.flex-2 { flex: 2; }

.error-text {
  font-size: 0.82rem;
  color: var(--danger);
  font-weight: 600;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
}

.section-header-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-light);
}

.btn-secondary {
  background: var(--surface-subtle);
  border: 1px solid var(--border-light);
  color: var(--text-main);
}
.btn-secondary:hover {
  background: #e2e8f0;
}

.btn-sm {
  padding: 6px 14px;
  font-size: 0.84rem;
  border-radius: var(--radius-sm);
}

.btn-large {
  padding: 14px 28px;
  font-size: 1.05rem;
}

.btn-ghost {
  background: transparent;
  color: var(--text-muted);
}
.btn-ghost:hover {
  background: var(--surface-subtle);
}

.menu-builder-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.menu-builder-card {
  background: var(--surface-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.builder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.item-number {
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--brand-primary);
}

.btn-remove-item {
  background: transparent;
  border: none;
  color: var(--danger);
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border-light);
}

/* Footer Additional Classes */
.brand-group {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  background: var(--brand-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
}

.brand-copy {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: white;
}

.brand-location {
  font-size: 0.78rem;
  color: #94a3b8;
}

.footer-about {
  color: #94a3b8;
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 16px;
}

.footer-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge-tag {
  background: #1e293b;
  color: #94a3b8;
  font-size: 0.78rem;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
}
`;

fs.appendFileSync(styleCssPath, remainingStyles, 'utf8');
console.log('Successfully appended remaining styles to style.css!');
