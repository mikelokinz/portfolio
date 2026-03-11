import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Award } from 'lucide-react';
import { experience, certifications, education } from '../data/portfolio';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } } };

const ExperiencePage = () => (
  <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>

      {/* Header */}
      <section style={{ padding: '4rem 0 2rem' }}>
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="section-label">Journey</motion.p>
          <motion.h1 variants={fadeUp} className="section-title">
            Experience &amp; <span className="gradient-text">Achievements</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* Work Experience */}
      <section style={{ paddingBottom: '4rem' }}>
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          🔨 Work Experience
        </motion.h2>
        <div style={{ position: 'relative', paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Timeline line */}
          <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, var(--neon-1), var(--neon-2), transparent)' }} />
          {experience.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ position: 'relative' }}
            >
              {/* Dot */}
              <div style={{ position: 'absolute', left: '-2.75rem', top: '0.5rem', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--neon-1)', boxShadow: `0 0 12px var(--neon-1)` }} />
              <div className="glass" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{exp.title}</h3>
                    <p style={{ color: 'var(--neon-2)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>{exp.company}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-tertiary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.75rem' }}>
                    {exp.year}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>{exp.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {exp.tech.map(t => (
                    <span key={t} style={{ padding: '0.25rem 0.7rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '2rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-2)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education timeline */}
      <section style={{ paddingBottom: '4rem' }}>
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          🎓 Education
        </motion.h2>
        <div style={{ position: 'relative', paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, var(--neon-2), var(--neon-3), transparent)' }} />
          {education.map((edu, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'absolute', left: '-2.75rem', top: '0.5rem', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--neon-2)', boxShadow: `0 0 12px var(--neon-2)` }} />
              <div className="glass" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{edu.degree}</h3>
                    <p style={{ color: 'var(--neon-2)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>{edu.institution}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-tertiary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.75rem' }}>
                    {edu.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications Grid */}
      <section style={{ paddingBottom: '6rem' }}>
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          🏆 Certifications
        </motion.h2>
        <div style={{ display: 'grid', gap: '1.25rem' }} className="cert-grid">
          {certifications.map((cert, i) => (
            <motion.a
              key={i}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass"
              style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', textDecoration: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <span style={{ fontSize: '2rem' }}>{cert.icon}</span>
                <div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>{cert.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{cert.issuer} · {cert.date}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                <FileText size={16} /> View
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </div>

    <style>{`
      @media (min-width: 768px) {
        .cert-grid { grid-template-columns: 1fr 1fr !important; }
      }
    `}</style>
  </main>
);

export default ExperiencePage;
