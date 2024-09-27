import React from 'react';
import { ListItem, ListItemIcon, ListItemText, List } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import NotificationsIcon from '@mui/icons-material/Notifications';

const StudentSideBar = ({ open }) => {
  return (
    <List sx={open ? styles.drawerOpen : styles.drawerClosed}>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="Home" sx={styles.text} />
      </ListItem>

      <ListItem button component={Link} to="/profile">
        <ListItemIcon>
          <PersonIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="Profile" sx={styles.text} />
      </ListItem>

      <ListItem button component={Link} to="/complaints/add">
        <ListItemIcon>
          <ReportProblemIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="Add Complaint" sx={styles.text} />
      </ListItem>

      <ListItem button component={Link} to="/complaints/view">
        <ListItemIcon>
          <ReportProblemIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="View Complaints" sx={styles.text} />
      </ListItem>

      {/* Add Notification Menu */}
      <ListItem button component={Link} to="/notifications">
        <ListItemIcon>
          <NotificationsIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="Notifications" sx={styles.text} />
      </ListItem>
    </List>
  );
};

// Styles
const styles = {
  drawerOpen: {
    backgroundColor: '#1e3a8a', // Dark blue background
    color: 'white', // White text
    width: '240px',
    transition: 'width 0.3s ease',
  },
  drawerClosed: {
    backgroundColor: '#1e3a8a', // Dark blue background
    color: 'white',
    width: '70px', // Minimized width
    transition: 'width 0.3s ease',
  },
  icon: {
    color: 'white', // White icon color
  },
  text: {
    color: 'white', // White text color
  },
};

export default StudentSideBar;
