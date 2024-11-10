// TeacherHomePage.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const TeacherHomePage = () => {
  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '90%',
      padding: '20px',
      textAlign: 'center',
    },
    button: {
      margin: '10px',
      padding: '15px 30px',
      backgroundColor: '#3f51b5',
      color: '#ffffff',
      textDecoration: 'none',
    },
  };

  return (
    <Box sx={styles.container}>
      
      <Button component={Link} to="/teacher/dashboard/arrange-meetings" sx={styles.button}>
        Arrange Meetings
      </Button>
      <Button component={Link} to="/teacher/dashboard/upload-documents" sx={styles.button}>
        Upload Documents
      </Button>
      <Button component={Link} to="/teacher/dashboard/create-google-form" sx={styles.button}>
        Create Google Form
      </Button>
    </Box>
  );
};

export default TeacherHomePage;
