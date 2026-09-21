export default function SearchBar({
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
    <form className={`modern-search-bar ${className}`} onSubmit={onSubmit} role="search">
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
