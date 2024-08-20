import { useState } from 'react';
import api from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/login', { email, password });
      // Handle success (e.g., redirect, update context)
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, name, password) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', { email, name, password });
      // Handle success (e.g., redirect, update context)
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
};
