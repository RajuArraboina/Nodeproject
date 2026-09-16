// function RestaurantDetails() {
//   return (
//     <div>
//       <h1>Restaurant Details</h1>

//       <h2>Raju Garden</h2>
//       <p>Indian food restaurant</p>
//       <p>Cuisine: Indian</p>

//       <h3>Menu</h3>

//       <p>Chicken Biryani - ₹250</p>
//       <p>Paneer Butter Masala - ₹200</p>
//     </div>
//   );
// }

// export default RestaurantDetails;
import { useEffect, useState } from "react";

const foodImages = {
  appetizer: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=240&q=80",
  "main course": "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=240&q=80",
  dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=240&q=80",
  beverage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=240&q=80",
  default: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=240&q=80",
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
  { src: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=420&q=85", alt: "Steamed dumplings" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=420&q=85", alt: "Pizza" },
  { src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=420&q=85", alt: "Sushi" },
  { src: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=420&q=85", alt: "Tacos" },
];

function getFoodImage(item) {
  return item.image || foodImages[item.category?.toLowerCase()] || foodImages.default;
}

function getRestaurantImage(restaurant) {
  const countryOrCuisine = restaurant.country || restaurant.cuisine;
  return restaurant.image || cuisineImages[countryOrCuisine?.toLowerCase()] || cuisineImages.default;
}

function RestaurantDetails({ onCreateRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant data");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Backend data:", data);
        const restaurantList = Array.isArray(data)
          ? data
          : data.restaurants || data.data || [];

        if (!restaurantList.length) {
          throw new Error("No restaurants were returned by the backend");
        }

        setRestaurants(restaurantList);
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
      setHeroIndex((index) => (index + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  function moveHeroImage(direction) {
    setHeroIndex((index) => (index + direction + heroImages.length) % heroImages.length);
  }

  if (loading) {
    return <p className="state-message">Loading restaurant details...</p>;
  }

  if (error) {
    return <p className="state-message error-message">Error: {error}</p>;
  }

  return (
    <section className="restaurant-details">
      <div className="food-hero">
        <img key={`bowl-${heroIndex}`} className="hero-food hero-bowl food-image-transition" src={heroImages[(heroIndex + 1) % heroImages.length].src} alt={heroImages[(heroIndex + 1) % heroImages.length].alt} />
        <img key={`burger-${heroIndex}`} className="hero-food hero-burger food-image-transition" src={heroImages[heroIndex].src} alt={heroImages[heroIndex].alt} />
        <div className="food-hero-copy">
          <p className="eyebrow">SR RESTAURANTS</p>
          <h1>Better food for<br />more people</h1>
          <p>Discover new tastes, delivered right to your doorstep.</p>
        </div>
        <img key={`pizza-${heroIndex}`} className="hero-food hero-pizza food-image-transition" src={heroImages[(heroIndex + 2) % heroImages.length].src} alt={heroImages[(heroIndex + 2) % heroImages.length].alt} />
        <div className="hero-gallery-controls">
          <button type="button" onClick={() => moveHeroImage(-1)} aria-label="Previous food image">&lt;</button>
          <span>{heroIndex + 1} / {heroImages.length}</span>
          <button type="button" onClick={() => moveHeroImage(1)} aria-label="Next food image">&gt;</button>
        </div>
      </div>
      <div className="details-heading">
        <p className="eyebrow">EXPLORE THE COLLECTION</p>
        <div className="details-title-row">
          <h1>{selectedRestaurant ? selectedRestaurant.name : "Restaurants"}</h1>
          {!selectedRestaurant && (
            <button className="create-restaurant-button" type="button" onClick={onCreateRestaurant}>
              + Create new restaurant
            </button>
          )}
        </div>
        {selectedRestaurant && (
          <button className="back-button" type="button" onClick={() => setSelectedRestaurant(null)}>
            All restaurants
          </button>
        )}
      </div>

      <div className="restaurant-grid">
        {(selectedRestaurant ? [selectedRestaurant] : restaurants).map((restaurant) => (
          <article
            className={`restaurant-panel ${selectedRestaurant ? "selected-restaurant" : "restaurant-select"}`}
            key={restaurant._id}
            onClick={() => !selectedRestaurant && setSelectedRestaurant(restaurant)}
            onKeyDown={(event) => {
              if (!selectedRestaurant && (event.key === "Enter" || event.key === " ")) {
                setSelectedRestaurant(restaurant);
              }
            }}
            role={selectedRestaurant ? undefined : "button"}
            tabIndex={selectedRestaurant ? undefined : 0}
          >
            <img className="restaurant-image" src={getRestaurantImage(restaurant)} alt={restaurant.name} />
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

            {selectedRestaurant ? (
              <>
                <h3>Menu</h3>
                <div className="menu-list">
                  {restaurant.menuItems?.length ? (
                    restaurant.menuItems.map((item) => (
                      <div className="menu-item" key={item._id}>
                        <img src={getFoodImage(item)} alt={item.name} />
                        <div className="menu-item-info">
                          <span>{item.name}</span>
                          {item.description && <small>{item.description}</small>}
                        </div>
                        <strong>₹{item.price}</strong>
                      </div>
                    ))
                  ) : (
                    <p>No menu items available</p>
                  )}
                </div>
              </>
            ) : (
              <p className="select-hint">Click to view menu</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default RestaurantDetails;