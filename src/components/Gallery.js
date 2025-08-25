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
    { id: 1, image: galleryImage1 },
    { id: 2, image: galleryImage2 },
    { id: 3, image: galleryImage3 },
    { id: 4, image: galleryImage4 },
    { id: 5, image: galleryImage5 },
    { id: 6, image: galleryImage6 },
    { id: 7, image: galleryImage7 },
    { id: 8, image: galleryImage8 },
    { id: 9, image: galleryImage9 },
    { id: 10, image: galleryImage10 },
    { id: 11, image: galleryImage11 },
    { id: 12, image: galleryImage12 },
    { id: 13, image: galleryImage13 },
    { id: 14, image: galleryImage14 },
    { id: 15, image: galleryImage15 },
    { id: 16, image: galleryImage16 },
    { id: 17, image: galleryImage17 },
    { id: 18, image: galleryImage18 },
    { id: 19, image: galleryImage19 },
    { id: 20, image: galleryImage20 },
    { id: 21, image: galleryImage21 },
    { id: 22, image: galleryImage22 },
    { id: 23, image: galleryImage23 },
    { id: 24, image: galleryImage24 },
    { id: 25, image: galleryImage25 },
    { id: 26, image: galleryImage26 }
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

  const goToSlide = useCallback((index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  }, [currentIndex]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying);
  }, [isAutoPlaying]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const handleModalClick = useCallback((e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  }, [closeModal]);

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
                alt="Gallery image" 
                className="gallery-main-image"
              />
            </div>

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
          <div className="gallery-thumbnails-container">
            <button 
              className="thumbnail-nav thumbnail-nav-prev" 
              onClick={() => {
                const container = document.querySelector('.gallery-thumbnails');
                container.scrollBy({ left: -200, behavior: 'smooth' });
              }}
              aria-label="Scroll thumbnails left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="gallery-thumbnails">
              {galleryItems.map((item, index) => (
                <button
                  key={item.id}
                  className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <img 
                    src={item.image} 
                    alt="Gallery thumbnail" 
                    className="thumbnail-image"
                  />
                </button>
              ))}
            </div>
            
            <button 
              className="thumbnail-nav thumbnail-nav-next" 
              onClick={() => {
                const container = document.querySelector('.gallery-thumbnails');
                container.scrollBy({ left: 200, behavior: 'smooth' });
              }}
              aria-label="Scroll thumbnails right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
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
              alt="Gallery image" 
              className="modal-image"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery; 