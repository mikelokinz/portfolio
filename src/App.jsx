import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import LiquidCursor from './components/LiquidCursor';
import EasterEggs from './components/EasterEggs';
import Navbar from './components/Navbar';
import Spotlight from './components/Spotlight';
import './index.css';

// Pages
import HeroPage from './pages/HeroPage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<HeroPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

// ── Ripple tap effect for mobile ──
const RippleTap = () => {
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouchDevice) return;

    const handleTouch = (e) => {
      const touch = e.touches[0];
      const ripple = document.createElement('div');
      ripple.className = 'tap-ripple';
      ripple.style.left = `${touch.clientX}px`;
      ripple.style.top  = `${touch.clientY}px`;
      document.body.appendChild(ripple);
      // Clean up after animation (550ms)
      setTimeout(() => ripple.remove(), 600);
    };

    window.addEventListener('touchstart', handleTouch, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouch);
  }, []);

  return null;
};

// Footer
const Footer = () => {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  return (
    <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '2.5rem 2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginTop: 'auto' }}>
      <p style={{ marginBottom: '0.5rem' }}>
        Designed &amp; Built by{' '}
        <a href="https://github.com/mikelokinz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-2)' }}>Mikelokinz</a>
      </p>
      <p style={{ opacity: 0.6 }}>
        {isMobile
          ? <>Psst! Hold my <strong style={{ color: 'var(--neon-1)' }}>Profile image</strong></>
          : <>Try typing <strong style={{ color: 'var(--neon-1)' }}>GHOST</strong></>}
      </p>
    </footer>
  );
};


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {/* Ambient background */}
        <Spotlight />
        {/* Global liquid cursor */}
        <LiquidCursor />
        {/* Easter egg listener (types GHOST to activate) */}
        <EasterEggs />
        {/* Mobile tap ripple */}
        <RippleTap />
        {/* Noise grain overlay */}
        <div className="noise" />

        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
