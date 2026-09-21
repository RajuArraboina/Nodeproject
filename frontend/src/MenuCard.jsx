export default function MenuCard({ item, quantity = 0, onAdd, onRemove }) {
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
            <span className={`veg-badge ${item.isVegetarian ? 'veg' : 'non-veg'}`} title={item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}>
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
          <div className="quantity-counter" aria-label={`Quantity for ${item.name}`}>
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
            aria-label={`Add ${item.name} to order`}
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
}
