import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, CircularProgress, Box, Link } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError(''); // Clear previous error
      try {
        await login(email, password);
        if (onSubmit) onSubmit(); // Call onSubmit prop if provided
      } catch (err) {
        setError('Login failed. Please check your credentials and try again.');
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error && !email}
          helperText={error && !email ? 'Email is required.' : ''}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error && !password}
          helperText={error && !password ? 'Password is required.' : ''}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="#" variant="body2" onClick={() => alert('Password reset feature is not implemented yet.')}>
            Forgot your password?
          </Link>
        </Box>
      </form>
    </Paper>
  );
};

export default Login;
