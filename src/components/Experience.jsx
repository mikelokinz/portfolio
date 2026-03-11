import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      date: '2024 - 2028 (Present)',
      title: 'B.E. Computer Science & Engineering',
      place: 'Current Student',
      desc: ''
    },
    {
      date: '2024 - 2025',
      title: 'Honours Diploma in Computer Application',
      place: 'CSC',
      desc: ''
    },
    {
      date: 'May 2024',
      title: 'Certifications',
      place: 'Error Makes Clever',
      desc: 'Completed "Master Flutter Webinar" and "Full Stack Web Development" courses.'
    },
    {
      date: 'Previous',
      title: 'Higher Secondary',
      place: 'Mount St. Joseph Mat. Hr. Sec. School',
      desc: 'HSC (60%) | SSLC (69%)'
    }
  ];

  return (
    <section id="experience" className="container section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', marginBottom: '3rem' }}
      >
        <span style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', marginRight: '1rem', fontFamily: 'var(--font-mono)' }}>05.</span>
        Journey So Far
        <div style={{ content: '""', display: 'block', height: '1px', flex: 1, maxWidth: '300px', background: 'var(--border-color)', marginLeft: '1.25rem' }}></div>
      </motion.h2>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '0',
          top: '0',
          bottom: '0',
          width: '2px',
          background: 'var(--border-color)',
          transform: 'translateX(11px)', // Center dot
        }}></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="interactive"
            style={{
              position: 'relative',
              paddingLeft: '3rem',
              marginBottom: '3rem',
              cursor: 'none'
            }}
          >
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '0',
              top: '0.25rem',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--bg-primary)',
              border: '2px solid var(--accent-primary)',
              zIndex: 1,
              transition: 'background var(--transition-fast)'
            }}
            className="timeline-dot"
            ></div>

            <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', position: 'relative' }}>
               <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  color: 'var(--accent-primary)', 
                  fontSize: '0.875rem', 
                  marginBottom: '0.5rem' 
                }}>
                  {exp.date}
                </div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                  {exp.title}
                </h3>
                <h4 style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
                  {exp.place}
                </h4>
                {exp.desc && (
                  <p style={{ color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                    {exp.desc}
                  </p>
                )}
            </div>
            
             <style>{`
                .interactive:hover .timeline-dot {
                    background: var(--accent-primary) !important;
                }
             `}</style>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
