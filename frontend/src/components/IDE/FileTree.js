import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Collapse, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const FileTree = ({ files, onFileSelect }) => {
  const [openFolders, setOpenFolders] = useState([]);

  const handleFolderToggle = (folderId) => {
    setOpenFolders((prevOpenFolders) =>
      prevOpenFolders.includes(folderId)
        ? prevOpenFolders.filter(id => id !== folderId)
        : [...prevOpenFolders, folderId]
    );
  };

  const renderFileTree = (files) => (
    files.map(file => (
      <React.Fragment key={file.id}>
        <ListItem
          button
          onClick={() => file.isFolder ? handleFolderToggle(file.id) : onFileSelect(file)}
          aria-expanded={openFolders.includes(file.id) ? "true" : "false"}
          style={{ paddingLeft: file.isFolder ? 16 : 32 }}
        >
          <ListItemIcon>
            {file.isFolder ? (
              openFolders.includes(file.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />
            ) : (
              <InsertDriveFileIcon />
            )}
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </ListItem>
        {file.isFolder && openFolders.includes(file.id) && (
          <Collapse in={openFolders.includes(file.id)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderFileTree(file.children || [])}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ))
  );

  return (
    <List>
      {renderFileTree(files)}
    </List>
  );
};

export default FileTree;
