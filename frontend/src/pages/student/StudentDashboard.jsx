import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Drawer, List, Typography, Divider, IconButton } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StudentHome from './StudentHome';
import StudentProfile from './StudentProfile';
import ViewMeetings from './ViewMeetings';
import ViewDocuments from './ViewDocuments';
import ComplaintForm from '../../components/ComplaintForm';
import ComplaintView from '../../components/ComplaintView';
import StudentSideBar from '../../components/StudentSideBar'; // Assuming the custom sidebar component

const StudentDashboard = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      <Header title="Student Dashboard" /> {/* Ensure the header displays correctly */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
          <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <StudentSideBar open={open} /> {/* Pass the open prop to StudentSideBar */}
          </List>
        </Drawer>
        <Box component="main" sx={open ? styles.mainContent : styles.fullWidthContent}>
          <Toolbar />
          <Typography variant="h4" sx={{ mb: 3 }}>
            Welcome to the Dashboard
          </Typography>
          <Routes>
            <Route path="/" element={<StudentHome />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/meetings" element={<ViewMeetings />} />
            <Route path="/documents" element={<ViewDocuments />} />
            <Route path="/complaints/add" element={<ComplaintForm />} />
            <Route path="/complaints/view" element={<ComplaintView />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default StudentDashboard;

const styles = {
  mainContent: {
    backgroundColor: 'white', // Set the background to white
    flexGrow: 1,
    height: '100vh',
    padding: '24px',
    overflow: 'auto',
  },
  fullWidthContent: {
    backgroundColor: 'white', // Set the background to white
    flexGrow: 1,
    height: '100vh',
    padding: '24px',
    overflow: 'auto',
    marginLeft: '50px', // No margin when sidebar is closed
    justifyContent:'center',
  },
  toolBarStyled: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    px: [1],
  },
  drawerStyled: {
    width: '240px',
    flexShrink: 0,
  },
  hideDrawer: {
    width: 0,
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
};
