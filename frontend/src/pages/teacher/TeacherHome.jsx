// TeacherHomePage.jsx
import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const TeacherHomePage = () => {
  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '700px', // Slightly wider to make buttons longer
      padding: '20px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    buttonCard: {
      backgroundColor: '#f6d673',
      color: '#10184b',
      '&:hover': {
        backgroundColor: '#a3abb2', // Hover color for card
      },
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
    },
    buttonText: {
      padding: '8px 16px', // Smaller padding for "Go" button
      color: '#ffffff',
      textDecoration: 'none',
      backgroundColor: '#3f51b5',
      fontSize: '0.875rem', // Smaller font size for "Go" button
      minWidth: '80px', // Fixed width for consistent "Go" button size
      '&:hover': {
        backgroundColor: '#3b49a0',
      },
    },
    buttonLabel: {
      fontSize: '1.2rem', // Larger font for button label
      fontWeight: 'bold',
      textTransform: 'none',
      color: '#10184b',
    },
  };

  return (
    <Box sx={styles.container}>
      

      {/* Arrange Meetings Button */}
      <Card sx={styles.buttonCard}>
        <CardContent>
          <Typography variant="h6" sx={styles.buttonLabel}>
            Arrange Meetings
          </Typography>
        </CardContent>
        <Button
          component={Link}
          to="/teacher/dashboard/arrange-meetings"
          sx={styles.buttonText}
        >
          Go
        </Button>
      </Card>

      {/* Upload Documents Button */}
      <Card sx={styles.buttonCard}>
        <CardContent>
          <Typography variant="h6" sx={styles.buttonLabel}>
            Upload Documents
          </Typography>
        </CardContent>
        <Button
          component={Link}
          to="/teacher/dashboard/upload-documents"
          sx={styles.buttonText}
        >
          Go
        </Button>
      </Card>

      {/* Create Google Form Button */}
      <Card sx={styles.buttonCard}>
        <CardContent>
          <Typography variant="h6" sx={styles.buttonLabel}>
            Create Google Form
          </Typography>
        </CardContent>
        <Button
          component={Link}
          to="/teacher/dashboard/create-google-form"
          sx={styles.buttonText}
        >
          Go
        </Button>
      </Card>
    </Box>
  );
};

export default TeacherHomePage;
