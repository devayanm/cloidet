import React, { useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LivePreview = ({ htmlContent, style = {} }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setLoading(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                ...style
            }}
        >
            {loading && !error && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <Typography color="error">Failed to load preview</Typography>
                </Box>
            )}
            <iframe
                srcDoc={htmlContent}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    visibility: loading || error ? 'hidden' : 'visible'
                }}
                title="Live Preview"
                onLoad={handleLoad}
                onError={handleError}
            />
        </Box>
    );
};

export default LivePreview;
