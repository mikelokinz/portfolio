import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsGallery = ({ onInView }) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView, onInView]);

  const projects = [
    {
      id: 'movie-app',
      title: 'Cinematic Explorer',
      desc: 'A robust Movie Application featuring instant category filtering, dynamic routing, and embedded trailers.',
      tech: ['React', 'Vite', 'Tailwind CSS', 'TMDB API'],
      link: 'https://movie-sigma-bay.vercel.app/',
    },
    {
        id: 'samsung-clone',
        title: 'Samsung Platform Clone',
        desc: 'Pixel-perfect replication of the Samsung website. Features complex responsive navigation and modern UI/UX product showcases.',
        tech: ['React', 'Tailwind CSS', 'Vite'],
        link: 'https://samsung-clone-gules.vercel.app/',
    },
    {
        id: 'task-manager',
        title: 'Task Orchestrator',
        desc: 'Browser-based task management with priority filtering, instant search, and local data persistence.',
        tech: ['React', 'Tailwind', 'LocalStorage'],
        link: 'https://task-manager-opal-ten.vercel.app/',
    },
    {
        id: 'weather-app',
        title: 'Atmosphere Weather',
        desc: 'Auto-detecting meteorological dashboard leveraging OpenWeatherMap. Search any city globally.',
        tech: ['React', 'OpenWeatherMap API', 'Tailwind'],
        link: 'https://weather-omega-blue-93.vercel.app/',
    },
    {
        id: 'tripadvisor-clone',
        title: 'TripAdvisor Reimagined',
        desc: 'A pure CSS interactive clone demonstrating 100% responsive logic without JavaScript. Mobile-optimized.',
        tech: ['HTML5', 'Vanilla CSS', 'Responsive Layouts'],
        link: 'https://mikelokinz.github.io/Tripadvisor/html/loading.html',
    },
    {
        id: 'udemy-showcase',
        title: 'Course Showcase (Udemy)',
        desc: 'Zero-framework responsive grid and card reveal interactions inspired by Udemy course catalogs.',
        tech: ['HTML5', 'Vanilla CSS'],
        link: 'https://mikelokinz.github.io/udemy/html/page.html',
    },
    {
        id: 'lootish',
        title: 'Lootish E-Commerce',
        desc: 'A sleek e-commerce storefront dedicated to premium gaming products and accessories.',
        tech: ['Frontend Development'],
        link: 'https://mikelokinz.github.io/Lootish/',
    },
    {
        id: 'juego',
        title: 'Juego Web Store',
        desc: 'Interactive digital game storefront demonstrating varied layout techniques and visual hierarchy.',
        tech: ['Frontend Development'],
        link: 'https://mikelokinz.github.io/Juego/',
    }
  ];

  return (
    <section id="projects" ref={ref} className="section" style={{ paddingBottom: '8rem' }}>
      <div className="group/list" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {projects.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="interactive glass-panel glass-panel-hover group/item"
            style={{
              display: 'grid',
              gridTemplateColumns: 'revert',
              gap: '2rem',
              padding: '2rem',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              textDecoration: 'none'
            }}
          >
            {/* Preview Image Block */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.5rem', alignSelf: 'start', maxWidth: '300px' }} className="preview-container">
               <div style={{
                  position: 'absolute', inset: 0, 
                  background: 'var(--neon-2)', 
                  opacity: 0.2, mixBlendMode: 'overlay', 
                  transition: 'opacity 0.3s ease',
                  zIndex: 2
               }} className="img-overlay"></div>
               <img 
                 src={`/src/assets/projects/previews/${project.id}.png`}
                 alt={`${project.title} Preview`}
                 style={{ 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                    border: '1px solid var(--glass-border)'
                 }}
                 className="project-img"
                 onError={(e) => {
                     e.target.onerror = null; 
                     e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect fill="rgba(255,255,255,0.05)" width="300" height="200"/><text fill="rgba(255,255,255,0.3)" font-family="sans-serif" font-size="16" dy="10.5" font-weight="bold" x="50%" y="50%" text-anchor="middle">Preview Not Available</text></svg>';
                 }}
               />
            </div>

            {/* Content Block */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  fontSize: '1.25rem', 
                  color: 'var(--text-primary)', 
                  marginBottom: '1rem',
                  transition: 'color var(--transition-fast)'
              }} className="project-title">
                  {project.title}
                  <ExternalLink size={16} style={{ transition: 'transform 0.3s ease' }} className="arrow-icon" />
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {project.desc}
              </p>
              
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', marginTop: 'auto' }}>
                  {project.tech.map((tech, i) => (
                      <li key={i} style={{
                          background: 'rgba(var(--neon-2-rgb, 0, 255, 255), 0.1)',
                          color: 'var(--neon-2)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 500,
                      }}>
                          {tech}
                      </li>
                  ))}
              </ul>
            </div>
          </motion.a>
        ))}
      </div>

      <style>{`
        /* Group hover dimming effect */
        .group\\/list:hover .group\\/item:not(:hover) {
            opacity: 0.3;
            filter: blur(2px) grayscale(50%);
        }
        
        .group\\/item:hover .project-title {
            color: var(--neon-2) !important;
        }

        .group\\/item:hover .arrow-icon {
            transform: translate(4px, -4px);
        }

        .group\\/item:hover .img-overlay {
            opacity: 0 !important;
        }

        .group\\/item:hover .project-img {
            transform: scale(1.05);
        }

        @media (min-width: 768px) {
            .group\\/item { grid-template-columns: 1fr 2fr !important; }
        }
      `}</style>
    </section>
  );
};

export default ProjectsGallery;
