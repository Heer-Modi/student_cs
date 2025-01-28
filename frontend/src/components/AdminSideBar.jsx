import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, List } from '@mui/material'; // Use ListItemButton instead of ListItem
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; // Import Home Icon
import GroupIcon from '@mui/icons-material/Group';
import BugReportIcon from '@mui/icons-material/BugReport';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonIcon from '@mui/icons-material/Person'; // Import Profile Icon

// Styles
const styles = {
  drawerOpen: {
    backgroundColor: '#3f51b5', // Dark blue for sidebar
    color: 'black',
    width: '240px',
    transition: 'width 0.3s ease', // Smooth transition
    paddingTop: '20px',
  },
  drawerClosed: {
    backgroundColor: '#3f51b5',
    color: 'black',
    width: '70px',
    transition: 'width 0.3s ease', // Smooth transition when closed
    paddingTop: '20px',
  },
  icon: {
    color: '#f6d673', // Yellow icon for emphasis
    fontSize: '1.5rem',
  },
  text: {
    color: '#ffffff', // Light gray text for readability
    fontWeight: 500,
    transition: 'opacity 0.3s ease',
  },
  listItem: {
    padding: '10px 20px',
    '&:hover': {
      backgroundColor: '#14305d', // Slightly lighter on hover
    },
  },
};

const AdminSideBar = ({ open }) => {
  const menuItems = [
    { text: 'Home', icon: <HomeIcon sx={styles.icon} />, path: '/admin/dashboard' }, // Added Home
    { text: 'User Management', icon: <GroupIcon sx={styles.icon} />, path: '/admin/user-management' },
    { text: 'Complaints Management', icon: <BugReportIcon sx={styles.icon} />, path: '/admin/complaints-management' },
    { text: 'Notice', icon: <NotificationsIcon sx={styles.icon} />, path: '/admin/notice-managment' },
    { text: 'Analytics', icon: <AnalyticsIcon sx={styles.icon} />, path: '/admin/analytics' },
    { text: 'Profile', icon: <PersonIcon sx={styles.icon} />, path: '/admin/profile' },
  ];

  return (
    <List sx={open ? styles.drawerOpen : styles.drawerClosed}>
      {menuItems.map((item, index) => (
        <ListItemButton key={index} component={Link} to={item.path} sx={styles.listItem}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          {open && <ListItemText primary={item.text} sx={styles.text} />}
        </ListItemButton>
      ))}
    </List>
  );
};

export default AdminSideBar;
