import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert, CssBaseline, Toolbar, Drawer, IconButton, Link as MuiLink } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TeacherSideBar from '../../components/TeacherSidebar';

const drawerWidth = 240;

const CreateGoogleFormPage = () => {
  const [open, setOpen] = useState(true); // Sidebar toggle state
  const [formLink, setFormLink] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleCreateForm = () => {
    console.log(`Google Form link created: ${formLink}`);
    setFormLink(''); // Reset the form link field after submission
    setNotificationOpen(true); // Show success notification
  };

  const toggleDrawer = () => setOpen(!open); // Function to toggle the sidebar open/close
  const handleCloseNotification = () => setNotificationOpen(false);

  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '700px',
      width: '90%',
      padding: '40px',
      backgroundColor: '#f5f7fb',
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    mainContent: {
      flexGrow: 1,
      padding: '24px',
      backgroundColor: '#f6f7f9',
      transition: 'margin-left 0.3s ease',
      marginLeft: open ? `${drawerWidth}px` : '70px',
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : '70px',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
      },
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#3f51b5',
      color: '#fff',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '20px',
      '&:hover': {
        backgroundColor: '#303f9f',
      },
    },
    heading: {
      color: '#545eb5',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: '600',
      textAlign: 'center',
    },
    linkText: {
      marginBottom: '20px',
      fontSize: '16px',
      color: '#3f51b5',
      fontWeight: '500',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <TeacherSideBar open={open} />
      </Drawer>

      {/* Main content for Create Google Form */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>

          <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography variant="h4" style={styles.heading}>
              {/* Link to create a Google Form */}
              <MuiLink href="https://workspace.google.com/intl/en_in/lp/forms/?utm_source=bing&utm_medium=cpc&utm_campaign=1707696-Workspace-APAC-IN-en-BKWS-EXA-LV&utm_content=text-ad-none-none-DEV_c-CRE_-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt-Forms-Create-KWID_43700072096400119-kwd-76141587992614:loc-90&userloc_149203-network_o=&utm_term=KW_create%20google%20form&gclid=cc27902a89431b1e46caf71b6f92e76a&gclsrc=3p.ds" target="_blank" rel="noopener" sx={styles.linkText}>
                Create Google Form
              </MuiLink>
            </Typography>
            {/* Field to paste the actual Google Form link */}
            <TextField
              label="Google Form Link"
              value={formLink}
              onChange={(e) => setFormLink(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
              placeholder="Paste your Google Form link here"
              required
            />

            {/* Save Form Link Button */}
            <Button
              variant="contained"
              sx={styles.button}
              onClick={handleCreateForm}
              disabled={!formLink}
            >
              Send Form Link
            </Button>
          </form>
        </div>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={notificationOpen}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity="success">
          Google Form link created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateGoogleFormPage;
