import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Services from './components/Services';
import ThreeDVisualization from './components/3DVisualization';
import Gallery from './components/Gallery';
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
        <ThreeDVisualization />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
