import React from 'react';
import TypingEffect from './TypingEffect';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">
          About Me
          <span className="section-subtitle">Who I Am</span>
        </h2>
        <div className="about-content">
          <div className="about-left">
            <div className="image-wrapper">
              <img 
                src="/monishan.jpeg" 
                alt="Mathan Monishan"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%232b3fa7' opacity='0.1' rx='20'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%2314b1ff' opacity='0.2'/%3E%3Crect x='120' y='250' width='160' height='20' rx='10' fill='%231b0072' opacity='0.3'/%3E%3Crect x='140' y='280' width='120' height='15' rx='7' fill='%231b0072' opacity='0.3'/%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
          <div className="about-right">
            <div className="text">
              I'm Monishan and I'm a{' '}
              <span className="typing-2">
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
            <p>
              Hello! I'm Monishan, an undergraduate Science and Technology student at Uva Wellassa University 
              and a driven Information Technology student at the University of Moratuwa, with strong skills in 
              frontend development, Python programming, and project management.
            </p>
            <p>
              I started my journey with HTML, CSS, and JavaScript, and have continued to deepen my expertise 
              in building responsive, user-friendly web interfaces. With hands-on experience in managing projects 
              and collaborating in team environments, I'm passionate about creating solutions that make a difference.
            </p>
            <p>
              I'm currently seeking an internship opportunity where I can apply and grow my skills while 
              contributing to impactful and innovative projects.
            </p>
            <a 
              href="https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link" 
              className="btn btn-outline" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

