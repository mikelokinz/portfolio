import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Phone, Linkedin, Github, Radiation } from 'lucide-react';

const Contact = () => {
  const [chaosMode, setChaosMode] = useState(false);
  const controls = useAnimation();

  const triggerChaosMode = () => {
    setChaosMode(true);
    controls.start({
      rotate: [0, -10, 10, -10, 10, 0],
      scale: [1, 1.1, 0.9, 1.1, 0.9, 1],
      transition: { duration: 0.5, repeat: 5 },
    }).then(() => {
      // Revert after some time
      setTimeout(() => setChaosMode(false), 3000);
    });
    
    // Add document-level chaos
    document.body.style.filter = 'hue-rotate(90deg) invert(1)';
    document.body.style.transition = 'filter 0.5s ease';
    setTimeout(() => {
        document.body.style.filter = 'none';
        document.body.style.transition = 'background-color var(--transition-normal), color var(--transition-normal)';
    }, 3000);
  };

  return (
    <section id="contact" className="container section" style={{ textAlign: 'center', marginBottom: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <p style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '1rem', marginBottom: '1rem' }}>
          06. What’s Next?
        </p>
        <h2 style={{ fontSize: 'clamp(40px, 5vw, 60px)', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: '700' }}>
          Get In Touch
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto', color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.6 }}>
          I am currently looking for new opportunities. Whether you have a
          question or just want to say hi, my inbox is always open!
        </p>

        <a
          href="mailto:mikelokinz@gmail.com"
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
          Say Hello
        </a>

        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <a
            href="tel:+917904285263"
            className="interactive"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color var(--transition-fast)' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <Phone size={20} style={{ color: 'var(--success-color)' }} />
            <span style={{ fontFamily: 'var(--font-mono)' }}>+91 7904285263</span>
          </a>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <a
              href="https://www.linkedin.com/in/mikelokinz/"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive"
              style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color var(--transition-fast)', textDecoration: 'none' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <Linkedin size={20} />
              <span style={{ fontFamily: 'var(--font-mono)' }}>mikelokinz</span>
            </a>
            <a
              href="https://github.com/mikelokinz"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive"
              style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color var(--transition-fast)', textDecoration: 'none' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <Github size={20} />
              <span style={{ fontFamily: 'var(--font-mono)' }}>mikelokinz</span>
            </a>
          </div>
        </div>

        {/* Easter Egg */}
        <div style={{ marginTop: '6rem' }}>
          <motion.button
            className="interactive"
            onClick={triggerChaosMode}
            animate={controls}
            whileHover={{ scale: 1.05, backgroundColor: 'var(--error-color)', color: '#fff', borderColor: 'var(--error-color)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              color: 'var(--error-color)',
              background: 'transparent',
              border: '1px solid var(--error-color)',
              borderRadius: '0.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              transition: 'all var(--transition-fast)',
              cursor: 'none'
            }}
          >
            <Radiation size={18} /> DO NOT PRESS
          </motion.button>
          <p style={{ marginTop: '1rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', opacity: 0.6 }}>
            RESTRICTED ACCESS: AUTHORIZED PERSONNEL ONLY
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
