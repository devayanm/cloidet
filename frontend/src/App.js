import React from 'react';
import Navbar from './components/Shared/Navbar';
import AppRoutes from './routes';
import { Box } from '@mui/material';

const App = () => {
  return (
    <div>
      <Navbar />
      <Box 
        sx={{ 
          margin: 2, 
          marginBottom: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppRoutes />
        </Box>
      </Box>
    </div>
  );
};

export default App;
