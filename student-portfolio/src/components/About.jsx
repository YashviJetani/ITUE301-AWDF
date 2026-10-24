import React from 'react';

/**
 * About Component with Core Development Pillars
 */
function About() {
  return (
    <section className="section-block" id="about">
      <div className="section-head">
        <h2>What I Do</h2>
        <p>Combining frontend aesthetics with robust backend systems.</p>
      </div>

      <div className="pillars-grid">
        <div className="pillar-card">
          <div className="pillar-icon">🎨</div>
          <h3 className="pillar-title">Frontend Engineering</h3>
          <p className="pillar-desc">
            Designing fluid, responsive interfaces in React 18 using reusable functional components,
            reactive hooks (useState, useEffect), and client-side routing.
          </p>
        </div>

        <div className="pillar-card">
          <div className="pillar-icon">⚙️</div>
          <h3 className="pillar-title">Backend Architecture</h3>
          <p className="pillar-desc">
            Constructing RESTful microservices with Node.js and Express. Implementing custom logging
            pipelines, input validation, and centralized error handling.
          </p>
        </div>

        <div className="pillar-card">
          <div className="pillar-icon">🗄️</div>
          <h3 className="pillar-title">Database & Auth</h3>
          <p className="pillar-desc">
            Managing persistent document storage using MongoDB and Mongoose ODM. Securing endpoints
            with JSON Web Tokens (JWT) and salted bcrypt password encryption.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
