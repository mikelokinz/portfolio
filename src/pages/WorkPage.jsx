import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/portfolio';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } } };

const WorkPage = () => {
  const [hovered, setHovered] = useState(null);
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <section style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="section-label">Portfolio</motion.p>
            <motion.h1 variants={fadeUp} className="section-title">
              Things I've <span className="gradient-text">Built</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ maxWidth: '600px', color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '1rem' }}>
              A selection of projects ranging from full-stack web apps to pure CSS clones. Each one taught me something new.
            </motion.p>
          </motion.div>
        </section>

        {/* Featured Projects */}
        <section style={{ paddingBottom: '5rem' }}>
          <div
            className="projects-list"
            onMouseLeave={() => setHovered(null)}
          >
            {featured.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHovered(project.id)}
                style={{
                  opacity: hovered && hovered !== project.id ? 0.35 : 1,
                  filter: hovered && hovered !== project.id ? 'blur(2px) grayscale(0.5)' : 'none',
                  transition: 'all 0.4s ease',
                }}
              >
                <div
                  onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && window.open(project.link, '_blank', 'noopener,noreferrer')}
                  className="glass project-card"
                  style={{
                    display: 'grid',
                    gap: '2rem',
                    padding: '2rem',
                    marginBottom: '1.5rem',
                    cursor: 'pointer',
                    border: hovered === project.id ? '1px solid var(--glass-border-hover)' : '1px solid var(--glass-border)',
                    boxShadow: hovered === project.id ? 'var(--glass-shadow), 0 0 40px rgba(0,212,255,0.12)' : 'var(--glass-shadow)',
                  }}
                >
                  {/* Screenshot */}
                  <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--glass-border)', position: 'relative' }}>
                    <motion.img
                      src={`/projects/previews/${project.id}.png`}
                      alt={project.title}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                      animate={{ scale: hovered === project.id ? 1.04 : 1 }}
                      transition={{ duration: 0.4 }}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/540x200/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: hovered === project.id ? 'var(--neon-2)' : 'var(--text-primary)', transition: 'color 0.3s' }}>
                        {project.emoji} {project.title}
                        <motion.span animate={{ x: hovered === project.id ? 4 : 0, y: hovered === project.id ? -4 : 0 }}>
                          <ExternalLink size={18} style={{ color: 'var(--text-tertiary)' }} />
                        </motion.span>
                      </h3>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ color: 'var(--text-tertiary)' }}>
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                      {project.longDesc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {project.tech.map(t => (
                        <span key={t} style={{ padding: '0.3rem 0.8rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '2rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-2)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Other Projects Grid */}
        <section style={{ paddingBottom: '6rem' }}>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="section-label">
            More Projects
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title" style={{ marginBottom: '2.5rem' }}>
            Other <span className="gradient-text">Notable Work</span>
          </motion.h2>
          <div style={{ display: 'grid', gap: '1.25rem' }} className="other-projects-grid">
            {others.map((project, i) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="glass"
                style={{ padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', textDecoration: 'none' }}
              >
                <span style={{ fontSize: '2rem', flexShrink: 0 }}>{project.emoji}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {project.title} <ExternalLink size={14} style={{ color: 'var(--text-tertiary)' }} />
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{project.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {project.tech.slice(0, 3).map(t => <span key={t} style={{ fontSize: '0.73rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{t}</span>)}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .project-card { grid-template-columns: 300px 1fr !important; }
          .other-projects-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 767px) {
          .project-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};

export default WorkPage;
