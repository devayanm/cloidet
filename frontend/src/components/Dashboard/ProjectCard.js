import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material';

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {project.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {project.tags && project.tags.map((tag) => (
            <Chip key={tag} label={tag} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary">
          Created on: {new Date(project.creationDate).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">View Details</Button>
        <Button size="small" color="secondary">Edit</Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
