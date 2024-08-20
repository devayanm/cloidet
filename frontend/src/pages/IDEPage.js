import React, { useState, useEffect } from "react";
import Editor from "../components/IDE/Editor";
import FileTree from "../components/IDE/FileTree";
import Terminal from "../components/IDE/Terminal";
import LivePreview from "../components/IDE/LivePreview";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const IDEPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");
  const [terminalHeight, setTerminalHeight] = useState(200);

  useEffect(() => {
    setFiles([
      {
        id: uuidv4(),
        name: "src",
        isFolder: true,
        children: [
          {
            id: uuidv4(),
            name: "index.js",
            language: "javascript",
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
      const updatedFiles = updateFileContent(
        files,
        selectedFile.id,
        newContent
      );
      setFiles(updatedFiles);
    }
  };

  const updateFileContent = (fileTree, fileId, newContent) => {
    return fileTree.map((file) => {
      if (file.id === fileId) {
        return { ...file, content: newContent };
      }
      if (file.isFolder && file.children) {
        return {
          ...file,
          children: updateFileContent(file.children, fileId, newContent),
        };
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
        return {
          ...file,
          children: renameFileOrFolder(file.children, fileId, newName),
        };
      }
      return file;
    });
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
          children: [
            ...(file.children || []),
            { id: uuidv4(), name: "New Folder", isFolder: true, children: [] },
          ],
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
      setEditorContent("");
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
    if (selectedFile && selectedFile.language === "javascript") {
      try {
        const result = eval(editorContent);
        setTerminalOutput(result ? result.toString() : "Execution completed.");
      } catch (error) {
        setTerminalOutput(error.message);
      }
    } else {
      setTerminalOutput("Cannot run this file type.");
    }
  };

  const handleResizeTerminal = (e) => {
    const newHeight = window.innerHeight - e.clientY;
    setTerminalHeight(newHeight > 100 ? newHeight : 100);
  };

  return (
    <>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: 0,
        }}
      >
        <Box sx={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
          <Typography variant="h4" gutterBottom>
            Cloud IDE
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
            gap: 2,
            padding: 2,
          }}
        >
          <Box
            sx={{
              width: "20%",
              flexShrink: 0,
              padding: "8px",
              borderRight: "1px solid #ddd",
              display: "flex",
              flexDirection: "column",
              bgcolor: "#f9f9f9",
            }}
          >
            <FileTree
              files={files}
              onFileSelect={handleFileSelect}
              onFileRename={handleFileRename}
              onDeleteFile={handleDeleteFile}
              onCreateFolder={handleCreateFolder}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Paper
              elevation={2}
              sx={{
                flexGrow: 1,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Editor content={editorContent} onChange={handleEditorChange} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRunCode}
                >
                  Run Code
                </Button>
              </Box>
            </Paper>
          </Box>
          <Box
            sx={{
              width: "30%",
              flexShrink: 0,
              padding: "8px",
              borderLeft: "1px solid #ddd",
              bgcolor: "#f9f9f9",
            }}
          >
            <LivePreview content={editorContent} />
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderTop: "1px solid #ddd",
          bgcolor: "#1e1e1e",
          color: "#d4d4d4",
          height: `${terminalHeight}px`,
          overflow: "hidden",
          position: "relative",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Paper style={{ padding: "8px", flexGrow: 1, overflow: "auto" }}>
          <Terminal output={terminalOutput} />
        </Paper>
        <Box
          sx={{
            height: "5px",
            backgroundColor: "#333",
            cursor: "ns-resize",
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            document.addEventListener("mousemove", handleResizeTerminal);
            document.addEventListener("mouseup", () => {
              document.removeEventListener("mousemove", handleResizeTerminal);
            });
          }}
        />
      </Box>
    </>
  );
};

export default IDEPage;
