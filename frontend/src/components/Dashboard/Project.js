import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Pagination,
  TextField,
  Paper,
  Stack
} from '@mui/material';
import ProjectCard from './ProjectCard';
import Loader from '../Shared/Loader';
import { Masonry } from '@mui/lab';

const Projects = ({ projects, isLoading, error, onEdit, onDelete, onViewDetails }) => {
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const projectsPerPage = 8;

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter ? project.status === statusFilter : true)
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);

  if (isLoading) return <Loader />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 2, mb: 4, position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#f7f7f7' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
          <TextField
            label="Search Projects"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Divider sx={{ my: 2 }} />

      {currentProjects.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>No projects found.</Typography>
      ) : (
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
          {currentProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewDetails={onViewDetails}
            />
          ))}
        </Masonry>
      )}

      {filteredProjects.length > projectsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default Projects;
