import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import VideoShowcase from './components/VideoShowcase';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Instagram from './components/Instagram';
import Weather from './components/Weather';

function App() {
  return (
    <>
      {/* Floating Weather Widget - Outside main App container */}
      <div className="weather-container">
        <Weather />
      </div>
      
      <div className="App">
        <Header />
        <main>
          <Hero />
          <Services />
          {/* <VideoShowcase /> */}
          {/* <Gallery /> */}
          {/* <Instagram /> */}
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
