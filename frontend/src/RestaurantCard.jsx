function RestaurantCard({ restaurant, onView }) {
  return (
    <div>
      <h2>{restaurant.name}</h2>

      <p>{restaurant.description}</p>

      <button type="button" onClick={onView}>View Restaurant</button>
    </div>
  );
}

export default RestaurantCard;