import React, { useState } from "react";
import { 
  Box, 
  CssBaseline, 
  Toolbar, 
  Drawer, 
  Snackbar, 
  Alert, 
  Typography, 
  IconButton, 
  TextField, 
  Button,
  Paper,
  CircularProgress
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SendIcon from "@mui/icons-material/Send";
import StudentSideBar from "./StudentSideBar";
import axios from "axios";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const ComplaintForm = () => {
  const [open, setOpen] = useState(true);
  const [complaint, setComplaint] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated. Please log in again.");
      setSubmitting(false);
      return;
    }

    const complaintData = {
      teacherEmail,  // Email of the teacher
      description: complaint, // Complaint description
    };

    try {
      const response = await axios.post("/api/complaints/submit", complaintData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Complaint submitted:", response.data);
      setComplaint("");
      setTeacherEmail("");
      setOpenSnackbar(true);
      setSubmitting(false);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setError(error.response?.data?.message || "Error submitting complaint");
      setSubmitting(false);
    }
  };

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(66, 153, 225, 0.1) 0%, transparent 45%), radial-gradient(circle at 75% 75%, rgba(237, 100, 166, 0.1) 0%, transparent 45%)',
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }
          }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <StudentSideBar open={open} />
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
            background: 'linear-gradient(135deg, #38bdf8 0%, #0c4a6e 100%)',
            color: 'white',
            padding: '24px 32px',
            borderBottom: '1px solid #E2E8F0',
          }}>
            <Typography variant="h4" sx={{
              fontSize: '28px',
              fontWeight: '700',
              mb: 1
            }}>
              Submit Your Query
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Fill out the form below to send your query to a teacher or counselor
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

            <form onSubmit={handleSubmit}>
              <TextField
                label="Teacher's Email"
                variant="outlined"
                fullWidth
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
                placeholder="Enter the teacher's email address"
                required
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#3182CE',
                    },
                  }
                }}
              />
              
              <TextField
                label="Your Query"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="Describe your issue or question in detail..."
                required
                sx={{ 
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#3182CE',
                    },
                  }
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                  startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  sx={{
                    backgroundColor: '#3182CE',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#2B6CB0',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)'
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit Query'}
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          severity="success"
          variant="filled"
          sx={{ width: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
        >
          Your query has been submitted. A counselor will contact you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComplaintForm;