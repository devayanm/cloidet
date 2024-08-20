import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get('/api/projects');
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const createProject = async (name, description) => {
    const { data } = await axios.post('/api/projects', { name, description });
    setProjects([...projects, data]);
  };

  return (
    <ProjectContext.Provider value={{ projects, createProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
