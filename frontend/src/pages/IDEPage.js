import React, { useState, useEffect } from 'react';
import Editor from '../components/IDE/Editor';
import FileTree from '../components/IDE/FileTree';
import Terminal from '../components/IDE/Terminal';
import LivePreview from '../components/IDE/LivePreview';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const IDEPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('');

  useEffect(() => {
    setFiles([
      {
        id: uuidv4(),
        name: 'src',
        isFolder: true,
        children: [
          {
            id: uuidv4(),
            name: 'index.js',
            language: 'javascript',
            content: 'console.log("Hello World");',
          },
        ],
      },
    ]);
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setEditorContent(file.content);
  };

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
    if (selectedFile) {
      const updatedFiles = updateFileContent(files, selectedFile.id, newContent);
      setFiles(updatedFiles);
    }
  };

  const updateFileContent = (fileTree, fileId, newContent) => {
    return fileTree.map((file) => {
      if (file.id === fileId) {
        return { ...file, content: newContent };
      }
      if (file.isFolder && file.children) {
        return { ...file, children: updateFileContent(file.children, fileId, newContent) };
      }
      return file;
    });
  };

  const handleFileRename = (fileId, newName) => {
    const updatedFiles = renameFileOrFolder(files, fileId, newName);
    setFiles(updatedFiles);
  };

  const renameFileOrFolder = (fileTree, fileId, newName) => {
    return fileTree.map((file) => {
      if (file.id === fileId) {
        return { ...file, name: newName };
      }
      if (file.isFolder && file.children) {
        return { ...file, children: renameFileOrFolder(file.children, fileId, newName) };
      }
      return file;
    });
  };

  const handleCreateNewFile = () => {
    const newFile = { id: uuidv4(), name: 'new-file.js', language: 'javascript', content: '' };
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[0].children.push(newFile); 
      return updatedFiles;
    });
    handleFileSelect(newFile);
  };

  const handleCreateFolder = (parentFolderId) => {
    const updatedFiles = addFolder(files, parentFolderId);
    setFiles(updatedFiles);
  };

  const addFolder = (fileTree, parentFolderId) => {
    return fileTree.map((file) => {
      if (file.id === parentFolderId && file.isFolder) {
        return {
          ...file,
          children: [...(file.children || []), { id: uuidv4(), name: 'New Folder', isFolder: true, children: [] }],
        };
      }
      if (file.isFolder && file.children) {
        return { ...file, children: addFolder(file.children, parentFolderId) };
      }
      return file;
    });
  };

  const handleDeleteFile = (fileId) => {
    const updatedFiles = deleteFile(files, fileId);
    setFiles(updatedFiles);
    if (selectedFile && selectedFile.id === fileId) {
      setSelectedFile(null);
      setEditorContent('');
    }
  };

  const deleteFile = (fileTree, fileId) => {
    return fileTree
      .filter((file) => file.id !== fileId)
      .map((file) => {
        if (file.isFolder && file.children) {
          return { ...file, children: deleteFile(file.children, fileId) };
        }
        return file;
      });
  };

  const handleRunCode = () => {
    if (selectedFile && selectedFile.language === 'javascript') {
      try {
        const result = eval(editorContent);
        setTerminalOutput(result ? result.toString() : 'Execution completed.');
      } catch (error) {
        setTerminalOutput(error.message);
      }
    } else {
      setTerminalOutput('Cannot run this file type.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        IDE
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: '16px', height: 'calc(100vh - 32px)', overflow: 'auto' }}>
            <Button variant="contained" color="primary" onClick={handleCreateNewFile} style={{ marginBottom: '16px' }}>
              Create New File
            </Button>
            <FileTree
              files={files}
              onFileSelect={handleFileSelect}
              onFileRename={handleFileRename}
              onDeleteFile={handleDeleteFile}
              onCreateFolder={handleCreateFolder}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px', height: 'calc(100vh - 32px)', overflow: 'auto' }}>
            <Editor content={editorContent} onChange={handleEditorChange} />
            <Button variant="contained" color="secondary" onClick={handleRunCode} style={{ marginTop: '16px' }}>
              Run Code
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: '16px', height: 'calc(100vh - 32px)', overflow: 'auto' }}>
            <LivePreview content={editorContent} />
            <Terminal output={terminalOutput} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IDEPage;
