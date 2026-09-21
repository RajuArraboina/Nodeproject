const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../frontend/frontend/src');
const componentsDir = path.join(srcDir, 'components');

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

// 1. RestaurantSkeleton.jsx
const skeletonContent = `export default function RestaurantSkeleton({ count = 6 }) {
  return (
    <div className="restaurant-grid" aria-label="Loading restaurants">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="restaurant-card-skeleton">
          <div className="skeleton-image" />
          <div className="skeleton-content">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-cuisine" />
            <div className="skeleton-line skeleton-desc" />
            <div className="skeleton-line skeleton-meta" />
          </div>
        </div>
      ))}
    </div>
  );
}
`;

// 2. EmptyState.jsx
const emptyStateContent = `export default function EmptyState({
  icon = '🍽️',
  title = 'No Results Found',
  message = 'We could not find anything matching your search or filters.',
  actionText = 'Reset Filters',
  onAction,
}) {
  return (
    <div className="empty-state-card" role="status">
      <span className="empty-state-icon" aria-hidden="true">{icon}</span>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {onAction && actionText && (
        <button type="button" className="btn btn-primary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}
`;

// 3. ErrorMessage.jsx
const errorMessageContent = `export default function ErrorMessage({
  title = 'Something went wrong',
  message = 'Unable to connect to the restaurant service. Please try again.',
  onRetry,
}) {
  return (
    <div className="error-message-card" role="alert">
      <span className="error-card-icon" aria-hidden="true">⚠️</span>
      <h3 className="error-card-title">{title}</h3>
      <p className="error-card-message">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
`;

// 4. SearchBar.jsx - Clean, modern food search bar
const searchBarContent = `export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search restaurants, dishes, cuisines...',
  className = '',
}) {
  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <form className={\`modern-search-bar \${className}\`} onSubmit={onSubmit} role="search">
      <span className="search-icon-svg" aria-hidden="true">
        🔍
      </span>
      <input
        type="text"
        className="search-input-field"
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        aria-label="Search"
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={handleClear}
          aria-label="Clear search query"
        >
          ✕
        </button>
      )}
      <button type="submit" className="search-submit-btn">
        Search
      </button>
    </form>
  );
}
`;

fs.writeFileSync(path.join(componentsDir, 'RestaurantSkeleton.jsx'), skeletonContent, 'utf8');
fs.writeFileSync(path.join(componentsDir, 'EmptyState.jsx'), emptyStateContent, 'utf8');
fs.writeFileSync(path.join(componentsDir, 'ErrorMessage.jsx'), errorMessageContent, 'utf8');
fs.writeFileSync(path.join(srcDir, 'SearchBar.jsx'), searchBarContent, 'utf8');

console.log('Successfully created RestaurantSkeleton, EmptyState, ErrorMessage, and SearchBar!');
