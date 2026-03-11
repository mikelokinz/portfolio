import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'AI Complaint System',
      desc: 'An intelligent complaint and request management system. It uses AI to classify issues and automatically alerts authorities based on urgency level.',
      tech: ['Next.js', 'FastAPI', 'MongoDB', 'AI/ML'],
      link: '#'
    },
    {
      title: 'Creative Portfolio',
      desc: 'A personal showcase of my video editing and motion graphics work, utilizing Lottie files and complex text animations.',
      tech: ['After Effects', 'Lottie', 'Animation'],
      link: '#'
    },
    {
      title: 'Honours App Project',
      desc: 'Coursework project developed during my Honours Diploma in Computer Application (CSC).',
      tech: ['HTML/CSS', 'JavaScript', 'Database'],
      link: '#'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="container section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}
      >
        <span style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', marginRight: '1rem', fontFamily: 'var(--font-mono)' }}>04.</span>
        Some Things I've Built
        <div style={{ content: '""', display: 'block', height: '1px', flex: 1, maxWidth: '300px', background: 'var(--border-color)', marginLeft: '1.25rem' }}></div>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="interactive"
            style={{
              background: 'var(--bg-secondary)',
              padding: '2rem 1.75rem',
              borderRadius: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px -15px rgba(0,0,0,0.3)',
              transition: 'background-color var(--transition-normal)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <FolderGit2 size={40} style={{ color: 'var(--accent-primary)' }} />
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="interactive"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <ExternalLink size={24} />
                </a>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}
                >
                  {project.title}
                </a>
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.5 }}>
                {project.desc}
              </p>
            </div>
            
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
              {project.tech.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
