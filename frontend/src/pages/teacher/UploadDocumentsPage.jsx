import React, { useState } from 'react';
import {
  Box,
  TextField,
  CssBaseline,
  Toolbar,
  Drawer,
  Snackbar,
  Alert,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TeacherSideBar from '../../components/TeacherSidebar';
import axios from 'axios';

const drawerWidth = 240;

const UploadDocumentsPage = () => {
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [error, setError] = useState('');

  const toggleDrawer = () => setOpen(!open);
  const handleCloseNotification = () => setNotificationOpen(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendDocument = async () => {
    setError('');
    if (!title || !description || !file) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/documents/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload success:', response.data);
      setTitle('');
      setDescription('');
      setFile(null);
      setNotificationOpen(true);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload document');
    }
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
    heading: {
      color: '#545eb5',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: '600',
      textAlign: 'center',
    },
    errorText: {
      color: 'red',
      marginBottom: '10px',
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

      {/* Main content */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" style={styles.heading}>
            Upload Document
          </Typography>

          <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {error && <Typography sx={styles.errorText}>{error}</Typography>}

            <TextField
              label="Document Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />

            <Button
              variant="contained"
              component="label"
              sx={styles.button}
            >
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>

            {file && (
              <Typography sx={{ mt: 2 }}>{file.name}</Typography>
            )}

            <Button
              variant="contained"
              onClick={handleSendDocument}
              sx={styles.button}
              disabled={!title || !description || !file}
            >
              Send Document
            </Button>
          </form>
        </div>
      </Box>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity="success">
          Document uploaded and sent to students!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadDocumentsPage;
