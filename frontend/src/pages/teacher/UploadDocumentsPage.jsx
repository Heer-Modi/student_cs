// UploadDocumentsPage.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';

const UploadDocumentsPage = () => {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadDocument = () => {
    console.log(`Document sent to ${email}`, file);
    setEmail('');
    setFile(null);
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
      <Typography variant="h4" gutterBottom>Upload Documents</Typography>
      <TextField
        label="Student Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={styles.input}
      />
      <Button variant="contained" component="label" sx={styles.button}>
        Select Document
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {file && <Typography variant="body2" sx={{ marginTop: '10px' }}>{file.name}</Typography>}
      <Button variant="contained" sx={styles.button} onClick={handleUploadDocument}>
        Send Document
      </Button>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity="success">
          Document uploaded and sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadDocumentsPage;
