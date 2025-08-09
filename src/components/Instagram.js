import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Instagram.css';
import { INSTAGRAM_CONFIG, getInstagramAccessToken, isInstagramConfigured } from '../config/instagram';

const Instagram = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInstagramPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if Instagram is configured
      if (!isInstagramConfigured()) {
        throw new Error('Instagram access token not configured');
      }

      // Instagram Basic Display API
      const ACCESS_TOKEN = getInstagramAccessToken();
      
      const response = await fetch(
        `${INSTAGRAM_CONFIG.API_BASE_URL}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${ACCESS_TOKEN}&limit=${INSTAGRAM_CONFIG.POSTS_LIMIT}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Instagram posts');
      }

      const data = await response.json();
      setPosts(data.data || []);
    } catch (err) {
      console.error('Instagram API error:', err);
      setError('Unable to load Instagram posts');
      
      // Use fallback posts from config
      setPosts(INSTAGRAM_CONFIG.FALLBACK_POSTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstagramPosts();
    
    // Refresh posts based on config interval
    const interval = setInterval(fetchInstagramPosts, INSTAGRAM_CONFIG.REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchInstagramPosts]);

  if (loading) {
    return (
      <section id="instagram" className="instagram">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Follow Our Work</h2>
            <p className="section-subtitle">
              See our latest landscaping projects and transformations on Instagram
            </p>
          </div>
          <div className="instagram-loading">
            Loading Instagram posts...
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
            See our latest landscaping projects and transformations on Instagram
          </p>
        </div>
        
        {error && (
          <div className="instagram-error">
            {error} - Showing sample posts
          </div>
        )}
        
        {/* Professional Instagram Grid */}
        <div className="instagram-grid">
          {posts.map((post) => (
            <div key={post.id} className="instagram-post">
              <div className="post-image-container">
                <img 
                  src={post.media_url} 
                  alt={post.caption} 
                  className="post-image"
                  loading="lazy"
                />
                <div className="post-overlay">
                  <div className="post-stats">
                    <span className="stat">❤️ 0</span>
                    <span className="stat">💬 0</span>
                  </div>
                </div>
              </div>
              <div className="post-content">
                <p className="post-caption">{post.caption}</p>
                <a 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="post-link"
                >
                  View on Instagram →
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="instagram-cta">
          <a 
            href="https://instagram.com/fluorescentlandscapes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Instagram; 