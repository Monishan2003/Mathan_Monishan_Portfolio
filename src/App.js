import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import BackgroundAnimation from './components/BackgroundAnimation';
import './App.css';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <BackgroundAnimation />
      <Navbar scrollY={scrollY} />
      <Home />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <ScrollToTop scrollY={scrollY} />
      <WhatsAppButton />
    </div>
  );
}

export default App;

