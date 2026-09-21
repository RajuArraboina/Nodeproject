const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../../frontend/frontend/src/RestaurantDetails.jsx');

const code = `import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const foodImages = {
  appetizer: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80",
  "main course": "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=300&q=80",
  dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=300&q=80",
  beverage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80",
  biryani: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80",
  paneer: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80",
  mutton: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80",
  fish: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=300&q=80",
  chicken: "https://images.unsplash.com/photo-1604909052743-f7d2d3f5b6b3?auto=format&fit=crop&w=300&q=80",
  dosa: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=300&q=80",
  default: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80",
};

const cuisineImages = {
  indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=85",
  mughlai: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85",
  japanese: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=85",
  mexican: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=700&q=85",
  italian: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=85",
  mediterranean: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85",
  default: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=85",
};

const heroImages = [
  { src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=420&q=85", alt: "Burger" },
  { src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=420&q=85", alt: "Indian food" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=420&q=85", alt: "Pizza" },
  { src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=420&q=85", alt: "Sushi" },
  { src: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=420&q=85", alt: "Tacos" },
];

const foodCategories = [
  { name: "Biryani", image: foodImages.biryani },
  { name: "Pizza", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=240&q=85" },
  { name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=240&q=85" },
  { name: "Cake", image: foodImages.dessert },
  { name: "Desserts", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=240&q=85" },
  { name: "Shawarma", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=240&q=85" },
  { name: "Rolls", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=240&q=85" },
  { name: "Chinese", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=240&q=85" },
  { name: "Samosa", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=240&q=85" },
  { name: "Momo", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=240&q=85" },
  { name: "Shake", image: foodImages.beverage },
  { name: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=240&q=85" },
  { name: "Dosa", image: foodImages.dosa },
];

const dashboardPromos = [
  {
    title: "Order food & discover great restaurants",
    description: "Fresh favourites from your local restaurants, delivered in Warangal.",
    badge: "FOOD DELIVERY",
    offer: "UP TO 60% OFF",
    image: foodImages.biryani,
  },
  {
    title: "Big flavours, right at your doorstep",
    description: "Find biryani, dosa, pizza and more from restaurants near you.",
    badge: "LOCAL FAVOURITES",
    offer: "BESTSELLERS",
    image: foodImages.chicken,
  },
  {
    title: "Make every meal memorable",
    description: "Explore something delicious today and order in a few clicks.",
    badge: "DINE & DISCOVER",
    offer: "TOP RATED",
    image: foodImages.dessert,
  },
];

// Rich showcase imagery and signature dishes for right sidebar
const restaurantProfiles = {
  biryani: {
    hero: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=1200&q=85",
    tag: "Firewood Dum Cooking",
    dishes: [
      { name: "Dum Biryani", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80" },
      { name: "Spicy Boti Fry", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
      { name: "Bagara Rice", image: "https://images.unsplash.com/photo-1604909052743-f7d2d3f5b6b3?auto=format&fit=crop&w=600&q=80" },
      { name: "Meetha Sweet", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  tiffin: {
    hero: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=85",
    tag: "South Indian Tiffins",
    dishes: [
      { name: "Ghee Dosa", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80" },
      { name: "Ghee Idli Vada", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80" },
      { name: "Crispy Poori", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80" },
      { name: "Filter Coffee", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  mughlai: {
    hero: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=85",
    tag: "Tandoori & Mughlai",
    dishes: [
      { name: "Tandoori Platter", image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80" },
      { name: "Paneer Butter", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80" },
      { name: "Garlic Naan", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80" },
      { name: "Gulab Jamun", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  italian: {
    hero: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85",
    tag: "Artisanal Woodfired Pizza",
    dishes: [
      { name: "Gourmet Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" },
      { name: "Creamy Pasta", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" },
      { name: "Garlic Bread", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=80" },
      { name: "Tiramisu", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  chinese: {
    hero: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=85",
    tag: "Indo-Chinese Wok Special",
    dishes: [
      { name: "Steamed Momos", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80" },
      { name: "Hakka Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80" },
      { name: "Chilli Paneer", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80" },
      { name: "Crispy Rolls", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  burger: {
    hero: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85",
    tag: "Smashed Burgers & Shakes",
    dishes: [
      { name: "Crispy Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
      { name: "Loaded Fries", image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80" },
      { name: "Chicken Wings", image: "https://images.unsplash.com/photo-1604909052743-f7d2d3f5b6b3?auto=format&fit=crop&w=600&q=80" },
      { name: "Thick Shake", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  default: {
    hero: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    tag: "Chef's Heritage Delights",
    dishes: [
      { name: "Special Meal", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" },
      { name: "Rich Curry", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80" },
      { name: "Crispy Starter", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80" },
      { name: "Royal Dessert", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80" },
    ],
  },
};

function getRestaurantCategoryKey(restaurant) {
  if (!restaurant) return "default";
  const text = `${restaurant.name || ""} ${restaurant.cuisine || ""} ${restaurant.description || ""}`.toLowerCase();
  if (text.includes("biryani") || text.includes("subani") || text.includes("mutton") || text.includes("mandi") || text.includes("pot")) {
    return "biryani";
  }
  if (text.includes("dosa") || text.includes("idli") || text.includes("tiffin") || text.includes("swagath") || text.includes("kakatiya") || text.includes("udipi") || text.includes("south")) {
    return "tiffin";
  }
  if (text.includes("mughlai") || text.includes("tandoor") || text.includes("kebab") || text.includes("bbq") || text.includes("grill") || text.includes("spice") || text.includes("curry")) {
    return "mughlai";
  }
  if (text.includes("pizza") || text.includes("italian") || text.includes("pasta")) {
    return "italian";
  }
  if (text.includes("chinese") || text.includes("momo") || text.includes("noodle") || text.includes("roll") || text.includes("shawarma")) {
    return "chinese";
  }
  if (text.includes("burger") || text.includes("cafe") || text.includes("bakery") || text.includes("sandwich")) {
    return "burger";
  }
  return "default";
}

function getHeroBannerImage(restaurant) {
  if (restaurant?.image) return restaurant.image;
  const key = getRestaurantCategoryKey(restaurant);
  return restaurantProfiles[key]?.hero || restaurantProfiles.default.hero;
}

function getRestaurantDishPreviews(restaurant) {
  const key = getRestaurantCategoryKey(restaurant);
  return restaurantProfiles[key]?.dishes || restaurantProfiles.default.dishes;
}

const GST_RATE = 0.05;
const DELIVERY_CHARGE = 40;
const COMPLETED_ORDERS_KEY = "completedOrderCount";

function handleImageError(event) {
  if (event.currentTarget.dataset.fallbackApplied) return;
  event.currentTarget.dataset.fallbackApplied = "true";
  event.currentTarget.src = foodImages.default;
}

function getFoodImage(item) {
  if (item.image) {
    return item.image;
  }

  const name = (item.name || "").toLowerCase();

  if (name.includes("biryani")) return foodImages.biryani;
  if (name.includes("paneer")) return foodImages.paneer;
  if (name.includes("mutton") || name.includes("boti")) return foodImages.mutton;
  if (name.includes("fish") || name.includes("prawn")) return foodImages.fish;
  if (name.includes("chicken")) return foodImages.chicken;
  if (name.includes("dosa") || name.includes("idli") || name.includes("vada") || name.includes("poori") || name.includes("bonda")) return foodImages.dosa;
  if (name.includes("butter") || name.includes("masala") || name.includes("curry")) return foodImages.paneer;
  if (name.includes("sweet") || name.includes("meetha") || name.includes("halwa") || name.includes("jamun")) return foodImages.dessert;

  return foodImages[item.category?.toLowerCase()] || foodImages.default;
}

function getRestaurantImage(restaurant) {
  if (restaurant.image) {
    return restaurant.image;
  }

  const countryOrCuisine = restaurant.country || restaurant.cuisine;
  const name = (restaurant.name || "").toLowerCase();

  if (name.includes("biryani") || name.includes("subani") || name.includes("spice") || name.includes("kitchen")) {
    return foodImages.biryani;
  }
  if (name.includes("paneer") || name.includes("veg") || name.includes("garden")) {
    return foodImages.paneer;
  }
  if (name.includes("mutton") || name.includes("grill") || name.includes("bbq")) {
    return foodImages.mutton;
  }
  if (name.includes("fish") || name.includes("seafood") || name.includes("marine")) {
    return foodImages.fish;
  }
  if (name.includes("chicken") || name.includes("fried")) {
    return foodImages.chicken;
  }
  if (name.includes("dosa") || name.includes("tiffin") || name.includes("swagath") || name.includes("south")) {
    return foodImages.dosa;
  }

  return cuisineImages[countryOrCuisine?.toLowerCase()] || cuisineImages.default;
}

function RestaurantDetails({ canCreateRestaurant, isAuthenticated, onLogin, onCreateRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderCounts, setOrderCounts] = useState({});
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data.message || "Restaurant database is unavailable");
        }
        return data;
      })
      .then((data) => {
        const restaurantList = Array.isArray(data)
          ? data
          : data.restaurants || data.data || [];

        if (!restaurantList.length) {
          throw new Error("No restaurants found in the database");
        }

        setRestaurants(restaurantList);
        const savedOrder = JSON.parse(sessionStorage.getItem("pendingOrder") || "null");
        const savedRestaurant = restaurantList.find((restaurant) => restaurant._id === savedOrder?.restaurantId);
        if (savedRestaurant && savedOrder?.orderCounts) {
          setSelectedRestaurant(savedRestaurant);
          setOrderCounts(savedOrder.orderCounts);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromoIndex((index) => (index + 1) % dashboardPromos.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  function updateOrderCount(itemId, change) {
    setOrderCounts((current) => {
      const nextValue = (current[itemId] || 0) + change;
      const nextCounts = {
        ...current,
        [itemId]: nextValue > 0 ? nextValue : 0,
      };

      if (selectedRestaurant) {
        sessionStorage.setItem("pendingOrder", JSON.stringify({
          restaurantId: selectedRestaurant._id,
          orderCounts: nextCounts,
        }));
      }

      return nextCounts;
    });
  }

  function placeOrder() {
    if (!isAuthenticated) {
      sessionStorage.setItem("pendingOrder", JSON.stringify({
        restaurantId: selectedRestaurant?._id,
        orderCounts,
      }));
      if (onLogin) {
        onLogin();
      }
      return;
    }

    const completedOrderCount = Number(localStorage.getItem(COMPLETED_ORDERS_KEY) || 0);
    localStorage.setItem(COMPLETED_ORDERS_KEY, String(completedOrderCount + 1));
    sessionStorage.removeItem("pendingOrder");
    window.alert(`Order placed successfully for ${totalItems} ${totalItems === 1 ? "item" : "items"}. Total: ₹${formatCurrency(orderTotal)}`);
    setOrderCounts({});
  }

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const searchText = search.trim().toLowerCase();
    const countryText = country.toLowerCase();
    const menuText = (restaurant.menuItems || []).map((item) => item.name).join(" ");
    const searchableText = [restaurant.name, restaurant.cuisine, restaurant.country, restaurant.description, menuText]
      .map((value) => String(value || "").toLowerCase())
      .join(" ");

    return (!searchText || searchableText.includes(searchText))
      && (!countryText || searchableText.includes(countryText));
  });

  const orderItems = selectedRestaurant
    ? (selectedRestaurant.menuItems || [])
      .map((item) => ({
        ...item,
        itemKey: item._id || item.name,
        quantity: orderCounts[item._id || item.name] || 0,
      }))
      .filter((item) => item.quantity > 0)
    : [];

  const totalItems = orderItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = orderItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  const gst = Math.round(subtotal * GST_RATE * 100) / 100;
  const hasCompletedOrder = Number(localStorage.getItem(COMPLETED_ORDERS_KEY) || 0) > 0;
  const deliveryCharge = hasCompletedOrder ? DELIVERY_CHARGE : 0;
  const orderTotal = subtotal + gst + deliveryCharge;

  const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (loading) {
    return <p className="state-message">Loading restaurant details...</p>;
  }

  if (error) {
    return <p className="state-message error-message">Error: {error}</p>;
  }

  return (
    <section className="restaurant-details">
      {/* Dashboard hero header (shown on home list view) */}
      {!selectedRestaurant && (
        <div className="dashboard-hero">
          <div className="dashboard-hero-copy">
            <p className="eyebrow">SR RESTAURANTS</p>
            <h1 key={promoIndex}>{dashboardPromos[promoIndex].title}</h1>
            <p>{dashboardPromos[promoIndex].description}</p>
            <div className="dashboard-search-row">
              <div className="location-pill" aria-label="Current location">
                📍 <span>Warangal, Telangana</span>
              </div>
              <SearchBar search={search} setSearch={setSearch} />
              <select className="country-filter" value={country} onChange={(event) => setCountry(event.target.value)} aria-label="Filter by country">
                <option value="">All countries</option>
                <option value="India">India</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Mexico">Mexico</option>
                <option value="Mediterranean">Mediterranean</option>
              </select>
            </div>
          </div>
          <div className="dashboard-promo-grid">
            {dashboardPromos.map((promo) => (
              <article className="dashboard-promo-card" key={promo.badge}>
                <div>
                  <strong>{promo.badge}</strong>
                  <span>{promo.offer}</span>
                </div>
                <img onError={handleImageError} src={promo.image} alt={promo.badge} />
              </article>
            ))}
          </div>
          <div className="dashboard-dots" aria-label="Dashboard promotion controls">
            {dashboardPromos.map((promo, index) => (
              <button type="button" key={promo.badge} className={index === promoIndex ? "active" : ""} onClick={() => setPromoIndex(index)} aria-label={`Show promotion ${index + 1}`} />
            ))}
          </div>
        </div>
      )}

      {/* Page Heading & Navigation */}
      <div className="details-heading">
        <div>
          <p className="eyebrow">{selectedRestaurant ? "RESTAURANT MENU & DETAILS" : "EXPLORE THE COLLECTION"}</p>
          <div className="details-title-row">
            <h1>{selectedRestaurant ? selectedRestaurant.name : "Restaurants"}</h1>
            {!selectedRestaurant && canCreateRestaurant && (
              <button className="create-restaurant-button" type="button" onClick={onCreateRestaurant}>
                + Create new restaurant
              </button>
            )}
          </div>
        </div>
        {selectedRestaurant && (
          <button
            className="back-button"
            type="button"
            onClick={() => {
              setSelectedRestaurant(null);
              setActiveGalleryImage(null);
            }}
          >
            ← Back to all restaurants
          </button>
        )}
      </div>

      {/* Category Strip (only in list view) */}
      {!selectedRestaurant && (
        <div className="food-category-strip" aria-label="Popular food categories">
          {foodCategories.map((category) => (
            <button
              type="button"
              className={`food-category ${search.toLowerCase() === category.name.toLowerCase() ? "food-category-active" : ""}`}
              key={category.name}
              onClick={() => setSearch(category.name)}
            >
              <img onError={handleImageError} src={category.image} alt={category.name} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* SELECTED RESTAURANT DEDICATED 2-COLUMN VIEW */}
      {selectedRestaurant ? (
        <div className="restaurant-detail-layout">
          {/* LEFT COLUMN: Main Restaurant Information & Menu Items */}
          <div className="restaurant-detail-main">
            <article className="restaurant-panel selected-restaurant-card">
              <div className="restaurant-panel-heading">
                <div>
                  <h2>{selectedRestaurant.name}</h2>
                  <p className="restaurant-description">
                    {selectedRestaurant.description || "Specialized in delicious authentic cuisine and local heritage specialties."}
                  </p>
                </div>
                <span className={selectedRestaurant.isOpen ? "status open" : "status"}>
                  {selectedRestaurant.isOpen ? "Open Now" : "Closed"}
                </span>
              </div>

              <div className="restaurant-meta">
                <span>🍽️ {selectedRestaurant.country || selectedRestaurant.cuisine || "Multi-Cuisine"}</span>
                {selectedRestaurant.rating && <span>★ {selectedRestaurant.rating} (500+ reviews)</span>}
                <span>⚡ 25-35 mins</span>
                {selectedRestaurant.phone && <span>📞 {selectedRestaurant.phone}</span>}
              </div>

              <div className="menu-section-wrapper">
                <div className="menu-section-header">
                  <h3>Menu</h3>
                  <span className="menu-count-badge">{selectedRestaurant.menuItems?.length || 0} Items</span>
                </div>

                <div className="menu-list">
                  {selectedRestaurant.menuItems?.length ? (
                    selectedRestaurant.menuItems.map((item) => {
                      const itemKey = item._id || item.name;
                      const quantity = orderCounts[itemKey] || 0;

                      return (
                        <div className="menu-item" key={itemKey}>
                          <img onError={handleImageError} className="menu-item-image" src={getFoodImage(item)} alt={item.name} />
                          <div className="menu-item-info">
                            <span>{item.name}</span>
                            {item.description && <small>{item.description}</small>}
                          </div>
                          <strong>₹{item.price}</strong>
                          {quantity > 0 ? (
                            <div className="menu-quantity-box" aria-label={`Quantity for ${item.name}`}>
                              <button type="button" className="qty-button" onClick={() => updateOrderCount(itemKey, -1)} aria-label={`Decrease ${item.name}`}>-</button>
                              <span>{quantity}</span>
                              <button type="button" className="qty-button" onClick={() => updateOrderCount(itemKey, 1)} aria-label={`Increase ${item.name}`}>
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="menu-add-button"
                              onClick={() => updateOrderCount(itemKey, 1)}
                              aria-label={`Add ${item.name} to order`}
                            >
                              +
                            </button>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="no-items">No menu items available</p>
                  )}
                </div>
              </div>
            </article>
          </div>

          {/* RIGHT COLUMN: The Showcase Card (Food Imagery, Gallery, Badges) & Live Cart */}
          <aside className="restaurant-detail-sidebar">
            {/* 1. RESTAURANT HERO IMAGE SHOWCASE CARD */}
            <div className="restaurant-showcase-card">
              <div className="showcase-image-container">
                <img
                  onError={handleImageError}
                  className="showcase-image"
                  src={activeGalleryImage || getHeroBannerImage(selectedRestaurant)}
                  alt={selectedRestaurant.name}
                />
                <div className="showcase-overlay">
                  <div className="showcase-badges">
                    <span className="showcase-pill live">🔥 Warangal Bestseller</span>
                    <span className="showcase-pill hygiene">✓ 100% Hygienic</span>
                  </div>
                  <div className="showcase-caption">
                    <h4>{selectedRestaurant.name}</h4>
                    <p>{selectedRestaurant.cuisine || "Authentic Flavours"} • Fresh Ingredients</p>
                  </div>
                </div>
              </div>

              {/* Dish Photo Gallery Chips */}
              <div className="showcase-dish-gallery">
                <div className="gallery-header">
                  <span>Food Preview</span>
                  <small>Click to view</small>
                </div>
                <div className="gallery-chips">
                  {getRestaurantDishPreviews(selectedRestaurant).map((dish, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`gallery-chip ${(activeGalleryImage === dish.image) || (!activeGalleryImage && idx === 0) ? "active-chip" : ""}`}
                      onClick={() => setActiveGalleryImage(dish.image)}
                      title={dish.name}
                    >
                      <img src={dish.image} alt={dish.name} onError={handleImageError} />
                      <span>{dish.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Highlights Grid */}
              <div className="showcase-features">
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <div>
                    <strong>25-35 Mins</strong>
                    <small>Fast Delivery</small>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⭐</span>
                  <div>
                    <strong>{selectedRestaurant.rating || "4.6"} Rating</strong>
                    <small>500+ Reviews</small>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🛵</span>
                  <div>
                    <strong>Free Delivery</strong>
                    <small>First Order</small>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📍</span>
                  <div>
                    <strong>Warangal City</strong>
                    <small>Doorstep Delivery</small>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. DYNAMIC LIVE CART WIDGET */}
            {orderItems.length > 0 ? (
              <div className="order-summary sidebar-order-summary" aria-label="Order summary">
                <div className="order-summary-heading">
                  <div>
                    <p className="form-section-label">🛒 Your Cart</p>
                    <strong>{totalItems} {totalItems === 1 ? "item" : "items"}</strong>
                  </div>
                  <strong className="order-total">₹{formatCurrency(orderTotal)}</strong>
                </div>

                <div className="order-summary-items">
                  {orderItems.map((item) => (
                    <div className="order-summary-row" key={item.itemKey}>
                      <span>{item.quantity} × {item.name}</span>
                      <div className="cart-item-stepper">
                        <button type="button" className="mini-qty-btn" onClick={() => updateOrderCount(item.itemKey, -1)} aria-label="Decrease">-</button>
                        <span>{item.quantity}</span>
                        <button type="button" className="mini-qty-btn" onClick={() => updateOrderCount(item.itemKey, 1)} aria-label="Increase">+</button>
                        <strong>₹{new Intl.NumberFormat("en-IN").format(Number(item.price) * item.quantity)}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-bill" aria-label="Bill details">
                  <div className="order-summary-row">
                    <span>Item subtotal</span>
                    <strong>₹{formatCurrency(subtotal)}</strong>
                  </div>
                  <div className="order-summary-row">
                    <span>GST ({GST_RATE * 100}%)</span>
                    <strong>₹{formatCurrency(gst)}</strong>
                  </div>
                  <div className="order-summary-row">
                    <span>Delivery {hasCompletedOrder ? "charge" : "(first order)"}</span>
                    <strong className={hasCompletedOrder ? "" : "delivery-free"}>
                      {hasCompletedOrder ? `₹${formatCurrency(deliveryCharge)}` : "FREE"}
                    </strong>
                  </div>
                  <div className="order-summary-row order-grand-total">
                    <strong>Total payable</strong>
                    <strong>₹{formatCurrency(orderTotal)}</strong>
                  </div>
                </div>

                <button className="primary-button order-button" type="button" onClick={placeOrder}>
                  {isAuthenticated ? "Proceed to Checkout" : "Login to Place Order"} → ₹{formatCurrency(orderTotal)}
                </button>
              </div>
            ) : (
              <div className="empty-cart-promo-card">
                <div className="empty-cart-badge">🎉 Special Offer</div>
                <h4>Looking for something delicious?</h4>
                <p>Add your favorite items from {selectedRestaurant.name}'s menu to build your feast!</p>
                <div className="empty-cart-coupon">
                  <span>Special Discount:</span>
                  <strong>WARANGAL20</strong>
                  <small>Flat 20% OFF on all items</small>
                </div>
              </div>
            )}
          </aside>
        </div>
      ) : (
        /* ALL RESTAURANTS GRID VIEW */
        <div className="restaurant-grid">
          {filteredRestaurants.map((restaurant) => (
            <article
              className="restaurant-panel restaurant-select"
              key={restaurant._id}
              onClick={() => {
                setActiveGalleryImage(null);
                setSelectedRestaurant(restaurant);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setActiveGalleryImage(null);
                  setSelectedRestaurant(restaurant);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <img onError={handleImageError} className="restaurant-image" src={getRestaurantImage(restaurant)} alt={restaurant.name} />
              <div className="restaurant-panel-heading">
                <h2>{restaurant.name}</h2>
                <span className={restaurant.isOpen ? "status open" : "status"}>
                  {restaurant.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              <p className="restaurant-description">
                {restaurant.description || "No description available"}
              </p>
              <div className="restaurant-meta">
                <span>{restaurant.country || restaurant.cuisine}</span>
                {restaurant.rating && <span>★ {restaurant.rating}</span>}
                {restaurant.phone && <span>{restaurant.phone}</span>}
              </div>
              <p className="select-hint">Click to view menu →</p>
            </article>
          ))}
        </div>
      )}

      {!selectedRestaurant && !filteredRestaurants.length && (
        <p className="state-message">No restaurants found for "{search}".</p>
      )}
    </section>
  );
}

export default RestaurantDetails;
`;

fs.writeFileSync(targetPath, code, 'utf8');
console.log('Successfully wrote to ' + targetPath);
