import React, { useState, useEffect } from 'react';

const REPOSITORIES = [
  {
    id: 1,
    name: 'career-pilot',
    description:
      'An open-source, AI-powered career platform for resume optimization, mock interviews, and automated job tracking.',
    html_url: 'https://github.com/YashviJetani/career-pilot',
    language: 'JavaScript',
    stars: 5,
  },
  {
    id: 2,
    name: 'home-maintenance-system',
    description:
      'Full-stack management system for domestic service scheduling, technician assignment, and customer requests.',
    html_url: 'https://github.com/YashviJetani/home-maintenance-system',
    language: 'JavaScript',
    stars: 2,
  },
  {
    id: 3,
    name: 'StudyPlan',
    description:
      'Student study planner application with topic breakdown, schedule management, and progress milestones.',
    html_url: 'https://github.com/YashviJetani/StudyPlan',
    language: 'CSS / JS',
    stars: 1,
  },
  {
    id: 4,
    name: 'CPP-programe',
    description:
      'Core algorithms, data structures (linked lists, trees, graphs), and OOP implementations in C++.',
    html_url: 'https://github.com/YashviJetani/CPP-programe',
    language: 'C++',
    stars: 3,
  },
  {
    id: 5,
    name: 'student-portfolio',
    description:
      'Modern React + Vite portfolio application demonstrating component architecture and routing.',
    html_url: 'https://github.com/YashviJetani/student-portfolio',
    language: 'React',
    stars: 4,
  },
  {
    id: 6,
    name: 'task-manager-api',
    description:
      'RESTful backend with Express.js, request logging, Mongoose validation, and persistent MongoDB storage.',
    html_url: 'https://github.com/YashviJetani/task-manager-api',
    language: 'Node.js',
    stars: 6,
  },
];

/**
 * Clean & Minimal Projects Page
 */
function Projects() {
  const [repos, setRepos] = useState(REPOSITORIES);
  const [searchTerm, setSearchTerm] = useState('');

  // Attempt live GitHub API, fallback gracefully to verified repos
  useEffect(() => {
    fetch('https://api.github.com/users/YashviJetani/repos?per_page=10&sort=updated')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setRepos(
            data.map((r) => ({
              id: r.id,
              name: r.name,
              description: r.description || 'Public repository on GitHub.',
              html_url: r.html_url,
              language: r.language || 'Code',
              stars: r.stargazers_count || 0,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const filtered = repos.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.85rem', marginBottom: '0.35rem' }}>Projects</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Selected applications and repositories by Yashvi Jetani.
        </p>
      </div>

      <div style={{ maxWidth: '420px', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="field-input"
        />
      </div>

      <div className="projects-grid">
        {filtered.map((repo) => (
          <article key={repo.id} className="project-card">
            <div>
              <h2 className="project-card-title">{repo.name}</h2>
              <p className="project-card-desc">{repo.description}</p>
            </div>

            <div className="project-card-meta">
              <span>{repo.language}</span>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)', fontWeight: 600 }}
              >
                GitHub ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Projects;
