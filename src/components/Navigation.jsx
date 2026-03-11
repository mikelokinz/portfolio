import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'What I Do', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isScrolled
          ? `color-mix(in srgb, var(--bg-primary) 80%, transparent)`
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'all var(--transition-normal)',
      }}
    >
      <motion.div
        className="interactive"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: '700',
          fontSize: '1.5rem',
          color: 'var(--text-primary)',
          cursor: 'none',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Mikelokinz
      </motion.div>

      {/* Desktop Nav */}
      <ul style={{ display: 'none', gap: '2rem', listStyle: 'none' }} className="desktop-nav">
        {navLinks.map((link) => (
          <li key={link.name}>
            <motion.a
              href={link.href}
              whileHover={{ y: -2 }}
              className="interactive"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'color var(--transition-fast)',
              }}
            >
              {link.name}
            </motion.a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div className="mobile-menu-btn" style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
        <button
          className="interactive"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
             background: 'transparent',
             border: 'none',
             color: 'var(--text-primary)',
             cursor: 'none',
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '75vw',
              maxWidth: '400px',
              background: 'var(--bg-secondary)',
              padding: '6rem 2rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="interactive"
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '1.25rem',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; margin-right: 4rem; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navigation;
