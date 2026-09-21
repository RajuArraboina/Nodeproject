const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../frontend/frontend/src');

const restaurantDetailsCode = `import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { restaurantAPI } from './services/api';
import { useAuth } from './context/AuthContext';
import MenuCard from './MenuCard';
import Loading from './Loading';
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuSearch, setMenuSearch] = useState('');
  const [orderSuccessMsg, setOrderSuccessMsg] = useState('');

  // Fetch restaurant dynamically by ID from URL
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError('');

    restaurantAPI.getById(id)
      .then((data) => {
        if (!isMounted) return;
        if (!data || !data._id) {
          throw new Error('Restaurant not found');
        }
        setRestaurant(data);

        // Restore pending order if saved for this restaurant
        try {
          const saved = JSON.parse(sessionStorage.getItem('pendingOrder') || 'null');
          if (saved && saved.restaurantId === data._id && saved.orderCounts) {
            setOrderCounts(saved.orderCounts);
          }
        } catch {
          // ignore parsing errors
        }

        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Unable to load restaurant details. The restaurant may not exist or the server is unavailable.');
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, [id]);

  // Update order count for a dish
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

  // Place order
  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('pendingOrder', JSON.stringify({
        restaurantId: restaurant._id,
        orderCounts,
        restoreAfterLogin: true,
      }));
      navigate('/login', { state: { from: { pathname: \`/restaurants/\${id}\` } } });
      return;
    }

    const totalQty = Object.values(orderCounts).reduce((a, b) => a + b, 0);
    if (totalQty === 0) {
      alert('Please add at least one item to your order.');
      return;
    }

    // Record order in localStorage
    const pastCount = Number(localStorage.getItem('completedOrderCount') || 0);
    localStorage.setItem('completedOrderCount', String(pastCount + 1));
    sessionStorage.removeItem('pendingOrder');

    setOrderSuccessMsg(\`🎉 Order placed successfully for \${totalQty} items from \${restaurant.name}! Total: ₹\${orderTotal.toFixed(2)}\`);
    setOrderCounts({});

    setTimeout(() => setOrderSuccessMsg(''), 8000);
  };

  if (loading) {
    return <Loading message="Loading restaurant menu & details..." />;
  }

  if (error || !restaurant) {
    return (
      <div className="state-message-card error" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h3>Restaurant Unavailable</h3>
        <p>{error || 'The requested restaurant could not be found.'}</p>
        <Link to="/restaurants" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '14px' }}>
          ← Back to All Restaurants
        </Link>
      </div>
    );
  }

  const menuItems = restaurant.menuItems || [];

  // Extract unique categories from actual menu
  const categories = ['All', ...new Set(menuItems.map((item) => item.category || 'Main Course'))];

  // Filter menu items
  const filteredMenu = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || (item.category || 'Main Course') === selectedCategory;
    const matchesSearch = !menuSearch || item.name.toLowerCase().includes(menuSearch.toLowerCase()) || (item.description || '').toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate order totals
  const cartItems = menuItems
    .map((item) => ({
      ...item,
      key: item._id || item.name,
      quantity: orderCounts[item._id || item.name] || 0,
    }))
    .filter((item) => item.quantity > 0);

  const subtotal = cartItems.reduce((acc, it) => acc + (Number(it.price) * it.quantity), 0);
  const gst = Math.round(subtotal * GST_RATE * 100) / 100;
  const delivery = subtotal > 0 ? DELIVERY_CHARGE : 0;
  const orderTotal = subtotal + gst + delivery;

  const addressText = [
    restaurant.address?.street,
    restaurant.address?.city,
    restaurant.address?.state,
  ].filter(Boolean).join(', ') || 'Warangal, Telangana';

  const coverImage = getCardImage(restaurant);

  return (
    <div className="restaurant-details-page">
      {/* Back Navigation Bar */}
      <div className="details-nav-bar">
        <Link to="/restaurants" className="btn-back-link">
          ← Back to all restaurants
        </Link>
        <span className="breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/restaurants">Restaurants</Link> / <span>{restaurant.name}</span>
        </span>
      </div>

      {orderSuccessMsg && (
        <div className="alert-banner success" role="alert">
          {orderSuccessMsg}
        </div>
      )}

      {/* Restaurant Hero Banner */}
      <section className="restaurant-hero-banner">
        <div className="hero-banner-image-wrap">
          <img src={coverImage} alt={restaurant.name} className="hero-cover-img" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-banner-content">
          <div className="hero-badge-row">
            <span className={\`status-pill \${restaurant.isOpen !== false ? 'open' : 'closed'}\`}>
              {restaurant.isOpen !== false ? '🟢 Open Now' : 'Closed'}
            </span>
            <span className="cuisine-badge">🍽️ {restaurant.cuisine}</span>
            <span className="rating-badge">★ {Number(restaurant.rating || 4.5).toFixed(1)} (400+ reviews)</span>
          </div>

          <h1 className="hero-rest-name">{restaurant.name}</h1>
          <p className="hero-rest-desc">{restaurant.description || 'Authentic recipes made with high-quality ingredients.'}</p>

          <div className="hero-rest-meta">
            <span>📍 {addressText}</span>
            {restaurant.phone && <span>📞 {restaurant.phone}</span>}
            <span>⚡ 25-35 mins avg delivery</span>
            <span>💰 ₹200 for two</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout: Menu + Sticky Cart Sidebar */}
      <div className="details-two-column">
        {/* Left: Menu Section */}
        <div className="details-main-menu">
          <div className="menu-header-bar">
            <div>
              <h2>Restaurant Menu</h2>
              <p className="menu-subtitle">{menuItems.length} items available to order</p>
            </div>

            <div className="menu-search-wrap">
              <input
                type="text"
                placeholder="Search within menu..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                className="menu-search-input"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="menu-category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={\`menu-tab-btn \${selectedCategory === cat ? 'active' : ''}\`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items List */}
          {filteredMenu.length > 0 ? (
            <div className="menu-items-grid">
              {filteredMenu.map((item) => {
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
            <div className="state-message-card empty">
              <p>No menu items found in &quot;{selectedCategory}&quot; category.</p>
              <button type="button" className="btn btn-outline" onClick={() => { setSelectedCategory('All'); setMenuSearch(''); }}>
                View All Menu Items
              </button>
            </div>
          )}
        </div>

        {/* Right: Sticky Cart / Order Panel */}
        <aside className="details-cart-sidebar">
          <div className="cart-panel">
            <div className="cart-header">
              <h3>Your Order</h3>
              <span className="cart-count-badge">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty-state">
                <span className="cart-empty-icon">🛒</span>
                <p className="cart-empty-title">Your cart is empty</p>
                <p className="cart-empty-hint">Add items from the menu to build your delicious meal.</p>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div className="cart-item-row" key={item.key}>
                      <div className="cart-item-info">
                        <span className={\`veg-dot \${item.isVegetarian ? 'veg' : 'non-veg'}\`} />
                        <span className="cart-item-name">{item.name}</span>
                      </div>

                      <div className="cart-item-ctrl">
                        <div className="cart-qty-box">
                          <button type="button" onClick={() => handleUpdateCount(item.key, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => handleUpdateCount(item.key, 1)}>+</button>
                        </div>
                        <span className="cart-item-sub">₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-bill-details">
                  <div className="bill-row">
                    <span>Item Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="bill-row">
                    <span>GST (5%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="bill-row">
                    <span>Delivery Partner Fee</span>
                    <span>₹{delivery.toFixed(2)}</span>
                  </div>
                  <div className="bill-row total">
                    <strong>To Pay</strong>
                    <strong>₹{orderTotal.toFixed(2)}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-checkout"
                  onClick={handlePlaceOrder}
                >
                  {isAuthenticated ? \`Place Order • ₹\${orderTotal.toFixed(2)}\` : 'Login to Place Order'}
                </button>

                <p className="cart-guarantee">
                  🛡️ 100% Safe & Contactless Delivery in Warangal
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

fs.writeFileSync(path.join(srcDir, 'RestaurantDetails.jsx'), restaurantDetailsCode, 'utf8');
console.log('Successfully created dynamic RestaurantDetails.jsx!');
