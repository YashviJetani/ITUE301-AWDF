import React from 'react';

/**
 * ErrorMessage Component (Practical 3 & 6)
 * Displays error message with retry trigger
 */
function ErrorMessage({ message = 'An error occurred while fetching data.', onRetry }) {
  return (
    <div className="error-card" role="alert">
      <span style={{ fontSize: '2rem' }}>⚠️</span>
      <h3 className="error-title">Failed to Load Data</h3>
      <p className="error-msg">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary btn-sm">
          🔄 Retry Request
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
