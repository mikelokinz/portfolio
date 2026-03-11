import React from 'react';
import { motion } from 'framer-motion';
import { personal, education, skills } from '../data/portfolio';
import { useTheme } from '../components/ThemeProvider';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4,0,0.2,1] } } };

const AboutPage = () => {
  const { theme } = useTheme();
  const isGhost = theme === 'ghost';
  const portraitSrc = isGhost ? '/images/Ghost.jpg' : personal.portrait;

  return (
  <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

      {/* ── HERO ABOUT ── */}
      <section className="section">
        <div style={{ display: 'grid', alignItems: 'center', gap: '4rem' }} className="about-grid">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '280px' }}>
              {/* Glass frame */}
              <div className="glass" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', padding: 0 }}>
                <img
                  src={portraitSrc}
                  alt={isGhost ? 'Simon Ghost Riley' : personal.name}
                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: isGhost ? 'center' : 'top', display: 'block', transition: 'opacity 0.5s ease, filter 0.5s ease', filter: isGhost ? 'contrast(1.1) brightness(0.9)' : 'none' }}
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personal.name)}&size=400&background=0a0f1e&color=00d4ff&bold=true&font-size=0.3`; }}
                />
              </div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass"
                style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}
              >
                <div style={{ color: 'var(--neon-2)', fontWeight: 700, marginBottom: '0.25rem' }}>{personal.handle}</div>
                <div style={{ color: 'var(--text-secondary)' }}>📍 India</div>
                <div style={{ color: 'var(--text-secondary)' }}>📞 {personal.phone}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="section-label">About Me</motion.p>
            <motion.h1 variants={fadeUp} className="section-title">
              More than just <span className="gradient-text">code.</span>
            </motion.h1>
            {personal.about.map((para, i) => (
              <motion.p key={i} variants={fadeUp}
                style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '1.05rem' }}
              >
                {para}
              </motion.p>
            ))}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <a href={`mailto:${personal.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--neon-2)', fontSize: '0.9rem', fontFamily: 'var(--font-heading)' }}>
                ✉️ {personal.email}
              </a>
              <a href={`tel:${personal.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'var(--font-heading)' }}>
                📞 {personal.phone}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="section">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.p variants={fadeUp} className="section-label">Education</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Academic <span className="gradient-text">Background</span></motion.h2>
          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2.5rem' }} className="edu-grid">
            {education.map((edu, i) => (
              <motion.div key={i} variants={fadeUp} className="glass" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', fontSize: '1.5rem', flexShrink: 0 }}>
                  🎓
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{edu.degree}</h3>
                  <p style={{ color: 'var(--neon-2)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{edu.institution}</p>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>{edu.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SKILLS ── */}
      <section className="section">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.p variants={fadeUp} className="section-label">Skills</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">My <span className="gradient-text">Toolkit</span></motion.h2>

          <div style={{ display: 'grid', gap: '2rem', marginTop: '2.5rem' }} className="skills-grid">
            {Object.entries(skills).map(([cat, items]) => (
              <motion.div key={cat} variants={fadeUp} className="glass" style={{ padding: '1.75rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--neon-2)', marginBottom: '1.25rem' }}>
                  {{ frontend: '⚡ Frontend', backend: '🖥️ Backend', tools: '🔧 Tools', ai: '🤖 AI & APIs' }[cat]}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08, y: -2 }}
                      style={{
                        padding: '0.4rem 0.9rem', borderRadius: '2rem',
                        background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                        fontSize: '0.85rem', color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)', cursor: 'default',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
    <style>{`
      @media (min-width: 768px) {
        .about-grid { grid-template-columns: 1fr 1.8fr !important; }
        .edu-grid { grid-template-columns: 1fr 1fr !important; }
        .skills-grid { grid-template-columns: 1fr 1fr !important; }
      }
    `}</style>
  </main>
  );
};

export default AboutPage;
