export default function Loading({ message = 'Loading delicious food...' }) {
  return (
    <div className="state-message-container" role="status" aria-live="polite">
      <div className="food-spinner">
        <span className="spinner-icon">🍲</span>
      </div>
      <p className="state-message-text">{message}</p>
    </div>
  );
}
