import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, List, Box, Typography, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import BugReportIcon from '@mui/icons-material/BugReport';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

const AdminSideBar = ({ open }) => {
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
        {/* Dashboard Home */}
        <ListItemButton 
          component={Link} 
          to="/admin/dashboard" 
          sx={{
            ...styles.listItem,
            backgroundColor: isActive('/admin/dashboard') && !location.pathname.includes('/admin/user-management') && 
              !location.pathname.includes('/admin/complaints-management') && 
              !location.pathname.includes('/admin/notice-managment') && 
              !location.pathname.includes('/admin/profile')
                ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          <ListItemIcon>
            <Box sx={{
              ...styles.iconContainer,
              backgroundColor: isActive('/admin/dashboard') && !location.pathname.includes('/admin/user-management') && 
                !location.pathname.includes('/admin/complaints-management') && 
                !location.pathname.includes('/admin/notice-managment') && 
                !location.pathname.includes('/admin/profile')
                  ? 'white' : 'rgba(255, 255, 255, 0.1)',
            }}>
              <HomeIcon sx={{
                ...styles.icon,
                color: isActive('/admin/dashboard') && !location.pathname.includes('/admin/user-management') && 
                  !location.pathname.includes('/admin/complaints-management') && 
                  !location.pathname.includes('/admin/notice-managment') && 
                  !location.pathname.includes('/admin/profile')
                    ? '#4C2B87' : 'white',
              }} />
            </Box>
          </ListItemIcon>
          {open && <ListItemText primary="Dashboard" sx={styles.text} />}
        </ListItemButton>

        {/* User Management */}
        <ListItemButton 
          component={Link} 
          to="/admin/user-management" 
          sx={{
            ...styles.listItem,
            backgroundColor: isActive('/admin/user-management') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          <ListItemIcon>
            <Box sx={{
              ...styles.iconContainer,
              backgroundColor: isActive('/admin/user-management') ? 'white' : 'rgba(255, 255, 255, 0.1)',
            }}>
              <GroupIcon sx={{
                ...styles.icon,
                color: isActive('/admin/user-management') ? '#4C2B87' : 'white',
              }} />
            </Box>
          </ListItemIcon>
          {open && <ListItemText primary="User Management" sx={styles.text} />}
        </ListItemButton>

        {/* Complaints Management */}
        <ListItemButton 
          component={Link} 
          to="/admin/complaints-management" 
          sx={{
            ...styles.listItem,
            backgroundColor: isActive('/admin/complaints-management') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          <ListItemIcon>
            <Box sx={{
              ...styles.iconContainer,
              backgroundColor: isActive('/admin/complaints-management') ? 'white' : 'rgba(255, 255, 255, 0.1)',
            }}>
              <BugReportIcon sx={{
                ...styles.icon,
                color: isActive('/admin/complaints-management') ? '#4C2B87' : 'white',
              }} />
            </Box>
          </ListItemIcon>
          {open && <ListItemText primary="Complaints" sx={styles.text} />}
        </ListItemButton>

        {/* Notice Management */}
        <ListItemButton 
          component={Link} 
          to="/admin/notice-managment" 
          sx={{
            ...styles.listItem,
            backgroundColor: isActive('/admin/notice-managment') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          <ListItemIcon>
            <Box sx={{
              ...styles.iconContainer,
              backgroundColor: isActive('/admin/notice-managment') ? 'white' : 'rgba(255, 255, 255, 0.1)',
            }}>
              <NotificationsIcon sx={{
                ...styles.icon,
                color: isActive('/admin/notice-managment') ? '#4C2B87' : 'white',
              }} />
            </Box>
          </ListItemIcon>
          {open && <ListItemText primary="Notice" sx={styles.text} />}
        </ListItemButton>

        {/* Admin Profile */}
        <ListItemButton 
          component={Link} 
          to="/admin/profile" 
          sx={{
            ...styles.listItem,
            backgroundColor: isActive('/admin/profile') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
        >
          <ListItemIcon>
            <Box sx={{
              ...styles.iconContainer,
              backgroundColor: isActive('/admin/profile') ? 'white' : 'rgba(255, 255, 255, 0.1)',
            }}>
              <PersonIcon sx={{
                ...styles.icon,
                color: isActive('/admin/profile') ? '#4C2B87' : 'white',
              }} />
            </Box>
          </ListItemIcon>
          {open && <ListItemText primary="Profile" sx={styles.text} />}
        </ListItemButton>
      </List>
      
      {open && (
        <Box sx={styles.bottomSection}>
          <Typography variant="caption" sx={styles.bottomText}>
            Admin Portal v1.0
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

export default AdminSideBar;