import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const FileTree = ({
  files,
  onFileSelect,
  onFileRename,
  onDeleteFile,
  onCreateFolder,
}) => {
  const [openFolders, setOpenFolders] = useState([]);
  const [renameId, setRenameId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFolderToggle = (folderId) => {
    setOpenFolders((prevOpenFolders) =>
      prevOpenFolders.includes(folderId)
        ? prevOpenFolders.filter((id) => id !== folderId)
        : [...prevOpenFolders, folderId]
    );
  };

  const handleContextMenu = (event, file) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFile(null);
  };

  const handleRename = (fileId, newName) => {
    onFileRename(fileId, newName);
    setRenameId(null);
  };

  const handleDelete = () => {
    onDeleteFile(selectedFile.id);
    handleCloseMenu();
  };

  const renderFileTree = (files) =>
    files.map((file) => (
      <React.Fragment key={file.id}>
        <ListItem
          button
          onClick={() =>
            file.isFolder ? handleFolderToggle(file.id) : onFileSelect(file)
          }
          onContextMenu={(event) => handleContextMenu(event, file)}
          aria-expanded={openFolders.includes(file.id) ? "true" : "false"}
          style={{ paddingLeft: file.isFolder ? 16 : 32 }}
        >
          <ListItemIcon>
            {file.isFolder ? (
              openFolders.includes(file.id) ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )
            ) : (
              <InsertDriveFileIcon />
            )}
          </ListItemIcon>
          {renameId === file.id ? (
            <TextField
              value={file.name}
              onChange={(e) => handleRename(file.id, e.target.value)}
              onBlur={() => setRenameId(null)}
              autoFocus
            />
          ) : (
            <ListItemText
              primary={file.name}
              onDoubleClick={() => setRenameId(file.id)}
            />
          )}
          <IconButton onClick={(e) => handleContextMenu(e, file)}>
            <MoreVertIcon />
          </IconButton>
        </ListItem>
        {file.isFolder && openFolders.includes(file.id) && (
          <Collapse
            in={openFolders.includes(file.id)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {renderFileTree(file.children || [])}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));

  return (
    <>
      <List>{renderFileTree(files)}</List>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => setRenameId(selectedFile.id)}>Rename</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={() => onCreateFolder(selectedFile.id)}>
          New Folder
        </MenuItem>
      </Menu>
    </>
  );
};

export default FileTree;
