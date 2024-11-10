import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Drawer, Snackbar, Alert, Typography, IconButton, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StudentSideBar from './StudentSideBar';
import axios from 'axios';

const drawerWidth = 240;

const ComplaintForm = () => {
  const [open, setOpen] = useState(true); // Sidebar state for toggling
  const [complaint, setComplaint] = useState('');
  const [teacherEmail, setTeacherEmail] = useState(''); // State for teacher email input
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Complaint data to be sent to the backend
    const complaintData = {
      teacherEmail,      // Teacher email entered by student
      description: complaint, // Complaint description entered by student
    };

    try {
      // Send POST request to backend with Authorization header
      await axios.post('/api/complaints/submit', complaintData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Retrieve token from localStorage
        },
      });
      
      console.log('Complaint submitted:', complaint);
      setComplaint(''); // Clear complaint input
      setTeacherEmail(''); // Clear teacher email input
      setOpenSnackbar(true); // Show Snackbar with success message
    } catch (error) {
      console.error('Error submitting complaint:', error);
      // Optionally handle error in Snackbar or alert
    }
  };

  const toggleDrawer = () => setOpen(!open); // Function to toggle the sidebar open/close

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false); // Close the Snackbar
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
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    textarea: {
      width: '100%',
      height: '150px',
      padding: '12px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginBottom: '20px',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#545eb5',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '20px',
    },
    buttonHover: {
      backgroundColor: '#3d4a9b',
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
        <StudentSideBar open={open} />
      </Drawer>
      
      {/* Main content for Complaint Form */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" component="h2" style={styles.heading}>
            Submit Your Query
          </Typography>
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Input for Teacher Email */}
            <TextField
              label="Query to (Teacher's Email)"
              variant="outlined"
              fullWidth
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              placeholder="Enter teacher's email"
              required
              style={{ marginBottom: '20px' }}
            />
            {/* Textarea for complaint description */}
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Describe your issue"
              style={styles.textarea}
              required
            />
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        </div>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Your counselor will soon contact you according to your query requirement.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComplaintForm;
