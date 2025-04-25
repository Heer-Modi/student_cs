import React from 'react';
import ViewMeetings from './ViewMeetings';
import ViewDocuments from './ViewDocuments';
import { Box } from '@mui/material';

const StudentHomePage = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <ViewMeetings />
      <ViewDocuments />
    </Box>
  );
};

export default StudentHomePage;