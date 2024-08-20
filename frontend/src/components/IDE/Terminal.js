import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  IconButton,
  Paper,
  Typography,
  Divider,
  Box
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Terminal = ({ terminalHeight, onResize }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [commandSuggestions, setCommandSuggestions] = useState([]);
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);
  const [localTerminalHeight, setLocalTerminalHeight] = useState(terminalHeight);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    setLocalTerminalHeight(terminalHeight);
  }, [terminalHeight]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value) {
      setCommandSuggestions(
        history.filter(cmd => cmd.startsWith(e.target.value))
      );
    } else {
      setCommandSuggestions([]);
    }
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
      setInput('');
      setCurrentHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommandSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentHistoryIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setInput(history[Math.max(currentHistoryIndex - 1, 0)] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentHistoryIndex((prevIndex) =>
        Math.min(prevIndex + 1, history.length - 1)
      );
      setInput(
        history[Math.min(currentHistoryIndex + 1, history.length - 1)] || ''
      );
    }
  };

  const handleResizeMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    function handleMouseMove(event) {
      const newHeight = window.innerHeight - event.clientY;
      setLocalTerminalHeight(Math.max(newHeight, 200)); // Minimum height
      if (onResize) onResize(Math.max(newHeight, 200));
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };

  const handleClearOutput = () => {
    setOutput([]);
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: '16px',
        height: `${localTerminalHeight}px`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1e1e1e'
      }}
    >
      <Typography variant="h6" style={{ color: '#dcdcdc' }}>
        Terminal
      </Typography>
      <Divider style={{ margin: '8px 0', backgroundColor: '#333' }} />
      <Box
        ref={terminalRef}
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          border: '1px solid #333',
          padding: '8px',
          backgroundColor: '#1e1e1e',
          color: '#dcdcdc',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
        }}
      >
        {output.map((line, index) => (
          <Typography key={index} style={{ margin: '2px 0' }}>
            {line}
          </Typography>
        ))}
      </Box>
      <Box display="flex" alignItems="center" marginTop="8px">
        <TextField
          multiline
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          variant="outlined"
          placeholder="Type your command here..."
          rows={2}
          fullWidth
          style={{ marginRight: '8px', backgroundColor: '#333', color: '#dcdcdc' }}
          InputProps={{
            endAdornment: (
              <>
                <IconButton
                  color="primary"
                  onClick={handleCommandSubmit}
                  aria-label="send"
                >
                  <SendIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={handleClearOutput}
                  aria-label="clear"
                >
                  <ClearIcon />
                </IconButton>
              </>
            ),
          }}
        />
        <IconButton
          onMouseDown={handleResizeMouseDown}
          aria-label="resize"
        >
          {localTerminalHeight > 300 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Terminal;
