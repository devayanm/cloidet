import React, { useContext, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  Button,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 
import AuthForm from '../components/Auth/AuthForm';

const UserProfilePage = () => {
  const { user, logout, deleteUser } = useAuth();
  const [formAction, setFormAction] = useState('');
  const navigate = useNavigate(); 


  const handleFormAction = (action) => {
    setFormAction(action);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); 
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleDeleteAccount = async () => {
    await deleteUser();
    // Additional logic if needed
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} container justifyContent="center">
            <Avatar
              alt={user?.name || 'User'}
              src={user?.profilePicture || '/default-profile.png'}
              sx={{ width: 120, height: 120 }}
            />
            <IconButton color="primary" component="label">
              <PhotoCamera />
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => handleFormAction('uploadProfilePicture')}
              />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">Name: {user?.name}</Typography>
            <Typography variant="body1">Email: {user?.email}</Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => handleFormAction('updateProfile')}
              >
                Edit Profile
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => handleDeleteAccount()}
              >
                Delete Account
              </Button>
              <Button
                fullWidth
                variant="text"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleFormAction('forgotPassword')}
              >
                Forgot Password
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body2">
          Activity logs will be displayed here.
        </Typography>
        {/* Render AuthForm based on the action */}
        {formAction && (
          <AuthForm action={formAction} onClose={() => setFormAction('')} />
        )}
      </Paper>
    </Container>
  );
};

export default UserProfilePage;
