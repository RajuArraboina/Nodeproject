import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Restaurants from './Restaurants';
import RestaurantDetails from './RestaurantDetails';
import CreateRestaurant from './CreateRestaurant';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurants/:id" element={<RestaurantDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected User Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/create-restaurant"
                element={
                  <ProtectedRoute adminOnly>
                    <CreateRestaurant />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/restaurants/new"
                element={
                  <ProtectedRoute adminOnly>
                    <CreateRestaurant />
                  </ProtectedRoute>
                }
              />

              {/* 404 Fallback */}
              <Route
                path="*"
                element={
                  <div className="state-message-card error" style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🍽️</div>
                    <h2>404 - Page Not Found</h2>
                    <p>The page you are looking for does not exist or has been moved.</p>
                    <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '16px' }}>
                      Back to Home
                    </Link>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
