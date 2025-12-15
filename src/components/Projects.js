import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Hotel Website",
      description: "A responsive website for a hotel showcasing rooms, amenities, and booking information with a clean, modern design.",
      tech: ["HTML5", "CSS"],
      github: "https://github.com/Monishan2003/Web-design-project1",
      demo: null,
      icon: "fas fa-hotel",
      gradient: "linear-gradient(135deg, #4a6fc7 0%, #3f51b5 100%)"
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing skills, projects, and experience with interactive elements and responsive design.",
      tech: ["HTML5", "CSS", "JavaScript"],
      github: "https://github.com/Monishan2003/My-Portfolio-website-.git",
      demo: "#",
      icon: "fas fa-user",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)"
    },
    {
      id: 3,
      title: "Personal Expense Tracker",
      description: "A command-line application to track personal expenses, generate reports, and analyze spending patterns.",
      tech: ["Python", "CLI"],
      github: "https://github.com/Monishan2003/Personal-Expense-Tracker.git",
      demo: null,
      icon: "fas fa-money-bill-wave",
      gradient: "linear-gradient(135deg, #20bf6b 0%, #01baef 100%)"
    },
    {
      id: 4,
      title: "UniSphere LMS - Learning Management System",
      description: "A comprehensive Learning Management System built with C# supporting 4 user roles (Admin, Staff, Lecturers, Students). Features include course management, assignments, grading, and all essential learning activities for educational institutions.",
      tech: ["C#", ".NET", "ASP.NET", "SQL Server"],
      github: "https://github.com/Monishan2003/LMS_project_C-_-Learning_Management_Systam-.git",
      demo: null,
      icon: "fas fa-graduation-cap",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 5,
      title: "Community Project (Uki/Jaffna)",
      description: "Tackling school dropout and drug abuse in Mannar via stakeholder engagement and community initiatives.",
      tech: [],
      github: null,
      demo: "https://drive.google.com/file/d/1sTs55D9uDlRDtzE3LrWYNdtZxZTJf6wu/view?usp=drive_link",
      icon: "fas fa-hands-helping",
      gradient: "linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)"
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2 className="section-title">
          My Projects
          <span className="section-subtitle">My Work</span>
        </h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="project-image" 
                style={{ background: project.gradient }}
              >
                <i className={project.icon}></i>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.tech.length > 0 && (
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
                <div className="project-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      className="project-link" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i> GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      className={`project-link ${project.github ? 'outline' : ''}`}
                      target={project.demo !== '#' ? '_blank' : undefined}
                      rel={project.demo !== '#' ? 'noopener noreferrer' : undefined}
                    >
                      <i className={`fas ${project.demo === '#' ? 'fa-external-link-alt' : 'fa-folder-open'}`}></i>
                      {project.demo === '#' ? 'Live Demo' : 'Project Folder'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

