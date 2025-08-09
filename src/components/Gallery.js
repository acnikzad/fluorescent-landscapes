import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Gallery.css';
import galleryImage1 from '../photos/rs=w_1280,h_853.jpg';
import galleryImage2 from '../photos/rs=w_1280,h_960.jpg';
import galleryImage3 from '../photos/rs=w_1280,h_681.jpg';
import galleryImage4 from '../photos/rs=w_2560,h_1920.jpg';
import galleryImage5 from '../photos/rs=w_984,h_1749.jpg';
import galleryImage6 from '../photos/rs=w_2560,h_1482.jpg';
import galleryImage7 from '../photos/rs=w_2560,h_1920 (1).jpg';
import galleryImage8 from '../photos/rs=w_2560,h_1920 (2).jpg';
import galleryImage9 from '../photos/rs=w_2560,h_1920 (3).jpg';
import galleryImage10 from '../photos/rs=w_1280,h_1707.jpg';
import galleryImage11 from '../photos/rs=w_1280,h_1707 (1).jpg';
import galleryImage12 from '../photos/rs=w_2560,h_1482.jpg';
// New photos
import galleryImage13 from '../photos/499560136_122099237882884636_4546722423210478753_n.jpg';
import galleryImage14 from '../photos/499680481_122099635148884636_3296451225672780216_n.jpg';
import galleryImage15 from '../photos/499683779_122099237870884636_8692745569202705912_n.jpg';
import galleryImage16 from '../photos/500011031_122099635112884636_8924669894214385738_n.jpg';
import galleryImage17 from '../photos/501654925_17856218907439506_7083263241326756339_n.jpg';
import galleryImage18 from '../photos/502122012_17856218919439506_1215217046482179737_n.jpg';
import galleryImage19 from '../photos/502990063_17856739350439506_6305109944901829138_n.jpg';
import galleryImage20 from '../photos/505430994_17857931436439506_7807286689342193494_n.jpg';
import galleryImage21 from '../photos/rs=w_1160,h_870.jpg';
import galleryImage22 from '../photos/stairsFL.jpg';
import galleryImage23 from '../photos/Lighting1.jpg';
import galleryImage24 from '../photos/Lighting2.jpg';
import galleryImage25 from '../photos/Lighting3.jpg';
import galleryImage26 from '../photos/Lighting4.jpg';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    },
    {
      id: 7,
      image: galleryImage7,
      title: "Modern Garden Design",
      description: "Contemporary landscaping with clean lines and sustainable materials."
    },
    {
      id: 8,
      image: galleryImage8,
      title: "Outdoor Living Space",
      description: "Creating functional outdoor areas for entertainment and relaxation."
    },
    {
      id: 9,
      image: galleryImage9,
      title: "Seasonal Landscaping",
      description: "Year-round beauty with carefully selected plants and maintenance."
    },
    {
      id: 10,
      image: galleryImage10,
      title: "Commercial Landscaping",
      description: "Professional landscaping services for businesses and properties."
    },
    {
      id: 11,
      image: galleryImage11,
      title: "Residential Design",
      description: "Personalized landscape solutions for homeowners."
    },
    {
      id: 12,
      image: galleryImage12,
      title: "Sustainable Landscaping",
      description: "Eco-friendly designs that conserve resources and support local ecosystems."
    },
    {
      id: 13,
      image: galleryImage13,
      title: "Custom Patio Design",
      description: "Beautiful outdoor living spaces designed for your lifestyle."
    },
    {
      id: 14,
      image: galleryImage14,
      title: "Garden Transformation",
      description: "Complete garden makeover with new plants and landscaping features."
    },
    {
      id: 15,
      image: galleryImage15,
      title: "Landscape Maintenance",
      description: "Professional care to keep your landscape looking pristine year-round."
    },
    {
      id: 16,
      image: galleryImage16,
      title: "Outdoor Kitchen Design",
      description: "Functional outdoor cooking and entertainment spaces."
    },
    {
      id: 17,
      image: galleryImage17,
      title: "Pool & Landscape Integration",
      description: "Seamless integration of water features with surrounding landscape."
    },
    {
      id: 18,
      image: galleryImage18,
      title: "Modern Landscape Design",
      description: "Contemporary outdoor spaces with clean architectural lines."
    },
    {
      id: 19,
      image: galleryImage19,
      title: "Garden Renovation",
      description: "Complete garden transformation with new design elements."
    },
    {
      id: 20,
      image: galleryImage20,
      title: "Commercial Property Landscaping",
      description: "Professional landscaping for business properties and commercial spaces."
    },
    {
      id: 21,
      image: galleryImage21,
      title: "Custom Hardscaping",
      description: "Premium stone and concrete work for lasting beauty."
    },
    {
      id: 22,
      image: galleryImage22,
      title: "Staircase Landscaping",
      description: "Beautiful and functional landscape stairs for challenging terrain."
    },
    {
      id: 23,
      image: galleryImage23,
      title: "Landscape Lighting Design",
      description: "Professional lighting to showcase your landscape day and night."
    },
    {
      id: 24,
      image: galleryImage24,
      title: "Outdoor Lighting Installation",
      description: "Strategic lighting placement for safety and ambiance."
    },
    {
      id: 25,
      image: galleryImage25,
      title: "Garden Lighting",
      description: "Subtle lighting to highlight garden features and pathways."
    },
    {
      id: 26,
      image: galleryImage26,
      title: "Accent Lighting",
      description: "Focused lighting to create dramatic landscape effects."
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
    );
  }, [galleryItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
    );
  }, [galleryItems.length]);

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
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

  // Auto-rotation timer
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [prevSlide, nextSlide, toggleAutoPlay, closeModal]);

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Work</h2>
          <p className="section-subtitle">
            Explore our portfolio of completed landscaping projects
          </p>
        </div>
        
        <div className="gallery-showcase">
          {/* Main Display */}
          <div className="gallery-main">
            <div className="gallery-display" onClick={openModal}>
              <img 
                src={galleryItems[currentIndex].image} 
                alt={galleryItems[currentIndex].title} 
                className="gallery-main-image"
              />
              <div className="gallery-overlay">
                <div className="gallery-info">
                  <h3 className="gallery-title">{galleryItems[currentIndex].title}</h3>
                  <p className="gallery-description">{galleryItems[currentIndex].description}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              className="gallery-nav gallery-nav-prev" 
              onClick={prevSlide}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              className="gallery-nav gallery-nav-next" 
              onClick={nextSlide}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            {/* Auto-play Toggle */}
            <button 
              className="gallery-autoplay-toggle" 
              onClick={toggleAutoPlay}
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              )}
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="gallery-thumbnails">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${item.title}`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="thumbnail-image"
                />
                <div className="thumbnail-overlay">
                  <span className="thumbnail-title">{item.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full Size Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <img 
              src={galleryItems[currentIndex].image} 
              alt={galleryItems[currentIndex].title} 
              className="modal-image"
            />
            <div className="modal-info">
              <h3 className="modal-title">{galleryItems[currentIndex].title}</h3>
              <p className="modal-description">{galleryItems[currentIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery; 