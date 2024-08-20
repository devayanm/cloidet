import React, { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from '../components/Dashboard/ProjectCard';

const Dashboard = () => {
  const { projects } = useContext(ProjectContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {projects.map(project => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default Dashboard;
