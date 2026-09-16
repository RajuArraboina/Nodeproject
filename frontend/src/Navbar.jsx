function Navbar({ isAuthenticated, onHome, onRestaurants, onLogin, onRegister, onCreateRestaurant, onProfile, onLogout }) {
  return (
    <nav>
      <h1>SR Restaurants App</h1>

      <div>
        <a href="/" onClick={onHome}>Home</a>
        {/* <a href="/restaurants" onClick={onRestaurants}>Restaurants</a> */}
        {!isAuthenticated && <a href="/login" onClick={onLogin}>Login</a>}
        {!isAuthenticated && <a href="/register" onClick={onRegister}>Register</a>}
        {isAuthenticated && <a href="/create-restaurant" onClick={onCreateRestaurant}>Add restaurant</a>}
        {isAuthenticated && <a href="/profile" onClick={onProfile}>Profile</a>}
        {isAuthenticated && <button className="nav-logout" type="button" onClick={onLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
