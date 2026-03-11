import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Video } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code size={40} />,
      title: 'Web Development',
      desc: 'Building responsive, fast, and scalable web applications using the latest technologies like Next.js and React.',
    },
    {
      icon: <Smartphone size={40} />,
      title: 'Mobile Dev',
      desc: 'Exploring cross-platform mobile application development using Flutter to bring ideas to handheld devices.',
    },
    {
      icon: <Video size={40} />,
      title: 'Video Editing',
      desc: 'Creating engaging visual content and motion graphics using Adobe After Effects and Capcut.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="container section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}
      >
        <span style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', marginRight: '1rem', fontFamily: 'var(--font-mono)' }}>02.</span>
        What I Do
        <div style={{ content: '""', display: 'block', height: '1px', flex: 1, maxWidth: '300px', background: 'var(--border-color)', marginLeft: '1.25rem' }}></div>
      </motion.h2>

      <motion.div
        className="services-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="interactive"
            style={{
              background: 'var(--bg-secondary)',
              padding: '2.5rem 2rem',
              borderRadius: '1rem',
              border: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'none'
            }}
          >
            <div
              style={{
                color: 'var(--accent-primary)',
                marginBottom: '1.5rem',
                display: 'inline-block',
              }}
            >
              {service.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              {service.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {service.desc}
            </p>
            {/* Hover effect gradient */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />
             <div style={{ position: 'relative', zIndex: 1 }}>
                
             </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
