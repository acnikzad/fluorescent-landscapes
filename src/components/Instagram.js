import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Instagram.css';

const Instagram = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInstagramPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Instagram Basic Display API
      const ACCESS_TOKEN = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;
      
      if (!ACCESS_TOKEN) {
        throw new Error('Instagram access token not configured');
      }

      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${ACCESS_TOKEN}&limit=6`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Instagram posts');
      }

      const data = await response.json();
      setPosts(data.data || []);
    } catch (err) {
      console.error('Instagram API error:', err);
      setError('Unable to load Instagram posts');
      
      // Fallback to placeholder posts
      setPosts([
        {
          id: '1',
          media_url: 'https://via.placeholder.com/300x300/4a7c59/ffffff?text=Landscape+Design',
          caption: 'Beautiful landscape design project completed! 🌿 #landscaping #design',
          permalink: '#'
        },
        {
          id: '2',
          media_url: 'https://via.placeholder.com/300x300/2d5016/ffffff?text=Garden+Installation',
          caption: 'New garden installation in progress! 🌱 #garden #installation',
          permalink: '#'
        },
        {
          id: '3',
          media_url: 'https://via.placeholder.com/300x300/4a7c59/ffffff?text=Patio+Design',
          caption: 'Custom patio design with premium materials! 🏡 #patio #design',
          permalink: '#'
        },
        {
          id: '4',
          media_url: 'https://via.placeholder.com/300x300/2d5016/ffffff?text=Water+Features',
          caption: 'Elegant water feature installation! 💧 #waterfeature #landscaping',
          permalink: '#'
        },
        {
          id: '5',
          media_url: 'https://via.placeholder.com/300x300/4a7c59/ffffff?text=Outdoor+Lighting',
          caption: 'Professional outdoor lighting setup! ✨ #lighting #outdoor',
          permalink: '#'
        },
        {
          id: '6',
          media_url: 'https://via.placeholder.com/300x300/2d5016/ffffff?text=Maintenance',
          caption: 'Regular maintenance keeps your landscape beautiful! 🌿 #maintenance #care',
          permalink: '#'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstagramPosts();
    
    // Refresh posts every 12 hours
    const interval = setInterval(fetchInstagramPosts, 12 * 60 * 60 * 1000);
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