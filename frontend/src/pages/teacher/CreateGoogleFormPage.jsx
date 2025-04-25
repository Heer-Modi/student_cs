import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Snackbar, 
  Alert, 
  CssBaseline, 
  Toolbar, 
  Drawer, 
  IconButton, 
  Paper,
  Link as MuiLink,
  CircularProgress
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TeacherSideBar from '../../components/TeacherSidebar';

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const CreateGoogleFormPage = () => {
  const [open, setOpen] = useState(true);
  const [formLink, setFormLink] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleCreateForm = () => {
    if (!formLink) return;
    
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Google Form link created: ${formLink}`);
      setFormLink(''); // Reset the form link field after submission
      setNotificationOpen(true); // Show success notification
      setIsSending(false);
    }, 1000);
  };

  const toggleDrawer = () => setOpen(!open);
  const handleCloseNotification = () => setNotificationOpen(false);

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: "#f8f9fa",
      backgroundImage: "radial-gradient(circle at 75% 25%, rgba(255, 107, 107, 0.1) 0%, transparent 45%), radial-gradient(circle at 25% 75%, rgba(66, 153, 225, 0.08) 0%, transparent 45%)",
    }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedDrawerWidth,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
            borderRight: 'none',
          },
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          padding: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <IconButton onClick={toggleDrawer} sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }
          }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <TeacherSideBar open={open} />
      </Drawer>

      {/* Main content for Create Google Form */}
      <Box 
        component="main" 
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)`,
          transition: 'margin-left 0.3s ease, width 0.3s ease',
          marginLeft: 0,
        }}
      >
        <Toolbar />
        
        <Paper 
          elevation={0}
          sx={{
            maxWidth: '800px',
            width: '100%',
            margin: '0 auto',
            mt: 4,
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden'
          }}
        >
          <Box sx={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
            color: 'white',
            padding: '24px 32px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <InsertDriveFileIcon sx={{ fontSize: 32 }} />
              <Typography variant="h4" sx={{
                fontSize: '28px',
                fontWeight: '700',
                mb: 1
              }}>
                Create Google Form
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, ml: 6 }}>
              Generate and share forms for assignments, surveys, and quizzes
            </Typography>
          </Box>
          
          <Box sx={{ p: 4 }}>
            <Box sx={{ 
              backgroundColor: 'rgba(142, 45, 226, 0.05)', 
              borderRadius: '12px', 
              p: 3, 
              mb: 4,
              border: '1px dashed rgba(142, 45, 226, 0.3)'
            }}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, color: '#4A5568' }}>
                First, create your form on Google Forms website:
              </Typography>
              
              <Button
                component={MuiLink}
                href="https://workspace.google.com/intl/en_in/lp/forms/?utm_source=bing&utm_medium=cpc&utm_campaign=1707696-Workspace-APAC-IN-en-BKWS-EXA-LV&utm_content=text-ad-none-none-DEV_c-CRE_-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt-Forms-Create-KWID_43700072096400119-kwd-76141587992614:loc-90&userloc_149203-network_o=&utm_term=KW_create%20google%20form&gclid=cc27902a89431b1e46caf71b6f92e76a&gclsrc=3p.ds"
                target="_blank"
                rel="noopener"
                variant="contained"
                endIcon={<OpenInNewIcon />}
                sx={{
                  background: 'linear-gradient(to right, #FF6B6B, #8E2DE2)',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '500',
                  textTransform: 'none',
                  textDecoration: 'none',
                  '&:hover': {
                    opacity: '0.9',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(142, 45, 226, 0.2)'
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Open Google Forms Website
              </Button>
            </Box>

            <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <TextField
                label="Google Form Link"
                value={formLink}
                onChange={(e) => setFormLink(e.target.value)}
                fullWidth
                sx={{ 
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#8E2DE2',
                    },
                  }
                }}
                placeholder="Paste your Google Form link here"
                required
                InputProps={{
                  endAdornment: (
                    <IconButton 
                      onClick={() => navigator.clipboard.readText().then(text => setFormLink(text))}
                      sx={{ color: '#805AD5' }}
                      size="small"
                      title="Paste from clipboard"
                    >
                      <FileCopyIcon />
                    </IconButton>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleCreateForm}
                  disabled={!formLink || isSending}
                  startIcon={isSending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  sx={{
                    background: 'linear-gradient(to right, #FF6B6B, #8E2DE2)',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textTransform: 'none',
                    '&:hover': {
                      opacity: '0.9',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(142, 45, 226, 0.3)'
                    },
                    transition: 'all 0.2s ease',
                    minWidth: '180px',
                  }}
                >
                  {isSending ? 'Sending...' : 'Send Form Link'}
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={notificationOpen}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity="success"
          variant="filled"
          sx={{ width: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
        >
          Google Form link shared successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Import for SendIcon
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default CreateGoogleFormPage;