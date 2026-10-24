import React from 'react';

/**
 * ConfirmModal Component (Practical 6 Supplementary)
 * Modal dialogue to confirm task deletion
 */
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          {title || 'Confirm Deletion'}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          {message || 'Are you sure you want to delete this task? This action cannot be undone.'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={onCancel} className="btn btn-secondary btn-sm">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger btn-sm">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
