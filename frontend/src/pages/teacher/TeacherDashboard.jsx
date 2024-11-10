import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Drawer, IconButton, Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TeacherHome from './TeacherHome';
import TeacherProfile from './TeacherProfile';
import ArrangeMeetingsPage from './ArrangeMeetingsPage';
import UploadDocumentsPage from './UploadDocumentsPage';
import CreateGoogleFormPage from './CreateGoogleFormPage';
import TeacherSideBar from '../../components/TeacherSidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const TeacherDashboard = () => {
  const [open, setOpen] = useState(true); // Sidebar toggle state
  const [date, setDate] = useState(new Date()); // Calendar date state

  const toggleDrawer = () => setOpen(!open); // Toggle sidebar open/closed

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', backgroundColor: '#f6f7f9' }}>
      <CssBaseline />
      <Header title="Teacher Dashboard" open={open} />
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={styles.drawerStyled(open)}
        >
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Routes>
                <Route path="/" element={<TeacherHome />} />
                <Route path="/profile" element={<TeacherProfile />} />
                <Route path="/arrange-meeting" element={<ArrangeMeetingsPage />} />
                <Route path="/upload-documents" element={<UploadDocumentsPage />} />
                <Route path="/create-google-form" element={<CreateGoogleFormPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>

            {/* Calendar Section */}
            <Box sx={styles.calendarContainer}>
              <Typography variant="h6" sx={{ color: '#10184b', mb: 2 }}>Your Calendar</Typography>
              <Calendar onChange={setDate} value={date} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default TeacherDashboard;

// Updated styles
const styles = {
  mainContent: {
    flexGrow: 1,
    padding: '24px',
    backgroundColor: '#f6f7f9',
    transition: 'margin-left 0.3s ease',
    marginLeft: `${collapsedDrawerWidth}px`,
  },

  drawerStyled: (open) => ({
    width: open ? drawerWidth : collapsedDrawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: open ? drawerWidth : collapsedDrawerWidth,
      transition: 'width 0.3s ease',
      overflowX: 'hidden',
    },
  }),

  calendarContainer: {
    ml: 4,
    backgroundColor: '#f6d673',
    p: 3,
    borderRadius: '8px',
  },
};
