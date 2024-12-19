import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import BugReportIcon from '@mui/icons-material/BugReport';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const AdminSideBar = ({ open }) => {
  const menuItems = [
    { text: 'User Management', icon: <GroupIcon />, path: '/admin/user-management' },
    { text: 'Complaints Management', icon: <BugReportIcon />, path: '/admin/complaints-management' },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/admin/notifications-management' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin/analytics' },
  ];

  return (
    <List>
      {menuItems.map((item, index) => (
        <ListItem button key={index} component={Link} to={item.path}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          {open && <ListItemText primary={item.text} />}
        </ListItem>
      ))}
    </List>
  );
};

export default AdminSideBar;
