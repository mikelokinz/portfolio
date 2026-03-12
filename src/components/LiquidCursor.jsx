import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

/**
 * Absolute zero-latency cursor — desktop only.
 * Detection runs AFTER mount inside useEffect so it reads the real browser
 * environment (fixes Vercel/production builds where inline matchMedia can lie).
 */
const LiquidCursor = () => {
  const { theme } = useTheme();
  const dotRef = useRef(null);
  const trailRef = useRef(null);

  // Start as "hidden" — reveal only after we've confirmed it's NOT a touch device
  const [show, setShow] = useState(false);

  const THEME_COLORS = {
    dark: '#00d4ff',
    light: '#2563eb',
    neon: '#ff00ff',
    ghost: '#4ade80',
  };

  // ── Step 1: detect after mount (runs in the real browser, never on server) ──
  useEffect(() => {
    const isTouch =
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches;

    if (!isTouch) setShow(true);
  }, []);

  // ── Step 2: update colors when theme changes ──
  useEffect(() => {
    const color = THEME_COLORS[theme] || THEME_COLORS.dark;
    if (dotRef.current) {
      dotRef.current.style.background = color;
      dotRef.current.style.boxShadow = `0 0 10px ${color}cc, 0 0 24px ${color}55`;
    }
    if (trailRef.current) {
      trailRef.current.style.borderColor = `${color}55`;
    }
  }, [theme, show]);

  // ── Step 3: attach pointer listeners only when shown ──
  useEffect(() => {
    if (!show) return;

    let trailX = -100, trailY = -100;
    let rafId = null;

    const onPointer = (e) => {
      // Ignore touch-generated pointer events
      if (e.pointerType === 'touch') return;
      const x = e.clientX;
      const y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0)`;
      }
    };

    const animateTrail = () => {
      const dot = dotRef.current;
      if (dot && trailRef.current) {
        const mat = new DOMMatrix(dot.style.transform);
        const tx = mat.m41 + 18;
        const ty = mat.m42 + 18;
        trailX += (tx - trailX) * 0.10;
        trailY += (ty - trailY) * 0.10;
        trailRef.current.style.transform = `translate3d(${trailX - 28}px, ${trailY - 28}px, 0)`;
      }
      rafId = requestAnimationFrame(animateTrail);
    };

    const onEnter = (e) => {
      const t = e.target;
      const isClickable =
        t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.closest('a') || t.closest('button') ||
        t.getAttribute('role') === 'link';
      if (dotRef.current) {
        dotRef.current.style.width  = isClickable ? '42px' : '36px';
        dotRef.current.style.height = isClickable ? '42px' : '36px';
        dotRef.current.style.opacity = isClickable ? '0.7' : '0.9';
      }
      if (trailRef.current) {
        trailRef.current.style.opacity = isClickable ? '0.6' : '0.4';
        trailRef.current.style.width   = isClickable ? '64px' : '56px';
        trailRef.current.style.height  = isClickable ? '64px' : '56px';
      }
    };

    window.addEventListener('pointermove', onPointer, { passive: true, capture: true });
    window.addEventListener('mouseover',   onEnter,   { passive: true });
    rafId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('pointermove', onPointer, { capture: true });
      window.removeEventListener('mouseover',   onEnter);
      cancelAnimationFrame(rafId);
    };
  }, [show]);

  // Nothing rendered until we're sure it's a pointer device
  if (!show) return null;

  const color = THEME_COLORS[theme] || THEME_COLORS.dark;

  return (
    <>
      {/* Outer trail ring */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed', left: 0, top: 0,
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

      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', left: 0, top: 0,
          width: '36px', height: '36px',
          borderRadius: '50%',
          background: color,
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: theme === 'light' ? 'multiply' : 'screen',
          willChange: 'transform',
          opacity: 0.9,
          boxShadow: `0 0 10px ${color}cc, 0 0 24px ${color}55`,
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.15s ease, background 0.3s ease, box-shadow 0.3s ease',
        }}
      />
    </>
  );
};

export default LiquidCursor;
