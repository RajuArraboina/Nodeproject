import { Link, useNavigate } from 'react-router-dom';
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
            <span className={`profile-role-badge ${isAdmin ? 'admin' : 'user'}`}>
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
