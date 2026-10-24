import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// =========================================================================
// Practical 8: Dynamic Lazy Loading & Route-Based Code Splitting
// =========================================================================
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const TasksManager = lazy(() => import('./pages/TasksManager'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Meaningful and aesthetically styled fallback UI (animated spinner with text)
 * Rendered seamlessly while lazy-loaded route chunk is downloaded
 */
function LoadingFallback() {
  return (
    <div className="lazy-fallback-container">
      <div className="lazy-spinner"></div>
      <p className="lazy-loading-text">Loading page component dynamically...</p>
    </div>
  );
}

/**
 * Main Application Component
 * Includes Navigation, Lazy-Loaded Routes with Suspense, Theme Toggle, and Authentication State
 */
function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'dark';
  });

  // User auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar with auth links and theme toggle */}
      <NavBar
        theme={theme}
        toggleTheme={toggleTheme}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Route Outlet Wrapped in Suspense Boundary */}
      <main className="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<TasksManager />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
            <Route path="/register" element={<Register onLoginSuccess={setUser} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}

export default App;
