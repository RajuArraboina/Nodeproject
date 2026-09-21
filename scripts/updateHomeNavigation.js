const fs = require('fs');
const path = require('path');

// 1. Update App.jsx
const appPath = path.resolve(__dirname, '../../frontend/frontend/src/App.jsx');
const newAppCode = `import { useState, useEffect } from "react";
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
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [homeClickCount, setHomeClickCount] = useState(0);

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
      setSelectedRestaurant(null);
      setPage("login");
    }
  }

  // Opens all restaurants and resets any active view/filter
  function handleGoToAllRestaurants(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    sessionStorage.removeItem("pendingOrder");
    setSelectedRestaurant(null);
    setHomeClickCount((prev) => prev + 1);
    setPage("restaurants");
  }

  // Only true if user is logged in AND has role "admin"
  const isAdmin = Boolean(isAuthenticated && userRole === "admin");

  return (
    <div className={page === "login" ? "auth-shell" : ""}>
      <Navbar
        isAuthenticated={isAuthenticated}
        onHome={handleGoToAllRestaurants}
        onRestaurants={handleGoToAllRestaurants}
        onLogin={(event) => { event.preventDefault(); setPage("login"); }}
        onRegister={(event) => { event.preventDefault(); setPage("register"); }}
        onProfile={(event) => { event.preventDefault(); setPage("profile"); }}
        onLogout={handleLogout}
      />

      {page === "create-restaurant" ? (
        isAdmin ? (
          <CreateRestaurant
            onBack={handleGoToAllRestaurants}
            onCreated={handleGoToAllRestaurants}
          />
        ) : (
          <div className="state-message error-message">
            <h2>Access Denied</h2>
            <p>Only administrators can create new restaurants.</p>
            <button className="back-button" type="button" onClick={handleGoToAllRestaurants}>
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
          onBack={handleGoToAllRestaurants}
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
          isAuthenticated={isAuthenticated}
          onLogin={() => setPage("login")}
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
          homeClickCount={homeClickCount}
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

fs.writeFileSync(appPath, newAppCode, 'utf8');
console.log('App.jsx updated successfully!');
