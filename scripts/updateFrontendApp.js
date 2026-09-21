const fs = require('fs');
const path = 'C:/Users/Raju.a/Desktop/frontend/frontend/src/App.jsx';

const newAppContent = `import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RestaurantDetails from "./RestaurantDetails";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import CreateRestaurant from "./CreateRestaurant";

function App() {
  const [page, setPage] = useState("restaurants");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Check existing token and verify user role on mount
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
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUserRole("");
        });
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
      setPage("restaurants");
    }
  }

  // Only true if user is logged in AND has role "admin"
  const isAdmin = Boolean(isAuthenticated && userRole === "admin");

  return (
    <div className={page === "login" ? "auth-shell" : ""}>
      <Navbar
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onHome={(event) => { event.preventDefault(); setPage("restaurants"); }}
        onRestaurants={(event) => { event.preventDefault(); setPage("restaurants"); }}
        onLogin={(event) => { event.preventDefault(); setPage("login"); }}
        onRegister={(event) => { event.preventDefault(); setPage("register"); }}
        onCreateRestaurant={(event) => {
          event.preventDefault();
          if (isAdmin) setPage("create-restaurant");
        }}
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
          onBack={() => setPage("restaurants")}
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

fs.writeFileSync(path, newAppContent, 'utf8');
console.log('App.jsx updated with strict admin-only visibility!');
