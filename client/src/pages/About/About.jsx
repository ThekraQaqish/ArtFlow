import React from 'react';
import './About.css';

const projects = [
  {
    id: 1,
    title: "Insta Board",
    description: "This is a simple React app that displays user profile cards fetched from the Random User API. It includes interactive features like dark mode, email toggle, and infinite load more.",
    imageUrl: "/images/I.png",
    projectLink: "https://github.com/ThekraQaqish/Insta-Board"
  },
  {
    id: 2,
    title: "Magical Characters",
    description: "Display, Search Harry Potter Characters and filter them by house.",
    imageUrl: "/images/M.png",
    projectLink: "https://thekraqaqish.github.io/Magical-Characters/"
  },
  {
    id: 3,
    title: "Flavor Table",
    description: "This is a backend API for a recipe management system built using Node.js, Express.js, and PostgreSQL.",
    imageUrl: "/images/F.png",
    projectLink: " https://flavor-table-tymw.onrender.com"
  },
  {
    id: 4,
    title: "Crazy Meal",
    description: "Display recipes with names, prices and descriptions like a menu. adding and deleting recipes ",
    imageUrl: "/images/C.png",
    projectLink: "https://thekraqaqish.github.io/crazyMeal/"
  }
];

const AboutMe = () => {
  return (
    <div className="aboutme-container">
      <h1>About Me</h1>

      <section className="aboutme-section">
        <h2>My Story</h2>
        <p>
          I started this platform as a passionate developer and art enthusiast who saw how many talented artists lacked a place to shine. Combining my tech skills and love for creativity, I built this project to help artists gain visibility, connect with admirers, and make a living doing what they love.
        </p>
      </section>

      <section className="aboutme-section">
        <h2>My Mission</h2>
        <p>
          To build a supportive and inspiring community for emerging and professional artists alike — a space where talent meets opportunity and creativity knows no limits. I envision a platform where every artwork finds its audience and every artist feels seen.
        </p>
      </section>

      <section>
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="project-image"
              />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="project-link">
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
