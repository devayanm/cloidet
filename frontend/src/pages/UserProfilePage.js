import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import api from '../services/api';

const UserProfilePage = () => {
  const [user, setUser] = useState({
    email: '',
    name: '',
    profilePicture: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    theme: 'light',
    notifications: true
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await api.get('/user/profile');
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error('Failed to fetch user profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    if (file) {
      formData.append('profilePicture', file);
    }
    if (user.newPassword && user.newPassword === user.confirmNewPassword) {
      formData.append('password', user.password);
      formData.append('newPassword', user.newPassword);
    }

    try {
      await api.put('/user/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Profile updated successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      setError('Failed to update profile');
      console.error('Failed to update profile', error);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccess('');
    setError('');
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>
        {loading && <CircularProgress sx={{ display: 'block', margin: 'auto' }} />}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4} container justifyContent="center">
              <Avatar
                alt={user.name}
                src={user.profilePicture || '/default-profile.png'}
                sx={{ width: 120, height: 120 }}
              />
              <input
                accept="image/*"
                id="profile-picture"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="profile-picture">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Current Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={user.newPassword}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                value={user.confirmNewPassword}
                onChange={handleChange}
              />
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.theme === 'dark'}
                      onChange={(e) => setUser({ ...user, theme: e.target.checked ? 'dark' : 'light' })}
                    />
                  }
                  label="Dark Mode"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.notifications}
                      onChange={(e) => setUser({ ...user, notifications: e.target.checked })}
                    />
                  }
                  label="Enable Notifications"
                />
              </Box>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save Changes'}
          </Button>
        </form>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body2">
          Activity logs will be displayed here.
        </Typography>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {error || success}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default UserProfilePage;
