import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #38bdf8 0%, #0c4a6e 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        mt: 'auto',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: -20,
          right: -20,
          width: 120,
          height: 120,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          zIndex: -1,
        }}
      />
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#ffffff', 
          fontWeight: 500,
          fontSize: '14px',
          letterSpacing: '0.3px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        © 2024 EduPortal. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;