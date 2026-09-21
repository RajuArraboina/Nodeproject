const fs = require('fs');
const path = require('path');

const navbarPath = path.resolve(__dirname, '../../frontend/frontend/src/Navbar.jsx');

const navbarCode = `function Navbar({ isAuthenticated, onHome, onLogin, onRegister, onProfile, onLogout }) {
  return (
    <nav className="topbar">
      <div className="brand-group" onClick={onHome} style={{ cursor: "pointer" }}>
        <div className="brand-mark">S</div>
        <div className="brand-copy">
          <span className="brand-name">SR</span>
          <span className="brand-location">Warangal</span>
        </div>
      </div>

      <div className="nav-actions">
        <a href="/" className="nav-link" onClick={onHome}>Home</a>
        {!isAuthenticated ? (
          <>
            <a href="/login" className="nav-link nav-link--cta" onClick={onLogin}>Login</a>
            <a href="/register" className="nav-link" onClick={onRegister}>Register</a>
          </>
        ) : (
          <>
            <a href="/profile" className="nav-link" onClick={onProfile}>Profile</a>
            <button className="nav-logout" type="button" onClick={onLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
`;

fs.writeFileSync(navbarPath, navbarCode, 'utf8');
console.log('Navbar.jsx updated successfully - removed Restaurants button.');
