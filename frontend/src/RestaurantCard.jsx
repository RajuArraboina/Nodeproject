import { Link } from 'react-router-dom';

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
      <Link to={`/restaurants/${restaurant._id}`} className="card-image-wrap">
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
        <span className={`card-status-pill ${restaurant.isOpen !== false ? 'status-open' : 'status-closed'}`}>
          {restaurant.isOpen !== false ? '🟢 Open Now' : 'Closed'}
        </span>
        <span className="card-rating-badge">★ {rating}</span>
      </Link>

      <div className="card-content">
        <div className="card-header">
          <div className="card-title-group">
            <h3 className="card-title">
              <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
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
          <Link to={`/restaurants/${restaurant._id}`} className="btn-view-menu">
            View Menu & Order →
          </Link>
        </div>
      </div>
    </article>
  );
}
