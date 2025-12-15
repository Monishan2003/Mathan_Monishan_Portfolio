import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "fas fa-laptop-code",
      skills: [
        { name: "HTML5", icon: "fab fa-html5" },
        { name: "CSS3", icon: "fab fa-css3-alt" },
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "React", icon: "fab fa-react" },
        { name: "Flutter", icon: "fab fa-android" }
      ]
    },
    {
      title: "Backend & Databases",
      icon: "fas fa-server",
      skills: [
        { name: "C#", icon: "fab fa-microsoft" },
        { name: "Node.js", icon: "fab fa-node-js" },
        { name: "Python", icon: "fab fa-python" },
        { name: "MySQL", icon: "fas fa-database" },
        { name: "MongoDB", icon: "fas fa-database" }
      ]
    },
    {
      title: "Tools & Methods",
      icon: "fas fa-tools",
      skills: [
        { name: "Git", icon: "fab fa-git-alt" },
        { name: "Figma", icon: "fab fa-figma" },
        { name: "Canva", icon: "fas fa-palette" },
        { name: "Project Management", icon: "fas fa-tasks" },
        { name: "Responsive Design", icon: "fas fa-mobile-alt" }
      ]
    }
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2 className="section-title">
          My Skills
          <span className="section-subtitle">My Skills</span>
        </h2>
        <div className="skills-content">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className="skill-category"
              style={{ animationDelay: `${categoryIndex * 0.15}s` }}
            >
              <h3>
                <i className={category.icon}></i> {category.title}
              </h3>
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="skill-item"
                    style={{ animationDelay: `${(categoryIndex * 0.15) + (skillIndex * 0.05)}s` }}
                  >
                    <i className={skill.icon}></i>
                    <h4>{skill.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

