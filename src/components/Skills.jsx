import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    'HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 
    'Tailwind CSS', 'FastAPI', 'MongoDB', 'Flutter (Basic)', 
    'Git / GitHub', 'VS Code', 'After Effects', 'Capcut'
  ];

  return (
    <section id="skills" className="container section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}
      >
        <span style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', marginRight: '1rem', fontFamily: 'var(--font-mono)' }}>03.</span>
        Technical Arsenal
        <div style={{ content: '""', display: 'block', height: '1px', flex: 1, maxWidth: '300px', background: 'var(--border-color)', marginLeft: '1.25rem' }}></div>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}
      >
        Technologies I've been working with recently:
      </motion.p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {skills.map((skill, index) => {
           const isPink = skill === 'After Effects' || skill === 'Capcut';
           return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  backgroundColor: isPink ? 'var(--accent-tertiary)' : 'var(--accent-primary)',
                  color: 'var(--bg-primary)'
              }}
              className="interactive"
              style={{
                padding: '0.75rem 1.5rem',
                border: `1px solid ${isPink ? 'var(--accent-tertiary)' : 'var(--accent-primary)'}`,
                color: isPink ? 'var(--accent-tertiary)' : 'var(--accent-primary)',
                borderRadius: '2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                cursor: 'none',
                transition: 'background-color var(--transition-fast), color var(--transition-fast)'
              }}
            >
              {skill}
            </motion.div>
          )
        })}
      </div>
    </section>
  );
};

export default Skills;
