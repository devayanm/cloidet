import React, { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from '../components/Dashboard/ProjectCard';
import Loader from '../components/Shared/Loader';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';

const Dashboard = () => {
  const { projects, isLoading, error } = useContext(ProjectContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, projects]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      <TextField
        label="Search Projects"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && <Loader />}
      {error && <Typography color="error">Error: {error.message}</Typography>}
      {filteredProjects.length === 0 && !isLoading && !error && (
        <Typography>No projects found.</Typography>
      )}
      <Grid container spacing={3}>
        {filteredProjects.map(project => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
