import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      {/* Add more details or actions as needed */}
    </div>
  );
};

export default ProjectCard;
