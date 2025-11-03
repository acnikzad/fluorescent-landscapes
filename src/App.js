import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import ThreeDVisualization from './components/3DVisualization';
import Gallery from './components/Gallery';
import Instagram from './components/Instagram';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Mission />
        <Services />
        <Testimonials />
        <ThreeDVisualization />
        <Gallery />
        <Instagram />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
