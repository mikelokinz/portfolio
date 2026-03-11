import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const Spotlight = () => {
  const { theme } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the glowing orbs
  const springConfig = { damping: 50, stiffness: 200, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax layers
  const bgX1 = useTransform(smoothX, [0, window.innerWidth], [-50, 50]);
  const bgY1 = useTransform(smoothY, [0, window.innerHeight], [-50, 50]);
  
  const bgX2 = useTransform(smoothX, [0, window.innerWidth], [50, -50]);
  const bgY2 = useTransform(smoothY, [0, window.innerHeight], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    // Set initial position to center
    if (typeof window !== 'undefined') {
        mouseX.set(window.innerWidth / 2);
        mouseY.set(window.innerHeight / 2);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (theme === 'ghost') {
      return null; // Ghost theme relies on scanlines, not liquid blobs
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
      
      {/* Primary Blob following cursor directly */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          width: '600px',
          height: '600px',
          marginLeft: '-300px',
          marginTop: '-300px',
          background: `radial-gradient(circle, var(--neon-1) 0%, transparent 70%)`,
          opacity: 0.15,
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
        animate={{
            scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Parallax Blob 1 */}
      <motion.div
        style={{
          position: 'absolute',
          left: '20%',
          top: '30%',
          x: bgX1,
          y: bgY1,
          width: '800px',
          height: '800px',
          background: `radial-gradient(circle, var(--neon-2) 0%, transparent 60%)`,
          opacity: 0.1,
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
        animate={{
            scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Parallax Blob 2 */}
      <motion.div
        style={{
          position: 'absolute',
          right: '10%',
          bottom: '10%',
          x: bgX2,
          y: bgY2,
          width: '700px',
          height: '700px',
          background: `radial-gradient(circle, var(--neon-3) 0%, transparent 60%)`,
          opacity: 0.1,
          filter: 'blur(90px)',
          borderRadius: '50%',
        }}
        animate={{
            scale: [1, 1.15, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Global Noise Overlay */}
      <div className="noise-overlay"></div>
    </div>
  );
};

export default Spotlight;
