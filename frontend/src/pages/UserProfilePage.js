import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import api from '../services/api';

const UserProfilePage = () => {
  const [user, setUser] = useState({ email: '', name: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/user/profile', user);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5">User Profile</Typography>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UserProfilePage;
