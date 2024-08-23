import { useState, useEffect } from "react";
import api from "../services/api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;
      console.log("Token:", token);
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await fetchUserData(); // Fetch user data after login
      return true; // Indicate successful login
    } catch (error) {
      console.error("Login Error:", error); // More detailed logging
      setError(error.response?.data?.message || "Login failed");
      return false; // Indicate failed login
    } finally {
      setLoading(false);
    }
  };
  

  const fetchUserData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/auth/me');
      console.log('Fetched user data:', response.data); // Debugging
      setUser(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };
    
  
  const register = async (email, name, password) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/register", {
        email,
        name,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await fetchUserData(); // Fetch user data after registration
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = "";
    setUser(null);
  };

  const updateUser = async (name, email) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.put("/auth/me", { name, email });
      setUser(response.data); // Update user data in state
    } catch (error) {
      setError(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAccount = async () => {
    setLoading(true);
    setError("");
    try {
      await api.delete("/auth/me");
      logout(); // Logout after deleting the account
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/password-reset/request", { email });
      alert("Password reset link sent to your email.");
    } catch (error) {
      setError(
        error.response?.data?.message || "Password reset request failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/password-reset", { token, newPassword });
      alert("Password has been reset.");
    } catch (error) {
      setError(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData();
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    deleteUserAccount,
    requestPasswordReset,
    resetPassword,
    fetchUserData,
  };
};
