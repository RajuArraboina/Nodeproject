export default function EmptyState({
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
