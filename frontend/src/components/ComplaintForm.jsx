import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Drawer, List, Divider, IconButton, Snackbar, Alert, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StudentSideBar from './StudentSideBar'; // Import Sidebar

const drawerWidth = 240; // Default sidebar width

const ComplaintForm = () => {
  const [open, setOpen] = useState(true); // Sidebar state for toggling
  const [complaint, setComplaint] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Complaint submitted:', complaint);
    setComplaint('');
    setOpenSnackbar(true); // Show the Snackbar with success message
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
      backgroundColor: '#f5f7fb', // Light background color
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for form
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
      boxSizing: 'border-box', // Ensure consistent box sizing
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#545eb5', // Primary button color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '20px',
    },
    buttonHover: {
      backgroundColor: '#3d4a9b', // Darker button color on hover
    },
    mainContent: {
      flexGrow: 1,
      padding: '24px',
      backgroundColor: '#f6f7f9', // Background color for main content
      transition: 'margin-left 0.3s ease',
      marginLeft: open ? `${drawerWidth}px` : '70px', // Adjust content based on sidebar state
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : '70px', // Adjust drawer width based on open state
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
     <Drawer
        variant="permanent"
        sx={styles.drawerStyled}
      >
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position the Snackbar
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Your counselor will soon contact you according to your query requirement.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComplaintForm;
