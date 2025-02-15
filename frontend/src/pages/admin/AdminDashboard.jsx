import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Drawer, IconButton, Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AdminHeader from '../../components/AdminHeader'; // Custom Admin Header
import Footer from '../../components/Footer';
import AdminHome from './AdminHome'; // Placeholder for Admin Home
import UserManagement from './UserManagement'; // Placeholder for User Management
import ComplaintsManagement from './ComplaintsManagement'; // Placeholder for Complaints
import AdminNoticeManagement from './AdminNoticeManagement'; // Notice Management
import AdminProfile from './AdminProfile'; // Admin Profile
import AdminSideBar from '../../components/AdminSideBar'; // Custom Admin Sidebar
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const drawerWidth = 240; // Sidebar full width
const collapsedDrawerWidth = 70; // Sidebar collapsed width

const AdminDashboard = () => {
  const [open, setOpen] = useState(true); // Sidebar toggle state
  const [date, setDate] = useState(new Date()); // Calendar date state

  // Toggle sidebar open/closed
  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', backgroundColor: '#f6f7f9' }}>
      <CssBaseline />
      <AdminHeader title="Admin Dashboard" open={open} /> {/* Custom Admin Header */}

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Drawer variant="permanent" sx={styles.drawerStyled(open)}>
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <AdminSideBar open={open} />
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={styles.mainContent(open)}>
          <Toolbar />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/complaints-management" element={<ComplaintsManagement />} />
                <Route path="/notice-management" element={<AdminNoticeManagement />} />
                <Route path="/profile" element={<AdminProfile />} />
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
      <Footer /> {/* Footer at the bottom */}
    </Box>
  );
};

export default AdminDashboard;

// Styles
const styles = {
  // Main content styling
  mainContent: (open) => ({
    flexGrow: 1,
    padding: '24px',
    backgroundColor: '#f6f7f9',
    transition: 'margin-left 0.3s ease',
    marginLeft: open ? `${drawerWidth}px` : `${collapsedDrawerWidth}px`,
  }),

  // Sidebar styling
  drawerStyled: (open) => ({
    width: open ? drawerWidth : collapsedDrawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: open ? drawerWidth : collapsedDrawerWidth,
      transition: 'width 0.3s ease',
      overflowX: 'hidden',
    },
  }),

  // Calendar container styling
  calendarContainer: {
    ml: 4,
    backgroundColor: '#f6d673',
    p: 3,
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
};
