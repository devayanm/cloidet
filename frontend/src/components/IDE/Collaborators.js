import React, { useContext } from "react";
import { CollaborationContext } from "../../context/CollaborationContext";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const Collaborators = () => {
  const { collaborators, loading, error, refreshCollaborators } =
    useContext(CollaborationContext);

  const handleRetry = () => {
    refreshCollaborators(); // Assuming refreshCollaborators is a function to reload the data
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 2,
        }}
      >
        <CircularProgress size={50} color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography color="error" variant="h6">
          Failed to load collaborators
        </Typography>
        <IconButton color="primary" onClick={handleRetry}>
          <RefreshIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Active Collaborators
      </Typography>
      {collaborators.length === 0 ? (
        <Typography>No active collaborators</Typography>
      ) : (
        <List>
          {collaborators.map((collab) => (
            <ListItem
              key={collab.id}
              sx={{ borderBottom: "1px solid #ddd", padding: 1 }}
              onClick={() => alert(`Clicked on ${collab.name}`)} // Example interaction
            >
              <ListItemAvatar>
                <Avatar src={collab.avatarUrl} alt={collab.name} />
              </ListItemAvatar>
              <ListItemText
                primary={collab.name}
                secondary={
                  collab.status ? `Status: ${collab.status}` : "Status: Unknown"
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Collaborators;
