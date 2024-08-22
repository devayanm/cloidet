import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import IDEPage from './pages/IDEPage';
import UserProfilePage from './pages/UserProfilePage';
// import ForgotPassword from './components/Auth/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ide" element={<IDEPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      
    </Routes>
  );
};

export default AppRoutes;
