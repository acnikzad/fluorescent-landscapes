import React from 'react';
import '../styles/Footer.css';
import logo from '../photos/Fluorecent Landscapes-Plant.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logo} alt="Fluorescent Landscapes" className="footer-logo-img" />
              <h3 className="footer-company-name">Fluorescent Landscapes</h3>
            </div>
            <p className="footer-description">
              Creating beautiful outdoor spaces that enhance your lifestyle and increase your property value.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Landscape Design</a></li>
              <li><a href="#services">Installation</a></li>
              <li><a href="#services">Maintenance</a></li>
              <li><a href="#services">Hardscaping</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Contact Info</h4>
            <div className="footer-contact">
              <p>(555) 123-4567</p>
              <p>info@fluorescentlandscapes.com</p>
              <p>123 Garden Street<br />Landscape City, LC 12345</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 Fluorescent Landscapes. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 