import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectContextProvider } from './context/ProjectContext';
import { CollaborationContextProvider } from './context/CollaborationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <AuthProvider>
      <ProjectContextProvider>
        <CollaborationContextProvider>
          <App />
        </CollaborationContextProvider>
      </ProjectContextProvider>
    </AuthProvider>
  </Router>
);
