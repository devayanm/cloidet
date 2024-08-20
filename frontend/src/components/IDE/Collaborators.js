import React, { useContext } from 'react';
import { CollaborationContext } from '../../context/CollaborationContext';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, CircularProgress, Box } from '@mui/material';

const Collaborators = () => {
    const { collaborators, loading, error } = useContext(CollaborationContext);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center' }}>
                <Typography color="error">Failed to load collaborators</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Active Collaborators
            </Typography>
            {collaborators.length === 0 ? (
                <Typography>No active collaborators</Typography>
            ) : (
                <List>
                    {collaborators.map(collab => (
                        <ListItem key={collab.id}>
                            <ListItemAvatar>
                                <Avatar src={collab.avatarUrl} alt={collab.name} />
                            </ListItemAvatar>
                            <ListItemText primary={collab.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default Collaborators;
