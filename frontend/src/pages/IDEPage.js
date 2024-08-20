import React, { useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
    setFiles([
      { id: uuidv4(), name: 'index.js', language: 'javascript', content: 'console.log("Hello World");' }
    ]);
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setEditorContent(file.content);
  };

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
    if (selectedFile) {
      const updatedFiles = files.map(file =>
        file.id === selectedFile.id ? { ...file, content: newContent } : file
      );
      setFiles(updatedFiles);
    }
  };

  const handleCreateNewFile = () => {
    const newFile = { id: uuidv4(), name: 'new-file.js', language: 'javascript', content: '' };
    setFiles([...files, newFile]);
    handleFileSelect(newFile);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        IDE
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: '16px', height: 'calc(100vh - 32px)', overflow: 'auto' }}>
            <Button variant="contained" color="primary" onClick={handleCreateNewFile}>
              Create New File
            </Button>
            <FileTree files={files} onFileSelect={handleFileSelect} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px', height: 'calc(100vh - 32px)', overflow: 'auto' }}>
            {selectedFile ? (
              <Editor language={selectedFile.language} value={editorContent} onChange={handleEditorChange} />
            ) : (
              <Typography>Select a file to edit</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: '16px', height: 'calc(100vh - 32px)', overflow: 'auto' }}>
            <Terminal />
            <LivePreview />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IDEPage;
