import React, { useState, useEffect } from 'react';
import '../styles/Instagram.css';

const Instagram = () => {
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Instagram API Configuration
  const INSTAGRAM_ACCESS_TOKEN = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;
  const INSTAGRAM_USER_ID = process.env.REACT_APP_INSTAGRAM_USER_ID;

  const fetchInstagramPosts = async () => {
    try {
      setIsLoading(true);
      
      // Instagram Basic Display API endpoint
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=6`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch Instagram posts');
      }
      
      const data = await response.json();
      
      // Transform Instagram data to our format
      const posts = data.data.map(post => ({
        id: post.id,
        image: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
        caption: post.caption ? post.caption.split('\n')[0] : 'Check out our latest work! 🌿',
        likes: 0, // Instagram API doesn't provide likes count in Basic Display
        comments: 0, // Instagram API doesn't provide comments count in Basic Display
        link: post.permalink,
        timestamp: post.timestamp
      }));
      
      setInstagramPosts(posts);
      setError(null);
    } catch (err) {
      console.error('Error fetching Instagram posts:', err);
      setError('Unable to load Instagram posts');
      // Fallback to placeholder posts
      setInstagramPosts([
        {
          id: 'fallback1',
          image: 'https://via.placeholder.com/300x300/2d5016/ffffff?text=Instagram+Post+1',
          caption: 'Beautiful landscape transformation in progress! 🌿✨',
          likes: 42,
          comments: 8,
          link: 'https://instagram.com/fluorescentlandscapes'
        },
        {
          id: 'fallback2',
          image: 'https://via.placeholder.com/300x300/4a7c59/ffffff?text=Instagram+Post+2',
          caption: 'Before and after - this garden makeover is stunning! 🌱',
          likes: 67,
          comments: 12,
          link: 'https://instagram.com/fluorescentlandscapes'
        },
        {
          id: 'fallback3',
          image: 'https://via.placeholder.com/300x300/2d5016/ffffff?text=Instagram+Post+3',
          caption: 'New patio installation complete! Perfect for outdoor entertaining 🏡',
          likes: 89,
          comments: 15,
          link: 'https://instagram.com/fluorescentlandscapes'
        },
        {
          id: 'fallback4',
          image: 'https://via.placeholder.com/300x300/4a7c59/ffffff?text=Instagram+Post+4',
          caption: 'Spring maintenance in full swing! 🌸',
          likes: 34,
          comments: 6,
          link: 'https://instagram.com/fluorescentlandscapes'
        },
        {
          id: 'fallback5',
          image: 'https://via.placeholder.com/300x300/2d5016/ffffff?text=Instagram+Post+5',
          caption: 'Custom water feature installation - the sound is so relaxing! 💧',
          likes: 156,
          comments: 23,
          link: 'https://instagram.com/fluorescentlandscapes'
        },
        {
          id: 'fallback6',
          image: 'https://via.placeholder.com/300x300/4a7c59/ffffff?text=Instagram+Post+6',
          caption: 'Hardscaping project complete! Stone work that lasts generations 🏗️',
          likes: 78,
          comments: 11,
          link: 'https://instagram.com/fluorescentlandscapes'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramPosts();
    
    // Refresh posts every 12 hours
    const interval = setInterval(fetchInstagramPosts, 12 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
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
          {instagramPosts.map((post) => (
            <div key={post.id} className="instagram-post">
              <div className="post-image-container">
                <img 
                  src={post.image} 
                  alt={post.caption} 
                  className="post-image"
                  loading="lazy"
                />
                <div className="post-overlay">
                  <div className="post-stats">
                    <span className="stat">❤️ {post.likes}</span>
                    <span className="stat">💬 {post.comments}</span>
                  </div>
                </div>
              </div>
              <div className="post-content">
                <p className="post-caption">{post.caption}</p>
                <a 
                  href={post.link} 
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