import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '6rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
          Hi, my name is
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.1 }}>
          Michael John Franklin.
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 style={{ fontSize: 'clamp(40px, 8vw, 80px)', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          I build things for the web.
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p style={{ maxWidth: '600px', fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          I am a B.E. Computer Science student based in Tiruvannamalai, India. I
          specialize in building responsive web applications using the MERN
          stack and possess a creative flair for video editing.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <a
          href="#projects"
          className="interactive"
          style={{
            display: 'inline-block',
            padding: '1.25rem 2rem',
            color: 'var(--accent-primary)',
            background: 'transparent',
            border: '1px solid var(--accent-primary)',
            borderRadius: '0.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            transition: 'all var(--transition-fast)',
            textDecoration: 'none',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'color-mix(in srgb, var(--accent-primary) 10%, transparent)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Check out my projects!
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
