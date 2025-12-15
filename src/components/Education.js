import React from 'react';
import './Education.css';

const Education = () => {
  const educationData = [
    {
      id: 1,
      title: "BSc (Hons) in Science & Technology",
      institution: "Uva Wellassa University of Sri Lanka",
      year: "2024 – Present",
      status: "present",
      description: "Currently pursuing a comprehensive degree program focused on scientific principles and technological applications.",
      icon: "fas fa-university"
    },
    {
      id: 2,
      title: "Bachelor of Information Technology (External)",
      institution: "University of Moratuwa",
      year: "2025 – Present",
      status: "present",
      description: "External degree program focusing on core IT concepts, software development, and information systems.",
      icon: "fas fa-university"
    },
    {
      id: 3,
      title: "Introduction to Front-End Development",
      institution: "Meta (via Coursera)",
      year: "Completed October 2024",
      status: "completed",
      description: "Comprehensive course covering front-end development fundamentals including HTML, CSS, JavaScript, React.js, Bootstrap, and responsive web design. Skills gained: Web Development Tools, React.js, UI/UX, Responsive Design, and JavaScript Frameworks.",
      icon: "fas fa-certificate",
      certificateLink: "https://www.coursera.org/account/accomplishments/verify/B9JH54BPHVSO"
    },
    {
      id: 4,
      title: "Diploma of Education in Project Management",
      institution: "Uki (Yarl IT Hub)",
      year: "Completed 2024",
      status: "completed",
      description: "Comprehensive training in project management methodologies including Agile, Scrum, and Waterfall. Practical experience with stakeholder management and team leadership.",
      icon: "fas fa-graduation-cap"
    }
  ];

  return (
    <section className="education" id="education">
      <div className="container">
        <h2 className="section-title">
          Education & Certifications
          <span className="section-subtitle">My Education</span>
        </h2>
        <div className="timeline">
          {educationData.map((item, index) => (
            <div 
              key={item.id} 
              className={`timeline-card ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="timeline-content">
                <h4>{item.title}</h4>
                <div className="institution">
                  <i className={item.icon}></i>
                  {item.institution}
                </div>
                <div className="year">
                  {item.year}
                  <span className={`status ${item.status}`}>
                    <i className={`fas ${item.status === 'present' ? 'fa-spinner' : 'fa-check-circle'}`}></i>
                    {item.status === 'present' ? 'In Progress' : 'Completed'}
                  </span>
                </div>
                <p>{item.description}</p>
                {item.certificateLink && (
                  <a 
                    href={item.certificateLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="certificate-link"
                  >
                    <i className="fas fa-external-link-alt"></i> View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

