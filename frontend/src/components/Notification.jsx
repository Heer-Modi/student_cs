import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Drawer, List, Divider, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import StudentSideBar from './StudentSideBar'; // Import Sidebar

const drawerWidth = 240; // Default sidebar width

const Notification = () => {
  const [open, setOpen] = useState(true); // Sidebar state for toggling
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Meeting with counselor scheduled for 2024-09-20' },
    { id: 2, message: 'New document uploaded: Career Roadmap' },
    { id: 3, message: 'Reminder: Submit your course feedback by end of week' },
    { id: 4, message: 'Your counseling session is tomorrow at 3:00 PM' },
    { id: 5, message: 'New career document uploaded: Resume Building Guide' }
  ]); // Sample notifications

  const toggleDrawer = () => setOpen(!open); // Function to toggle the sidebar open/close

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id)); // Remove notification on delete
  };

  const styles = {
    mainContent: {
      backgroundColor: '#f6f7f9', // Light gray background for the main content
      flexGrow: 1,
      height: '100vh',
      padding: '24px',
      transition: 'margin-left 0.3s ease',
      marginLeft: open ? `${drawerWidth}px` : '70px', // Sidebar margin adjustment
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : '70px',
        transition: 'width 0.3s ease',
        
        overflowX: 'hidden',  // Prevent overflow and scrollbar in sidebar
      },
    },
    closeButton: {
      color: '#f44336', // Red color for close button
    },
    container: {
      margin: '0 auto',
      maxWidth: '90%',
      padding: '20px',
      textAlign: 'center',
    },
    heading: {
      marginBottom: '20px',
      fontWeight: 'bold',
      color: '#10184b', // Dark blue heading for consistency with sidebar
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      width: '100%',
    },
    listItem: {
      backgroundColor: '#f6d673', // Light yellow background for notifications
      margin: '10px 0',
      padding: '15px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#10184b', // Dark blue text for notifications
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

      {/* Main content for Notifications */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" style={styles.heading}>Notifications</Typography>
          <ul style={styles.list}>
            {notifications.map((notification) => (
              <li key={notification.id} style={styles.listItem}>
                {notification.message}
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(notification.id)}
                  sx={styles.closeButton} // Red close button
                >
                  <CloseIcon />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      </Box>
    </Box>
  );
};

export default Notification;
