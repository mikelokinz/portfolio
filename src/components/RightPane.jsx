import React from 'react';
import About from './About';
import ProjectsGallery from './ProjectsGallery'; 
import Certifications from './Certifications';

const RightPane = ({ setActiveSection }) => {
  return (
    <main className="right-pane" style={{
      width: '100%',
      paddingBottom: '6rem',
    }}>
      <About onInView={() => setActiveSection('about')} />
      <ProjectsGallery onInView={() => setActiveSection('projects')} />
      <Certifications onInView={() => setActiveSection('certifications')} />

      <style>{`
        @media (min-width: 1024px) {
          .right-pane {
            width: 60%;
            padding: 6rem 0 6rem 4rem;
          }
        }
      `}</style>
    </main>
  );
};

export default RightPane;
