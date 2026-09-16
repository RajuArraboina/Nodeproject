function MenuCard({ item }) {
  return (
    <div>
      <h3>{item.name}</h3>

      <p>{item.description}</p>

      <p>
        Price: ₹{item.price}
      </p>

      <p>
        Category: {item.category}
      </p>

      {item.isVegetarian && (
        <span>🌱 Vegetarian</span>
      )}
    </div>
  );
}

export default MenuCard;