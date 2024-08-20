import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  CardActions,
  Tooltip,
  Box,
  Avatar,
  Badge,
  Stack,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { green, red, blue, grey } from '@mui/material/colors';

const getRandomColor = () => {
  const colors = [green[500], red[500], blue[500], grey[500]];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProjectCard = ({ project, onEdit, onDelete, onViewDetails }) => {
  const statusColors = {
    active: 'success',
    completed: 'primary',
    archived: 'default',
  };

  const getStatusColor = (status) => statusColors[status] || 'default';

  return (
    <Card
      sx={{
        minWidth: 300,
        boxShadow: 3,
        transition: '0.3s',
        '&:hover': { boxShadow: 6 },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: getRandomColor(),
              width: 60,
              height: 60,
              fontSize: '1.5rem',
              mr: 3,
            }}
            alt={project.name.charAt(0)}
          >
            {project.name.charAt(0)}
          </Avatar>
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {project.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.date && `Created on: ${new Date(project.date).toLocaleDateString()}`}
            </Typography>
          </Stack>
          <Badge
            color={getStatusColor(project.status)}
            badgeContent={project.status}
            sx={{ ml: 'auto', py: 1, px: 2, fontSize: '0.8rem' }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography
          sx={{
            mb: 2,
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.description || 'No description available'}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          {project.tags &&
            project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  background: `linear-gradient(135deg, ${getRandomColor()} 30%, ${getRandomColor()} 90%)`,
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              />
            ))}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
        <Tooltip title="View Details" arrow>
          <IconButton color="info" onClick={() => onViewDetails(project._id)}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Project" arrow>
          <IconButton color="primary" onClick={() => onEdit(project._id)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Project" arrow>
          <IconButton color="error" onClick={() => onDelete(project._id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
