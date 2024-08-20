import React from 'react';
import Navbar from './components/Shared/Navbar';
import AppRoutes from './routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
