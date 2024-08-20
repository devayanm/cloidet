import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const FileTree = ({ files, onFileSelect }) => {
  return (
    <List>
      {files.map(file => (
        <ListItem button key={file.id} onClick={() => onFileSelect(file)}>
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default FileTree;
