import React, { useEffect } from 'react';
import { useTheme } from './ThemeProvider';

/**
 * Easter Egg: Type the letters G-H-O-S-T anywhere on the page
 * to trigger the Simon "Ghost" Riley tactical theme.
 * Type it again to revert to dark.
 */
const EasterEggs = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const code = ['g', 'h', 'o', 's', 't'];
    let pos = 0;

    const handleKey = (e) => {
      const key = e.key.toLowerCase();
      // Only listen to single character keys
      if (key.length !== 1) { pos = 0; return; }

      if (key === code[pos]) {
        pos++;
        if (pos === code.length) {
          pos = 0;
          triggerGhost();
        }
      } else {
        pos = key === code[0] ? 1 : 0;
      }
    };

    const triggerGhost = () => {
      // Add glitch CSS class for the visual flash
      document.documentElement.classList.add('ghost-glitch');
      setTimeout(() => document.documentElement.classList.remove('ghost-glitch'), 900);

      // Toggle between ghost and dark
      setTheme(prev => (typeof prev === 'string' 
        ? (prev === 'ghost' ? 'dark' : 'ghost') 
        : 'ghost'));
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setTheme]);

  return null; // Pure logic, no UI
};

export default EasterEggs;
