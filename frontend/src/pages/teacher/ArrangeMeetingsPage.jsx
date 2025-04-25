import React, { useState } from "react";
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
  CircularProgress
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SendIcon from "@mui/icons-material/Send";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TeacherSideBar from "../../components/TeacherSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const ArrangeMeetingsPage = () => {
  const [open, setOpen] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [agenda, setAgenda] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);
  const handleCloseNotification = () => navigate("/teacher/dashboard");

  const handleArrangeMeeting = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/meetings/create-meeting",
        { date, time, agenda },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      console.log("Meeting arranged successfully:", response.data);
      setIsSuccessful(true);
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      setIsSuccessful(false);
      setNotificationOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh",
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

      {/* Main Content */}
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
              <EventNoteIcon sx={{ fontSize: 32 }} />
              <Typography variant="h4" sx={{
                fontSize: '28px',
                fontWeight: '700',
                mb: 1
              }}>
                Arrange Meeting
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, ml: 6 }}>
              Schedule a new meeting and notify students automatically
            </Typography>
          </Box>
          
          <Box sx={{ p: 4 }}>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#8E2DE2',
                    },
                  }
                }}
                InputLabelProps={{ shrink: true }}
                required
              />
              
              <TextField
                label="Time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#8E2DE2',
                    },
                  }
                }}
                InputLabelProps={{ shrink: true }}
                required
              />
              
              <TextField
                label="Agenda"
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={{ 
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#8E2DE2',
                    },
                  }
                }}
                placeholder="Enter meeting agenda, topics to discuss, etc."
                required
              />
              
              <Button
                variant="contained"
                onClick={handleArrangeMeeting}
                disabled={submitting || !date || !time || !agenda}
                startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
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
                }}
              >
                {submitting ? 'Scheduling...' : 'Schedule Meeting'}
              </Button>
            </form>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar for success/error message */}
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {isSuccessful ? (
          <Alert 
            onClose={handleCloseNotification} 
            severity="success"
            variant="filled"
            sx={{ width: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
          >
            Meeting arranged successfully!
          </Alert>
        ) : (
          <Alert 
            onClose={handleCloseNotification} 
            severity="error"
            variant="filled"
            sx={{ width: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
          >
            Failed to arrange meeting. Please try again.
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default ArrangeMeetingsPage;