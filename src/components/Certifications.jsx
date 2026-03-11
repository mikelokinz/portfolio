import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, FileText } from 'lucide-react';

const Certifications = ({ onInView }) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView, onInView]);

  const certs = [
    {
      title: 'Full Stack Web Development',
      issuer: 'Error Makes Clever',
      date: 'May 2024',
      type: 'Certificate',
      file: '/src/assets/certifications/Full Stack Certificate.pdf'
    },
    {
      title: 'Master Flutter Webinar',
      issuer: 'Error Makes Clever',
      date: 'May 2024',
      type: 'Certificate',
      file: '/src/assets/certifications/Flutter{EMC}.jpg'
    },
    {
      title: 'Honours Diploma in Computer Application',
      issuer: 'CSC',
      date: '2024 - 2025',
      type: 'Diploma',
      file: '/src/assets/certifications/CSC-HDCA (1).jpg'
    },
    {
      title: 'Cyber Security',
      issuer: 'CISCO',
      date: 'Recent',
      type: 'Certificate',
      file: '/src/assets/certifications/CISCO CYBER SECURITY.pdf'
    },
    {
      title: 'MongoDB Basics',
      issuer: 'MongoDB',
      date: 'Recent',
      type: 'Certificate',
      file: '/src/assets/certifications/MongoDB.pdf'
    }
  ];

  return (
    <section id="certifications" ref={ref} className="section" style={{ paddingBottom: '8rem' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="cert-list">
        {certs.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="interactive glass-panel glass-panel-hover"
            style={{
              padding: '1.5rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Sliding background hover effect */}
            <div className="slide-bg" style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(var(--neon-3-rgb, 124, 58, 237), 0.1), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.5s ease',
                zIndex: 0
            }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 1 }}>
              <div style={{ color: 'var(--neon-3)', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '50%' }} className="cert-icon">
                <Award size={24} />
              </div>
              <div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.125rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {cert.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            </div>

            <div style={{ color: 'var(--text-tertiary)', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="cert-action">
              <span style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>View {cert.type}</span>
              <FileText size={16} />
            </div>
            
          </motion.a>
        ))}
      </div>

      <style>{`
        .glass-panel-hover:hover .slide-bg {
            transform: translateX(100%);
        }
        .glass-panel-hover:hover .cert-icon {
            background: rgba(var(--neon-3-rgb, 124, 58, 237), 0.2) !important;
            transform: scale(1.1);
            transition: all 0.3s ease;
        }
        .glass-panel-hover:hover .cert-action {
            color: var(--neon-3) !important;
            transform: translateX(-5px);
            transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Certifications;
