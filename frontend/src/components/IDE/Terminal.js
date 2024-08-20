import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  IconButton,
  Paper,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCommandSubmit = () => {
    if (input.trim()) {
      const command = input.trim();
      setHistory((prevHistory) => [...prevHistory, command]);
      setOutput((prevOutput) => [
        ...prevOutput,
        `> ${command}`,
        `Command executed: ${command}`,
      ]);
      setInput("");
      setCurrentHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommandSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCurrentHistoryIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setInput(history[Math.max(currentHistoryIndex - 1, 0)] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCurrentHistoryIndex((prevIndex) =>
        Math.min(prevIndex + 1, history.length - 1)
      );
      setInput(
        history[Math.min(currentHistoryIndex + 1, history.length - 1)] || ""
      );
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6">Terminal</Typography>
      <Divider style={{ margin: "8px 0" }} />
      <Box
        ref={terminalRef}
        style={{
          flexGrow: 1,
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "8px",
          backgroundColor: "#1e1e1e",
          color: "#c5c5c5",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
        }}
      >
        {output.map((line, index) => (
          <Typography key={index} style={{ margin: "2px 0" }}>
            {line}
          </Typography>
        ))}
      </Box>
      <TextField
        multiline
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        variant="outlined"
        placeholder="Type your command here..."
        rows={2}
        fullWidth
        style={{ marginTop: "8px" }}
        InputProps={{
          endAdornment: (
            <IconButton
              color="primary"
              onClick={handleCommandSubmit}
              aria-label="send"
            >
              <SendIcon />
            </IconButton>
          ),
        }}
      />
    </Paper>
  );
};

export default Terminal;
