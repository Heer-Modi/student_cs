import React, { useState } from 'react';
import { Box, TextField, CssBaseline, Toolbar, Drawer, Snackbar, Alert, Typography, IconButton, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TeacherSideBar from '../../components/TeacherSidebar';

const drawerWidth = 240;

const UploadDocumentsPage = () => {
  const [open, setOpen] = useState(true); // Sidebar toggle state
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState([]); // Array to hold multiple files
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open); // Function to toggle the sidebar open/close
  const handleCloseNotification = () => setNotificationOpen(false);

  // Handle multiple files
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert to array for multiple files
    setFiles(selectedFiles);
  };

  // Email validation function
  const isEmailValid = (email) => {
    return email.endsWith('.edu.in');
  };

  // Upload function (only uploads files locally)
  const handleUploadDocument = () => {
    if (!email || !isEmailValid(email) || files.length === 0) {
      return;
    }
    console.log(`Files uploaded for ${email}:`, files);
  };

  // Send function (logs document info, clears fields, and shows notification)
  const handleSendDocument = () => {
    if (!email || !isEmailValid(email) || files.length === 0) {
      return;
    }
    console.log(`Document sent to ${email}`, files);
    setEmail('');
    setFiles([]);
    setNotificationOpen(true);
  };

  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '700px',
      width: '90%',
      padding: '40px',
      backgroundColor: '#f5f7fb',
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    mainContent: {
      flexGrow: 1,
      padding: '24px',
      backgroundColor: '#f6f7f9',
      transition: 'margin-left 0.3s ease',
      marginLeft: open ? `${drawerWidth}px` : '70px',
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : '70px',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
      },
    },
    button: {
      padding: '10px 18px',
      backgroundColor: '#545eb5',
      color: '#fff',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '20px',
      '&:hover': {
        backgroundColor: '#3d4a9b',
      },
    },
    uploadButton: {
      marginRight: '10px',
    },
    heading: {
      color: '#545eb5',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: '600',
      textAlign: 'center',
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <TeacherSideBar open={open} />
      </Drawer>

      {/* Main content for Upload Documents Form */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" style={styles.heading}>
            Upload Documents
          </Typography>
          <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <TextField
              label="Student's Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
              required
              error={!isEmailValid(email)}
              helperText={!isEmailValid(email) ? 'Email must end with .edu.in' : ''}
            />

            <Button
              variant="contained"
              component="label"
              sx={{ ...styles.button, ...styles.uploadButton }}
            >
              Upload Documents
              <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>

            <Button
              variant="contained"
              onClick={handleSendDocument}
              sx={styles.button}
              disabled={!email || !isEmailValid(email) || files.length === 0}
            >
              Send Document
            </Button>

            {files.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Files to be sent:</Typography>
                {files.map((file, index) => (
                  <Typography key={index} variant="body2">{file.name}</Typography>
                ))}
              </Box>
            )}
          </form>
        </div>
      </Box>

      {/* Snackbar for success message */}
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
