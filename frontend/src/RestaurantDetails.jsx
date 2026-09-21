import { useState, useEffect } from 'react';
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
      navigate('/login', { state: { from: { pathname: `/restaurants/${id}` } } });
      return;
    }

    if (cartItems.length === 0) return;

    const prevCount = Number(localStorage.getItem('completedOrderCount') || 0);
    localStorage.setItem('completedOrderCount', String(prevCount + 1));
    sessionStorage.removeItem('pendingOrder');

    setOrderNotification(`🎉 Order successfully placed with ${restaurant.name}! Total: ₹${grandTotal.toFixed(2)}`);
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
            <span className={`showcase-status ${restaurant.isOpen !== false ? 'open' : 'closed'}`}>
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
                className={`menu-cat-btn ${activeCategory === c ? 'active' : ''}`}
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
                        <span className={`dot-veg ${it.isVegetarian ? 'veg' : 'non-veg'}`} />
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
                  {isAuthenticated ? `Place Order • ₹${grandTotal.toFixed(2)}` : 'Sign In to Order'}
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
