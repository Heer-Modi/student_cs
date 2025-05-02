import React, { useState } from 'react';
import { 
  Box,
  CssBaseline, 
  Toolbar, 
  Drawer, 
  IconButton, 
  Typography, 
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import AdminHome from './AdminHome';
import UserManagement from './UserManagement';
import ComplaintsManagement from './ComplaintsManagement';
import AdminNoticeManagement from './AdminNoticeManagement';
import AdminProfile from './AdminProfile';
import AdminSideBar from '../../components/AdminSideBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [date, setDate] = useState(new Date());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Auto-collapse sidebar on mobile
  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <CssBaseline />
      
      <AdminHeader title="Admin Dashboard" open={open} />
      
      <Box 
        sx={{ 
          display: 'flex', 
          flexGrow: 1,
          backgroundColor: '#f8f9fa',
          backgroundImage: 'radial-gradient(circle at 75% 25%, rgba(76, 43, 135, 0.1) 0%, transparent 45%), radial-gradient(circle at 25% 75%, rgba(76, 43, 135, 0.08) 0%, transparent 45%)',
        }}
      >
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : collapsedDrawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : collapsedDrawerWidth,
              transition: 'width 0.3s ease',
              overflowX: 'hidden',
              background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
              boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
              borderRight: 'none',
              height: '100%',
              position: 'fixed',
              zIndex: 1100,
            },
          }}
        >
          <Toolbar sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end',
            padding: '8px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <IconButton onClick={toggleDrawer} sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }
            }}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <AdminSideBar open={open} />
        </Drawer>

        {/* Main content */}
        <Box 
          component="main" 
          sx={{
            flexGrow: 1,
            p: 3,
            pt: 8,
            width: { xs: '100%', sm: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)` },
            ml: { xs: `${collapsedDrawerWidth}px`, sm: open ? `${drawerWidth}px` : `${collapsedDrawerWidth}px` },
            transition: 'margin-left 0.3s ease, width 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Toolbar />
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              flexGrow: 1,
              mb: 4, // Add margin at the bottom to ensure space for footer
            }}
          >
            {/* Main content area */}
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
            {!isMobile && (
              <Paper
                elevation={0}
                sx={{
                  width: '300px',
                  padding: '20px',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                  background: 'white',
                  height: 'fit-content',
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#4A5568', 
                    mb: 2, 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <CalendarIcon />
                  Your Calendar
                </Typography>
                
                <Box sx={{
                  '.react-calendar': {
                    border: 'none',
                    width: '100%',
                    fontFamily: 'inherit',
                    lineHeight: '1.5',
                  },
                  '.react-calendar__tile--active': {
                    background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
                    borderRadius: '8px',
                  },
                  '.react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus': {
                    backgroundColor: 'rgba(76, 43, 135, 0.1)',
                    borderRadius: '8px',
                  },
                  '.react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus': {
                    backgroundColor: 'rgba(76, 43, 135, 0.1)',
                    borderRadius: '8px',
                  },
                  '.react-calendar__month-view__days__day--weekend': {
                    color: '#4C2B87',
                  }
                }}>
                  <Calendar 
                    onChange={setDate} 
                    value={date} 
                  />
                </Box>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
      
      {/* Footer - positioned outside the flex container */}
      <Box 
        sx={{ 
          width: { xs: '100%', sm: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)` },
          ml: { xs: `${collapsedDrawerWidth}px`, sm: open ? `${drawerWidth}px` : `${collapsedDrawerWidth}px` },
          transition: 'margin-left 0.3s ease, width 0.3s ease',
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

// Helper components for icons
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default AdminDashboard;