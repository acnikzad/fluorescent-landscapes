import React, { useState, useEffect } from 'react';
import '../styles/Instagram.css';

const Instagram = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const INSTAGRAM_APP_ID = process.env.REACT_APP_INSTAGRAM_APP_ID;
  const INSTAGRAM_APP_SECRET = process.env.REACT_APP_INSTAGRAM_APP_SECRET;
  const INSTAGRAM_ACCESS_TOKEN = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const INSTAGRAM_USER_ID = process.env.REACT_APP_INSTAGRAM_USER_ID;

      if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
        throw new Error('Instagram credentials not found. Please check your .env file.');
      }

      const apiUrl = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=3`;

      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          const formattedPosts = data.data.map((post) => {
            const imageUrl = post.media_type === 'VIDEO' 
              ? (post.thumbnail_url || post.media_url) 
              : post.media_url;
            
            return {
              id: post.id,
              caption: post.caption || 'Check out our latest work!',
              media_url: imageUrl,
              video_url: post.media_type === 'VIDEO' ? post.media_url : null,
              media_type: post.media_type || 'IMAGE',
              permalink: post.permalink,
              thumbnail_url: post.thumbnail_url || post.media_url,
              is_video: post.media_type === 'VIDEO'
            };
          });
          setPosts(formattedPosts);
          setError(null);
          return;
        } else {
          throw new Error('No posts found in Instagram response');
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Instagram API failed: ${response.status} - ${errorText}`);
      }
      
    } catch (err) {
      setError(`Unable to fetch Instagram posts: ${err.message}`);
      setPosts([
        {
          id: 'error1',
          caption: 'Unable to load Instagram posts. Please visit our Instagram directly!',
          media_url: 'https://via.placeholder.com/400x400/008080/ffffff?text=Instagram+Unavailable',
          media_type: 'IMAGE',
          permalink: `https://www.instagram.com/fluorescentlandscapes/`
        },
        {
          id: 'error2',
          caption: 'Check out our latest work on Instagram!',
          media_url: 'https://via.placeholder.com/400x400/008080/ffffff?text=Visit+Instagram',
          media_type: 'IMAGE',
          permalink: `https://www.instagram.com/fluorescentlandscapes/`
        },
        {
          id: 'error3',
          caption: 'Follow us for daily updates!',
          media_url: 'https://via.placeholder.com/400x400/008080/ffffff?text=Follow+Us',
          media_type: 'IMAGE',
          permalink: `https://www.instagram.com/fluorescentlandscapes/`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatCaption = (caption) => {
    if (!caption) return 'Check out our latest work!';
    
    if (caption.length > 100) {
      return caption.substring(0, 100) + '...';
    }
    return caption;
  };

  const handlePostClick = (post, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (post.is_video && post.video_url) {
      setSelectedVideo(post);
    } else {
      window.open(post.permalink, '_blank');
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedVideo) {
        closeVideoModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedVideo]);

  if (loading) {
    return (
      <section id="instagram" className="instagram">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Follow Our Work</h2>
            <p className="section-subtitle">
              Stay updated with our latest projects and behind-the-scenes content on Instagram.
            </p>
          </div>
          
          <div className="instagram-loading">
            <div className="loading-spinner"></div>
            <p>Loading Instagram posts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="instagram" className="instagram">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Follow Our Work</h2>
          <p className="section-subtitle">
            Stay updated with our latest projects! We keep it fun and interesting.
          </p>
        </div>
        <div className="instagram-showcase">
          <div className="instagram-posts">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className="instagram-post"
                onClick={(e) => handlePostClick(post, e)}
                style={{ cursor: 'pointer' }}
              >
                <div className="post-image-container">
                  <img 
                    src={post.media_url} 
                    alt={formatCaption(post.caption)}
                    className="post-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {post.is_video && (
                    <div className="video-indicator">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polygon points="10 8 16 12 10 16" fill="white"/>
                      </svg>
                    </div>
                  )}
                  <div className="post-overlay">
                    {post.is_video ? (
                      <div className="instagram-link">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polygon points="10 8 16 12 10 16" fill="white"/>
                        </svg>
                        <span>Play Video</span>
                      </div>
                    ) : (
                      <a 
                        href={post.permalink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="instagram-link"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View post on Instagram: ${formatCaption(post.caption)}`}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div className="post-caption">
                  <p>{formatCaption(post.caption)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="instagram-cta">
            <div className="cta-content">
              <div className="cta-logo">
                <img 
                  src={require('../photos/Fluorecent Landscapes-Plant.png')} 
                  alt="Fluorescent Landscapes Logo"
                  className="cta-logo-image"
                />
              </div>
              <h3>Follow Us for More</h3>
              <p>Get daily inspiration and see our latest projects as they happen!</p>
              <a 
                href="https://www.instagram.com/fluorescentlandscapes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Follow @fluorescentlandscapes
              </a>
            </div>
          </div>
        </div>

        {error && (
          <div className="instagram-error">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeVideoModal} aria-label="Close video">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="video-modal-video">
              <video 
                src={selectedVideo.video_url} 
                controls 
                autoPlay
                className="video-player"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="video-modal-info">
              <p className="video-modal-caption">{selectedVideo.caption}</p>
              <a 
                href={selectedVideo.permalink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="video-modal-link"
              >
                View on Instagram →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Instagram;