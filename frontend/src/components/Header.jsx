import React from 'react';
import AccountMenu from './AccountMenu'; // Profile and logout options
import '../styles/header.css';

const Header = ({ title, open }) => {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3492eb',
    padding: '10px 20px',
    color: '#ffffff',
    transition: 'margin-left 0.3s ease',
    marginLeft: open ? '240px' : '70px', // Adjust based on sidebar
    width: 'calc(100% - 240px)', // Ensure header takes the full width
  };

  return (
    <div style={headerStyle}>
      <h2>{title}</h2>
      <AccountMenu />
    </div>
  );
};

export default Header;
