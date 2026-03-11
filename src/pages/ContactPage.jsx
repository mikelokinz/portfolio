import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { personal } from '../data/portfolio';

// ─── EmailJS Config ────────────────────────────────────────────────────────────
// Sign up free at https://emailjs.com, then replace these 3 values:
const EMAILJS_SERVICE_ID  = 'service_aqpku3k';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_gi5t8xo';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'SmiL2hbKsbiUCfVtA';   // e.g. 'abc_XYZ123...'
// ──────────────────────────────────────────────────────────────────────────────

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } } };

// ─── Field Loading Overlays ────────────────────────────────────────────────────
/**
 * sendingField: null | 'name' | 'message' | 'sending' | 'done' | 'error'
 * Each field gets its own distinct loading animation while the email is sending.
 */

const ScanLine = () => (
  <motion.div
    initial={{ top: 0 }}
    animate={{ top: ['0%', '100%', '0%'] }}
    transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
    style={{
      position: 'absolute', left: 0, right: 0, height: '2px',
      background: 'linear-gradient(90deg, transparent, var(--neon-2), transparent)',
      boxShadow: '0 0 8px var(--neon-2)',
      pointerEvents: 'none',
    }}
  />
);

const TypewriterDots = () => (
  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
    {[0, 1, 2].map(i => (
      <motion.div key={i}
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.22 }}
        style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--neon-1)' }}
      />
    ))}
  </div>
);

const FieldOverlay = ({ label, type }) => (
  <motion.div
    key={type}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'absolute', inset: 0, borderRadius: 'var(--radius-md)',
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '0.75rem', zIndex: 10,
      border: '1px solid var(--glass-border-hover)',
      overflow: 'hidden',
    }}
  >
    {type === 'name' && (
      <>
        <ScanLine />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--neon-2)', letterSpacing: '0.1em' }}>
          ↳ Reading {label}…
        </span>
      </>
    )}
    {type === 'message' && (
      <>
        <TypewriterDots />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--neon-1)', letterSpacing: '0.1em' }}>
          ↳ Packing message…
        </span>
      </>
    )}
  </motion.div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const ContactPage = () => {
  const formRef = useRef(null);
  const [name,    setName]    = useState('');
  const [message, setMessage] = useState('');
  const [step,    setStep]    = useState('idle'); // idle | name | message | sending | done | error

  const contacts = [
    { icon: Mail,    label: 'Email',    value: personal.email,                    href: `mailto:${personal.email}` },
    { icon: Phone,   label: 'Phone',    value: personal.phone,                    href: `tel:${personal.phone}` },
    { icon: MapPin,  label: 'Location', value: 'Tamil Nadu, India',               href: null },
    { icon: Github,  label: 'GitHub',   value: `github.com/${personal.handle}`,   href: personal.github },
    { icon: Linkedin,label: 'LinkedIn', value: `linkedin.com/in/${personal.handle}`, href: personal.linkedin },
  ];

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Step 1 — Animate name field scan
    setStep('name');
    await sleep(1400);

    // Step 2 — Animate message field pack
    setStep('message');
    await sleep(1400);

    // Step 3 — Sending spinner on button
    setStep('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    name.trim(),
          message:      message.trim(),
          reply_to:     personal.email,
          to_email:     personal.email,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStep('done');
      setName('');
      setMessage('');
      await sleep(4000);
      setStep('idle');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStep('error');
      await sleep(4000);
      setStep('idle');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    backdropFilter: 'blur(10px)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
  };

  const isBusy = step === 'name' || step === 'message' || step === 'sending';

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <section style={{ padding: '4rem 0 2rem' }}>
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="section-label">Contact</motion.p>
            <motion.h1 variants={fadeUp} className="section-title">
              Let's <span className="gradient-text">Connect</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ maxWidth: '550px', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: 1.7 }}>
              I'm always open to discussing new opportunities, projects, or just having a great conversation. Reach out anytime!
            </motion.p>
          </motion.div>
        </section>

        <div style={{ display: 'grid', gap: '3rem', paddingBottom: '6rem' }} className="contact-grid">

          {/* Contact Info */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 600 }}>Get in Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <motion.div key={label} variants={fadeUp}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="glass"
                      style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}
                    >
                      <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--neon-2)' }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.15rem' }}>{label}</div>
                        <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{value}</div>
                      </div>
                      <ExternalLink size={14} style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }} />
                    </a>
                  ) : (
                    <div className="glass" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--neon-2)' }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.15rem' }}>{label}</div>
                        <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="glass" style={{ padding: '2.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>Send me a message</h2>

              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Name field */}
                <div style={{ position: 'relative' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
                    Your Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="from_name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="What's your name?"
                      required
                      disabled={isBusy}
                      style={{ ...inputStyle, borderColor: step === 'name' ? 'var(--neon-2)' : 'var(--glass-border)' }}
                      onFocus={e  => { if (!isBusy) e.target.style.borderColor = 'var(--neon-2)'; }}
                      onBlur={e   => { if (!isBusy) e.target.style.borderColor = 'var(--glass-border)'; }}
                    />
                    <AnimatePresence>
                      {step === 'name' && <FieldOverlay label="your name" type="name" />}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Message field */}
                <div style={{ position: 'relative' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
                    Message
                  </label>
                  <div style={{ position: 'relative' }}>
                    <textarea
                      name="message"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="What's on your mind?"
                      rows={6}
                      required
                      disabled={isBusy}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, borderColor: step === 'message' ? 'var(--neon-1)' : 'var(--glass-border)' }}
                      onFocus={e  => { if (!isBusy) e.target.style.borderColor = 'var(--neon-2)'; }}
                      onBlur={e   => { if (!isBusy) e.target.style.borderColor = 'var(--glass-border)'; }}
                    />
                    <AnimatePresence>
                      {step === 'message' && <FieldOverlay label="message" type="message" />}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isBusy}
                  whileTap={!isBusy ? { scale: 0.97 } : {}}
                  whileHover={!isBusy ? { scale: 1.02 } : {}}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                    padding: '1rem 2rem', borderRadius: 'var(--radius-md)', border: 'none',
                    fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1rem',
                    cursor: isBusy ? 'not-allowed' : 'pointer',
                    background: step === 'done' ? '#22c55e' : step === 'error' ? '#ef4444' : 'var(--neon-2)',
                    color: '#000',
                    transition: 'background 0.3s',
                    overflow: 'hidden', position: 'relative',
                  }}
                >
                  {/* Sending progress shimmer */}
                  {step === 'sending' && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute', inset: 0, width: '50%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {step === 'idle' && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <Send size={18} /> Send Message
                      </motion.span>
                    )}
                    {(step === 'name' || step === 'message') && (
                      <motion.span key="prep" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block' }}>
                          ⚙️
                        </motion.span>
                        Preparing…
                      </motion.span>
                    )}
                    {step === 'sending' && (
                      <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
                          📡
                        </motion.span>
                        Sending…
                      </motion.span>
                    )}
                    {step === 'done' && (
                      <motion.span key="done" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <CheckCircle size={18} /> Message Delivered! 🎉
                      </motion.span>
                    )}
                    {step === 'error' && (
                      <motion.span key="error" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <AlertCircle size={18} /> Failed — Try Again
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* EmailJS setup hint (shown only if keys are not set) */}
                {EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' && (
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textAlign: 'center', marginTop: '-0.5rem' }}>
                    ⚠️ EmailJS not configured yet — see README for setup steps
                  </p>
                )}
              </form>
            </div>
          </motion.div>

        </div>

        {/* Ghost hint */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: 'center', paddingBottom: '5rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          <p>psst... try typing <span style={{ color: 'var(--neon-1)', letterSpacing: '0.2em' }}>GHOST</span></p>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 1fr 1.2fr !important; }
        }
      `}</style>
    </main>
  );
};

export default ContactPage;
