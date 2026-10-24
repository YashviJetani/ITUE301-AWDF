import React from 'react';

/**
 * Spinner Component (Practical 3 & 6)
 * Reusable loading indicator shown during asynchronous network requests
 */
function Spinner({ message = 'Loading repositories from GitHub...' }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{message}</p>
    </div>
  );
}

export default Spinner;
