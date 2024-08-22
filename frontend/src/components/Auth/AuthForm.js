import React, { useState, useContext, useEffect } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth'; 

const AuthForm = ({ action, onClose }) => {
  const { updateUser, requestPasswordReset, resetPassword, uploadProfilePicture } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    profilePicture: null,
    token: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Reset form data when the action changes
    setFormData({
      name: '',
      email: '',
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      profilePicture: null,
      token: '',
    });
  }, [action]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (action === 'updateProfile') {
        await updateUser(formData.name, formData.email);
        setSuccess('Profile updated successfully.');
      } else if (action === 'uploadProfilePicture') {
        await uploadProfilePicture(formData.profilePicture);
        setSuccess('Profile picture updated successfully.');
      } else if (action === 'forgotPassword') {
        await requestPasswordReset(formData.email);
        setSuccess('Password reset link sent.');
      } else if (action === 'resetPassword') {
        if (formData.newPassword !== formData.confirmNewPassword) {
          setError('Passwords do not match.');
          return;
        }
        await resetPassword(formData.token, formData.newPassword);
        setSuccess('Password reset successfully.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!action} onClose={onClose}>
      <DialogTitle>
        {action === 'updateProfile' && 'Update Profile'}
        {action === 'uploadProfilePicture' && 'Upload Profile Picture'}
        {action === 'forgotPassword' && 'Forgot Password'}
        {action === 'resetPassword' && 'Reset Password'}
      </DialogTitle>
      <DialogContent>
        {loading && <CircularProgress />}
        {action === 'updateProfile' && (
          <>
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </>
        )}
        {action === 'uploadProfilePicture' && (
          <input
            accept="image/*"
            type="file"
            name="profilePicture"
            onChange={handleChange}
          />
        )}
        {action === 'forgotPassword' && (
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        )}
        {action === 'resetPassword' && (
          <>
            <TextField
              margin="normal"
              fullWidth
              label="Token"
              name="token"
              value={formData.token}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </>
        )}
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthForm;
