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

  // Modern UI styles inspired by the login page
  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(66, 153, 225, 0.1) 0%, transparent 45%), radial-gradient(circle at 75% 75%, rgba(237, 100, 166, 0.1) 0%, transparent 45%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    contentWrapper: {
      display: 'flex',
      flexGrow: 1,
      transition: 'all 0.3s ease',
    },
    drawerStyled: (open) => ({
      width: open ? drawerWidth : collapsedDrawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : collapsedDrawerWidth,
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
        borderRight: 'none',
      },
    }),
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '8px',
      borderBottom: '1px solid #E2E8F0',
    },
    toggleButton: {
      backgroundColor: '#EBF8FF',
      color: '#3182CE',
      borderRadius: '50%',
      padding: '8px',
      '&:hover': {
        backgroundColor: '#BEE3F8',
      },
    },
    mainContent: {
      flexGrow: 1,
      padding: '24px',
      transition: 'margin-left 0.3s ease, width 0.3s ease',
      marginLeft: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    contentContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      marginTop: '24px',
    },
    mainSection: {
      flex: '1 1 calc(70% - 24px)',
      minWidth: '300px',
    },
    calendarContainer: {
      flex: '1 1 calc(30% - 24px)',
      minWidth: '250px',
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      height: 'fit-content',
      border: '1px solid #E2E8F0',
    },
    calendarTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1a365d',
      marginBottom: '16px',
    },
    calendarWrapper: {
      '& .react-calendar': {
        width: '100%',
        border: 'none',
        borderRadius: '8px',
        fontFamily: 'inherit',
      },
      '& .react-calendar__tile--active': {
        backgroundColor: '#3182CE',
        borderRadius: '8px',
      },
      '& .react-calendar__tile--now': {
        backgroundColor: '#EBF8FF',
        borderRadius: '8px',
      },
      '& .react-calendar__tile:hover': {
        backgroundColor: '#BEE3F8',
        borderRadius: '8px',
      },
    },
    contentCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      width: '100%',
      marginBottom: '24px',
      height: 'calc(100% - 24px)',
      border: '1px solid #E2E8F0',
    }
  };

  return (
    <Box sx={styles.pageContainer}>
      <CssBaseline />
      <Header title="Student Dashboard" open={open} />
      
      <Box sx={styles.contentWrapper}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={styles.drawerStyled(open)}
        >
          <Toolbar sx={styles.drawerHeader}>
            <IconButton 
              onClick={toggleDrawer}
              sx={styles.toggleButton}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <StudentSideBar open={open} />
        </Drawer>

        {/* Main content */}
        <Box 
          component="main" 
          sx={{
            ...styles.mainContent,
            width: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)`,
            marginLeft: `${open ? drawerWidth : collapsedDrawerWidth}px`,
          }}
        >
          <Toolbar /> {/* Spacer for header */}
          
          <Box sx={styles.contentContainer}>
            {/* Main section */}
            <Box sx={styles.mainSection}>
              <Box sx={styles.contentCard}>
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

            {/* Calendar Section */}
            <Box sx={styles.calendarContainer}>
              <Typography sx={styles.calendarTitle}>Your Calendar</Typography>
              <Box sx={styles.calendarWrapper}>
                <Calendar 
                  onChange={setDate} 
                  value={date} 
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default StudentDashboard;