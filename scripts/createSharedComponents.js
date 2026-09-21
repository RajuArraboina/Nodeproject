const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../frontend/frontend/src');

// 1. Loading.jsx
const loadingCode = `export default function Loading({ message = 'Loading delicious food...' }) {
  return (
    <div className="state-message-container" role="status" aria-live="polite">
      <div className="food-spinner">
        <span className="spinner-icon">🍲</span>
      </div>
      <p className="state-message-text">{message}</p>
    </div>
  );
}
`;

// 2. Navbar.jsx
const navbarCode = `import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="topbar-wrapper">
      <nav className="topbar" aria-label="Main Navigation">
        <Link to="/" className="brand-group" onClick={closeMenu}>
          <div className="brand-mark">S</div>
          <div className="brand-copy">
            <span className="brand-name">SR</span>
            <span className="brand-location">WARANGAL</span>
          </div>
        </Link>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={\`nav-actions \${menuOpen ? 'nav-actions-open' : ''}\`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => \`nav-link \${isActive ? 'active' : ''}\`}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/restaurants"
            className={({ isActive }) => \`nav-link \${isActive ? 'active' : ''}\`}
            onClick={closeMenu}
          >
            Restaurants
          </NavLink>

          {isAuthenticated && isAdmin && (
            <NavLink
              to="/create-restaurant"
              className={({ isActive }) => \`nav-link \${isActive ? 'active' : ''}\`}
              onClick={closeMenu}
            >
              + Add Restaurant
            </NavLink>
          )}

          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) => \`nav-link \${isActive ? 'active' : ''}\`}
                onClick={closeMenu}
              >
                👤 {user?.name || 'Profile'}
                {isAdmin && <span className="nav-admin-badge">Admin</span>}
              </NavLink>
              <button
                type="button"
                className="nav-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <div className="nav-auth-buttons">
              <NavLink
                to="/login"
                className={({ isActive }) => \`nav-link nav-link--cta \${isActive ? 'active' : ''}\`}
                onClick={closeMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => \`nav-link nav-link--secondary \${isActive ? 'active' : ''}\`}
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
`;

// 3. Footer.jsx
const footerCode = `import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <div className="brand-group">
            <div className="brand-mark">S</div>
            <div className="brand-copy">
              <span className="brand-name">SR Restaurants</span>
              <span className="brand-location">Warangal, Telangana</span>
            </div>
          </div>
          <p className="footer-about">
            Warangal&apos;s premier online dining and food ordering network. Fresh flavours, local favourites, and top-rated restaurants delivered to your doorstep.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/restaurants">All Restaurants</Link></li>
            <li><Link to="/restaurants?cuisine=Biryani">Biryani Specialists</Link></li>
            <li><Link to="/restaurants?cuisine=South%20Indian">South Indian Tiffins</Link></li>
            <li><Link to="/restaurants?cuisine=Italian">Woodfired Pizza</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/login">Customer Login</Link></li>
            <li><Link to="/register">Create Account</Link></li>
            <li><Link to="/profile">My Orders & Profile</Link></li>
            <li><Link to="/create-restaurant">Partner with Us</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact & Hours</h4>
          <p>📍 Warangal & Hanamkonda, Telangana</p>
          <p>📞 +91 870 244 5678</p>
          <p>⏰ 7:00 AM – 11:30 PM (Daily)</p>
          <div className="footer-tags">
            <span className="badge-tag">⚡ 30m Delivery</span>
            <span className="badge-tag">🛡️ Hygienic</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SR Restaurants Warangal. All rights reserved.</p>
        <p>Built with React.js, Node.js & Express REST API</p>
      </div>
    </footer>
  );
}
`;

// 4. RestaurantCard.jsx
const restaurantCardCode = `import { Link } from 'react-router-dom';

const defaultCuisineImages = {
  indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=85",
  biryani: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=85",
  "south indian": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=85",
  italian: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=85",
  chinese: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85",
  fastfood: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
  default: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=85",
};

export function getCardImage(restaurant) {
  if (restaurant?.image) return restaurant.image;
  const key = (restaurant?.cuisine || "").toLowerCase();
  if (key.includes("biryani")) return defaultCuisineImages.biryani;
  if (key.includes("south") || key.includes("dosa") || key.includes("tiffin")) return defaultCuisineImages["south indian"];
  if (key.includes("italian") || key.includes("pizza")) return defaultCuisineImages.italian;
  if (key.includes("chinese") || key.includes("momo")) return defaultCuisineImages.chinese;
  if (key.includes("burger") || key.includes("fast")) return defaultCuisineImages.fastfood;
  if (key.includes("indian")) return defaultCuisineImages.indian;
  return defaultCuisineImages.default;
}

export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;

  const imageUrl = getCardImage(restaurant);
  const city = restaurant.address?.city || 'Warangal';
  const rating = restaurant.rating ? Number(restaurant.rating).toFixed(1) : '4.5';
  const menuCount = restaurant.menuItems?.length || 0;

  return (
    <article className="restaurant-card-modern">
      <Link to={\`/restaurants/\${restaurant._id}\`} className="card-image-wrap">
        <img
          src={imageUrl}
          alt={restaurant.name}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            if (!e.target.dataset.fallbackApplied) {
              e.target.dataset.fallbackApplied = 'true';
              e.target.src = defaultCuisineImages.default;
            }
          }}
        />
        <span className={\`card-status-pill \${restaurant.isOpen !== false ? 'status-open' : 'status-closed'}\`}>
          {restaurant.isOpen !== false ? '🟢 Open Now' : 'Closed'}
        </span>
        <span className="card-rating-badge">★ {rating}</span>
      </Link>

      <div className="card-content">
        <div className="card-header">
          <div className="card-title-group">
            <h3 className="card-title">
              <Link to={\`/restaurants/\${restaurant._id}\`}>{restaurant.name}</Link>
            </h3>
            <p className="card-cuisine">🍽️ {restaurant.cuisine || 'Multi-Cuisine'}</p>
          </div>
        </div>

        <p className="card-desc">
          {restaurant.description || 'Specialized in authentic flavours and freshly prepared dishes.'}
        </p>

        <div className="card-meta">
          <span className="card-location">📍 {city}</span>
          <span className="card-delivery">⚡ 25-35 mins</span>
          {menuCount > 0 && <span className="card-menu-count">{menuCount} Dishes</span>}
        </div>

        <div className="card-footer-action">
          <Link to={\`/restaurants/\${restaurant._id}\`} className="btn-view-menu">
            View Menu & Order →
          </Link>
        </div>
      </div>
    </article>
  );
}
`;

// 5. MenuCard.jsx
const menuCardCode = `export default function MenuCard({ item, quantity = 0, onAdd, onRemove }) {
  if (!item) return null;

  const fallbackImg = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";

  return (
    <div className="menu-card-item">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="menu-card-thumb"
          loading="lazy"
          onError={(e) => {
            if (!e.target.dataset.fallbackApplied) {
              e.target.dataset.fallbackApplied = 'true';
              e.target.src = fallbackImg;
            }
          }}
        />
      )}

      <div className="menu-card-details">
        <div className="menu-card-head">
          <div className="menu-dish-identity">
            <span className={\`veg-badge \${item.isVegetarian ? 'veg' : 'non-veg'}\`} title={item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}>
              {item.isVegetarian ? '🌱 Veg' : '🍗 Non-Veg'}
            </span>
            {item.category && <span className="menu-category-pill">{item.category}</span>}
          </div>
          <span className="menu-card-price">₹{Number(item.price).toFixed(2)}</span>
        </div>

        <h4 className="menu-dish-name">{item.name}</h4>
        {item.description && <p className="menu-dish-desc">{item.description}</p>}
      </div>

      <div className="menu-card-actions">
        {quantity > 0 ? (
          <div className="quantity-counter" aria-label={\`Quantity for \${item.name}\`}>
            <button
              type="button"
              className="qty-btn"
              onClick={onRemove}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={onAdd}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn-add-item"
            onClick={onAdd}
            aria-label={\`Add \${item.name} to order\`}
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(srcDir, 'Loading.jsx'), loadingCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'Navbar.jsx'), navbarCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'Footer.jsx'), footerCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'RestaurantCard.jsx'), restaurantCardCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'MenuCard.jsx'), menuCardCode, 'utf8');

console.log('Successfully updated Loading, Navbar, Footer, RestaurantCard, MenuCard!');
