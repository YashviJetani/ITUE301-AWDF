import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Modern, Centered & High-Impact Hero Header Component
 */
function Header({ name = 'Yashvi Jetani' }) {
  return (
    <header className="hero-wrapper">
      {/* Live Status Indicator */}
      <div className="status-badge">
        <span className="status-dot"></span>
        <span>Available for Web Development Projects</span>
      </div>

      {/* Main Title & Gradient Accent */}
      <h1 className="hero-main-title">
        Hi, I'm <span className="gradient-text">{name}</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-description">
        Computer Engineering student and Full Stack Web Developer. Specializing in responsive React
        architectures, modern component design, and scalable Express + MongoDB RESTful backends.
      </p>

      {/* Main Action Buttons */}
      <div className="hero-buttons">
        <Link to="/projects" className="btn btn-primary">
          <span>🚀 Explore Projects</span>
        </Link>
        <Link to="/tasks" className="btn btn-outline">
          <span>⚡ Live Task Manager</span>
        </Link>
        <Link to="/contact" className="btn btn-outline">
          <span>✉️ Get in Touch</span>
        </Link>
      </div>

      {/* Quick Social & Profile Links */}
      <div className="hero-links">
        <a
          href="https://github.com/YashviJetani"
          target="_blank"
          rel="noopener noreferrer"
          className="link-chip"
        >
          <span>🐙 GitHub (@YashviJetani)</span>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link-chip"
        >
          <span>💼 LinkedIn Profile</span>
        </a>
        <a
          href="mailto:yashvi@example.com"
          className="link-chip"
        >
          <span>📫 Email Me</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
