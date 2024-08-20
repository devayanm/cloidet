import React, { useState, useCallback } from "react";
import {
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const LivePreview = ({
  htmlContent,
  style = {},
  previewTitle = "Live Preview",
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  const [key, setKey] = useState(0);

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
      <Typography variant="h6">Live Preview</Typography>
      <Divider style={{ margin: "8px 0" }} />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          ...style,
          overflow: "hidden",
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
          srcDoc={htmlContent}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            visibility: loading || error ? "hidden" : "visible",
            transition: "visibility 0.3s ease",
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
