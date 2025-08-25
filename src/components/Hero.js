import React from 'react';
import '../styles/Hero.css';
import heroImage from '../photos/rs=w_2560,h_1482.jpg';
import flLogo from '../photos/Fluorecent Landscapes-FL.png';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <img 
          src={heroImage} 
          alt="Beautiful landscape design" 
          className="hero-image"
        />
      </div>
      
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <div className="hero-brand-section">
          <div className="hero-logo-container">
            <img 
              src={flLogo} 
              alt="Fluorescent Landscapes Logo" 
              className="hero-logo-image"
            />
          </div>
          
          <div className="hero-brand">
            <h1 className="hero-company-name">Fluorescent Landscapes</h1>
            <div className="hero-divider"></div>
            <p className="hero-tagline">Professional landscaping design & installationn</p>
          </div>
        </div>
        
        <div className="hero-cta">
          <button 
            className="btn btn-primary"
            onClick={() => scrollToSection('contact')}
          >
            Get Free Quote
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => scrollToSection('gallery')}
          >
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 