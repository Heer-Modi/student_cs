import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Drawer, List, Divider, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close'; // Close icon for removing complaints
import StudentSideBar from './StudentSideBar'; // Import Sidebar

const drawerWidth = 240; // Default sidebar width

const ComplaintView = () => {
  const [open, setOpen] = useState(true); // Sidebar state for toggling
  const [complaints, setComplaints] = useState([
    { id: 1, description: 'Issue with course registration' },
    { id: 2, description: 'Counseling session delay' },
  ]); // Initial complaints

  const toggleDrawer = () => setOpen(!open); // Function to toggle the sidebar open/close

  // Function to remove a complaint
  const handleRemove = (id) => {
    setComplaints(complaints.filter((complaint) => complaint.id !== id));
  };

  const styles = {
    container: {
      margin: '0 auto',
      width: '600px',
      maxWidth: '90%',
      padding: '20px',
      textAlign: 'center',
    },
    heading: {
      marginBottom: '20px',
      fontWeight: 'bold',
      color: '#10184b', // Center the heading text
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      width: '100%',
    },
    listItem: {
      backgroundColor: '#f6d673', // Light yellow background for complaints
      margin: '10px 0',
      padding: '15px',
      borderRadius: '8px',
      display: 'flex', // Flex for aligning close button
      justifyContent: 'space-between', // Space between text and button
      alignItems: 'center', // Align close button vertically
      color: '#10184b', // Dark blue text for complaints
    },
    mainContent: {
      backgroundColor: '#f6f7f9',
      flexGrow: 1,
      padding: '24px',
      overflow: 'auto',
      transition: 'margin-left 0.3s ease',
      marginLeft: open ? `${drawerWidth}px` : '70px', // Sidebar margin adjustment
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : '70px',
        transition: 'width 0.3s ease', // Smooth transition for sidebar
        
        overflowX: 'hidden',
      },
    },
    closeButton: {
      color: '#f44336',
      cursor: 'pointer', // Cursor turns into a pointer on hover
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

      {/* Main content for Complaints */}
      <Box
        component="main"
        sx={styles.mainContent} // Adjust content width based on sidebar state
      >
        <Toolbar />
        <div style={styles.container}>
          <h2 style={styles.heading}>View Response</h2>
          <ul style={styles.list}>
            {complaints.map((complaint) => (
              <li key={complaint.id} style={styles.listItem}>
                {complaint.description}
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemove(complaint.id)} // Remove complaint
                  sx={styles.closeButton} // Style for the close button
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

export default ComplaintView;
