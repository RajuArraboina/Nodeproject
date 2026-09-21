import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { restaurantService } from './services/restaurantService';
import RestaurantCard from './RestaurantCard';
import RestaurantSkeleton from './components/RestaurantSkeleton';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './SearchBar';

const cuisineList = [
  'All',
  'Biryani',
  'South Indian',
  'Indian',
  'Italian',
  'Chinese',
  'Mughlai',
  'Fast Food',
  'Dessert',
];

export default function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCuisine = searchParams.get('cuisine') || 'All';
  const initialCity = searchParams.get('city') || '';

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'name', 'newest'

  const fetchRestaurants = useCallback(async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const query = {};
      if (params.search) query.search = params.search;
      if (params.cuisine && params.cuisine !== 'All') query.cuisine = params.cuisine;
      if (params.city) query.city = params.city;

      const data = await restaurantService.getAll(query);
      setRestaurants(data);
    } catch (err) {
      setError(err.message || 'Unable to load restaurants. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const s = searchParams.get('search') || '';
    const c = searchParams.get('cuisine') || 'All';
    const city = searchParams.get('city') || '';

    setSearchInput(s);
    setSelectedCuisine(c);
    setSelectedCity(city);

    fetchRestaurants({ search: s, cuisine: c, city });
  }, [searchParams, fetchRestaurants]);

  const updateFilters = (newFilters) => {
    const current = {};
    if (newFilters.search !== undefined) {
      if (newFilters.search) current.search = newFilters.search;
    } else if (searchInput) {
      current.search = searchInput;
    }

    if (newFilters.cuisine !== undefined) {
      if (newFilters.cuisine && newFilters.cuisine !== 'All') current.cuisine = newFilters.cuisine;
    } else if (selectedCuisine && selectedCuisine !== 'All') {
      current.cuisine = selectedCuisine;
    }

    if (newFilters.city !== undefined) {
      if (newFilters.city) current.city = newFilters.city;
    } else if (selectedCity) {
      current.city = selectedCity;
    }

    setSearchParams(current);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({ search: searchInput });
  };

  const handleCuisineClick = (c) => {
    setSelectedCuisine(c);
    updateFilters({ cuisine: c });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSelectedCuisine('All');
    setSelectedCity('');
    setSearchParams({});
  };

  // Client-side sorting
  const sortedRestaurants = useMemo(() => {
    const list = [...restaurants];
    if (sortBy === 'rating') {
      return list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }
    if (sortBy === 'name') {
      return list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    return list;
  }, [restaurants, sortBy]);

  return (
    <div className="restaurants-page-view">
      {/* Header */}
      <div className="catalog-header-wrap">
        <div>
          <span className="block-eyebrow">EXPLORE & ORDER</span>
          <h1 className="catalog-main-title">All Restaurants</h1>
          <p className="catalog-sub-text">
            {restaurants.length > 0 ? `Showing ${restaurants.length} partner kitchens in Warangal` : 'Browse verified dining & delivery destinations'}
          </p>
        </div>
      </div>

      {/* Search & Sort Controls Toolbar */}
      <div className="catalog-control-bar">
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSubmit={handleSearchSubmit}
          placeholder="Search by restaurant name, dish, or landmark..."
          className="catalog-search"
        />

        <div className="filter-controls-row">
          <div className="control-field">
            <label htmlFor="city-select">Location:</label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                updateFilters({ city: e.target.value });
              }}
            >
              <option value="">All Locations</option>
              <option value="Warangal">Warangal</option>
              <option value="Hanamkonda">Hanamkonda</option>
              <option value="Kazipet">Kazipet</option>
            </select>
          </div>

          <div className="control-field">
            <label htmlFor="sort-select">Sort By:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Top Rated (Highest First)</option>
              <option value="name">Name (A – Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cuisine Filter Pills */}
      <div className="cuisine-tabs-container" aria-label="Filter by cuisine">
        {cuisineList.map((c) => {
          const isActive = selectedCuisine.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              type="button"
              className={`cuisine-pill-button ${isActive ? 'active' : ''}`}
              onClick={() => handleCuisineClick(c)}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Active Filter Badges */}
      {(searchInput || (selectedCuisine && selectedCuisine !== 'All') || selectedCity) && (
        <div className="active-filter-chips">
          <span>Active Filters:</span>
          {searchInput && <span className="chip">Search: &quot;{searchInput}&quot;</span>}
          {selectedCuisine !== 'All' && <span className="chip">Cuisine: {selectedCuisine}</span>}
          {selectedCity && <span className="chip">City: {selectedCity}</span>}
          <button type="button" className="btn-clear-chips" onClick={handleResetFilters}>
            ✕ Clear All
          </button>
        </div>
      )}

      {/* Dynamic Results Presentation */}
      {loading ? (
        <RestaurantSkeleton count={6} />
      ) : error ? (
        <ErrorMessage
          title="Could Not Load Restaurants"
          message={error}
          onRetry={() => fetchRestaurants({ search: searchInput, cuisine: selectedCuisine, city: selectedCity })}
        />
      ) : sortedRestaurants.length === 0 ? (
        <EmptyState
          icon="🍽️"
          title="No Restaurants Found"
          message="We couldn't find any restaurants matching your current search or cuisine criteria."
          actionText="Clear Filters & View All"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="restaurant-grid">
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}
