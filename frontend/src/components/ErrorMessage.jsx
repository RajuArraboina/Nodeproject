export default function ErrorMessage({
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
