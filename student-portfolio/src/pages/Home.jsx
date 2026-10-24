import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

/**
 * Modern, Refreshed Home Page
 */
function Home() {
  const topProjects = [
    {
      title: 'career-pilot',
      desc: 'An open-source AI-powered platform for resume optimization, mock interviews, and automated job tracking.',
      tag: 'JavaScript',
      url: 'https://github.com/YashviJetani/career-pilot',
    },
    {
      title: 'home-maintenance-system',
      desc: 'Full-stack workflow system for scheduling domestic services, managing requests, and technician tracking.',
      tag: 'Full Stack',
      url: 'https://github.com/YashviJetani/home-maintenance-system',
    },
    {
      title: 'StudyPlan',
      desc: 'Interactive student study planner with automated milestone tracking, schedule prioritization, and task boards.',
      tag: 'CSS / React',
      url: 'https://github.com/YashviJetani/StudyPlan',
    },
  ];

  return (
    <div>
      {/* 1. Impactful Hero Header */}
      <Header name="Yashvi Jetani" />

      {/* 2. Key Metrics & Highlights Banner */}
      <div className="stats-banner">
        <div className="stat-card">
          <div className="stat-number">7+</div>
          <div className="stat-label">Public Repositories</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">MERN</div>
          <div className="stat-label">Full Stack Stack</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">React 18</div>
          <div className="stat-label">Component Design</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">MongoDB</div>
          <div className="stat-label">Database Persistence</div>
        </div>
      </div>

      {/* 3. Engineering Pillars */}
      <About />

      {/* 4. Categorized Skills */}
      <Skills />

      {/* 5. Featured Projects Preview */}
      <section className="section-block">
        <div className="section-head">
          <h2>Featured Projects</h2>
          <p>Highlights from my public open-source software portfolio.</p>
        </div>

        <div className="projects-grid">
          {topProjects.map((p) => (
            <div key={p.title} className="project-card">
              <div>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{p.desc}</p>
              </div>
              <div className="project-card-meta">
                <span
                  style={{
                    background: 'var(--badge-bg)',
                    color: 'var(--primary)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                  }}
                >
                  {p.tag}
                </span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--primary)', fontWeight: 600 }}
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/projects" className="btn btn-outline">
            View All Projects ↗
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
