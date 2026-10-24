import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound Component (Practical 2 Supplementary)
 * Custom 404 error page displayed when navigating to undefined routes
 */
function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '5rem 1.5rem',
      }}
    >
      <div
        style={{
          fontSize: '6rem',
          fontWeight: 800,
          background: 'var(--accent-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
        }}
      >
        404
      </div>
      <h2 style={{ fontSize: '1.8rem', margin: '1rem 0 0.5rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', marginBottom: '2rem' }}>
        The route you are looking for does not exist in this client-side single page application.
      </p>
      <Link to="/" className="btn btn-primary">
        ⬅ Return to Portfolio Home
      </Link>
    </div>
  );
}

export default NotFound;
