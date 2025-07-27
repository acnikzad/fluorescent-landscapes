import React, { useState, useEffect } from 'react';
import '../styles/Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Hardcoded Sacramento coordinates
        const latitude = 38.5816;
        const longitude = -121.4944;

        // OpenWeatherMap API call
        const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Weather API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        // Get location name
        const locationResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
        );
        
        if (!locationResponse.ok) {
          console.error('Location API error:', locationResponse.status);
        }
        
        const locationData = await locationResponse.json();
        const locationName = locationData[0]?.name || 'Sacramento, CA';

        // Map weather conditions to emoji icons
        const getWeatherIcon = (weatherCode) => {
          const icons = {
            '01d': '☀️', // clear sky day
            '01n': '🌙', // clear sky night
            '02d': '⛅', // few clouds day
            '02n': '☁️', // few clouds night
            '03d': '☁️', // scattered clouds
            '03n': '☁️',
            '04d': '☁️', // broken clouds
            '04n': '☁️',
            '09d': '🌧️', // shower rain
            '09n': '🌧️',
            '10d': '🌦️', // rain day
            '10n': '🌧️', // rain night
            '11d': '⛈️', // thunderstorm
            '11n': '⛈️',
            '13d': '❄️', // snow
            '13n': '❄️',
            '50d': '🌫️', // mist
            '50n': '🌫️'
          };
          return icons[weatherCode] || '🌤️';
        };

        const weatherInfo = {
          location: locationName,
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed),
          icon: getWeatherIcon(data.weather[0].icon)
        };

        setWeatherData(weatherInfo);
      } catch (err) {
        console.error('Weather API error:', err);
        setError(`Unable to load weather data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
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