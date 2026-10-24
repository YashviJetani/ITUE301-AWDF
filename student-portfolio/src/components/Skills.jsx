import React from 'react';

/**
 * Categorized Skills Component
 */
function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      items: ['React 18', 'JavaScript (ES6+)', 'HTML5 Semantic', 'Modern CSS3', 'Vite', 'React Router v6'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'RESTful API Architecture', 'JWT Authentication', 'bcrypt Encryption'],
    },
    {
      category: 'Database',
      items: ['MongoDB', 'Mongoose ODM', 'Document Modeling', 'Schema Validation'],
    },
    {
      category: 'Core & Tools',
      items: ['C++', 'Data Structures & Algorithms', 'Git & GitHub', 'Postman', 'VS Code'],
    },
  ];

  return (
    <section className="section-block" id="skills">
      <div className="section-head">
        <h2>Technical Stack</h2>
        <p>Core tools and technologies used across full-stack applications.</p>
      </div>

      <div className="skills-container">
        {skillCategories.map((group) => (
          <div key={group.category} className="skill-row">
            <span className="skill-category">{group.category}</span>
            <div className="skill-chips">
              {group.items.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
