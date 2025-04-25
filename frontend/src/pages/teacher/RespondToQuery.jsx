import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  CircularProgress,
  Divider
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SendIcon from "@mui/icons-material/Send";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import { useParams, useNavigate } from "react-router-dom";
import TeacherSideBar from "../../components/TeacherSidebar";
import axios from "axios";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const RespondToQuery = () => {
  const [open, setOpen] = useState(true);
  const [response, setResponse] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { queryId } = useParams();
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  // Fetch complaint details
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/complaints/${queryId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setComplaint(res.data);
      } catch (error) {
        console.error("Error fetching complaint details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [queryId]);

  // Submit response to backend
  const handleResponseSubmit = async () => {
    if (!response.trim()) return;
    
    try {
      setSubmitting(true);
      await axios.post(
        `/api/complaints/respond`,
        { complaintId: queryId, response },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setOpenSnackbar(true);
      
      // Navigate after brief delay to allow snackbar to be seen
      setTimeout(() => {
        navigate("/teacher/queries");
      }, 2000);
    } catch (error) {
      console.error("Error submitting response:", error);
    } finally {
      setSubmitting(false);
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
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress sx={{ color: '#8E2DE2' }} />
          </Box>
        ) : (
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
                <QuestionAnswerIcon sx={{ fontSize: 28 }} />
                <Typography variant="h4" sx={{
                  fontSize: '28px',
                  fontWeight: '700',
                  mb: 1
                }}>
                  Respond to Query
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.9, ml: 5 }}>
                Read and respond to the student's query
              </Typography>
            </Box>
            
            <Box sx={{ p: 4 }}>
              <Box 
                sx={{ 
                  p: 3, 
                  backgroundColor: 'rgba(142, 45, 226, 0.05)', 
                  borderRadius: '12px',
                  mb: 4,
                  border: '1px solid rgba(142, 45, 226, 0.1)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                  <PersonIcon sx={{ color: '#8E2DE2' }} />
                  <Typography variant="h6" sx={{ color: '#4A5568', fontWeight: 600 }}>
                    Student Information
                  </Typography>
                </Box>
                
                <Box sx={{ pl: 4 }}>
                  <Typography variant="body1" sx={{ color: '#4A5568', mb: 1 }}>
                    <strong>Name:</strong> {complaint?.complaintBy?.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#4A5568' }}>
                    <strong>Email:</strong> {complaint?.complaintBy?.email}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                  <DescriptionIcon sx={{ color: '#8E2DE2' }} />
                  <Typography variant="h6" sx={{ color: '#4A5568', fontWeight: 600 }}>
                    Query Details
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    p: 3, 
                    backgroundColor: '#f7fafc',
                    borderRadius: '8px',
                    color: '#2D3748',
                    border: '1px solid #E2E8F0',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {complaint?.description}
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 4 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#4A5568', fontWeight: 600, mb: 2 }}>
                  Your Response
                </Typography>
                
                <TextField
                  multiline
                  rows={6}
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  fullWidth
                  placeholder="Type your response here..."
                  sx={{ 
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&.Mui-focused fieldset': {
                        borderColor: '#8E2DE2',
                      },
                    }
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleResponseSubmit}
                  disabled={submitting || !response.trim()}
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
                  {submitting ? 'Submitting...' : 'Submit Response'}
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success"
          variant="filled"
          sx={{ width: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
        >
          Response submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RespondToQuery;