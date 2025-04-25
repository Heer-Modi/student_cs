import React, { useState } from 'react';
import {
  Box,
  TextField,
  CssBaseline,
  Toolbar,
  Drawer,
  Snackbar,
  Alert,
  Typography,
  IconButton,
  Button,
  Paper,
  CircularProgress,
  Divider
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TeacherSideBar from '../../components/TeacherSidebar';
import axios from 'axios';

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const UploadDocumentsPage = () => {
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const toggleDrawer = () => setOpen(!open);
  const handleCloseNotification = () => setNotificationOpen(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSendDocument = async () => {
    setError('');
    if (!title || !description || !file) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      setUploading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/documents/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload success:', response.data);
      setTitle('');
      setDescription('');
      setFile(null);
      setNotificationOpen(true);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload document. Please try again.');
    } finally {
      setUploading(false);
    }
  };

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

      {/* Main content */}
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
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <UploadFileIcon sx={{ fontSize: 28 }} />
              <Typography variant="h4" sx={{
                fontSize: '28px',
                fontWeight: '700',
                mb: 1
              }}>
                Upload Documents
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, ml: 5 }}>
              Share study materials and resources with your students
            </Typography>
          </Box>
          
          <Box sx={{ p: 4 }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ mb: 3, borderRadius: '8px' }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}
            
            <form style={{ width: '100%' }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1.5 }}>
                  <TitleIcon sx={{ mt: 0.5, color: '#8E2DE2' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#4A5568' }}>
                    Document Title
                  </Typography>
                </Box>
                
                <TextField
                  placeholder="Enter a descriptive title for your document"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  sx={{ 
                    ml: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&.Mui-focused fieldset': {
                        borderColor: '#8E2DE2',
                      },
                    }
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1.5 }}>
                  <DescriptionIcon sx={{ mt: 0.5, color: '#8E2DE2' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#4A5568' }}>
                    Document Description
                  </Typography>
                </Box>
                
                <TextField
                  placeholder="Provide details about the document's content"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
                  sx={{ 
                    ml: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&.Mui-focused fieldset': {
                        borderColor: '#8E2DE2',
                      },
                    }
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1.5 }}>
                  <InsertDriveFileIcon sx={{ mt: 0.5, color: '#8E2DE2' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#4A5568' }}>
                    Upload File
                  </Typography>
                </Box>
                
                <Box 
                  sx={{ 
                    ml: 4, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    border: '2px dashed rgba(142, 45, 226, 0.3)',
                    borderRadius: '12px',
                    py: 4,
                    px: 2,
                    backgroundColor: 'rgba(142, 45, 226, 0.03)',
                  }}
                >
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      mb: 2,
                      borderColor: '#8E2DE2',
                      color: '#8E2DE2',
                      borderRadius: '8px',
                      padding: '10px 24px',
                      '&:hover': {
                        borderColor: '#8E2DE2',
                        backgroundColor: 'rgba(142, 45, 226, 0.05)',
                      }
                    }}
                  >
                    Choose File
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                  
                  {file ? (
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        padding: '8px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(142, 45, 226, 0.08)',
                        color: '#8E2DE2',
                        fontWeight: 500,
                      }}
                    >
                      <InsertDriveFileIcon fontSize="small" />
                      <Typography variant="body2">{file.name}</Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ color: '#718096', textAlign: 'center' }}>
                      Drag & drop your file here or click to browse
                    </Typography>
                  )}
                </Box>
              </Box>
              
              <Divider sx={{ mb: 4 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleSendDocument}
                  disabled={uploading || !title || !description || !file}
                  startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  sx={{
                    background: 'linear-gradient(to right, #FF6B6B, #8E2DE2)',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textTransform: 'none',
                    minWidth: '200px',
                    '&:hover': {
                      opacity: '0.9',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(142, 45, 226, 0.3)'
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {uploading ? 'Uploading...' : 'Upload & Share Document'}
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>

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
          Document uploaded and sent to students successfully!
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

export default UploadDocumentsPage;