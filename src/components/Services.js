import React, { useState } from 'react';
import '../styles/Services.css';
import designImage from '../photos/rs=w_1280,h_853.jpg';
import installationImage from '../photos/rs=w_1280,h_960.jpg';
import maintenanceImage from '../photos/rs=w_1280,h_681.jpg';

const Services = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const handleCardFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const services = [
    {
      id: 'design',
      title: 'Landscape Design',
      description: 'Custom landscape designs tailored to your property and lifestyle. We create beautiful, functional outdoor spaces that enhance your home\'s value and curb appeal.',
      image: designImage,
      backTitle: 'Design Services',
      backDescription: 'Our comprehensive design process ensures every detail is perfect for your space.',
      features: [
        'Custom 3D landscape designs',
        'Plant selection & placement',
        'Hardscape planning',
        'Lighting design',
        'Water feature integration',
        'Seasonal color planning'
      ],
      backButtonText: 'Get Design Quote'
    },
    {
      id: 'installation',
      title: 'Installation & Construction',
      description: 'Professional installation of patios, walkways, retaining walls, and complete landscape systems. Quality craftsmanship that lasts for years.',
      image: installationImage,
      backTitle: 'Construction Services',
      backDescription: 'Expert installation with premium materials and attention to detail.',
      features: [
        'Patio & walkway installation',
        'Retaining wall construction',
        'Irrigation system setup',
        'Outdoor lighting installation',
        'Water feature construction',
        'Garden bed preparation'
      ],
      backButtonText: 'Get Construction Quote'
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Care',
      description: 'Ongoing maintenance services to keep your landscape looking its best year-round. From seasonal cleanups to regular care programs.',
      image: maintenanceImage,
      backTitle: 'Maintenance Services',
      backDescription: 'Keep your landscape beautiful with our comprehensive maintenance programs.',
      features: [
        'Lawn mowing & edging',
        'Plant pruning & trimming',
        'Fertilization programs',
        'Pest & disease control',
        'Seasonal cleanup',
        'Irrigation maintenance'
      ],
      backButtonText: 'Get Maintenance Quote'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive landscaping solutions for residential and commercial properties
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`service-card ${flippedCards[service.id] ? 'flipped' : ''}`}
              onClick={() => handleCardFlip(service.id)}
            >
              <div className="service-card-inner">
                {/* Front of card */}
                <div className="service-card-front">
                  <div className="service-image-container">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="service-image"
                    />
                    {/* <div className="service-icon">{service.icon}</div> */}
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                    <button className="service-btn">Learn More</button>
                  </div>
                </div>
                
                {/* Back of card */}
                <div className="service-card-back">
                  <h3 className="service-back-title">{service.backTitle}</h3>
                  <p className="service-back-description">{service.backDescription}</p>
                  <ul className="service-features">
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <button className="service-back-btn">{service.backButtonText}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 