import React, { useState } from 'react';

/**
 * Clean & Concise Contact Page (Practical 2)
 */
function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', marginBottom: '0.4rem' }}>Contact Me</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Feel free to reach out for collaborations, project inquiries, or questions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="task-box">
        {submitted && (
          <div
            style={{
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: 'var(--success)',
              fontSize: '0.88rem',
            }}
          >
            ✓ Thank you! Your message has been sent successfully.
          </div>
        )}

        <div className="field-group">
          <label className="field-label">Your Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="field-input"
          />
        </div>

        <div className="field-group">
          <label className="field-label">Email Address</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="field-group">
          <label className="field-label">Message</label>
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="field-textarea"
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
