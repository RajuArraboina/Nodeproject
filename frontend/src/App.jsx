import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RestaurantDetails from "./RestaurantDetails";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import CreateRestaurant from "./CreateRestaurant";

function App() {
  const [page, setPage] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function handleLogout() {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } finally {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setPage("login");
    }
  }

  return (
    <div className={page === "login" ? "auth-shell" : ""}>

      <Navbar
        isAuthenticated={isAuthenticated}
        onHome={(event) => { event.preventDefault(); setPage("home"); }}
        onRestaurants={(event) => { event.preventDefault(); setPage("restaurants"); }}
        onLogin={(event) => { event.preventDefault(); setPage("login"); }}
        onRegister={(event) => { event.preventDefault(); setPage("register"); }}
        onCreateRestaurant={(event) => { event.preventDefault(); setPage("create-restaurant"); }}
        onProfile={(event) => { event.preventDefault(); setPage("profile"); }}
        onLogout={handleLogout}
      />

      {page === "create-restaurant" ? (
        <CreateRestaurant
          onBack={() => setPage("restaurants")}
          onCreated={() => setPage("restaurants")}
        />
      ) : page === "register" ? (
        <Register
          onBack={() => setPage("login")}
          onRegistered={() => setPage("login")}
        />
      ) : page === "login" ? (
        <Login
          onBack={() => setPage("home")}
          onRegister={() => setPage("register")}
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setPage("restaurants");
          }}
        />
      ) : page === "profile" ? (
        <Profile onLogout={handleLogout} />
      ) : page === "restaurants" || page === "home" ? (
        <RestaurantDetails onCreateRestaurant={() => setPage("create-restaurant")} />
      ) : null}

      <Footer />

    </div>
  );
}

export default App;