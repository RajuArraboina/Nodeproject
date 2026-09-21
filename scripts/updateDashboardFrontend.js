const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../../frontend/frontend/src/RestaurantDetails.jsx');
let code = fs.readFileSync(targetPath, 'utf8');

// 1. Replace dashboardPromos with colorThemes, updated dashboardPromos, and trendingFoodTicker
const oldPromosStart = 'const dashboardPromos = [';
const oldPromosEnd = '];\n\n// Rich showcase imagery and signature dishes for right sidebar';

const promosStartIdx = code.indexOf(oldPromosStart);
const promosEndIdx = code.indexOf(oldPromosEnd);

if (promosStartIdx === -1 || promosEndIdx === -1) {
  console.error('Could not find old dashboardPromos definition in RestaurantDetails.jsx');
  process.exit(1);
}

const newDefinitions = `const colorThemes = [
  { id: "crimson", name: "Crimson Flame", class: "theme-crimson", color: "#e11d48" },
  { id: "indigo", name: "Royal Twilight", class: "theme-indigo", color: "#4f46e5" },
  { id: "emerald", name: "Gourmet Emerald", class: "theme-emerald", color: "#059669" },
  { id: "sunset", name: "Sunset Amber", class: "theme-sunset", color: "#ea580c" },
  { id: "midnight", name: "Midnight Velvet", class: "theme-midnight", color: "#1e1b4b" },
];

const dashboardPromos = [
  {
    title: "Order food & discover great restaurants",
    description: "Fresh favourites from your local restaurants, delivered hot & fast in Warangal.",
    badge: "FOOD DELIVERY",
    offer: "UP TO 60% OFF",
    themeClass: "theme-crimson",
    accentColor: "#e11d48",
    categoryFilter: "Biryani",
    images: [
      { name: "Hyderabadi Dum Biryani", image: foodImages.biryani },
      { name: "Crispy Chicken Fry", image: foodImages.chicken },
      { name: "Paneer Butter Masala", image: foodImages.paneer },
      { name: "Spicy Mutton Boti", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80" },
    ],
  },
  {
    title: "Big flavours, right at your doorstep",
    description: "Find biryani, ghee dosa, woodfired pizza and more from restaurants near you.",
    badge: "LOCAL FAVOURITES",
    offer: "BESTSELLERS",
    themeClass: "theme-indigo",
    accentColor: "#4f46e5",
    categoryFilter: "Dosa",
    images: [
      { name: "Special Ghee Karam Dosa", image: foodImages.dosa },
      { name: "Steaming Idli Sambar", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80" },
      { name: "Golden Crispy Samosa", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80" },
      { name: "Subani Handi Biryani", image: foodImages.biryani },
    ],
  },
  {
    title: "Make every meal memorable",
    description: "Explore something delicious today and order in a few clicks with live delivery tracking.",
    badge: "DINE & DISCOVER",
    offer: "TOP RATED",
    themeClass: "theme-emerald",
    accentColor: "#059669",
    categoryFilter: "Pizza",
    images: [
      { name: "Woodfired Cheesy Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80" },
      { name: "Gourmet Smashed Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" },
      { name: "Royal Belgian Waffles", image: foodImages.dessert },
      { name: "Chilled Mango Milkshake", image: foodImages.beverage },
    ],
  },
  {
    title: "Late night cravings & quick bites",
    description: "Juicy shawarmas, crispy kathi rolls and comforting street snacks till late night.",
    badge: "NIGHT CRAVINGS",
    offer: "FLAT ₹100 OFF",
    themeClass: "theme-sunset",
    accentColor: "#ea580c",
    categoryFilter: "Shawarma",
    images: [
      { name: "Chicken Shawarma Roll", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=300&q=80" },
      { name: "Egg & Paneer Kathi Roll", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=300&q=80" },
      { name: "Steamed Momos & Dip", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=300&q=80" },
      { name: "Wok Hakka Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80" },
    ],
  },
  {
    title: "Royal heritage dining & grand banquets",
    description: "Celebrate together with authentic family platters and chef's heritage specialties.",
    badge: "ROYAL BANQUET",
    offer: "CHEF'S SPECIAL",
    themeClass: "theme-midnight",
    accentColor: "#312e81",
    categoryFilter: "Indian",
    images: [
      { name: "Tandoori Kebab Platter", image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80" },
      { name: "Firewood Dum Mutton", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=300&q=80" },
      { name: "Garlic Butter Naan", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=300&q=80" },
      { name: "Gulab Jamun Sundae", image: foodImages.dessert },
    ],
  },
];

const trendingFoodTicker = [
  { name: "Dum Biryani", tag: "₹249 • Hot Seller", image: foodImages.biryani, query: "Biryani" },
  { name: "Ghee Dosa", tag: "₹99 • Crispy", image: foodImages.dosa, query: "Dosa" },
  { name: "Cheesy Pizza", tag: "₹299 • 4.9★", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=240&q=80", query: "Pizza" },
  { name: "Butter Chicken", tag: "₹280 • Rich Gravy", image: foodImages.chicken, query: "Chicken" },
  { name: "Steamed Momos", tag: "₹120 • Spicy Dip", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=240&q=80", query: "Chinese" },
  { name: "Smash Burger", tag: "₹179 • Loaded", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=240&q=80", query: "Burger" },
  { name: "Paneer Tikka", tag: "₹220 • Pure Veg", image: foodImages.paneer, query: "Paneer" },
  { name: "Chicken Shawarma", tag: "₹149 • Juicy", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=240&q=80", query: "Shawarma" },
  { name: "Gulab Jamun", tag: "₹89 • Sweet", image: foodImages.dessert, query: "Desserts" },
  { name: "Thick Shake", tag: "₹139 • Chilled", image: foodImages.beverage, query: "Beverage" },
];`;

code = code.substring(0, promosStartIdx) + newDefinitions + code.substring(promosEndIdx + 1);

// 2. Add theme and card image scrolling state
const stateMarker = '  const [promoIndex, setPromoIndex] = useState(0);';
const newStateCode = `  const [promoIndex, setPromoIndex] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState(() => localStorage.getItem("dashboardTheme") || "auto");
  const [cardImageIndex, setCardImageIndex] = useState(0);

  // Auto-scroll images in every promo item continuously
  useEffect(() => {
    const imgTimer = setInterval(() => {
      setCardImageIndex((prev) => (prev + 1) % 4);
    }, 2600);
    return () => clearInterval(imgTimer);
  }, []);

  function handleSelectTheme(themeId) {
    setSelectedThemeId(themeId);
    localStorage.setItem("dashboardTheme", themeId);
  }

  function handleNextPromo() {
    setPromoIndex((prev) => (prev + 1) % dashboardPromos.length);
  }

  function handlePrevPromo() {
    setPromoIndex((prev) => (prev - 1 + dashboardPromos.length) % dashboardPromos.length);
  }

  const activeThemeClass = selectedThemeId === "auto"
    ? dashboardPromos[promoIndex]?.themeClass || "theme-crimson"
    : (colorThemes.find((t) => t.id === selectedThemeId)?.class || "theme-crimson");`;

code = code.replace(stateMarker, newStateCode);

// 3. Replace the entire dashboard hero JSX section
const heroJsxStart = '{/* Dashboard hero header (shown on home list view) */}';
const heroJsxEnd = '{/* Page Heading & Navigation */}';

const heroStartIdx = code.indexOf(heroJsxStart);
const heroEndIdx = code.indexOf(heroJsxEnd);

if (heroStartIdx === -1 || heroEndIdx === -1) {
  console.error('Could not find hero JSX markers in RestaurantDetails.jsx');
  process.exit(1);
}

const newHeroJsx = `{/* Dashboard hero header (shown on home list view) */}
      {!selectedRestaurant && (
        <div className={\`dashboard-hero \${activeThemeClass}\`}>
          {/* Top Status & Color Switcher Bar */}
          <div className="dashboard-top-bar">
            <div className="dashboard-live-badges">
              <span className="live-pill">
                <span className="live-dot" /> 20+ Warangal Kitchens Live
              </span>
              <span className="live-pill">⚡ 30m Express Delivery</span>
              <span className="live-pill">⭐ 4.8 Top Rated</span>
            </div>

            {/* Dynamic Theme / Color Switcher */}
            <div className="theme-picker-bar" aria-label="Change dashboard theme color">
              <span className="theme-picker-label">🎨 Color</span>
              {colorThemes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={\`theme-swatch-btn \${selectedThemeId === theme.id ? "active" : ""}\`}
                  style={{ backgroundColor: theme.color }}
                  onClick={() => handleSelectTheme(theme.id)}
                  title={\`Switch to \${theme.name}\`}
                  aria-label={\`Switch to \${theme.name}\`}
                />
              ))}
              <button
                type="button"
                className={\`theme-auto-toggle \${selectedThemeId === "auto" ? "active" : ""}\`}
                onClick={() => handleSelectTheme("auto")}
                title="Auto-shift colors with slides"
              >
                🔄 Auto
              </button>
            </div>
          </div>

          {/* Hero Copy with Carousel Navigation Arrows */}
          <div className="dashboard-hero-nav-wrapper">
            <button
              type="button"
              className="hero-nav-arrow prev"
              onClick={handlePrevPromo}
              aria-label="Previous promotion"
            >
              ❮
            </button>

            <div className="dashboard-hero-copy">
              <p className="eyebrow">SR RESTAURANTS • WARANGAL</p>
              <h1 key={promoIndex}>{dashboardPromos[promoIndex].title}</h1>
              <p>{dashboardPromos[promoIndex].description}</p>

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
              )}

              {/* Search Row */}
              <div className="dashboard-search-row">
                <div className="location-pill" aria-label="Current location">
                  📍 <span>Warangal, Telangana • {restaurants.length} Restaurants</span>
                </div>
                <SearchBar search={search} setSearch={setSearch} />
                <select
                  className="country-filter"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  aria-label="Filter by country"
                >
                  <option value="">All countries</option>
                  <option value="India">India</option>
                  <option value="Italy">Italy</option>
                  <option value="Japan">Japan</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Mediterranean">Mediterranean</option>
                </select>
              </div>

              {/* Quick Filter Tag Chips */}
              <div className="dashboard-quick-tags" aria-label="Popular food filters">
                {["All", "Biryani", "Dosa", "Pizza", "Burger", "Chinese", "Desserts", "Pure Veg"].map((tag) => {
                  const isActive = (tag === "All" && !search) || (search.toLowerCase() === tag.toLowerCase());
                  return (
                    <button
                      key={tag}
                      type="button"
                      className={\`quick-tag-chip \${isActive ? "active" : ""}\`}
                      onClick={() => setSearch(tag === "All" ? "" : tag)}
                    >
                      {tag === "All" ? "🔥 All" : tag === "Pure Veg" ? "🥦 Pure Veg" : tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="hero-nav-arrow next"
              onClick={handleNextPromo}
              aria-label="Next promotion"
            >
              ❯
            </button>
          </div>

          {/* Promo Cards Grid with Dynamic Multi-Image Reel */}
          <div className="dashboard-promo-grid">
            {dashboardPromos.slice(0, 3).map((promo, pIdx) => {
              const activeImgObj = promo.images[cardImageIndex % promo.images.length];
              return (
                <article
                  className="dashboard-promo-card"
                  key={promo.badge}
                  onClick={() => setSearch(promo.categoryFilter)}
                  title={\`Browse \${promo.badge}\`}
                >
                  <div className="promo-card-info">
                    <div>
                      <span className="promo-card-offer">{promo.offer}</span>
                      <h3 className="promo-card-badge" style={{ marginTop: "8px" }}>{promo.badge}</h3>
                      <p className="promo-card-desc">{promo.description}</p>
                    </div>
                    <span className="promo-card-action">Order Now →</span>
                  </div>

                  {/* Auto-scrolling image reel with caption and indicators */}
                  <div className="promo-card-visual">
                    <div className="promo-image-dots">
                      {promo.images.map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={\`promo-micro-dot \${(cardImageIndex % promo.images.length) === dotIdx ? "active" : ""}\`}
                        />
                      ))}
                    </div>

                    <div className="promo-image-frame">
                      {promo.images.map((imgItem, imgIdx) => {
                        const isCurrent = (cardImageIndex % promo.images.length) === imgIdx;
                        return (
                          <img
                            key={imgItem.name}
                            onError={handleImageError}
                            src={imgItem.image}
                            alt={imgItem.name}
                            className={\`promo-slide-img \${isCurrent ? "active" : "inactive"}\`}
                          />
                        );
                      })}
                    </div>

                    <span className="promo-dish-tag">
                      {activeImgObj.name}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Infinite Auto-Scrolling Food Ticker Ribbon */}
          <div className="dashboard-food-ticker" aria-label="Trending dishes in Warangal">
            <div className="ticker-header">
              <span>🔥 Trending Dishes in Warangal • Click any dish to view</span>
              <span>⚡ Fresh & Fast</span>
            </div>
            <div className="ticker-track-container">
              <div className="ticker-track">
                {[...trendingFoodTicker, ...trendingFoodTicker].map((dish, dIdx) => (
                  <div
                    key={\`\${dish.name}-\${dIdx}\`}
                    className="ticker-dish-card"
                    onClick={() => setSearch(dish.query)}
                    title={\`Search for \${dish.name}\`}
                  >
                    <img onError={handleImageError} src={dish.image} alt={dish.name} />
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
            {dashboardPromos.map((promo, index) => (
              <button
                type="button"
                key={promo.badge}
                className={index === promoIndex ? "active" : ""}
                onClick={() => setPromoIndex(index)}
                aria-label={\`Show promotion \${index + 1}\`}
              />
            ))}
          </div>
        </div>
      )}

      `;

code = code.substring(0, heroStartIdx) + newHeroJsx + code.substring(heroEndIdx);

fs.writeFileSync(targetPath, code, 'utf8');
console.log('Successfully updated RestaurantDetails.jsx! New length:', code.length);

// Also sync to scripts/RestaurantDetails.jsx.new for backup
const backupPath = path.resolve(__dirname, 'RestaurantDetails.jsx.new');
fs.writeFileSync(backupPath, code, 'utf8');
console.log('Updated backup at scripts/RestaurantDetails.jsx.new');
