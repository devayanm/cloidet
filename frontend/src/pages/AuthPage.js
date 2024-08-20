import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await api.post('/auth/login', { email, password })
        : await api.post('/auth/register', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5">{isLogin ? 'Login' : 'Register'}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <Button fullWidth onClick={() => setIsLogin(!isLogin)}>
            Switch to {isLogin ? 'Register' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthPage;
