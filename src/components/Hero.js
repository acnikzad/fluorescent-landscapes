import React from 'react';
import '../styles/Hero.css';
import heroImage from '../photos/rs=w_2560,h_1920.jpg';
import heroVideo from '../photos/natomas p.mov';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline
          poster={heroImage}
        >
          <source src={heroVideo} type="video/quicktime" />
          <source src={heroVideo.replace('.mov', '.mp4')} type="video/mp4" />
          <source src={heroVideo.replace('.mov', '.webm')} type="video/webm" />
        </video>
        <div className="hero-fallback">
          <img src={heroImage} alt="Beautiful landscape design" />
        </div>
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
          <button className="btn btn-primary">Get Free Quote</button>
          <button className="btn btn-secondary">View Our Work</button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 