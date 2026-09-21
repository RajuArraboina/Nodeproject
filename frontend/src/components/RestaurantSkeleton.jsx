export default function RestaurantSkeleton({ count = 6 }) {
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
