import React, { useState } from 'react';
import '../styles/VideoShowcase.css';
import showcaseVideo from '../photos/natomas p.mov';
import showcaseImage from '../photos/rs=w_2560,h_1920.jpg';

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    setVideoError(false);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsPlaying(false);
  };

  return (
    <section id="video-showcase" className="video-showcase">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">See Our Design Process</h2>
          <p className="section-subtitle">
            Watch how we transform your vision into a stunning 3D reality
          </p>
        </div>
        
        <div className="video-container">
          <div className="video-wrapper">
            {!isPlaying ? (
              <div className="video-poster" onClick={handlePlayVideo}>
                <img 
                  src={showcaseImage} 
                  alt="3D Landscape Design Preview" 
                  className="poster-image"
                />
                <div className="play-button">
                  <div className="play-icon">▶</div>
                  <span className="play-text">Watch 3D Design</span>
                </div>
              </div>
            ) : (
              <video 
                className="showcase-video"
                controls
                autoPlay
                onEnded={handleVideoEnd}
                onPause={() => setIsPlaying(false)}
                onError={handleVideoError}
                preload="metadata"
              >
                <source src={showcaseVideo} type="video/quicktime" />
                <source src={showcaseVideo} type="video/mp4" />
                <source src={showcaseVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            )}
            
            {videoError && (
              <div className="video-error">
                <p>Video format not supported in your browser.</p>
                <p>Please contact us to view the 3D design process.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.href = 'mailto:info@fluorescentlandscapes.com'}
                >
                  Contact Us
                </button>
              </div>
            )}
          </div>
          
          <div className="video-info">
            <h3 className="video-title">Natomas Project - 3D Design Process</h3>
            <p className="video-description">
              See how we use advanced 3D rendering technology to plan and visualize 
              your landscape design before construction begins. This comprehensive 
              approach ensures every detail is perfect for your outdoor space.
            </p>
            <div className="video-features">
              <div className="feature">
                <span className="feature-icon">🎨</span>
                <span>Custom 3D Design</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🏗️</span>
                <span>Detailed Planning</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✨</span>
                <span>Visual Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase; 