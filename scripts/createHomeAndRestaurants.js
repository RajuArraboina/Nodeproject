const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../frontend/frontend/src');

// 1. Home.jsx
const homeCode = `import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { restaurantAPI } from './services/api';
import RestaurantCard from './RestaurantCard';
import Loading from './Loading';

const heroPromos = [
  {
    title: "Order food & discover great restaurants",
    description: "Fresh favourites from your local restaurants, delivered hot & fast in Warangal.",
    badge: "FOOD DELIVERY",
    offer: "UP TO 60% OFF",
    themeClass: "theme-crimson",
    cuisine: "Biryani",
    images: [
      { name: "Hyderabadi Dum Biryani", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=400&q=80" },
      { name: "Crispy Chicken Fry", image: "https://images.unsplash.com/photo-1604909052743-f7d2d3f5b6b3?auto=format&fit=crop&w=400&q=80" },
      { name: "Paneer Butter Masala", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80" },
      { name: "Spicy Mutton Boti", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  {
    title: "Big flavours, right at your doorstep",
    description: "Find biryani, ghee dosa, woodfired pizza and more from restaurants near you.",
    badge: "LOCAL FAVOURITES",
    offer: "BESTSELLERS",
    themeClass: "theme-indigo",
    cuisine: "South Indian",
    images: [
      { name: "Special Ghee Karam Dosa", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80" },
      { name: "Steaming Idli Sambar", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80" },
      { name: "Golden Crispy Samosa", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80" },
      { name: "Subani Handi Biryani", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  {
    title: "Make every meal memorable",
    description: "Explore something delicious today and order in a few clicks with live delivery tracking.",
    badge: "DINE & DISCOVER",
    offer: "TOP RATED",
    themeClass: "theme-emerald",
    cuisine: "Italian",
    images: [
      { name: "Woodfired Cheesy Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
      { name: "Gourmet Smashed Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
      { name: "Royal Belgian Waffles", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80" },
      { name: "Chilled Mango Milkshake", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  {
    title: "Late night cravings & quick bites",
    description: "Juicy shawarmas, crispy kathi rolls and comforting street snacks till late night.",
    badge: "NIGHT CRAVINGS",
    offer: "FLAT ₹100 OFF",
    themeClass: "theme-sunset",
    cuisine: "Chinese",
    images: [
      { name: "Chicken Shawarma Roll", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=400&q=80" },
      { name: "Egg & Paneer Kathi Roll", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400&q=80" },
      { name: "Steamed Momos & Dip", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80" },
      { name: "Wok Hakka Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  {
    title: "Royal heritage dining & grand banquets",
    description: "Celebrate together with authentic family platters and chef's heritage specialties.",
    badge: "ROYAL BANQUET",
    offer: "CHEF'S SPECIAL",
    themeClass: "theme-midnight",
    cuisine: "Indian",
    images: [
      { name: "Tandoori Kebab Platter", image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80" },
      { name: "Firewood Dum Mutton", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=400&q=80" },
      { name: "Garlic Butter Naan", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80" },
      { name: "Gulab Jamun Sundae", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80" },
    ],
  },
];

const trendingFoodTicker = [
  { name: "Dum Biryani", tag: "₹249 • Bestseller", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=240&q=80", cuisine: "Biryani" },
  { name: "Ghee Dosa", tag: "₹99 • Crispy", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=240&q=80", cuisine: "South Indian" },
  { name: "Cheesy Pizza", tag: "₹299 • 4.9★", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=240&q=80", cuisine: "Italian" },
  { name: "Butter Chicken", tag: "₹280 • Rich Gravy", image: "https://images.unsplash.com/photo-1604909052743-f7d2d3f5b6b3?auto=format&fit=crop&w=240&q=80", cuisine: "Indian" },
  { name: "Steamed Momos", tag: "₹120 • Spicy Dip", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=240&q=80", cuisine: "Chinese" },
  { name: "Smash Burger", tag: "₹179 • Loaded", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=240&q=80", cuisine: "Fast Food" },
  { name: "Paneer Tikka", tag: "₹220 • Pure Veg", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=240&q=80", cuisine: "Indian" },
  { name: "Chicken Shawarma", tag: "₹149 • Juicy", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=240&q=80", cuisine: "Shawarma" },
  { name: "Gulab Jamun", tag: "₹89 • Sweet", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=240&q=80", cuisine: "Dessert" },
  { name: "Thick Shake", tag: "₹139 • Chilled", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=240&q=80", cuisine: "Beverage" },
];

const foodCategories = [
  { name: "Biryani", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=240&q=80" },
  { name: "South Indian", label: "Dosa & Tiffins", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=240&q=80" },
  { name: "Pizza", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=240&q=80" },
  { name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=240&q=80" },
  { name: "Chinese", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=240&q=80" },
  { name: "Mughlai", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=240&q=80" },
  { name: "Dessert", label: "Desserts", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=240&q=80" },
  { name: "Beverage", label: "Shakes & Drinks", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=240&q=80" },
];

export default function Home() {
  const [promoIndex, setPromoIndex] = useState(0);
  const [cardImageIndex, setCardImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Slide rotation timer
  useEffect(() => {
    const promoTimer = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % heroPromos.length);
    }, 4500);
    return () => clearInterval(promoTimer);
  }, []);

  // Card image reel timer
  useEffect(() => {
    const reelTimer = setInterval(() => {
      setCardImageIndex((prev) => (prev + 1) % 4);
    }, 2600);
    return () => clearInterval(reelTimer);
  }, []);

  // Fetch featured restaurants from backend
  useEffect(() => {
    let mounted = true;
    restaurantAPI.getAll()
      .then((data) => {
        if (mounted) {
          setFeaturedRestaurants(data.slice(0, 6));
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
    if (searchTerm.trim()) {
      navigate(\`/restaurants?search=\${encodeURIComponent(searchTerm.trim())}\`);
    } else {
      navigate('/restaurants');
    }
  };

  const currentThemeClass = heroPromos[promoIndex]?.themeClass || 'theme-crimson';

  return (
    <div className="home-page">
      {/* Dynamic Animated Hero Section */}
      <section className={\`dashboard-hero \${currentThemeClass}\`}>
        <div className="dashboard-top-bar">
          <div className="dashboard-live-badges">
            <span className="live-pill"><span className="live-dot" /> 20+ Warangal Kitchens Live</span>
            <span className="live-pill">⚡ 30m Express Delivery</span>
            <span className="live-pill">⭐ 4.8 Top Rated</span>
          </div>
        </div>

        <div className="dashboard-hero-nav-wrapper">
          <button
            type="button"
            className="hero-nav-arrow prev"
            onClick={() => setPromoIndex((prev) => (prev - 1 + heroPromos.length) % heroPromos.length)}
            aria-label="Previous promotion"
          >
            ❮
          </button>

          <div className="dashboard-hero-copy">
            <p className="eyebrow">SR RESTAURANTS • WARANGAL</p>
            <h1 key={promoIndex}>{heroPromos[promoIndex].title}</h1>
            <p>{heroPromos[promoIndex].description}</p>

            <form className="dashboard-search-row" onSubmit={handleSearchSubmit}>
              <div className="location-pill" aria-label="Current location">
                📍 <span>Warangal, Telangana</span>
              </div>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search restaurants, dishes, cuisines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search food"
                />
                <button type="submit" className="search-btn">Search</button>
              </div>
            </form>

            <div className="dashboard-quick-tags" aria-label="Quick food filters">
              {['Biryani', 'South Indian', 'Pizza', 'Burger', 'Chinese', 'Dessert'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className="quick-tag-chip"
                  onClick={() => navigate(\`/restaurants?cuisine=\${encodeURIComponent(cat)}\`)}
                >
                  {cat === 'South Indian' ? '🥞 Tiffins' : cat === 'Biryani' ? '🍛 Biryani' : cat === 'Pizza' ? '🍕 Pizza' : cat === 'Burger' ? '🍔 Burger' : cat}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="hero-nav-arrow next"
            onClick={() => setPromoIndex((prev) => (prev + 1) % heroPromos.length)}
            aria-label="Next promotion"
          >
            ❯
          </button>
        </div>

        {/* Promo Cards Grid with Dynamic Multi-Image Reel */}
        <div className="dashboard-promo-grid">
          {heroPromos.slice(0, 3).map((promo) => {
            const activeImg = promo.images[cardImageIndex % promo.images.length];
            return (
              <article
                className="dashboard-promo-card"
                key={promo.badge}
                onClick={() => navigate(\`/restaurants?cuisine=\${encodeURIComponent(promo.cuisine)}\`)}
                title={\`Browse \${promo.badge}\`}
              >
                <div className="promo-card-info">
                  <div>
                    <span className="promo-card-offer">{promo.offer}</span>
                    <h3 className="promo-card-badge">{promo.badge}</h3>
                    <p className="promo-card-desc">{promo.description}</p>
                  </div>
                  <span className="promo-card-action">Order Now →</span>
                </div>

                <div className="promo-card-visual">
                  <div className="promo-image-dots">
                    {promo.images.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={\`promo-micro-dot \${(cardImageIndex % promo.images.length) === dotIdx ? 'active' : ''}\`}
                      />
                    ))}
                  </div>

                  <div className="promo-image-frame">
                    {promo.images.map((imgItem, imgIdx) => {
                      const isCurrent = (cardImageIndex % promo.images.length) === imgIdx;
                      return (
                        <img
                          key={imgItem.name}
                          src={imgItem.image}
                          alt={imgItem.name}
                          className={\`promo-slide-img \${isCurrent ? 'active' : 'inactive'}\`}
                        />
                      );
                    })}
                  </div>

                  <span className="promo-dish-tag">{activeImg.name}</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Infinite Auto-Scrolling Food Ticker Ribbon */}
        <div className="dashboard-food-ticker" aria-label="Trending dishes in Warangal">
          <div className="ticker-header">
            <span>🔥 Trending Dishes in Warangal • Click any dish to explore</span>
            <span>⚡ Fresh & Fast</span>
          </div>
          <div className="ticker-track-container">
            <div className="ticker-track">
              {[...trendingFoodTicker, ...trendingFoodTicker].map((dish, dIdx) => (
                <div
                  key={\`\${dish.name}-\${dIdx}\`}
                  className="ticker-dish-card"
                  onClick={() => navigate(\`/restaurants?search=\${encodeURIComponent(dish.name)}\`)}
                  title={\`Search for \${dish.name}\`}
                >
                  <img src={dish.image} alt={dish.name} />
                  <div className="ticker-dish-info">
                    <span className="ticker-dish-name">{dish.name}</span>
                    <span className="ticker-dish-sub">{dish.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="dashboard-dots" aria-label="Dashboard promotion controls">
          {heroPromos.map((promo, index) => (
            <button
              type="button"
              key={promo.badge}
              className={index === promoIndex ? 'active' : ''}
              onClick={() => setPromoIndex(index)}
              aria-label={\`Show promotion \${index + 1}\`}
            />
          ))}
        </div>
      </section>

      {/* Food Categories Strip */}
      <section className="home-section">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">WHAT&apos;S ON YOUR MIND?</span>
            <h2 className="section-title">Popular Food Categories</h2>
          </div>
          <Link to="/restaurants" className="section-link">Explore All →</Link>
        </div>

        <div className="food-category-strip">
          {foodCategories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              className="food-category"
              onClick={() => navigate(\`/restaurants?cuisine=\${encodeURIComponent(cat.name)}\`)}
            >
              <img src={cat.image} alt={cat.name} loading="lazy" />
              <span>{cat.label || cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Warangal Restaurants */}
      <section className="home-section">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">FEATURED PARTNERS</span>
            <h2 className="section-title">Top Rated Restaurants in Warangal</h2>
          </div>
          <Link to="/restaurants" className="btn btn-outline">View All Restaurants →</Link>
        </div>

        {loading ? (
          <Loading message="Loading featured restaurants..." />
        ) : featuredRestaurants.length > 0 ? (
          <div className="restaurant-grid">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <p className="state-message">No restaurants available right now. Please check back shortly!</p>
        )}
      </section>

      {/* Platform Features Strip */}
      <section className="features-strip">
        <div className="feature-item">
          <span className="feature-icon">⚡</span>
          <h4>30-Min Delivery</h4>
          <p>Superfast delivery from kitchens near you</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🛡️</span>
          <h4>Hygienic Standards</h4>
          <p>Certified kitchen cleanliness and packaging</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">⭐</span>
          <h4>Authentic Warangal Taste</h4>
          <p>Local culinary legends and firewood heritage</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">💳</span>
          <h4>Live Order Tracking</h4>
          <p>Real-time status updates from stove to door</p>
        </div>
      </section>
    </div>
  );
}
`;

// 2. Restaurants.jsx
const restaurantsCode = `import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { restaurantAPI } from './services/api';
import RestaurantCard from './RestaurantCard';
import Loading from './Loading';

const cuisineOptions = [
  'All',
  'Indian',
  'South Indian',
  'Biryani',
  'Mughlai',
  'Italian',
  'Chinese',
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

  const fetchRestaurants = useCallback(async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const query = {};
      if (params.search) query.search = params.search;
      if (params.cuisine && params.cuisine !== 'All') query.cuisine = params.cuisine;
      if (params.city) query.city = params.city;

      const data = await restaurantAPI.getAll(query);
      setRestaurants(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const cuisine = searchParams.get('cuisine') || 'All';
    const city = searchParams.get('city') || '';

    setSearchInput(search);
    setSelectedCuisine(cuisine);
    setSelectedCity(city);

    fetchRestaurants({ search, cuisine, city });
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

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisine(cuisine);
    updateFilters({ cuisine });
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    updateFilters({ city });
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSelectedCuisine('All');
    setSelectedCity('');
    setSearchParams({});
  };

  return (
    <div className="restaurants-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <span className="page-eyebrow">DISCOVER RESTAURANTS</span>
          <h1 className="page-title">Explore All Restaurants</h1>
          <p className="page-subtitle">
            Find biryani, authentic south Indian tiffins, artisanal pizzas, and popular dining in Warangal.
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="catalog-toolbar">
        <form className="catalog-search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search by restaurant name, description, dishes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
          {searchInput && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setSearchInput('');
                updateFilters({ search: '' });
              }}
            >
              ✕ Clear
            </button>
          )}
        </form>

        <div className="catalog-city-select">
          <label htmlFor="city-filter" className="filter-label">City:</label>
          <select
            id="city-filter"
            value={selectedCity}
            onChange={handleCityChange}
            className="city-select"
          >
            <option value="">All Locations</option>
            <option value="Warangal">Warangal</option>
            <option value="Hanamkonda">Hanamkonda</option>
            <option value="Kazipet">Kazipet</option>
          </select>
        </div>
      </div>

      {/* Cuisine Filter Pills */}
      <div className="cuisine-pills-bar" aria-label="Filter by cuisine">
        {cuisineOptions.map((cuisine) => {
          const isActive = selectedCuisine.toLowerCase() === cuisine.toLowerCase();
          return (
            <button
              key={cuisine}
              type="button"
              className={\`cuisine-pill \${isActive ? 'active' : ''}\`}
              onClick={() => handleCuisineClick(cuisine)}
            >
              {cuisine}
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicators */}
      {(searchInput || (selectedCuisine && selectedCuisine !== 'All') || selectedCity) && (
        <div className="active-filters-row">
          <span>Active Filters:</span>
          {searchInput && <span className="filter-tag">Search: &quot;{searchInput}&quot;</span>}
          {selectedCuisine !== 'All' && <span className="filter-tag">Cuisine: {selectedCuisine}</span>}
          {selectedCity && <span className="filter-tag">City: {selectedCity}</span>}
          <button type="button" className="btn-link-reset" onClick={handleClearFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      {/* Results State Handling */}
      {loading ? (
        <Loading message="Loading restaurants..." />
      ) : error ? (
        <div className="state-message-card error">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => fetchRestaurants({ search: searchInput, cuisine: selectedCuisine, city: selectedCity })}
          >
            Try Again
          </button>
        </div>
      ) : restaurants.length === 0 ? (
        <div className="state-message-card empty">
          <div className="empty-icon">🍽️</div>
          <h3>No Restaurants Found</h3>
          <p>We couldn&apos;t find any restaurants matching your current search or filters.</p>
          <button type="button" className="btn btn-primary" onClick={handleClearFilters}>
            Clear Filters & View All
          </button>
        </div>
      ) : (
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync(path.join(srcDir, 'Home.jsx'), homeCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'Restaurants.jsx'), restaurantsCode, 'utf8');
console.log('Successfully created Home.jsx and Restaurants.jsx!');
