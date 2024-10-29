import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Drawer, IconButton, Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StudentHome from './StudentHome';
import StudentProfile from './StudentProfile';
import ViewMeetings from './ViewMeetings';
import ViewDocuments from './ViewDocuments';
import ComplaintForm from '../../components/ComplaintForm';
import ComplaintView from '../../components/ComplaintView';
import StudentSideBar from '../../components/StudentSideBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const drawerWidth = 240; // Sidebar's full width
const collapsedDrawerWidth = 70; // Sidebar's collapsed width

const StudentDashboard = () => {
  const [open, setOpen] = useState(true); // Sidebar toggle state
  const [date, setDate] = useState(new Date()); // Calendar date state

  const toggleDrawer = () => setOpen(!open); // Toggle sidebar open/closed

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', backgroundColor: '#f6f7f9' }}>
      <CssBaseline />
      <Header title="Student Dashboard" open={open} />
      
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
          <StudentSideBar open={open} />
        </Drawer>

        {/* Main content stays in place whether sidebar is open or closed */}
        <Box component="main" sx={styles.mainContent}>
          <Toolbar />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
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

export default StudentDashboard;

// Updated styles
const styles = {
  mainContent: {
    flexGrow: 1,
    padding: '24px',
    backgroundColor: '#f6f7f9',
    transition: 'margin-left 0.3s ease',
    marginLeft: `${collapsedDrawerWidth}px`, // Fixed margin regardless of sidebar state
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
