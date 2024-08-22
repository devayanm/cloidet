import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects'); // Using the api instance
        setProjects(data);
      } catch (error) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const createProject = async (name, description) => {
    try {
      const { data } = await api.post('/projects', { name, description }); // Using the api instance
      setProjects((prevProjects) => [...prevProjects, data]);
    } catch (error) {
      setError('Failed to create project');
      console.error('Error creating project:', error);
    }
  };

  const updateProject = async (id, updates) => {
    try {
      const { data } = await api.put(`/projects/${id}`, updates); // Using the api instance
      setProjects((prevProjects) =>
        prevProjects.map((project) => (project._id === id ? data : project))
      );
    } catch (error) {
      setError('Failed to update project');
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`); // Using the api instance
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
    } catch (error) {
      setError('Failed to delete project');
      console.error('Error deleting project:', error);
    }
  };

  const addFile = async (projectId, file) => {
    try {
      const { data } = await api.post(`/projects/${projectId}/files`, file); // Using the api instance
      // Handle the addition of a file to the project's files
    } catch (error) {
      setError('Failed to add file');
      console.error('Error adding file:', error);
    }
  };

  const updateFile = async (projectId, fileId, updates) => {
    try {
      const { data } = await api.put(`/projects/${projectId}/files/${fileId}`, updates); // Using the api instance
      // Handle the update of the file
    } catch (error) {
      setError('Failed to update file');
      console.error('Error updating file:', error);
    }
  };

  const deleteFile = async (projectId, fileId) => {
    try {
      await api.delete(`/projects/${projectId}/files/${fileId}`); // Using the api instance
      // Handle the deletion of the file
    } catch (error) {
      setError('Failed to delete file');
      console.error('Error deleting file:', error);
    }
  };

  const contextValue = {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    addFile,
    updateFile,
    deleteFile,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};
