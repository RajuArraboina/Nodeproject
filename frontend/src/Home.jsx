import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantService } from './services/restaurantService';
import RestaurantCard from './RestaurantCard';
import SearchBar from './SearchBar';
import RestaurantSkeleton from './components/RestaurantSkeleton';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';

export default function Home() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [sortBy, setSortBy] = useState('rating-desc');

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await restaurantService.getAll();
      setRestaurants(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to connect to database server at http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Dynamically extract unique cuisines directly from database restaurants
  const availableCuisines = useMemo(() => {
    const set = new Set();
    restaurants.forEach((r) => {
      if (r.cuisine) {
        // Split if multiple cuisines listed
        r.cuisine.split('&').forEach((c) => {
          const trimmed = c.trim();
          if (trimmed) set.add(trimmed);
        });
      }
    });
    return ['All', ...Array.from(set).sort()];
  }, [restaurants]);

  // Dynamically extract unique cities directly from database restaurants
  const availableCities = useMemo(() => {
    const set = new Set();
    restaurants.forEach((r) => {
      if (r.address?.city && r.address.city !== 'N/A') {
        set.add(r.address.city.trim());
      }
    });
    return ['All', ...Array.from(set).sort()];
  }, [restaurants]);

  // Filter and sort database restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((r) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = r.name?.toLowerCase().includes(q);
          const matchCuisine = r.cuisine?.toLowerCase().includes(q);
          const matchDesc = r.description?.toLowerCase().includes(q);
          const matchCity = r.address?.city?.toLowerCase().includes(q);
          if (!matchName && !matchCuisine && !matchDesc && !matchCity) return false;
        }

        // Cuisine filter
        if (selectedCuisine !== 'All') {
          if (!r.cuisine || !r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())) {
            return false;
          }
        }

        // City filter
        if (selectedCity !== 'All') {
          if (!r.address?.city || r.address.city.toLowerCase() !== selectedCity.toLowerCase()) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'rating-asc') return (a.rating || 0) - (b.rating || 0);
        if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
        if (sortBy === 'name-desc') return (b.name || '').localeCompare(a.name || '');
        return 0;
      });
  }, [restaurants, searchQuery, selectedCuisine, selectedCity, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('All');
    setSelectedCity('All');
    setSortBy('rating-desc');
  };

  return (
    <div className="home-container" style={{ gap: '36px', paddingBottom: '60px' }}>
      {/* 1. Database-Focused Hero Banner */}
      <section className="hero-section" style={{ padding: '40px 36px', margin: '16px auto 0' }}>
        <div className="hero-content">
          <div className="hero-badge-pill">
            <span className="pulse-dot" />
            <span>DISCOVER TOP RATED RESTAURANTS</span>
          </div>

          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Discover Delicious Food from <span>Top Rated Restaurants</span>
          </h1>

          <p className="hero-description">
            Order your favorite biryanis, rich curries, authentic tiffins, and delicious food delivered hot and fresh to your doorstep.
          </p>

          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by restaurant name, cuisine, city, or specialty..."
            className="hero-search"
          />

          <div className="hero-stats-row" style={{ paddingTop: '14px' }}>
            <div className="hero-stat-item">
              <strong>{restaurants.length}</strong>
              <span>Active Restaurants</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <strong>{availableCuisines.length - 1}</strong>
              <span>Unique Cuisines</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <strong>{availableCities.length - 1}</strong>
              <span>Cities Served</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-card">
          <div className="visual-image-wrapper" style={{ maxHeight: '360px' }}>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
              alt="Restaurant Dining Experience"
              className="visual-main-img"
            />
            <div className="visual-glass-badge">
              <div className="badge-icon">⚡</div>
              <div>
                <strong>Super Fast Delivery</strong>
                <p>Hot, fresh & prepared on order</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pure Database Restaurants Section */}
      <section className="home-block">
        {/* Controls Bar: Cuisines, Cities, and Sorting */}
        <div className="catalog-control-bar" style={{ marginBottom: '28px' }}>
          <div className="filter-controls-row" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div className="control-field">
                <span>📍 City:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  aria-label="Filter by City"
                >
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city === 'All' ? 'All Cities' : city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="control-field">
                <span>⚡ Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort Restaurants"
                >
                  <option value="rating-desc">Highest Rated (Top First)</option>
                  <option value="rating-asc">Lowest Rated</option>
                  <option value="name-asc">Name (A to Z)</option>
                  <option value="name-desc">Name (Z to A)</option>
                </select>
              </div>
            </div>

            <div style={{ fontSize: '0.92rem', color: '#64748b', fontWeight: '600' }}>
              Showing {filteredRestaurants.length} of {restaurants.length} restaurants
            </div>
          </div>

          {/* Dynamic Cuisine Filter Tabs from Database */}
          <div className="cuisine-tabs-container" style={{ marginTop: '6px' }}>
            {availableCuisines.map((cuisine) => (
              <button
                key={cuisine}
                type="button"
                className={`cuisine-pill-button ${selectedCuisine === cuisine ? 'active' : ''}`}
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine}
              </button>
            ))}
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCuisine !== 'All' || selectedCity !== 'All') && (
            <div className="active-filter-chips">
              <span>Active filters:</span>
              {searchQuery && (
                <span className="tag-pill">
                  Search: &ldquo;{searchQuery}&rdquo;
                </span>
              )}
              {selectedCuisine !== 'All' && (
                <span className="tag-pill">
                  Cuisine: {selectedCuisine}
                </span>
              )}
              {selectedCity !== 'All' && (
                <span className="tag-pill">
                  City: {selectedCity}
                </span>
              )}
              <button type="button" className="btn-clear-chips" onClick={handleResetFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Error Handling */}
        {error && (
          <ErrorMessage
            title="Database Connection Error"
            message={error}
            onRetry={fetchRestaurants}
          />
        )}

        {/* Loading State */}
        {loading && (
          <div className="restaurant-grid">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <RestaurantSkeleton key={n} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredRestaurants.length === 0 && (
          <EmptyState
            title="No Matching Restaurants Found"
            message={
              searchQuery || selectedCuisine !== 'All' || selectedCity !== 'All'
                ? 'No restaurants match your current filters. Try adjusting your search query, city, or cuisine.'
                : 'No restaurants are currently saved in your MongoDB database. Add restaurants via the admin dashboard.'
            }
            actionLabel="Reset All Filters"
            onAction={handleResetFilters}
          />
        )}

        {/* Live Restaurant Cards Grid */}
        {!loading && !error && filteredRestaurants.length > 0 && (
          <div className="restaurant-grid">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
