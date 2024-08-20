import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const CollaborationContext = createContext();
const socket = io('http://localhost:5000');

const CollaborationContextProvider = ({ children }) => {
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    socket.on('updateCollaborators', (collabList) => {
      setCollaborators(collabList);
    });

    return () => {
      socket.off('updateCollaborators');
    };
  }, []);

  return (
    <CollaborationContext.Provider value={{ collaborators }}>
      {children}
    </CollaborationContext.Provider>
  );
};

export default CollaborationContextProvider;
