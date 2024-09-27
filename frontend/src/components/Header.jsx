import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import AccountMenu from './AccountMenu'; // Profile and logout options

const Header = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
