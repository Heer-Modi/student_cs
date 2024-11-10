// CreateGoogleFormPage.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';

const CreateGoogleFormPage = () => {
  const [formLink, setFormLink] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleCreateForm = () => {
    console.log(`Google Form link created: ${formLink}`);
    setFormLink('');
    setNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center',
    },
    input: {
      marginBottom: '15px',
      width: '100%',
    },
    button: {
      marginTop: '20px',
      backgroundColor: '#3f51b5',
      color: '#ffffff',
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom>Create Google Form</Typography>
      <TextField
        label="Google Form Link"
        value={formLink}
        onChange={(e) => setFormLink(e.target.value)}
        sx={styles.input}
        placeholder="Paste your Google Form link here"
      />
      <Button variant="contained" sx={styles.button} onClick={handleCreateForm}>
        Save Form Link
      </Button>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity="success">
          Google Form link created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateGoogleFormPage;
