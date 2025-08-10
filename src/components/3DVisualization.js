import React, { useState } from 'react';
import '../styles/3DVisualization.css';
import render3D1 from '../photos/3D1.jpg';
import render3D2 from '../photos/3D2.jpg';
import render3D3 from '../photos/3D3.jpg';
import render3D4 from '../photos/3D4.jpg';
import render3D5 from '../photos/3D5.jpg';
import render3D6 from '../photos/3D6.jpg';
import threeDRenderVideo from '../photos/3Drender.mp4';

const ThreeDVisualization = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const render3DItems = [
    {
      id: '3d-1',
      image: render3D1,
    },
    {
      id: '3d-2',
      image: render3D2,
    },
    {
      id: '3d-3',
      image: render3D3,
    },
    {
      id: '3d-4',
      image: render3D4,
    },
    {
      id: '3d-5',
      image: render3D5,
    },
    {
      id: '3d-6',
      image: render3D6,
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === render3DItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? render3DItems.length - 1 : prevIndex - 1
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <section id="3d-visualization" className="three-d-section">
      <div className="container">
        <div className="content-wrapper">
          <div className="text-content">
            <h2 className="section-title three-d-section-title" style={{ color: '#d6d2c0' }}>3D Design Visualization</h2>
            <p className="main-description">
              Experience the future of landscape design with our cutting-edge 3D rendering technology. 
              No more guesswork or surprises - see exactly how your finished landscape will look before 
              we even break ground.
            </p>
            
            <div className="benefits-section">
              <h3 className="benefits-title">Our advanced 3D visualization tools allow you to:</h3>
              <ul className="benefits-list">
                <li>Preview your complete landscape design in photorealistic detail</li>
                <li>Make informed decisions about materials, colors, and layouts</li>
                <li>Visualize seasonal changes and plant growth over time</li>
                <li>Ensure perfect integration with your home's architecture</li>
                <li>Collaborate with our designers in real-time</li>
              </ul>
            </div>
            
            <p className="cta-text">
              Transform your outdoor space with confidence. Schedule a consultation to see your 
              landscape vision come to life in stunning 3D detail.
            </p>
          </div>
          
          <div className="media-content">
            {/* 3D Render Video Showcase */}
            <div className="video-showcase">
              <h3 className="video-title">See Our 3D Process in Action</h3>
              <div className="video-container">
                <video 
                  className="three-d-video"
                  controls
                  preload="metadata"
                  poster={render3D1}
                  aria-label="3D Design Visualization Process"
                >
                  <source src={threeDRenderVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* 3D Render Gallery */}
            <div className="render-gallery">
              <div className="render-thumbnails">
                {render3DItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="render-thumbnail"
                    onClick={() => {
                      setCurrentIndex(index);
                      openModal();
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={`3D Render ${index + 1}`}
                      className="thumbnail-img"
                    />
                    <div className="thumbnail-overlay">
                      <span className="view-text">Click to View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <img 
              src={render3DItems[currentIndex].image} 
              alt={render3DItems[currentIndex].title} 
              className="modal-image"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ThreeDVisualization;
