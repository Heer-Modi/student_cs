import React, { useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem,
  Box,
  Badge
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = ({ title, open, profilePhoto }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState({});
  const [notifications, setNotifications] = useState(3); // Example notification count
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileNavigation = () => {
    navigate('/student/profile');
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    handleClose();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/students/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.student);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <AppBar 
      position="fixed" 
      sx={{
        background: 'linear-gradient(90deg, #38bdf8 0%, #0c4a6e 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        width: `calc(100% - ${open ? '240px' : '70px'})`,
        marginLeft: open ? '240px' : '70px',
        zIndex: 1100,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600, 
            fontSize: '20px', 
            letterSpacing: '0.5px',
            color: 'white',
            flexGrow: 0,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: '30%',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
            }
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            size="large" 
            color="inherit"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {/*<Badge badgeContent={notifications} color="error">
              <NotificationsIcon sx={{ color: 'white' }} />
            </Badge> */ }
          </IconButton> 
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
            onClick={handleProfileClick}
          >
            <Avatar 
              src={profile.photo} 
              alt="Profile" 
              sx={{ 
                width: 38, 
                height: 38, 
                border: '2px solid white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              }} 
            />
            {profile.name && (
              <Typography 
                sx={{ 
                  color: 'white', 
                  fontWeight: 500,
                  fontSize: '14px',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                {profile.name?.split(' ')[0]}
              </Typography>
            )}
          </Box>
          
          <Menu 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                minWidth: '180px',
                border: '1px solid #E2E8F0',
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #E2E8F0' }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1A365D' }}>
                {profile.name}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#718096' }}>
                {profile.rollNumber}
              </Typography>
            </Box>
            
            <MenuItem 
              onClick={handleProfileNavigation}
              sx={{
                display: 'flex',
                gap: 1.5,
                py: 1.5,
                '&:hover': { backgroundColor: '#F7FAFC' }
              }}
            >
              <AccountCircleIcon fontSize="small" sx={{ color: '#3182CE' }} />
              <Typography sx={{ fontSize: '14px' }}>Profile</Typography>
            </MenuItem>
            
            <MenuItem 
              onClick={handleLogout}
              sx={{
                display: 'flex',
                gap: 1.5,
                py: 1.5,
                color: '#E53E3E',
                '&:hover': { backgroundColor: '#FFF5F5' }
              }}
            >
              <ExitToAppIcon fontSize="small" />
              <Typography sx={{ fontSize: '14px' }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;