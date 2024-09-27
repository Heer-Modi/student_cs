import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: '#f1f1f1' }}>
      <Typography variant="body2" color="textSecondary">
        © 2024 Student Counseling Portal. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
