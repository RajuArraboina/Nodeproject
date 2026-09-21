const fs = require('fs');
const path = require('path');

// 1. Update App.jsx
const appPath = path.resolve(__dirname, '../../frontend/frontend/src/App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Ensure isAuthenticated is initialized from token
appContent = appContent.replace(
  'const [isAuthenticated, setIsAuthenticated] = useState(false);',
  'const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem("token")));'
);

// Ensure isAdmin={isAdmin} is passed to RestaurantDetails
if (!appContent.includes('isAdmin={isAdmin}')) {
  appContent = appContent.replace(
    '<RestaurantDetails',
    '<RestaurantDetails\n          isAdmin={isAdmin}'
  );
}

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('App.jsx updated successfully.');

// 2. Update RestaurantDetails.jsx
const detailsPath = path.resolve(__dirname, '../../frontend/frontend/src/RestaurantDetails.jsx');
let detailsContent = fs.readFileSync(detailsPath, 'utf8');

// Update props
detailsContent = detailsContent.replace(
  'function RestaurantDetails({\n  canCreateRestaurant = false,',
  'function RestaurantDetails({\n  canCreateRestaurant = false,\n  isAdmin = false,'
);

// Add hasAdminAccess helper inside component
if (!detailsContent.includes('const hasAdminAccess =')) {
  detailsContent = detailsContent.replace(
    'const setSelectedRestaurant = propSetSelectedRestaurant || setInternalSelectedRestaurant;',
    'const setSelectedRestaurant = propSetSelectedRestaurant || setInternalSelectedRestaurant;\n  const hasAdminAccess = Boolean(isAdmin || canCreateRestaurant);'
  );
}

// Add admin banner in dashboard-hero if not present
if (!detailsContent.includes('dashboard-admin-banner')) {
  detailsContent = detailsContent.replace(
    '<p>{dashboardPromos[promoIndex].description}</p>',
    `<p>{dashboardPromos[promoIndex].description}</p>
            {hasAdminAccess && (
              <div className="dashboard-admin-banner" aria-label="Admin controls">
                <span className="admin-tag">🛡️ Admin Access</span>
                <button
                  type="button"
                  className="hero-add-restaurant-btn"
                  onClick={onCreateRestaurant}
                >
                  + Add Restaurant
                </button>
              </div>
            )}`
  );
}

// Update title row button to "+ Add / Create Restaurant" with admin status pill
const oldButtonChunk = `{!selectedRestaurant && Boolean(canCreateRestaurant) && (
              <button className="create-restaurant-button" type="button" onClick={onCreateRestaurant}>
                + Create new restaurant
              </button>
            )}`;

const newButtonChunk = `{!selectedRestaurant && hasAdminAccess && (
              <div className="admin-dashboard-actions">
                <span className="admin-status-pill">🛡️ Admin</span>
                <button
                  className="create-restaurant-button"
                  type="button"
                  onClick={onCreateRestaurant}
                  title="Add new restaurant (Admin only)"
                >
                  + Add / Create Restaurant
                </button>
              </div>
            )}`;

if (detailsContent.includes(oldButtonChunk)) {
  detailsContent = detailsContent.replace(oldButtonChunk, newButtonChunk);
} else {
  // fallback replace if slightly different
  detailsContent = detailsContent.replace(
    /\{!selectedRestaurant && Boolean\(canCreateRestaurant\) && \([\s\S]*?<\/button>\s*\)\}/,
    newButtonChunk
  );
}

fs.writeFileSync(detailsPath, detailsContent, 'utf8');
console.log('RestaurantDetails.jsx updated successfully.');

// 3. Update style.css
const cssPath = path.resolve(__dirname, '../../frontend/frontend/src/style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const marker = '/* ADMIN DASHBOARD ACTION BUTTONS */';
if (!cssContent.includes(marker)) {
  const cssAdditions = `

/* ${marker} */
.admin-dashboard-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-status-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: #fff0eb;
  color: var(--brand-dark);
  border: 1px solid rgba(252, 128, 25, 0.3);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.dashboard-admin-banner {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0 16px;
  padding: 8px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(252, 128, 25, 0.35);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  width: max-content;
}

.dashboard-admin-banner .admin-tag {
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--brand-dark);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.hero-add-restaurant-btn {
  padding: 6px 14px;
  border: 0;
  border-radius: 8px;
  background: var(--brand);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.hero-add-restaurant-btn:hover {
  background: var(--brand-dark);
  transform: translateY(-1px);
}
`;
  cssContent += cssAdditions;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('style.css updated with admin dashboard button styles.');
}
