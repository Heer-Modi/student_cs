// TeacherSideBar.jsx
import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from "@mui/icons-material/School";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TeacherSideBar = ({ open }) => {
  const location = useLocation();
  
  // Check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {open && (
        <Box sx={styles.logoContainer}>
          <Typography variant="h5" sx={styles.logo}>
            EduPortal
          </Typography>
        </Box>
      )}
      
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />
      
      <List sx={styles.list}>
        {/* Dashboard */}
        <ListItem 
          component={Link} 
          to="/teacher/dashboard" 
          sx={{
            ...styles.listItem,
            backgroundColor: isActive('/teacher/dashboard') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          <ListItemIcon>
            <Box sx={{
              ...styles.iconContainer,
              backgroundColor: isActive('/teacher/dashboard') ? 'white' : 'rgba(255, 255, 255, 0.1)',
            }}>
              <HomeIcon sx={{
                ...styles.icon,
                color: isActive('/teacher/dashboard') ? '#8E2DE2' : 'white',
              }} />
            </Box>
          </ListItemIcon>
          {open && <ListItemText primary="Dashboard" sx={styles.text} />}
        </ListItem>

        {/* Profile */}
        <ListItem 
          component={Link} 
          to="/teacher/profile" 
          sx={{
            ...styles.listItem,
            backgroundColor: isActive('/teacher/profile') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          <ListItemIcon>
            <Box sx={{
              ...styles.iconContainer,
              backgroundColor: isActive('/teacher/profile') ? 'white' : 'rgba(255, 255, 255, 0.1)',
            }}>
              <PersonIcon sx={{
                ...styles.icon,
                color: isActive('/teacher/profile') ? '#8E2DE2' : 'white',
              }} />
            </Box>
          </ListItemIcon>
          {open && <ListItemText primary="Profile" sx={styles.text} />}
        </ListItem>

        {/* Your Students */}
        <ListItem 
          component={Link} 
          to="/teacher/yourstudents" 
          sx={{
            ...styles.listItem,
            backgroundColor: isActive('/teacher/yourstudents') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          <ListItemIcon>
            <Box sx={{
              ...styles.iconContainer,
              backgroundColor: isActive('/teacher/yourstudents') ? 'white' : 'rgba(255, 255, 255, 0.1)',
            }}>
              <SchoolIcon sx={{
                ...styles.icon,
                color: isActive('/teacher/yourstudents') ? '#8E2DE2' : 'white',
              }} />
            </Box>
          </ListItemIcon>
          {open && <ListItemText primary="Your Students" sx={styles.text} />}
        </ListItem>

        {/* View Queries */}
        <ListItem 
          component={Link} 
          to="/teacher/queries" 
          sx={{
            ...styles.listItem,
            backgroundColor: isActive('/teacher/queries') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          <ListItemIcon>
            <Box sx={{
              ...styles.iconContainer,
              backgroundColor: isActive('/teacher/queries') ? 'white' : 'rgba(255, 255, 255, 0.1)',
            }}>
              <ReportProblemIcon sx={{
                ...styles.icon,
                color: isActive('/teacher/queries') ? '#8E2DE2' : 'white',
              }} />
            </Box>
          </ListItemIcon>
          {open && <ListItemText primary="View Queries" sx={styles.text} />}
        </ListItem>

        {/* Your Meetings */}
        <ListItem 
          component={Link} 
          to="/teacher/meetings" 
          sx={{
            ...styles.listItem,
            backgroundColor: isActive('/teacher/meetings') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          <ListItemIcon>
            <Box sx={{
              ...styles.iconContainer,
              backgroundColor: isActive('/teacher/meetings') ? 'white' : 'rgba(255, 255, 255, 0.1)',
            }}>
              <CalendarTodayIcon sx={{
                ...styles.icon,
                color: isActive('/teacher/meetings') ? '#8E2DE2' : 'white',
              }} />
            </Box>
          </ListItemIcon>
          {open && <ListItemText primary="Your Meetings" sx={styles.text} />}
        </ListItem>
      </List>
      
      {open && (
        <Box sx={styles.bottomSection}>
          <Typography variant="caption" sx={styles.bottomText}>
            Teacher Portal v1.0
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// Styles
const styles = {
  logoContainer: {
    padding: '24px 16px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '0.5px',
  },
  list: {
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  iconContainer: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  icon: {
    fontSize: '20px',
    transition: 'color 0.3s ease',
  },
  text: {
    '& .MuiTypography-root': {
      fontSize: '15px',
      fontWeight: 500,
      color: 'white',
      transition: 'all 0.2s ease',
    },
    marginLeft: '8px',
  },
  listItem: {
    padding: '10px 16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    margin: '2px 0',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  bottomSection: {
    padding: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: 'auto',
  },
  bottomText: {
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    display: 'block',
    fontSize: '12px',
  }
};

export default TeacherSideBar;