import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import restaurantService from './services/restaurantService';

const cuisineOptions = [
  'Indian',
  'South Indian',
  'Biryani',
  'Mughlai',
  'Italian',
  'Chinese',
  'Fast Food',
  'Dessert',
  'Beverage',
  'Continental',
];

const menuCategories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side'];

export default function CreateRestaurant() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    cuisine: 'Indian',
    description: '',
    phone: '',
    email: '',
    street: '',
    city: 'Warangal',
    state: 'Telangana',
    zipCode: '506001',
    rating: '4.5',
    isOpen: true,
  });

  const [menuItems, setMenuItems] = useState([
    { name: '', description: '', price: '', category: 'Main Course', isVegetarian: false },
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleMenuItemChange = (index, field, value) => {
    setMenuItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddMenuItem = () => {
    setMenuItems((prev) => [
      ...prev,
      { name: '', description: '', price: '', category: 'Main Course', isVegetarian: false },
    ]);
  };

  const handleRemoveMenuItem = (index) => {
    if (menuItems.length <= 1) return;
    setMenuItems((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Restaurant name is required';
    if (!formData.cuisine.trim()) newErrors.cuisine = 'Cuisine is required';
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.rating && (Number(formData.rating) < 0 || Number(formData.rating) > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    // Validate menu items with filled names
    menuItems.forEach((item, idx) => {
      if (item.name.trim() && (!item.price || isNaN(item.price) || Number(item.price) <= 0)) {
        newErrors[`menuPrice_${idx}`] = 'Valid price required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const validMenuItems = menuItems
        .filter((item) => item.name.trim() !== '')
        .map((item) => ({
          name: item.name.trim(),
          description: item.description.trim(),
          price: Number(item.price),
          category: item.category,
          isVegetarian: Boolean(item.isVegetarian),
        }));

      const payload = {
        name: formData.name.trim(),
        cuisine: formData.cuisine.trim(),
        description: formData.description.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: {
          street: formData.street.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          zipCode: formData.zipCode.trim(),
        },
        rating: Number(formData.rating) || 4.5,
        isOpen: Boolean(formData.isOpen),
        menuItems: validMenuItems,
      };

      const res = await restaurantService.create(payload);
      const createdId = res.data?._id || res._id;
      if (createdId) {
        navigate(`/restaurants/${createdId}`);
      } else {
        navigate('/restaurants');
      }
    } catch (err) {
      setServerError(err.message || 'Failed to create restaurant. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-card-wrapper">
        <div className="form-header">
          <Link to="/restaurants" className="btn-back-link">← Back to Restaurants</Link>
          <span className="form-badge">ADMINISTRATION</span>
          <h1 className="form-title">Create New Restaurant</h1>
          <p className="form-subtitle">Add a new partner restaurant and its signature menu items to the Warangal network.</p>
        </div>

        {serverError && (
          <div className="alert-banner error" role="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-restaurant-form" noValidate>
          {/* Section 1: Basic Information */}
          <fieldset className="form-section">
            <legend className="form-section-title">1. Basic Information</legend>

            <div className="form-row">
              <div className="form-group flex-2">
                <label htmlFor="name">Restaurant Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Subani Dum Biryani House"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'input-error' : ''}
                  required
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group flex-1">
                <label htmlFor="cuisine">Cuisine *</label>
                <select
                  id="cuisine"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  className={errors.cuisine ? 'input-error' : ''}
                  required
                >
                  {cuisineOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.cuisine && <span className="error-text">{errors.cuisine}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="Briefly describe your culinary specialties, heritage cooking, ambiance..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label htmlFor="rating">Initial Rating (0 – 5)</label>
                <input
                  id="rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  className={errors.rating ? 'input-error' : ''}
                />
                {errors.rating && <span className="error-text">{errors.rating}</span>}
              </div>

              <div className="form-group flex-1 checkbox-group">
                <label htmlFor="isOpen" className="checkbox-label">
                  <input
                    id="isOpen"
                    name="isOpen"
                    type="checkbox"
                    checked={formData.isOpen}
                    onChange={handleChange}
                  />
                  <span>Restaurant Is Open Now</span>
                </label>
              </div>
            </div>
          </fieldset>

          {/* Section 2: Address & Contact */}
          <fieldset className="form-section">
            <legend className="form-section-title">2. Address & Contact Details</legend>

            <div className="form-row">
              <div className="form-group flex-2">
                <label htmlFor="street">Street Address</label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  placeholder="e.g. Main Road, Naimnagar"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group flex-1">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group flex-1">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contact@restaurant.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>
          </fieldset>

          {/* Section 3: Menu Items Builder */}
          <fieldset className="form-section">
            <div className="section-header-inline">
              <legend className="form-section-title">3. Signature Menu Items</legend>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleAddMenuItem}
              >
                + Add Another Dish
              </button>
            </div>
            <p className="form-hint">Add key dishes. If left blank, standard menu items for this cuisine will be auto-generated.</p>

            <div className="menu-builder-list">
              {menuItems.map((item, idx) => (
                <div key={idx} className="menu-builder-card">
                  <div className="builder-header">
                    <span className="item-number">Dish #{idx + 1}</span>
                    {menuItems.length > 1 && (
                      <button
                        type="button"
                        className="btn-remove-item"
                        onClick={() => handleRemoveMenuItem(idx)}
                        title="Remove dish"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-2">
                      <label>Dish Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Firewood Chicken Dum Biryani"
                        value={item.name}
                        onChange={(e) => handleMenuItemChange(idx, 'name', e.target.value)}
                      />
                    </div>

                    <div className="form-group flex-1">
                      <label>Price (₹)</label>
                      <input
                        type="number"
                        placeholder="249"
                        value={item.price}
                        onChange={(e) => handleMenuItemChange(idx, 'price', e.target.value)}
                        className={errors[`menuPrice_${idx}`] ? 'input-error' : ''}
                      />
                      {errors[`menuPrice_${idx}`] && (
                        <span className="error-text">{errors[`menuPrice_${idx}`]}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>Category</label>
                      <select
                        value={item.category}
                        onChange={(e) => handleMenuItemChange(idx, 'category', e.target.value)}
                      >
                        {menuCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group flex-2 checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={item.isVegetarian}
                          onChange={(e) => handleMenuItemChange(idx, 'isVegetarian', e.target.checked)}
                        />
                        <span>🌱 Vegetarian Dish</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Cooked with long-grain basmati rice and secret spices"
                      value={item.description}
                      onChange={(e) => handleMenuItemChange(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Form Submit Actions */}
          <div className="form-actions">
            <Link to="/restaurants" className="btn btn-ghost">Cancel</Link>
            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Restaurant...' : '✓ Publish Restaurant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
