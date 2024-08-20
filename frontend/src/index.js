import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import ProjectContextProvider from './context/ProjectContext';
import CollaborationContextProvider from './context/CollaborationContext';

ReactDOM.render(
  <Router>
    <AuthContextProvider>
      <ProjectContextProvider>
        <CollaborationContextProvider>
          <App />
        </CollaborationContextProvider>
      </ProjectContextProvider>
    </AuthContextProvider>
  </Router>,
  document.getElementById('root')
);
