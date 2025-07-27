import React, { useState, useEffect } from 'react';
import '../styles/Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Mock weather data for demo
    const mockWeatherData = {
      location: 'Sacramento, CA',
      temperature: 72,
      condition: 'Sunny',
      humidity: 45,
      windSpeed: 8,
      icon: '☀️'
    };

    // Simulate API call
    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setLoading(false);
    }, 1000);
  }, []);

  const getSeasonalTip = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 5) return 'Spring is perfect for planting new shrubs and flowers!';
    if (month >= 6 && month <= 8) return 'Summer heat? Consider drought-resistant plants.';
    if (month >= 9 && month <= 11) return 'Fall is ideal for tree planting and lawn care.';
    return 'Winter is great for planning next year\'s landscape!';
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  if (loading) {
    return (
      <div className="weather-widget">
        <button className="weather-close-btn" onClick={handleClose}>×</button>
        <div className="weather-loading">
          <div className="weather-spinner"></div>
          <p>Loading weather...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget">
        <button className="weather-close-btn" onClick={handleClose}>×</button>
        <div className="weather-error">
          <p>Weather data unavailable</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <button className="weather-close-btn" onClick={handleClose}>×</button>
      
      <div className="weather-header">
        <h3>Local Weather</h3>
        <span className="weather-location">{weatherData.location}</span>
      </div>
      
      <div className="weather-main">
        <div className="weather-icon">{weatherData.icon}</div>
        <div className="weather-temp">{weatherData.temperature}°F</div>
        <div className="weather-condition">{weatherData.condition}</div>
      </div>
      
      <div className="weather-details">
        <div className="weather-detail">
          <span>Humidity:</span>
          <span>{weatherData.humidity}%</span>
        </div>
        <div className="weather-detail">
          <span>Wind:</span>
          <span>{weatherData.windSpeed} mph</span>
        </div>
      </div>
      
      <div className="weather-tip">
        <h4>Landscaping Tip</h4>
        <p>{getSeasonalTip()}</p>
      </div>
      
    </div>
  );
};

export default Weather; 