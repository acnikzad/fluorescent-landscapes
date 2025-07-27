import React from 'react';
import '../styles/Header.css';
import logo from '../photos/F.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src={logo} alt="Fluorescent Landscapes" className="logo" />
          <h1 className="company-name">Fluorescent Landscapes</h1>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#gallery" className="nav-link">Gallery</a></li>
            <li><a href="#instagram" className="nav-link">Instagram</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 