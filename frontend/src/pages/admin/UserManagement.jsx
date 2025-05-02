import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Drawer,
  Toolbar,
  IconButton,
  Paper,
  Grid,
  Alert,
  Snackbar,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AdminSideBar from "../../components/AdminSideBar";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [studentIdFrom, setStudentIdFrom] = useState("");
  const [studentIdTo, setStudentIdTo] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const toggleDrawer = () => setSidebarOpen(!sidebarOpen);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAllocateStudentsToCounselor = async () => {
    if (!studentIdFrom || !studentIdTo || !teacherEmail) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields before allocating students.",
        severity: "error"
      });
      return;
    }

    try {
      const response = await axios.post(
        "/api/admin/allocate-students",
        { studentIdFrom, studentIdTo, teacherEmail }
      );

      setSnackbar({
        open: true,
        message: response.data.message,
        severity: "success"
      });
      setStudentIdFrom("");
      setStudentIdTo("");
      setTeacherEmail("");
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error allocating students.",
        severity: "error"
      });
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
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
            {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <AdminSideBar open={sidebarOpen} />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sidebarOpen ? drawerWidth : collapsedDrawerWidth}px)`,
          transition: 'margin-left 0.3s ease, width 0.3s ease',
          marginLeft: 0,
          backgroundImage: "radial-gradient(circle at 75% 25%, rgba(76, 43, 135, 0.1) 0%, transparent 45%), radial-gradient(circle at 25% 75%, rgba(76, 43, 135, 0.08) 0%, transparent 45%)",
        }}
      >
        <Toolbar />
        
        <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
          <Paper
            elevation={0}
            sx={{
              overflow: 'hidden',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
              mb: 4
            }}
          >
            <Box sx={{
              background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
              color: 'white',
              padding: '24px 32px',
            }}>
              <Typography variant="h4" sx={{
                fontSize: '28px',
                fontWeight: '700',
                mb: 1
              }}>
                User Management
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Allocate students to counselors and manage user assignments
              </Typography>
            </Box>
            
            <Box sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(76, 43, 135, 0.04)', 
                    borderRadius: '12px',
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Box sx={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(76, 43, 135, 0.1)',
                      mb: 2
                    }}>
                      <SchoolIcon sx={{ color: '#4C2B87', fontSize: '35px' }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: '#2D3748', mb: 1, textAlign: 'center' }}>
                      Student Management
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#718096', textAlign: 'center', mb: 2 }}>
                      Manage student assignments and allocations to counselors
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(76, 43, 135, 0.04)', 
                    borderRadius: '12px',
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Box sx={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(76, 43, 135, 0.1)',
                      mb: 2
                    }}>
                      <PersonIcon sx={{ color: '#4C2B87', fontSize: '35px' }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: '#2D3748', mb: 1, textAlign: 'center' }}>
                      Counselor Assignment
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#718096', textAlign: 'center', mb: 2 }}>
                      Assign counselors to student groups and manage workloads
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mt: 4,
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <Typography variant="h6" sx={{ color: '#2D3748', mb: 3 }}>
                  Allocate Students to Counselor
                </Typography>
                
                <form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Student ID From"
                        variant="outlined"
                        fullWidth
                        value={studentIdFrom}
                        onChange={(e) => setStudentIdFrom(e.target.value)}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#4C2B87',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#4C2B87',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Student ID To"
                        variant="outlined"
                        fullWidth
                        value={studentIdTo}
                        onChange={(e) => setStudentIdTo(e.target.value)}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#4C2B87',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#4C2B87',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Counselor's Email"
                        variant="outlined"
                        fullWidth
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#4C2B87',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#4C2B87',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button
                      variant="contained"
                      onClick={handleAllocateStudentsToCounselor}
                      sx={{
                        background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
                        borderRadius: '8px',
                        padding: '10px 24px',
                        '&:hover': {
                          opacity: 0.9,
                          boxShadow: '0 4px 12px rgba(76, 43, 135, 0.2)'
                        }
                      }}
                    >
                      Allocate Students
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Box>
      
      {/* Snackbar for feedback */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={5000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;