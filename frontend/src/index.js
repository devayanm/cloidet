import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectContextProvider } from './context/ProjectContext';
import { CollaborationContextProvider } from './context/CollaborationContext';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <ProjectContextProvider>
        <CollaborationContextProvider>
          <App />
        </CollaborationContextProvider>
      </ProjectContextProvider>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);
