import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Button
} from '@mui/material';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const AuthPage = () => {
  const [value, setValue] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFormSubmit = async (formType) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      setSnackbarMessage(`${formType} successful!`);
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage(`Failed to ${formType.toLowerCase()}.`);
      setSnackbarSeverity('error');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          CodeSphere Authentication
        </Typography>
        <Tabs value={value} onChange={handleTabChange} aria-label="authentication tabs">
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {value === 0 && (
            <Login onSubmit={() => handleFormSubmit('Login')} />
          )}
          {value === 1 && (
            <Register onSubmit={() => handleFormSubmit('Register')} />
          )}
        </Box>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          action={
            <Button color="inherit" onClick={handleSnackbarClose}>
              Close
            </Button>
          }
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default AuthPage;
