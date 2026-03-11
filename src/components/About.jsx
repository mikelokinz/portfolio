import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = ({ onInView }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView, onInView]);

  return (
    <section id="about" ref={ref} className="section" style={{ paddingBottom: '8rem' }}>
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: '-50px' }}
         transition={{ duration: 0.5 }}
      >
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
          <p>
            Back in 2024, I began my journey into the depths of code and design. Since then, I've had the privilege of building everything from <strong style={{ color: 'var(--text-primary)' }}>Full Stack AI applications</strong> to <strong style={{ color: 'var(--text-primary)' }}>high-performance frontend clones.</strong> My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
          </p>
          <p>
            When I'm not pushing pixels or wrangling React state, you can usually find me deep in Adobe After Effects crafting motion graphics, or experimenting with new UI patterns. I enjoy the challenge of taking a complex problem and turning it into a beautiful, intuitive interface.
          </p>
          <p>
            I'm currently a student pursuing my <strong style={{ color: 'var(--accent-primary)' }}>B.E. in Computer Science and Engineering</strong> at St. Joseph's College of Engineering.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
