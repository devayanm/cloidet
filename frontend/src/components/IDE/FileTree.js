import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Collapse, IconButton, Tooltip, Menu, MenuItem, TextField } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FileTree = ({
  files,
  onFileSelect,
  onFileRename,
  onDeleteFile,
  onCreateFile,
  onCreateFolder,
  onReorderFiles
}) => {
  const [openFolders, setOpenFolders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [contextMenuFile, setContextMenuFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedFile, setDraggedFile] = useState(null);

  const handleFolderToggle = (folderId) => {
    setOpenFolders((prevOpenFolders) =>
      prevOpenFolders.includes(folderId)
        ? prevOpenFolders.filter(id => id !== folderId)
        : [...prevOpenFolders, folderId]
    );
  };

  const handleContextMenu = (event, file) => {
    event.preventDefault();
    setContextMenuFile(file);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseContextMenu = () => {
    setAnchorEl(null);
    setContextMenuFile(null);
  };

  const handleFileRename = () => {
    const newName = prompt('Enter new name:', contextMenuFile.name);
    if (newName) {
      onFileRename(contextMenuFile.id, newName);
    }
    handleCloseContextMenu();
  };

  const handleFileDelete = () => {
    onDeleteFile(contextMenuFile.id);
    handleCloseContextMenu();
  };

  const handleCreateFile = () => {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      onCreateFile(fileName);
    }
  };

  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      onCreateFolder(folderName);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFiles = (files) => {
    if (!searchTerm) return files;
    return files.filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const onDragStart = (start) => {
    setDraggedFile(start.draggableId);
  };

  const onDragEnd = (result) => {
    setDraggedFile(null);
    if (!result.destination) return;

    const { source, destination } = result;
    // Ensure indices are valid
    if (source.index !== destination.index) {
      onReorderFiles(source.index, destination.index);
    }
  };

  const renderFileTree = (files) => (
    filteredFiles(files).map((file, index) => (
      <React.Fragment key={file.id}>
        <Draggable draggableId={file.id} index={index}>
          {(provided) => (
            <ListItem
              button
              onClick={() => file.isFolder ? handleFolderToggle(file.id) : onFileSelect(file)}
              onContextMenu={(e) => handleContextMenu(e, file)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              aria-expanded={openFolders.includes(file.id) ? "true" : "false"}
              style={{
                ...provided.draggableProps.style,
                paddingLeft: file.isFolder ? 16 : 32,
                backgroundColor: file.isSelected ? '#e5e5e5' : 'inherit',
                ...(draggedFile === file.id && { opacity: 0.5 }),
              }}
            >
              <ListItemIcon>
                {file.isFolder ? (
                  openFolders.includes(file.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />
                ) : (
                  <InsertDriveFileIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={file.name} />
              <IconButton
                edge="end"
                aria-label="more"
                onClick={(e) => handleContextMenu(e, file)}
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          )}
        </Draggable>
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
    <div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
        <Tooltip title="Create New File">
          <IconButton onClick={handleCreateFile} style={{ marginLeft: 8 }}>
            <NoteAddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Create New Folder">
          <IconButton onClick={handleCreateFolder} style={{ marginLeft: 8 }}>
            <CreateNewFolderIcon />
          </IconButton>
        </Tooltip>
      </div>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="file">
          {(provided) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {renderFileTree(files)}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseContextMenu}
      >
        <MenuItem onClick={handleFileRename}>Rename</MenuItem>
        <MenuItem onClick={handleFileDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default FileTree;
