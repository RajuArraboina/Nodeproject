import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileOpen(false);
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="site-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMenu} aria-label="SR Restaurants Home">
          <span className="brand-icon">S</span>
          <div className="brand-text">
            <span className="brand-title">SR Restaurants</span>
            <span className="brand-subtitle">WARANGAL</span>
          </div>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <nav className={`nav-menu ${mobileOpen ? 'nav-menu-open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-menu-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/restaurants"
            className={({ isActive }) => `nav-menu-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Restaurants
          </NavLink>

          {isAuthenticated && isAdmin && (
            <NavLink
              to="/create-restaurant"
              className={({ isActive }) => `nav-menu-link admin-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              + Add Restaurant
            </NavLink>
          )}

          {isAuthenticated ? (
            <div className="nav-user-cluster">
              <NavLink
                to="/profile"
                className={({ isActive }) => `nav-user-pill ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="user-icon">👤</span>
                <span className="user-name">{user?.name || 'Profile'}</span>
                {isAdmin && <span className="badge-admin-tag">Admin</span>}
              </NavLink>
              <button
                type="button"
                className="btn-nav-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth-cluster">
              <NavLink
                to="/login"
                className={({ isActive }) => `btn-nav-login ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="btn-nav-register"
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
