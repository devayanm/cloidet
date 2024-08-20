import React, { useState, useRef } from 'react';
import { TextField, IconButton, Paper, Typography, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
    const terminalRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleCommandSubmit = () => {
        if (input.trim()) {
            setHistory(prevHistory => [...prevHistory, input]);
            setInput('');
            setCurrentHistoryIndex(-1);
            // Handle command execution here
            console.log(`Command executed: ${input}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommandSubmit();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setCurrentHistoryIndex(prevIndex => Math.max(prevIndex - 1, 0));
            setInput(history[Math.max(currentHistoryIndex - 1, 0)] || '');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setCurrentHistoryIndex(prevIndex => Math.min(prevIndex + 1, history.length - 1));
            setInput(history[Math.min(currentHistoryIndex + 1, history.length - 1)] || '');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '16px', height: '500px', overflow: 'auto' }}>
            <Typography variant="h6">Terminal</Typography>
            <Divider style={{ margin: '8px 0' }} />
            <div
                ref={terminalRef}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
                <TextField
                    multiline
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    variant="outlined"
                    placeholder="Type your command here..."
                    rows={10}
                    fullWidth
                    style={{ flexGrow: 1, marginBottom: '8px' }}
                />
                <IconButton
                    color="primary"
                    onClick={handleCommandSubmit}
                    aria-label="send"
                >
                    <SendIcon />
                </IconButton>
            </div>
        </Paper>
    );
};

export default Terminal;
