import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <div className="brand-group">
            <div className="brand-mark">S</div>
            <div className="brand-copy">
              <span className="brand-name">SR Restaurants</span>
              <span className="brand-location">Warangal, Telangana</span>
            </div>
          </div>
          <p className="footer-about">
            Warangal&apos;s premier online dining and food ordering network. Fresh flavours, local favourites, and top-rated restaurants delivered to your doorstep.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/restaurants">All Restaurants</Link></li>
            <li><Link to="/restaurants?cuisine=Biryani">Biryani Specialists</Link></li>
            <li><Link to="/restaurants?cuisine=South%20Indian">South Indian Tiffins</Link></li>
            <li><Link to="/restaurants?cuisine=Italian">Woodfired Pizza</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/login">Customer Login</Link></li>
            <li><Link to="/register">Create Account</Link></li>
            <li><Link to="/profile">My Orders & Profile</Link></li>
            <li><Link to="/create-restaurant">Partner with Us</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact & Hours</h4>
          <p>📍 Warangal & Hanamkonda, Telangana</p>
          <p>📞 +91 870 244 5678</p>
          <p>⏰ 7:00 AM – 11:30 PM (Daily)</p>
          <div className="footer-tags">
            <span className="badge-tag">⚡ 30m Delivery</span>
            <span className="badge-tag">🛡️ Hygienic</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SR Restaurants Warangal. All rights reserved.</p>
        <p>Built with React.js, Node.js & Express REST API</p>
      </div>
    </footer>
  );
}
