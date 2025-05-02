import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = ({ title, open, profilePhoto }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const drawerWidth = 240;
  const collapsedDrawerWidth = 70;

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileNavigation = () => {
    navigate('/admin/profile');
    handleClose();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.admin);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'width 0.3s ease, margin 0.3s ease',
        width: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)`,
        marginLeft: `${open ? drawerWidth : collapsedDrawerWidth}px`,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600, 
            fontSize: '1.5rem', 
            letterSpacing: '0.5px',
            color: 'white',
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleProfileClick} sx={{ padding: 0 }}>
            <Avatar 
              src={profile.photo} 
              alt={profile.name || 'Admin'} 
              sx={{ 
                width: 40, 
                height: 40, 
                border: '2px solid white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              }} 
            />
          </IconButton>
          <Menu 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleProfileNavigation} sx={{ py: 1, px: 2.5 }}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ py: 1, px: 2.5 }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;