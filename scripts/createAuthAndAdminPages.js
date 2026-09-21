const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../frontend/frontend/src');

// 1. CreateRestaurant.jsx
const createRestaurantCode = `import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { restaurantAPI } from './services/api';

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
    if (formData.email && !/^\\S+@\\S+\\.\\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.rating && (Number(formData.rating) < 0 || Number(formData.rating) > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    // Validate menu items with filled names
    menuItems.forEach((item, idx) => {
      if (item.name.trim() && (!item.price || isNaN(item.price) || Number(item.price) <= 0)) {
        newErrors[\`menuPrice_\${idx}\`] = 'Valid price required';
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

      const res = await restaurantAPI.create(payload);
      const createdId = res.data?._id || res._id;
      if (createdId) {
        navigate(\`/restaurants/\${createdId}\`);
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
                        className={errors[\`menuPrice_\${idx}\`] ? 'input-error' : ''}
                      />
                      {errors[\`menuPrice_\${idx}\`] && (
                        <span className="error-text">{errors[\`menuPrice_\${idx}\`]}</span>
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
`;

// 2. Login.jsx
const loginCode = `import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/restaurants';

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^\\S+@\\S+\\.\\S+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand-badge">S</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Log in to your SR Restaurants account to order food and track deliveries.</p>
        </div>

        {serverError && (
          <div className="alert-banner error" role="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              className={errors.email ? 'input-error' : ''}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              className={errors.password ? 'input-error' : ''}
              required
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/register" className="auth-link">
              Create an account
            </Link>
          </p>
          <p className="auth-demo-hint">
            💡 Default admin login: <code>admin@restaurant.com</code> / <code>admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
`;

// 3. Register.jsx
const registerCode = `import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = 'Full name is required';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^\\S+@\\S+\\.\\S+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters long';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });
      navigate('/restaurants', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. This email may already be in use.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand-badge">S</div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join SR Restaurants Warangal for fast online delivery, special offers, and order tracking.</p>
        </div>

        {serverError && (
          <div className="alert-banner error" role="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Raju Arraboina"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              className={errors.name ? 'input-error' : ''}
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              className={errors.email ? 'input-error' : ''}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password (min 6 characters) *</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              className={errors.password ? 'input-error' : ''}
              required
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Customer (Food Ordering)</option>
              <option value="admin">Restaurant Partner / Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
`;

// 4. Profile.jsx
const profileCode = `import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Profile() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const completedOrders = Number(localStorage.getItem('completedOrderCount') || 0);

  return (
    <div className="profile-page-container">
      <div className="profile-card-wrapper">
        <div className="profile-hero">
          <div className="profile-avatar">
            {(user?.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="profile-title-group">
            <h1>{user?.name || 'Valued Customer'}</h1>
            <p className="profile-email">{user?.email}</p>
            <span className={\`profile-role-badge \${isAdmin ? 'admin' : 'user'}\`}>
              {isAdmin ? '🛡️ Administrator' : '👤 Customer'}
            </span>
          </div>
        </div>

        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <span className="stat-number">{completedOrders}</span>
            <span className="stat-label">Orders Placed</span>
          </div>
          <div className="profile-stat-box">
            <span className="stat-number">Warangal</span>
            <span className="stat-label">Delivery Zone</span>
          </div>
          <div className="profile-stat-box">
            <span className="stat-number">Active</span>
            <span className="stat-label">Account Status</span>
          </div>
        </div>

        <div className="profile-details-section">
          <h3>Account Information</h3>
          <div className="profile-info-row">
            <span className="info-label">Full Name</span>
            <span className="info-value">{user?.name || 'Not provided'}</span>
          </div>
          <div className="profile-info-row">
            <span className="info-label">Email Address</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="profile-info-row">
            <span className="info-label">Role Access</span>
            <span className="info-value">{user?.role === 'admin' ? 'Restaurant Partner / Admin' : 'Standard Customer'}</span>
          </div>
          <div className="profile-info-row">
            <span className="info-label">User ID</span>
            <span className="info-value"><code>{user?._id || 'N/A'}</code></span>
          </div>
        </div>

        <div className="profile-actions-bar">
          <Link to="/restaurants" className="btn btn-primary">
            Browse Restaurants →
          </Link>
          {isAdmin && (
            <Link to="/create-restaurant" className="btn btn-secondary">
              + Add New Restaurant
            </Link>
          )}
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(srcDir, 'CreateRestaurant.jsx'), createRestaurantCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'Login.jsx'), loginCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'Register.jsx'), registerCode, 'utf8');
fs.writeFileSync(path.join(srcDir, 'Profile.jsx'), profileCode, 'utf8');

console.log('Successfully created CreateRestaurant, Login, Register, Profile!');
