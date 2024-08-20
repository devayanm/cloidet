import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, CircularProgress, Box, Link } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const Register = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError(''); // Clear previous errors
      try {
        await register(email, name, password);
        if (onSubmit) onSubmit(); // Call onSubmit prop if provided
      } catch (err) {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error && !name}
          helperText={error && !name ? 'Name is required.' : ''}
        />
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!error && !confirmPassword}
          helperText={error && !confirmPassword ? 'Please confirm your password.' : ''}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Register'}
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="#" variant="body2" onClick={() => alert('Login feature is not implemented yet.')}>
            Already have an account? Login
          </Link>
        </Box>
      </form>
    </Paper>
  );
};

export default Register;
