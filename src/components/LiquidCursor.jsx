import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

/**
 * Absolute zero-latency cursor.
 * Strategy: Direct DOM transform on `pointermove` — no RAF loop, no lerp, no React state.
 * `pointermove` fires before `mousemove` in the browser event pipeline, giving the
 * lowest possible latency. The only smooth transition is a CSS `transition` on size/glow,
 * which happens on the GPU and never blocks the main thread.
 */
const LiquidCursor = () => {
  const { theme } = useTheme();
  const dotRef = useRef(null);
  const trailRef = useRef(null);
  const colorRef = useRef('#00d4ff');

  const THEME_COLORS = {
    dark: '#00d4ff',
    light: '#2563eb',
    neon: '#ff00ff',
    ghost: '#4ade80',
  };

  // Update color ref when theme changes
  useEffect(() => {
    const color = THEME_COLORS[theme] || THEME_COLORS.dark;
    colorRef.current = color;
    if (dotRef.current) {
      dotRef.current.style.background = color;
      dotRef.current.style.boxShadow = `0 0 10px ${color}cc, 0 0 24px ${color}55`;
    }
    if (trailRef.current) {
      trailRef.current.style.borderColor = `${color}55`;
    }
  }, [theme]);

  useEffect(() => {
    let trailX = -100, trailY = -100;
    let rafId = null;

    // ── INSTANT dot: updated directly on every pointer event ──
    const onPointer = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (dotRef.current) {
        // Subtract half of cursor size (18px) to center it
        dotRef.current.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0)`;
      }
      // Trail lags behind with gentle lerp (cosmetic only, not interactive)
      trailX += (x - trailX) * 0.12;
      trailY += (y - trailY) * 0.12;
    };

    // ── Trail ring: smooth follow using RAF ──
    const animateTrail = () => {
      if (trailRef.current) {
        // get dot's real position from its transform
        const dot = dotRef.current;
        if (dot) {
          const mat = new DOMMatrix(dot.style.transform);
          const tx = mat.m41 + 18; // real cursor X
          const ty = mat.m42 + 18;
          trailX += (tx - trailX) * 0.10;
          trailY += (ty - trailY) * 0.10;
          trailRef.current.style.transform = `translate3d(${trailX - 28}px, ${trailY - 28}px, 0)`;
        }
      }
      rafId = requestAnimationFrame(animateTrail);
    };

    // ── Hover detection: scale up dot on interactive elements ──
    const onEnter = (e) => {
      const t = e.target;
      const isClickable = t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.closest('a') || t.closest('button') || t.getAttribute('role') === 'link';
      if (dotRef.current) {
        dotRef.current.style.transform = dotRef.current.style.transform; // keep position
        dotRef.current.style.width = isClickable ? '42px' : '36px';
        dotRef.current.style.height = isClickable ? '42px' : '36px';
        dotRef.current.style.opacity = isClickable ? '0.7' : '0.9';
        // When enlarged, re-center offset
        dotRef.current.dataset.offset = isClickable ? '21' : '18';
      }
      if (trailRef.current) {
        trailRef.current.style.opacity = isClickable ? '0.6' : '0.4';
        trailRef.current.style.width = isClickable ? '64px' : '56px';
        trailRef.current.style.height = isClickable ? '64px' : '56px';
      }
    };

    // Use capture phase so we get the event before React sees it
    window.addEventListener('pointermove', onPointer, { passive: true, capture: true });
    window.addEventListener('mouseover', onEnter, { passive: true });
    rafId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('pointermove', onPointer, { capture: true });
      window.removeEventListener('mouseover', onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Don't render on touch-only devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  const color = THEME_COLORS[theme] || THEME_COLORS.dark;

  return (
    <>
      {/* Outer trail ring — smooth, cosmetic */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          left: 0, top: 0,
          width: '56px', height: '56px',
          borderRadius: '50%',
          border: `1.5px solid ${color}55`,
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          opacity: 0.4,
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.15s ease, border-color 0.3s ease',
        }}
      />

      {/* Inner dot — instant response */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: 0, top: 0,
          width: '36px', height: '36px',
          borderRadius: '50%',
          background: color,
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: theme === 'light' ? 'multiply' : 'screen',
          willChange: 'transform',
          opacity: 0.9,
          boxShadow: `0 0 10px ${color}cc, 0 0 24px ${color}55`,
          // Only transition cosmetic properties, NEVER transform (would add latency)
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.15s ease, background 0.3s ease, box-shadow 0.3s ease',
        }}
      />
    </>
  );
};

export default LiquidCursor;
