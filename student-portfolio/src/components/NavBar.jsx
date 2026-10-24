import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navbar with Authentication Links (Home, Projects, Tasks, Contact, Login, Register, Logout)
 */
function NavBar({ theme, toggleTheme, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="nav-brand">
          Yashvi Jetani
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Contact
            </NavLink>
          </li>

          {/* Authentication State Links */}
          {user ? (
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>👤</span>
                <span>{user.name.split(' ')[0]}</span>
              </span>
              <button
                onClick={onLogout}
                className="btn btn-outline"
                style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}
                title="Sign out of account"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="btn btn-primary"
                  style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          <li>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
