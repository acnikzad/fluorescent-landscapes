import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Weather from './components/Weather';

function App() {
  return (
    <> {/* React Fragment to allow multiple top-level elements */}
      {/* Floating Weather Widget - Outside main App container */}
      <div className="weather-container">
        <Weather />
      </div>
      
      <div className="App">
        <Header />
        <main>
          <Hero />
          <Services />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
