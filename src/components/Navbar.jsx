import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import ThemeSwitcher from './ThemeSwitcher';
import { Menu, X } from 'lucide-react';

const links = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/work', label: 'Work' },
  { path: '/experience', label: 'Experience' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--nav-border)' : 'none',
          transition: 'all var(--transition-normal)',
          padding: '0 2rem',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          {/* Logo */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <motion.span
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--neon-2)',
                fontSize: '1.2rem',
                fontWeight: 700
              }}
              animate={theme === 'ghost' ? { textShadow: ['0 0 5px #4ade80', '0 0 20px #4ade80', '0 0 5px #4ade80'] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {theme === 'ghost' ? 'Simon Ghost Riely' : '<Mike />'}
            </motion.span>
          </NavLink>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
            {links.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                style={({ isActive }) => ({
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  color: isActive ? 'var(--neon-2)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  transition: 'all var(--transition-fast)',
                  background: isActive ? 'var(--glass-bg)' : 'transparent',
                  border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent',
                })}
                onMouseOver={(e) => { if (window.matchMedia('(pointer: coarse)').matches) return; e.currentTarget.style.color = 'var(--neon-2)'; }}
                onMouseOut={(e) => { if (window.matchMedia('(pointer: coarse)').matches) return; if (!e.currentTarget.className.includes('active')) e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeSwitcher />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(p => !p)}
              className="mobile-menu-btn"
              style={{
                background: 'none', border: 'none', color: 'var(--text-primary)',
                padding: '0.5rem', display: 'none',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 999,
              background: 'var(--nav-bg)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--nav-border)',
              padding: '1rem 2rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}
          >
            {links.map(link => (
              <NavLink key={link.path} to={link.path} end={link.path === '/'}
                style={({ isActive }) => ({
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  color: isActive ? 'var(--neon-2)' : 'var(--text-primary)',
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  background: isActive ? 'var(--glass-bg)' : 'transparent',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .desktop-nav { display: flex !important; } .mobile-menu-btn { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }
      `}</style>
    </>
  );
};

export default Navbar;
