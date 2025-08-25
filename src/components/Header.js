import React, { useState } from 'react';
import '../styles/Header.css';
import logo from '../photos/Fluorecent Landscapes-Plant.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    console.log('Closing menu');
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    closeMenu(); // Close mobile menu after navigation
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src={logo} alt="Fluorescent Landscapes" className="logo" />
          <h1 className="company-name">Fluorescent Landscapes</h1>
        </div>
        
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Menu */}
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          {/* Close Button - Only show when mobile menu is open */}
          {isMenuOpen && (
            <button 
              className="nav-close-btn"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              ×
            </button>
          )}
          
          <ul className="nav-list">
            <li><a href="#home" className="nav-link" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#services" className="nav-link" onClick={() => scrollToSection('services')}>Services</a></li>
            <li><a href="#gallery" className="nav-link" onClick={() => scrollToSection('gallery')}>Gallery</a></li>
            <li><a href="#instagram" className="nav-link" onClick={() => scrollToSection('instagram')}>Instagram</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 