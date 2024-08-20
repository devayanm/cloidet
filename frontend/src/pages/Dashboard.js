import React, { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import Projects from '../components/Dashboard/Project';
import NewProject from '../components/Dashboard/NewProject';
import { Container, Typography, TextField, Box, Button, Modal, Backdrop, Fade, CircularProgress, Alert } from '@mui/material';

const Dashboard = () => {
  const { projects, isLoading, error, createProject, deleteProject, editProject, viewProjectDetails } = useContext(ProjectContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    );
  }, [searchTerm, projects]);

  const handleCreate = (projectData) => {
    createProject(projectData);
  };

  const handleEdit = (projectId) => {
    setCurrentProject(projects.find(project => project._id === projectId));
    setOpenEditModal(true);
  };

  const handleDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
      setOpenConfirmModal(false);
      setProjectToDelete(null);
    }
  };

  const handleViewDetails = (projectId) => {
    viewProjectDetails(projectId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModalClose = () => {
    setOpenConfirmModal(false);
    setOpenEditModal(false);
    setProjectToDelete(null);
    setCurrentProject(null);
  };

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
        onChange={handleSearchChange}
      />
      <NewProject onCreate={handleCreate} />
      <Box sx={{ mt: 4 }}>
        <Projects
          projects={filteredProjects}
          isLoading={isLoading}
          error={error}
          onEdit={handleEdit}
          onDelete={(projectId) => {
            setProjectToDelete(projectId);
            setOpenConfirmModal(true);
          }}
          onViewDetails={handleViewDetails}
        />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Modal
        open={openConfirmModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openConfirmModal}>
          <Box sx={{ ...style, width: 400 }}>
            <Typography variant="h6" component="h2">
              Confirm Deletion
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Are you sure you want to delete this project?
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleModalClose} sx={{ mr: 1 }}>Cancel</Button>
              <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openEditModal}>
          <Box sx={{ ...style, width: 400 }}>
            <Typography variant="h6" component="h2">
              Edit Project
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Project Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={currentProject?.name || ''}
                onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                value={currentProject?.description || ''}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
              />
              <TextField
                label="Tags (comma separated)"
                variant="outlined"
                fullWidth
                margin="normal"
                value={(currentProject?.tags || []).join(', ')}
                onChange={(e) => setCurrentProject({ ...currentProject, tags: e.target.value.split(',').map(tag => tag.trim()) })}
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleModalClose} sx={{ mr: 1 }}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={() => {
                  if (currentProject) {
                    editProject(currentProject);
                    handleModalClose();
                  }
                }}>Save</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {isLoading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}
    </Container>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export default Dashboard;
