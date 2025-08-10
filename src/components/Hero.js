import React from 'react';
import '../styles/Hero.css';
import heroImage from '../photos/rs=w_2560,h_1482.jpg';

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
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-brand">Fluorescent Landscapes</span>
            <span className="hero-tagline">Transform Your Outdoor Space</span>
          </h1>
          <p className="hero-subtitle">
            Professional landscaping design & installation
          </p>
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