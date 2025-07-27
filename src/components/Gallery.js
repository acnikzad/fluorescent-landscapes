import React, { useState } from 'react';
import '../styles/Gallery.css';
import galleryImage1 from '../photos/rs=w_1280,h_853.jpg';
import galleryImage2 from '../photos/rs=w_1280,h_960.jpg';
import galleryImage3 from '../photos/rs=w_1280,h_681.jpg';
import galleryImage4 from '../photos/rs=w_2560,h_1920.jpg';
import galleryImage5 from '../photos/rs=w_984,h_1749.jpg';
import galleryImage6 from '../photos/rs=w_2560,h_1482.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      image: galleryImage1,
      title: "Landscape Design Project",
      description: "Complete backyard transformation with custom patio and water features."
    },
    {
      id: 2,
      image: galleryImage2,
      title: "Patio Installation",
      description: "Professional hardscaping with premium materials and attention to detail."
    },
    {
      id: 3,
      image: galleryImage3,
      title: "Garden Maintenance",
      description: "Ongoing care and maintenance to keep landscapes looking their best."
    },
    {
      id: 4,
      image: galleryImage4,
      title: "Water Feature Design",
      description: "Custom water features that create peaceful outdoor environments."
    },
    {
      id: 5,
      image: galleryImage5,
      title: "Retaining Wall Construction",
      description: "Structural solutions for challenging terrain and erosion control."
    },
    {
      id: 6,
      image: galleryImage6,
      title: "Complete Landscape Overhaul",
      description: "Full property transformation from concept to completion."
    }
  ];

  const openModal = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Work</h2>
          <p className="section-subtitle">
            Explore our portfolio of completed landscaping projects
          </p>
        </div>
        
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-image-container">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="gallery-image"
                  loading="lazy"
                />
              </div>
              <div className="gallery-content">
                <h3 className="gallery-title">{item.title}</h3>
                <p className="gallery-description">{item.description}</p>
                <button 
                  className="gallery-btn"
                  onClick={() => openModal(item)}
                >
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="gallery-cta">
          <button className="btn btn-primary">View Full Portfolio</button>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="modal-image"
            />
            <div className="modal-info">
              <h3 className="modal-title">{selectedImage.title}</h3>
              <p className="modal-description">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery; 