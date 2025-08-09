// Instagram API Configuration
// To use this component, you'll need to:
// 1. Create a Facebook Developer account
// 2. Set up an Instagram Basic Display app
// 3. Get an access token
// 4. Add REACT_APP_INSTAGRAM_ACCESS_TOKEN to your .env file

export const INSTAGRAM_CONFIG = {
  // Instagram Basic Display API endpoint
  API_BASE_URL: 'https://graph.instagram.com',
  
  // Default number of posts to fetch
  POSTS_LIMIT: 6,
  
  // Refresh interval in milliseconds (12 hours)
  REFRESH_INTERVAL: 12 * 60 * 60 * 1000,
  
  // Fallback posts when API is unavailable
  FALLBACK_POSTS: [
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
  ]
};

// Helper function to get Instagram access token
export const getInstagramAccessToken = () => {
  return process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;
};

// Helper function to check if Instagram is configured
export const isInstagramConfigured = () => {
  return !!getInstagramAccessToken();
};
