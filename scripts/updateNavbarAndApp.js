const fs = require('fs');

// 1. Update Navbar.jsx
const navbarPath = 'C:/Users/Raju.a/Desktop/frontend/frontend/src/Navbar.jsx';
const newNavbarContent = `function Navbar({ isAuthenticated, onHome, onRestaurants, onLogin, onRegister, onProfile, onLogout }) {
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
        <a href="/restaurants" className="nav-link" onClick={onRestaurants}>Restaurants</a>
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

fs.writeFileSync(navbarPath, newNavbarContent, 'utf8');
console.log('Successfully updated Navbar.jsx (removed Add restaurant, prominent Login button)!');

// 2. Update App.jsx
const appPath = 'C:/Users/Raju.a/Desktop/frontend/frontend/src/App.jsx';
const newAppContent = `import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RestaurantDetails from "./RestaurantDetails";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import CreateRestaurant from "./CreateRestaurant";

function App() {
  const [page, setPage] = useState(() => {
    return localStorage.getItem("token") ? "restaurants" : "login";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Verify stored token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: \`Bearer \${token}\` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.success && data.data) {
            setIsAuthenticated(true);
            setUserRole(data.data.role || "user");
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUserRole("");
            setPage("login");
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUserRole("");
          setPage("login");
        });
    } else {
      setPage("login");
    }
  }, []);

  async function handleLogout() {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          headers: { Authorization: \`Bearer \${token}\` },
        });
      }
    } finally {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUserRole("");
      setPage("login");
    }
  }

  // Only true if user is logged in AND has role "admin"
  const isAdmin = Boolean(isAuthenticated && userRole === "admin");

  return (
    <div className={page === "login" ? "auth-shell" : ""}>
      <Navbar
        isAuthenticated={isAuthenticated}
        onHome={(event) => { event.preventDefault(); setPage(isAuthenticated ? "restaurants" : "login"); }}
        onRestaurants={(event) => { event.preventDefault(); setPage("restaurants"); }}
        onLogin={(event) => { event.preventDefault(); setPage("login"); }}
        onRegister={(event) => { event.preventDefault(); setPage("register"); }}
        onProfile={(event) => { event.preventDefault(); setPage("profile"); }}
        onLogout={handleLogout}
      />

      {page === "create-restaurant" ? (
        isAdmin ? (
          <CreateRestaurant
            onBack={() => setPage("restaurants")}
            onCreated={() => setPage("restaurants")}
          />
        ) : (
          <div className="state-message error-message">
            <h2>Access Denied</h2>
            <p>Only administrators can create new restaurants.</p>
            <button className="back-button" type="button" onClick={() => setPage("restaurants")}>
              Back to restaurants
            </button>
          </div>
        )
      ) : page === "register" ? (
        <Register
          onBack={() => setPage("login")}
          onRegistered={() => setPage("login")}
        />
      ) : page === "login" ? (
        <Login
          onBack={() => setPage("restaurants")}
          onRegister={() => setPage("register")}
          onLoginSuccess={(data) => {
            const role = data?.user?.role || data?.data?.user?.role || data?.data?.role || "user";
            setIsAuthenticated(true);
            setUserRole(role);
            setPage("restaurants");
          }}
        />
      ) : page === "profile" ? (
        <Profile onLogout={handleLogout} />
      ) : (
        <RestaurantDetails
          canCreateRestaurant={isAdmin}
          onCreateRestaurant={() => {
            if (isAdmin) setPage("create-restaurant");
          }}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
`;

fs.writeFileSync(appPath, newAppContent, 'utf8');
console.log('Successfully updated App.jsx (default to login, direct login flow)!');
