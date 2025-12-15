import React from 'react';
import TypingEffect from './TypingEffect';
import './Home.css';

const Home = () => {
  const handleContactClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="home" id="home">
      <div className="container">
        <div className="home-content">
          <div className="text-1">Hello, my name is</div>
          <div className="text-2">Mathan Monishan</div>
          <div className="text-3">
            And I'm a{' '}
            <span className="typing">
              <TypingEffect
                strings={[
                  "Full Stack Developer",
                  "Mobile App Developer",
                  "Coder",
                  "UI/UX Designer",
                  "Project Management Enthusiast",
                  "Freelancer"
                ]}
                typeSpeed={100}
                backSpeed={60}
                loop={true}
              />
            </span>
          </div>
          <a href="#contact" className="btn" onClick={handleContactClick}>Hire Me</a>
        </div>
      </div>
      <div className="home-background"></div>
    </section>
  );
};

export default Home;

