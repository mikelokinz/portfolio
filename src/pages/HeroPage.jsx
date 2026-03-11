import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { personal } from '../data/portfolio';
import { useTheme } from '../components/ThemeProvider';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } };

const HeroPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [hoverPortrait, setHoverPortrait] = useState(false);
  const { theme } = useTheme();
  const isGhost = theme === 'ghost';
  const portraitSrc = isGhost ? '/src/assets/images/Ghost.jpg' : personal.portrait;

  return (
    <main style={{ minHeight: '100vh', overflow: 'hidden' }}>

      {/* ── Background Ambient Blobs ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '-30%', right: '-20%', width: '70vh', height: '70vh', background: 'radial-gradient(circle, var(--neon-1) 0%, transparent 65%)', opacity: 0.12, filter: 'blur(60px)', borderRadius: '50%' }} />
        <motion.div animate={{ scale: [1.1, 1, 1.1], rotate: [0, -90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: '-20%', left: '-15%', width: '80vh', height: '80vh', background: 'radial-gradient(circle, var(--neon-2) 0%, transparent 65%)', opacity: 0.10, filter: 'blur(80px)', borderRadius: '50%' }} />
        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '40%', left: '40%', width: '50vh', height: '50vh', background: 'radial-gradient(circle, var(--neon-3) 0%, transparent 65%)', opacity: 0.08, filter: 'blur(70px)', borderRadius: '50%' }} />
      </div>

      {/* ── Hero Section ── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 2rem 4rem', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <motion.div variants={container} initial="hidden" animate="show"
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }}
            className="hero-grid"
          >
            {/* LEFT: Text */}
            <motion.div variants={item} style={{ zIndex: 1 }}>
              <motion.div variants={item}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', letterSpacing: '0.15em', color: 'var(--neon-2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>▮</motion.span>
                Hello, World — I'm
              </motion.div>

              <motion.h1 variants={item}
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '1rem', letterSpacing: '-0.04em' }}
              >
                {personal.name.split(' ').slice(0, 2).join(' ')}<br />
                <span className="gradient-text">{personal.name.split(' ').slice(2).join(' ')}.</span>
              </motion.h1>

              <motion.h2 variants={item}
                style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: 'var(--text-secondary)', fontWeight: 400, marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}
              >
                {personal.role}
              </motion.h2>

              <motion.p variants={item}
                style={{ maxWidth: '520px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '3rem', fontSize: '1.05rem' }}
              >
                {personal.tagline}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                <Link to="/work" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', borderRadius: 'var(--radius-md)', background: 'var(--neon-2)', color: '#000', fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '0.95rem', transition: 'all var(--transition-fast)' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = `0 15px 30px ${personal.phone.length > 0 ? 'rgba(0, 212, 255, 0.35)' : '#0d0'}`; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                >
                  View My Work <ArrowRight size={18} />
                </Link>
                <a href={personal.resume} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: 600, fontFamily: 'var(--font-heading)', fontSize: '0.95rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', backdropFilter: 'blur(10px)', transition: 'all var(--transition-fast)' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--neon-2)'; e.currentTarget.style.color = 'var(--neon-2)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                >
                  <Download size={18} /> Resume
                </a>
              </motion.div>

              {/* Socials */}
              <motion.div variants={item} style={{ display: 'flex', gap: '1.25rem' }}>
                {[
                  { icon: Github, href: personal.github, label: 'GitHub' },
                  { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn' },
                  { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    title={label}
                    style={{ color: 'var(--text-tertiary)', transition: 'all var(--transition-fast)' }}
                    onMouseOver={(e) => { e.currentTarget.style.color = 'var(--neon-2)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)'; e.currentTarget.style.transform = ''; }}
                  >
                    <Icon size={26} />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: Portrait */}
            <motion.div variants={item}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              className="hero-portrait-wrap"
            >
              <div
                onMouseEnter={() => setHoverPortrait(true)}
                onMouseLeave={() => setHoverPortrait(false)}
                style={{ position: 'relative', width: '320px', height: '320px' }}
              >
                {/* Glow ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: '-6px',
                    borderRadius: '50%',
                    background: `conic-gradient(from 0deg, var(--neon-1), var(--neon-2), var(--neon-3), var(--neon-1))`,
                    zIndex: 0,
                    filter: `blur(2px)`,
                  }}
                />
                {/* Inner mask */}
                <div style={{ position: 'absolute', inset: '2px', borderRadius: '50%', background: 'var(--bg-base)', zIndex: 1 }} />

                {/* Portrait Image */}
                <motion.div
                  animate={hoverPortrait ? { scale: 1.08, rotate: 2 } : { scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  style={{ position: 'absolute', inset: '6px', borderRadius: '50%', overflow: 'hidden', zIndex: 2 }}
                >
                  <img
                    src={portraitSrc}
                    alt={isGhost ? 'Simon Ghost Riley' : personal.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isGhost ? 'center' : 'top', transition: 'opacity 0.5s ease, filter 0.5s ease', filter: isGhost ? 'contrast(1.1) brightness(0.9)' : 'none' }}
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personal.name)}&size=320&background=020510&color=00d4ff&bold=true&font-size=0.35`; }}
                  />
                  {/* Hover overlay */}
                  <motion.div
                    animate={hoverPortrait ? { opacity: 1 } : { opacity: 0 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(255,45,120,0.3))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2rem',
                    }}
                  >
                    <span style={{ fontSize: isGhost ? '1.4rem' : '3rem', fontFamily: isGhost ? 'var(--font-mono)' : 'inherit', color: isGhost ? '#4ade80' : 'inherit', letterSpacing: isGhost ? '0.05em' : 'normal', textShadow: isGhost ? '0 0 12px #4ade80' : 'none' }}>
                      {isGhost ? 'Stay Frosty, soldier' : 'sup✌🏿'}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: hoverPortrait ? -8 : 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    position: 'absolute', bottom: '-20px', right: '-20px', zIndex: 10,
                    background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
                    border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1.25rem', fontSize: '0.825rem', fontFamily: 'var(--font-mono)',
                    color: 'var(--neon-2)', whiteSpace: 'nowrap',
                  }}
                >
                  💻 Full Stack Dev
                </motion.div>

                <motion.div
                  animate={{ y: hoverPortrait ? 8 : 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    position: 'absolute', top: '-20px', left: '-20px', zIndex: 10,
                    background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
                    border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1.25rem', fontSize: '0.825rem', fontFamily: 'var(--font-mono)',
                    color: 'var(--neon-1)', whiteSpace: 'nowrap',
                  }}
                >
                  🎓 CS Student
                </motion.div>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: '2rem', left: '50%', x: '-50%' }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--neon-2), transparent)', margin: '0 auto' }} />
        </motion.div>
      </section>

      {/* ── Marquee Bar ── */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-bg)', padding: '1rem 0' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-tertiary)' }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '4rem' }}>
              {['React', 'Vite', 'Tailwind CSS', 'Python', 'Node.js', 'Framer Motion', 'MongoDB', 'Git', 'Adobe AE', 'REST APIs', 'HTML5', 'CSS3'].map(s => (
                <span key={s}>✦ {s}</span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-portrait-wrap { display: flex !important; }
        }
        @media (max-width: 899px) {
          .hero-portrait-wrap { display: none !important; }
        }
      `}</style>
    </main>
  );
};

export default HeroPage;
