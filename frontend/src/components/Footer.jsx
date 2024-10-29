import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        textAlign: 'center', 
        backgroundColor: '#3f51b5', // Match the header for consistency
        borderTop: '3px solid #54se85', // Green accent on top
        mt: 'auto',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#ffffff', 
          fontWeight: 500, 
          textAlign: 'center', // Ensures the text is centered
          display: 'block', 
        }}
      >
        © 2024 Student Counseling Portal. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
