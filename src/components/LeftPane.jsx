import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const LeftPane = ({ activeSection }) => {
  const { theme } = useTheme();

  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'WORK' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'certifications', label: 'CERTIFICATIONS' },
  ];

  return (
    <header className="left-pane" style={{
      display: 'flex', flexDirection: 'column', 
      justifyContent: 'space-between',
      padding: '4rem 0',
      minHeight: '100vh',
    }}>
      <div style={{ zIndex: 10 }}>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: '3.5rem', marginBottom: '0.5rem', letterSpacing: '-0.05em' }}
        >
          Michael John<br/>Franklin.
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 400, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}
        >
          Computer Science Student &<br/>Full Stack Developer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ maxWidth: '300px', color: 'var(--text-tertiary)', fontSize: '0.9rem', lineHeight: 1.6 }}
        >
          Bridging the gap between creative design and precise engineering to build dynamic, liquid experiences on the web.
        </motion.p>

        {/* Desktop Navigation Navigation Dots */}
        <nav style={{ marginTop: '4rem', display: 'none' }} className="desktop-nav">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {navItems.map((item, idx) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  className="interactive"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: activeSection === item.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontSize: '0.75rem',
                    fontWeight: activeSection === item.id ? 700 : 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    transition: 'all var(--transition-normal)'
                  }}
                >
                  <motion.span
                    initial={false}
                    animate={{
                      width: activeSection === item.id ? '3rem' : '1.5rem',
                      backgroundColor: activeSection === item.id 
                        ? (theme === 'ghost' ? 'var(--neon-1)' : 'var(--text-primary)') 
                        : 'var(--text-tertiary)'
                    }}
                    style={{ height: '1px', display: 'block' }}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ display: 'flex', gap: '1.5rem', zIndex: 10, marginTop: '3rem' }}
      >
        {[
          { icon: Github, href: 'https://github.com/mikelokinz' },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/mikelokinz/' },
          { icon: Mail, href: 'mailto:mikelokinz@gmail.com' }
        ].map((social, i) => (
          <a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive"
            style={{ color: 'var(--text-tertiary)', transition: 'color var(--transition-fast)' }}
            onMouseOver={(e) => e.currentTarget.style.color = theme === 'ghost' ? 'var(--neon-1)' : 'var(--text-primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
          >
            <social.icon size={24} />
          </a>
        ))}
      </motion.div>

      {/* Global Style for Responsive Layout */}
      <style>{`
        .left-pane { width: 100%; position: relative; }
        @media (min-width: 1024px) {
          .left-pane {
            width: 40%;
            position: sticky;
            top: 0;
            padding: 6rem 4rem 6rem 0;
          }
          .desktop-nav { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default LeftPane;
