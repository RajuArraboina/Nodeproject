const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../frontend/frontend/src');

// ==========================================
// 1. Navbar.jsx
// ==========================================
const navbarCode = `import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileOpen(false);
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="site-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMenu} aria-label="SR Restaurants Home">
          <span className="brand-icon">S</span>
          <div className="brand-text">
            <span className="brand-title">SR Restaurants</span>
            <span className="brand-subtitle">WARANGAL</span>
          </div>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <nav className={\`nav-menu \${mobileOpen ? 'nav-menu-open' : ''}\`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => \`nav-menu-link \${isActive ? 'active' : ''}\`}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/restaurants"
            className={({ isActive }) => \`nav-menu-link \${isActive ? 'active' : ''}\`}
            onClick={closeMenu}
          >
            Restaurants
          </NavLink>

          {isAuthenticated && isAdmin && (
            <NavLink
              to="/create-restaurant"
              className={({ isActive }) => \`nav-menu-link admin-nav-link \${isActive ? 'active' : ''}\`}
              onClick={closeMenu}
            >
              + Add Restaurant
            </NavLink>
          )}

          {isAuthenticated ? (
            <div className="nav-user-cluster">
              <NavLink
                to="/profile"
                className={({ isActive }) => \`nav-user-pill \${isActive ? 'active' : ''}\`}
                onClick={closeMenu}
              >
                <span className="user-icon">👤</span>
                <span className="user-name">{user?.name || 'Profile'}</span>
                {isAdmin && <span className="badge-admin-tag">Admin</span>}
              </NavLink>
              <button
                type="button"
                className="btn-nav-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth-cluster">
              <NavLink
                to="/login"
                className={({ isActive }) => \`btn-nav-login \${isActive ? 'active' : ''}\`}
                onClick={closeMenu}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="btn-nav-register"
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
`;

// ==========================================
// 2. Home.jsx
// ==========================================
const homeCode = `import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { restaurantService } from './services/restaurantService';
import RestaurantCard from './RestaurantCard';
import SearchBar from './SearchBar';

const popularCuisines = [
  { name: 'Biryani', label: 'Biryani Specials', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=400&q=80', count: '12+ Places' },
  { name: 'South Indian', label: 'South Indian Tiffins', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80', count: '15+ Places' },
  { name: 'Pizza', label: 'Woodfired Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', count: '8+ Places' },
  { name: 'Mughlai', label: 'Tandoor & Mughlai', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80', count: '10+ Places' },
  { name: 'Burger', label: 'Burgers & Shakes', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', count: '6+ Places' },
  { name: 'Chinese', label: 'Indo-Chinese', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', count: '9+ Places' },
];

const featuredDishes = [
  {
    name: 'Hyderabadi Dum Mutton Biryani',
    cuisine: 'Biryani',
    price: '₹299',
    rating: '★ 4.9',
    restaurant: 'Subani Dum Biryani House',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Ghee Karam Masala Dosa',
    cuisine: 'South Indian',
    price: '₹110',
    rating: '★ 4.8',
    restaurant: 'Kakatiya Deluxe Mess',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Smoked Paneer Butter Tikka',
    cuisine: 'Indian',
    price: '₹240',
    rating: '★ 4.7',
    restaurant: 'Shiva Jyothi Dhaba',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Artisanal Cheesy Garlic Pizza',
    cuisine: 'Italian',
    price: '₹349',
    rating: '★ 4.9',
    restaurant: 'The Rustic Woodfire Oven',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
  },
];

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    restaurantService.getAll()
      .then((data) => {
        if (mounted) {
          setRestaurants(data.slice(0, 6));
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(\`/restaurants?search=\${encodeURIComponent(searchQuery.trim())}\`);
    } else {
      navigate('/restaurants');
    }
  };

  return (
    <div className="home-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge-pill">
            <span className="pulse-dot" />
            <span>Warangal&apos;s #1 Dining & Delivery Platform</span>
          </div>

          <h1 className="hero-title">
            Authentic Flavours From Warangal&apos;s Finest Kitchens
          </h1>

          <p className="hero-description">
            Discover historic biryani houses, traditional ghee dosa tiffins, artisanal woodfired pizzas, and top-rated restaurants with fast 30-minute doorstep delivery.
          </p>

          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleSearchSubmit}
            placeholder="Search restaurants, cuisines, or signature dishes..."
            className="hero-search"
          />

          <div className="hero-quick-tags">
            <span className="tags-label">Popular Searches:</span>
            {['Biryani', 'South Indian', 'Pizza', 'Mughlai'].map((c) => (
              <button
                key={c}
                type="button"
                className="tag-pill"
                onClick={() => navigate(\`/restaurants?cuisine=\${encodeURIComponent(c)}\`)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <strong>20+</strong>
              <span>Verified Kitchens</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <strong>⚡ 30m</strong>
              <span>Avg Delivery</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <strong>⭐ 4.8</strong>
              <span>Customer Rating</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Collage */}
        <div className="hero-visual-card">
          <div className="visual-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85"
              alt="Delicious Dum Biryani"
              className="visual-main-img"
            />
            <div className="visual-glass-badge">
              <div className="badge-icon">🔥</div>
              <div>
                <strong>Hyderabadi Dum Cooking</strong>
                <p>Firewood Dum & Natural Spices</p>
              </div>
            </div>

            <div className="visual-floating-card">
              <span className="floating-star">★ 4.9</span>
              <div>
                <strong>10,000+ Orders</strong>
                <p>Delivered in Warangal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR RESTAURANTS */}
      <section className="home-block">
        <div className="block-header">
          <div>
            <span className="block-eyebrow">VERIFIED PARTNERS</span>
            <h2 className="block-title">Popular Restaurants in Warangal</h2>
            <p className="block-subtitle">Handpicked local favorites loved by thousands of foodies</p>
          </div>
          <Link to="/restaurants" className="btn btn-outline">
            View All ({restaurants.length}+) →
          </Link>
        </div>

        {loading ? (
          <div className="skeleton-preview-row">
            {[1, 2, 3].map((n) => (
              <div key={n} className="restaurant-card-skeleton" style={{ height: '320px' }} />
            ))}
          </div>
        ) : (
          <div className="restaurant-grid">
            {restaurants.map((rest) => (
              <RestaurantCard key={rest._id} restaurant={rest} />
            ))}
          </div>
        )}
      </section>

      {/* 3. BROWSE BY CUISINE */}
      <section className="home-block">
        <div className="block-header">
          <div>
            <span className="block-eyebrow">EXPLORE FLAVOURS</span>
            <h2 className="block-title">Browse by Cuisine</h2>
            <p className="block-subtitle">Pick your craving and discover top specialists</p>
          </div>
        </div>

        <div className="cuisine-grid">
          {popularCuisines.map((item) => (
            <button
              key={item.name}
              type="button"
              className="cuisine-card"
              onClick={() => navigate(\`/restaurants?cuisine=\${encodeURIComponent(item.name)}\`)}
            >
              <div className="cuisine-img-frame">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              <h4 className="cuisine-name">{item.label}</h4>
              <span className="cuisine-count">{item.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. FEATURED DISHES */}
      <section className="home-block">
        <div className="block-header">
          <div>
            <span className="block-eyebrow">CHEF&apos;S HIGHLIGHTS</span>
            <h2 className="block-title">Trending Dishes This Week</h2>
            <p className="block-subtitle">Most ordered authentic dishes prepared fresh on order</p>
          </div>
        </div>

        <div className="featured-dishes-grid">
          {featuredDishes.map((dish) => (
            <article key={dish.name} className="featured-dish-card">
              <div className="dish-img-wrap">
                <img src={dish.image} alt={dish.name} loading="lazy" />
                <span className="dish-rating-badge">{dish.rating}</span>
                <span className="dish-cuisine-badge">{dish.cuisine}</span>
              </div>
              <div className="dish-body">
                <h4 className="dish-title">{dish.name}</h4>
                <p className="dish-restaurant">📍 {dish.restaurant}</p>
                <div className="dish-footer">
                  <span className="dish-price">{dish.price}</span>
                  <Link to="/restaurants" className="btn-order-link">
                    Order Now →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="home-block why-choose-section">
        <div className="why-choose-header">
          <span className="block-eyebrow">WHY SR RESTAURANTS</span>
          <h2 className="block-title">Built for Real Food Enthusiasts</h2>
        </div>

        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon-circle">⚡</div>
            <h3>30-Minute Express Delivery</h3>
            <p>Direct routes from partner kitchens straight to your home or office with temperature-preserving packaging.</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-circle">🌿</div>
            <h3>Certified Hygiene Standards</h3>
            <p>Every restaurant undergoes regular hygiene checks, fresh ingredient sourcing, and sanitization protocols.</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-circle">📍</div>
            <h3>Authentic Warangal Heritage</h3>
            <p>Supporting culinary icons and historic mess traditions that have delighted Warangal for generations.</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-circle">📱</div>
            <h3>Transparent Live Tracking</h3>
            <p>Real-time order statuses from flame to door with instant updates and transparent billing with zero hidden fees.</p>
          </div>
        </div>
      </section>

      {/* 6. RESTAURANT OWNER CTA BANNER */}
      <section className="partner-cta-section">
        <div className="partner-cta-content">
          <h2>Own a Restaurant in Warangal or Hanamkonda?</h2>
          <p>Join SR Restaurants to reach over 25,000+ local customers and expand your delivery radius today.</p>
          <div className="partner-cta-buttons">
            <Link to="/create-restaurant" className="btn btn-primary btn-large">
              + Register Your Restaurant
            </Link>
            <Link to="/restaurants" className="btn btn-outline btn-large">
              Explore Partner Kitchens
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
`;

// ==========================================
// 3. Restaurants.jsx
// ==========================================
const restaurantsCode = `import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { restaurantService } from './services/restaurantService';
import RestaurantCard from './RestaurantCard';
import RestaurantSkeleton from './components/RestaurantSkeleton';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './SearchBar';

const cuisineList = [
  'All',
  'Biryani',
  'South Indian',
  'Indian',
  'Italian',
  'Chinese',
  'Mughlai',
  'Fast Food',
  'Dessert',
];

export default function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCuisine = searchParams.get('cuisine') || 'All';
  const initialCity = searchParams.get('city') || '';

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'name', 'newest'

  const fetchRestaurants = useCallback(async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const query = {};
      if (params.search) query.search = params.search;
      if (params.cuisine && params.cuisine !== 'All') query.cuisine = params.cuisine;
      if (params.city) query.city = params.city;

      const data = await restaurantService.getAll(query);
      setRestaurants(data);
    } catch (err) {
      setError(err.message || 'Unable to load restaurants. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const s = searchParams.get('search') || '';
    const c = searchParams.get('cuisine') || 'All';
    const city = searchParams.get('city') || '';

    setSearchInput(s);
    setSelectedCuisine(c);
    setSelectedCity(city);

    fetchRestaurants({ search: s, cuisine: c, city });
  }, [searchParams, fetchRestaurants]);

  const updateFilters = (newFilters) => {
    const current = {};
    if (newFilters.search !== undefined) {
      if (newFilters.search) current.search = newFilters.search;
    } else if (searchInput) {
      current.search = searchInput;
    }

    if (newFilters.cuisine !== undefined) {
      if (newFilters.cuisine && newFilters.cuisine !== 'All') current.cuisine = newFilters.cuisine;
    } else if (selectedCuisine && selectedCuisine !== 'All') {
      current.cuisine = selectedCuisine;
    }

    if (newFilters.city !== undefined) {
      if (newFilters.city) current.city = newFilters.city;
    } else if (selectedCity) {
      current.city = selectedCity;
    }

    setSearchParams(current);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({ search: searchInput });
  };

  const handleCuisineClick = (c) => {
    setSelectedCuisine(c);
    updateFilters({ cuisine: c });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSelectedCuisine('All');
    setSelectedCity('');
    setSearchParams({});
  };

  // Client-side sorting
  const sortedRestaurants = useMemo(() => {
    const list = [...restaurants];
    if (sortBy === 'rating') {
      return list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }
    if (sortBy === 'name') {
      return list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    return list;
  }, [restaurants, sortBy]);

  return (
    <div className="restaurants-page-view">
      {/* Header */}
      <div className="catalog-header-wrap">
        <div>
          <span className="block-eyebrow">EXPLORE & ORDER</span>
          <h1 className="catalog-main-title">All Restaurants</h1>
          <p className="catalog-sub-text">
            {restaurants.length > 0 ? \`Showing \${restaurants.length} partner kitchens in Warangal\` : 'Browse verified dining & delivery destinations'}
          </p>
        </div>
      </div>

      {/* Search & Sort Controls Toolbar */}
      <div className="catalog-control-bar">
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSubmit={handleSearchSubmit}
          placeholder="Search by restaurant name, dish, or landmark..."
          className="catalog-search"
        />

        <div className="filter-controls-row">
          <div className="control-field">
            <label htmlFor="city-select">Location:</label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                updateFilters({ city: e.target.value });
              }}
            >
              <option value="">All Locations</option>
              <option value="Warangal">Warangal</option>
              <option value="Hanamkonda">Hanamkonda</option>
              <option value="Kazipet">Kazipet</option>
            </select>
          </div>

          <div className="control-field">
            <label htmlFor="sort-select">Sort By:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Top Rated (Highest First)</option>
              <option value="name">Name (A – Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cuisine Filter Pills */}
      <div className="cuisine-tabs-container" aria-label="Filter by cuisine">
        {cuisineList.map((c) => {
          const isActive = selectedCuisine.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              type="button"
              className={\`cuisine-pill-button \${isActive ? 'active' : ''}\`}
              onClick={() => handleCuisineClick(c)}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Active Filter Badges */}
      {(searchInput || (selectedCuisine && selectedCuisine !== 'All') || selectedCity) && (
        <div className="active-filter-chips">
          <span>Active Filters:</span>
          {searchInput && <span className="chip">Search: &quot;{searchInput}&quot;</span>}
          {selectedCuisine !== 'All' && <span className="chip">Cuisine: {selectedCuisine}</span>}
          {selectedCity && <span className="chip">City: {selectedCity}</span>}
          <button type="button" className="btn-clear-chips" onClick={handleResetFilters}>
            ✕ Clear All
          </button>
        </div>
      )}

      {/* Dynamic Results Presentation */}
      {loading ? (
        <RestaurantSkeleton count={6} />
      ) : error ? (
        <ErrorMessage
          title="Could Not Load Restaurants"
          message={error}
          onRetry={() => fetchRestaurants({ search: searchInput, cuisine: selectedCuisine, city: selectedCity })}
        />
      ) : sortedRestaurants.length === 0 ? (
        <EmptyState
          icon="🍽️"
          title="No Restaurants Found"
          message="We couldn't find any restaurants matching your current search or cuisine criteria."
          actionText="Clear Filters & View All"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="restaurant-grid">
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}
`;

// ==========================================
// 4. RestaurantDetails.jsx
// ==========================================
const detailsCode = `import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { restaurantService } from './services/restaurantService';
import { useAuth } from './context/AuthContext';
import MenuCard from './MenuCard';
import Loading from './Loading';
import ErrorMessage from './components/ErrorMessage';
import { getCardImage } from './RestaurantCard';

const GST_RATE = 0.05;
const DELIVERY_CHARGE = 40;

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderCounts, setOrderCounts] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuSearch, setMenuSearch] = useState('');
  const [orderNotification, setOrderNotification] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError('');

    restaurantService.getById(id)
      .then((data) => {
        if (!isMounted) return;
        if (!data || !data._id) {
          throw new Error('Restaurant not found');
        }
        setRestaurant(data);

        // Check for preserved order
        try {
          const saved = JSON.parse(sessionStorage.getItem('pendingOrder') || 'null');
          if (saved && saved.restaurantId === data._id && saved.orderCounts) {
            setOrderCounts(saved.orderCounts);
          }
        } catch {
          // ignore
        }

        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Unable to load restaurant details.');
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, [id]);

  const handleUpdateCount = (itemId, delta) => {
    setOrderCounts((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev, [itemId]: next };
      if (next === 0) delete updated[itemId];

      if (restaurant) {
        sessionStorage.setItem('pendingOrder', JSON.stringify({
          restaurantId: restaurant._id,
          orderCounts: updated,
        }));
      }

      return updated;
    });
  };

  const menuItems = restaurant?.menuItems || [];
  const categories = ['All', ...new Set(menuItems.map((it) => it.category || 'Main Course'))];

  const filteredItems = menuItems.filter((item) => {
    const matchesCat = activeCategory === 'All' || (item.category || 'Main Course') === activeCategory;
    const matchesSearch = !menuSearch || item.name.toLowerCase().includes(menuSearch.toLowerCase()) || (item.description || '').toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cartItems = menuItems
    .map((it) => ({
      ...it,
      key: it._id || it.name,
      quantity: orderCounts[it._id || it.name] || 0,
    }))
    .filter((it) => it.quantity > 0);

  const subtotal = cartItems.reduce((sum, it) => sum + (Number(it.price) * it.quantity), 0);
  const gst = Math.round(subtotal * GST_RATE * 100) / 100;
  const deliveryFee = subtotal > 0 ? DELIVERY_CHARGE : 0;
  const grandTotal = subtotal + gst + deliveryFee;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('pendingOrder', JSON.stringify({
        restaurantId: restaurant._id,
        orderCounts,
        restoreAfterLogin: true,
      }));
      navigate('/login', { state: { from: { pathname: \`/restaurants/\${id}\` } } });
      return;
    }

    if (cartItems.length === 0) return;

    const prevCount = Number(localStorage.getItem('completedOrderCount') || 0);
    localStorage.setItem('completedOrderCount', String(prevCount + 1));
    sessionStorage.removeItem('pendingOrder');

    setOrderNotification(\`🎉 Order successfully placed with \${restaurant.name}! Total: ₹\${grandTotal.toFixed(2)}\`);
    setOrderCounts({});

    setTimeout(() => setOrderNotification(''), 7000);
  };

  if (loading) {
    return <Loading message="Loading restaurant menu & culinary details..." />;
  }

  if (error || !restaurant) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto' }}>
        <ErrorMessage
          title="Restaurant Not Available"
          message={error || 'The requested restaurant was not found.'}
          onRetry={() => navigate('/restaurants')}
        />
      </div>
    );
  }

  const fullAddress = [
    restaurant.address?.street,
    restaurant.address?.city,
    restaurant.address?.state,
    restaurant.address?.zipCode,
  ].filter(Boolean).join(', ') || 'Warangal, Telangana';

  const coverImg = getCardImage(restaurant);

  return (
    <div className="restaurant-details-view">
      {/* Navigation Breadcrumbs */}
      <nav className="details-breadcrumb" aria-label="Breadcrumbs">
        <Link to="/restaurants" className="breadcrumb-back">← All Restaurants</Link>
        <div className="breadcrumb-path">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/restaurants">Restaurants</Link>
          <span>/</span>
          <span className="current">{restaurant.name}</span>
        </div>
      </nav>

      {orderNotification && (
        <div className="order-notification-banner" role="alert">
          {orderNotification}
        </div>
      )}

      {/* Restaurant Header Hero Banner */}
      <section className="restaurant-showcase-banner">
        <div className="showcase-cover">
          <img src={coverImg} alt={restaurant.name} />
          <div className="showcase-gradient-overlay" />
        </div>

        <div className="showcase-info">
          <div className="showcase-badges">
            <span className={\`showcase-status \${restaurant.isOpen !== false ? 'open' : 'closed'}\`}>
              {restaurant.isOpen !== false ? '🟢 Open Now' : 'Closed'}
            </span>
            <span className="showcase-cuisine">🍽️ {restaurant.cuisine}</span>
            <span className="showcase-rating">★ {Number(restaurant.rating || 4.8).toFixed(1)}</span>
          </div>

          <h1 className="showcase-name">{restaurant.name}</h1>
          <p className="showcase-desc">{restaurant.description || 'Specialized in authentic flavours and freshly prepared dishes.'}</p>

          <div className="showcase-meta-line">
            <span>📍 {fullAddress}</span>
            {restaurant.phone && <span>📞 {restaurant.phone}</span>}
            <span>⚡ 25-35 mins</span>
            <span>💰 ₹250 for two</span>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Menu + Sticky Cart */}
      <div className="details-split-layout">
        {/* Left Column: Menu Items */}
        <main className="menu-column">
          <div className="menu-toolbar-panel">
            <div className="menu-heading-group">
              <h2>Menu</h2>
              <span className="menu-badge-count">{menuItems.length} Dishes</span>
            </div>

            <input
              type="text"
              placeholder="Search dishes in menu..."
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              className="menu-filter-input"
            />
          </div>

          {/* Category Tabs */}
          <div className="menu-cat-pills" role="tablist">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={\`menu-cat-btn \${activeCategory === c ? 'active' : ''}\`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Menu Items List */}
          {filteredItems.length > 0 ? (
            <div className="menu-card-list">
              {filteredItems.map((item) => {
                const itemKey = item._id || item.name;
                const qty = orderCounts[itemKey] || 0;
                return (
                  <MenuCard
                    key={itemKey}
                    item={item}
                    quantity={qty}
                    onAdd={() => handleUpdateCount(itemKey, 1)}
                    onRemove={() => handleUpdateCount(itemKey, -1)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="empty-state-card">
              <p>No dishes found matching your current filter.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => { setActiveCategory('All'); setMenuSearch(''); }}
              >
                View Full Menu
              </button>
            </div>
          )}
        </main>

        {/* Right Column: Sticky Cart Sidebar */}
        <aside className="cart-column">
          <div className="cart-card-sticky">
            <div className="cart-card-header">
              <h3>Your Order</h3>
              <span className="cart-items-tag">{cartItems.length} items</span>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty-block">
                <span className="cart-empty-graphic">🛍️</span>
                <h4>Cart is Empty</h4>
                <p>Select delicious dishes from the menu to start your order.</p>
              </div>
            ) : (
              <>
                <div className="cart-rows-list">
                  {cartItems.map((it) => (
                    <div className="cart-product-row" key={it.key}>
                      <div className="cart-product-name">
                        <span className={\`dot-veg \${it.isVegetarian ? 'veg' : 'non-veg'}\`} />
                        <span>{it.name}</span>
                      </div>
                      <div className="cart-product-actions">
                        <div className="cart-stepper">
                          <button type="button" onClick={() => handleUpdateCount(it.key, -1)}>-</button>
                          <span>{it.quantity}</span>
                          <button type="button" onClick={() => handleUpdateCount(it.key, 1)}>+</button>
                        </div>
                        <span className="cart-product-price">₹{(Number(it.price) * it.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary-breakdown">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-line">
                    <span>GST (5%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="summary-line grand-total">
                    <strong>Total to Pay</strong>
                    <strong>₹{grandTotal.toFixed(2)}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-order-checkout"
                  onClick={handleCheckout}
                >
                  {isAuthenticated ? \`Place Order • ₹\${grandTotal.toFixed(2)}\` : 'Sign In to Order'}
                </button>

                <p className="cart-micro-guarantee">
                  🛡️ 100% Safe, Contactless & Hygienic Delivery
                </p>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(srcDir, 'Navbar.jsx'), navbarCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'Home.jsx'), homeCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'Restaurants.jsx'), restaurantsCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'RestaurantDetails.jsx'), detailsCode, 'utf8');

console.log('Successfully upgraded Navbar.jsx, Home.jsx, Restaurants.jsx, and RestaurantDetails.jsx!');
