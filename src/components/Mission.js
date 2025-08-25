import React from 'react';
import '../styles/Mission.css';

const Mission = () => {
  return (
    <section id="mission" className="mission">
      <div className="container">
        <div className="mission-content">
          <div className="mission-text">
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-statement">
              At Fluorescent Landscapes, our mission is to transform outdoor spaces through bold hardscapes, 
              artistic decorative concrete, and breathtaking landscapes. We are driven by creativity, craftsmanship, 
              and a passion for designing environments that are as functional as they are unforgettable.
            </p>
            <p className="mission-statement">
              With every project, we aim to elevate the ordinary into the extraordinary—bringing color, structure, 
              and life to the spaces our clients cherish most.
            </p>
          </div>
          <div className="mission-portrait">
            <div className="portrait-placeholder">
              <div className="portrait-icon">👤</div>
              <p className="portrait-text">Portrait Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
