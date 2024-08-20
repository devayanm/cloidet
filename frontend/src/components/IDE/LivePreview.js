import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Tooltip,
  ButtonGroup,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import PublicIcon from "@mui/icons-material/Public";

const LivePreview = ({
  htmlContent,
  style = {},
  previewTitle = "Live Preview",
  availablePorts = [3000, 3001, 3002],
  defaultPort = 3000,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);
  const [port, setPort] = useState(defaultPort);
  const [viewMode, setViewMode] = useState("desktop");
  const iframeRef = useRef(null);

  const handleLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  const handleReload = () => {
    setLoading(true);
    setError(false);
    setKey((prevKey) => prevKey + 1);
  };

  const handlePortChange = (event) => {
    setPort(event.target.value);
    handleReload();
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  useEffect(() => {
    // Auto-reload iframe when content changes
    const reloadOnChange = setInterval(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.location.reload();
      }
    }, 5000); // Adjust interval as needed

    return () => clearInterval(reloadOnChange);
  }, [htmlContent]);

  const getViewModeStyles = () => {
    switch (viewMode) {
      case "mobile":
        return { width: "375px", height: "667px" };
      case "tablet":
        return { width: "768px", height: "1024px" };
      default:
        return { width: "100%", height: "100%" };
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
        ...style,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h6">{previewTitle}</Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Port</InputLabel>
          <Select value={port} onChange={handlePortChange} label="Port">
            {availablePorts.map((port) => (
              <MenuItem key={port} value={port}>
                {port}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title="Reload Preview">
          <IconButton onClick={handleReload} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider style={{ margin: "8px 0" }} />
      <ButtonGroup
        variant="outlined"
        color="primary"
        size="small"
        sx={{ marginBottom: "8px" }}
      >
        <Tooltip title="Mobile View">
          <IconButton onClick={() => handleViewModeChange("mobile")}>
            <PhoneIphoneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tablet View">
          <IconButton onClick={() => handleViewModeChange("tablet")}>
            <TabletMacIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Desktop View">
          <IconButton onClick={() => handleViewModeChange("desktop")}>
            <DesktopWindowsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Network Preview">
          <IconButton>
            <PublicIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          ...getViewModeStyles(),
        }}
      >
        {loading && !error && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Typography color="error">Failed to load preview</Typography>
            <IconButton
              onClick={handleReload}
              color="primary"
              sx={{ marginTop: 2 }}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
        )}
        <iframe
          key={key}
          ref={iframeRef}
          srcDoc={htmlContent}
          style={{
            border: "none",
            visibility: loading || error ? "hidden" : "visible",
            transition: "visibility 0.3s ease",
            ...getViewModeStyles(),
          }}
          title={previewTitle}
          onLoad={handleLoad}
          onError={handleError}
        />
      </Box>
    </Paper>
  );
};

export default LivePreview;
