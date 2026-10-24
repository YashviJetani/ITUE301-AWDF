import React from 'react';

/**
 * Clean & Minimalist Footer
 */
function Footer() {
  return (
    <footer className="footer">
      <div>
        <a href="https://github.com/YashviJetani" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        •
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        •
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          React Docs
        </a>
      </div>
      <p style={{ marginTop: '0.5rem' }}>© 2026 Yashvi Jetani. Built with React & Vite.</p>
    </footer>
  );
}

export default Footer;
