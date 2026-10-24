import React from 'react';

/**
 * Toast Component (Practical 6 Supplementary)
 * In-app alert notification for API operations
 */
function Toast({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}
        >
          <span>{toast.type === 'error' ? '❌' : '✅'}</span>
          <span style={{ flex: 1, fontSize: '0.92rem' }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              fontSize: '1rem',
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;
