import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton,
  Paper,
  Snackbar,
  Alert,
  Divider,
  CircularProgress,
  Chip,
  Avatar
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import TeacherSideBar from "../../components/TeacherSidebar";
import axios from "axios";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const TeacherQueries = () => {
  const [open, setOpen] = useState(true);
  const [queries, setQueries] = useState([]);
  const [activeQuery, setActiveQuery] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/complaints/teacher-complaints", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setQueries(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleSubmitResponse = async (queryId) => {
    if (!responseText.trim()) return;
    
    try {
      setResponding(true);
      await axios.post(
        "/api/complaints/respond",
        { complaintId: queryId, response: responseText },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setQueries((prevQueries) => prevQueries.filter((query) => query._id !== queryId));
      setActiveQuery(null);
      setResponseText("");
      setSnackbarMessage("Response submitted successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error submitting response:", error);
      setSnackbarMessage("Failed to submit response. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setResponding(false);
    }
  };

  const handleCancelComplaint = async (queryId) => {
    try {
      setCancelling(true);
      await axios.delete(`/api/complaints/cancel/teacher/${queryId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setSnackbarMessage("Query cancelled successfully!");
      setOpenSnackbar(true);
      setQueries((prevQueries) => prevQueries.filter((query) => query._id !== queryId));
    } catch (error) {
      console.error("Error canceling complaint:", error);
      setSnackbarMessage("Failed to cancel query. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setCancelling(false);
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
        
        <Paper 
          elevation={0}
          sx={{
            maxWidth: '900px',
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
                Student Queries
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, ml: 5 }}>
              View and respond to questions and concerns from students
            </Typography>
          </Box>
          
          <Box sx={{ p: 4 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress sx={{ color: '#8E2DE2' }} />
              </Box>
            ) : queries.length === 0 ? (
              <Box 
                sx={{ 
                  backgroundColor: 'rgba(142, 45, 226, 0.05)', 
                  borderRadius: '8px',
                  textAlign: 'center',
                  p: 4,
                  color: '#8E2DE2',
                  border: '1px dashed rgba(142, 45, 226, 0.3)'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No Pending Queries</Typography>
                <Typography>You don't have any student queries that need your attention right now.</Typography>
              </Box>
            ) : (
              <List>
                {queries.map((query) => (
                  <Paper 
                    key={query._id} 
                    elevation={0}
                    sx={{
                      mb: 3,
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      overflow: 'hidden',
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      }
                    }}
                  >
                    <Box sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(142, 45, 226, 0.1)', color: '#8E2DE2' }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2D3748' }}>
                            {query.complaintBy.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#718096' }}>
                            {query.complaintBy.email}
                          </Typography>
                        </Box>
                        <Chip 
                          label="New Query" 
                          size="small"
                          sx={{
                            ml: 'auto',
                            backgroundColor: 'rgba(66, 153, 225, 0.1)',
                            color: '#3182CE',
                            fontWeight: 600,
                            border: '1px solid rgba(66, 153, 225, 0.2)',
                          }}
                        />
                      </Box>
                      
                      <Box 
                        sx={{ 
                          p: 3, 
                          backgroundColor: '#F7FAFC', 
                          borderRadius: '8px',
                          mb: 3,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        <Typography variant="body1" sx={{ color: '#4A5568' }}>
                          {query.description}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() => handleCancelComplaint(query._id)}
                          disabled={cancelling}
                          startIcon={cancelling ? <CircularProgress size={20} /> : <CancelIcon />}
                          sx={{
                            borderColor: '#FF6B6B',
                            color: '#FF6B6B',
                            borderRadius: '8px',
                            '&:hover': {
                              borderColor: '#FF6B6B',
                              backgroundColor: 'rgba(255, 107, 107, 0.05)',
                            }
                          }}
                        >
                          {cancelling ? 'Cancelling...' : 'Cancel'}
                        </Button>
                        
                        <Button
                          variant="contained"
                          onClick={() => setActiveQuery(activeQuery?._id === query._id ? null : query)}
                          startIcon={<ReplyIcon />}
                          sx={{
                            background: 'linear-gradient(to right, #FF6B6B, #8E2DE2)',
                            borderRadius: '8px',
                            '&:hover': {
                              opacity: '0.9',
                              boxShadow: '0 4px 12px rgba(142, 45, 226, 0.2)'
                            }
                          }}
                        >
                          {activeQuery?._id === query._id ? 'Cancel Response' : 'Respond'}
                        </Button>
                      </Box>
                      
                      {activeQuery?._id === query._id && (
                        <Box 
                          sx={{ 
                            mt: 3, 
                            pt: 3, 
                            borderTop: '1px dashed #E2E8F0'
                          }}
                        >
                          <TextField
                            label="Your Response"
                            multiline
                            rows={4}
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            fullWidth
                            sx={{ 
                              mb: 2,
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '&.Mui-focused fieldset': {
                                  borderColor: '#8E2DE2',
                                },
                              }
                            }}
                            placeholder="Type your response here..."
                          />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              variant="contained"
                              onClick={() => handleSubmitResponse(query._id)}
                              disabled={responding || !responseText.trim()}
                              startIcon={responding ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                              sx={{
                                background: 'linear-gradient(to right, #FF6B6B, #8E2DE2)',
                                borderRadius: '8px',
                                '&:hover': {
                                  opacity: '0.9',
                                  boxShadow: '0 4px 12px rgba(142, 45, 226, 0.2)'
                                }
                              }}
                            >
                              {responding ? 'Submitting...' : 'Submit Response'}
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                ))}
              </List>
            )}
          </Box>
        </Paper>
      </Box>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeacherQueries;