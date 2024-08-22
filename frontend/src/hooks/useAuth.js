import { useState } from 'react';
import api from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Optionally fetch user data or handle redirect here
    } catch (error) {
      console.error('Login failed', error.response || error);
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, name, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/register', { email, name, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Optionally fetch user data or handle redirect here
    } catch (error) {
      console.error('Registration failed', error.response || error);
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    // Optionally handle redirect or clean up here
  };

  const updateUser = async (name, email) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.put('/auth/me', { name, email });
      // Handle user update response if needed
    } catch (error) {
      console.error('Update failed', error.response || error);
      setError(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/password-reset/request', { email });
      alert('Password reset link sent to your email.');
    } catch (error) {
      console.error('Password reset request failed', error.response || error);
      setError(error.response?.data?.message || 'Password reset request failed');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/password-reset', { token, newPassword });
      alert('Password has been reset.');
    } catch (error) {
      console.error('Password reset failed', error.response || error);
      setError(error.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    updateUser,
    requestPasswordReset,
    resetPassword,
    loading,
    error
  };
};
