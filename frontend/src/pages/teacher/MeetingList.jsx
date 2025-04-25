import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CssBaseline,
  Drawer,
  Toolbar,
  IconButton,
  Button,
  CircularProgress,
  Chip
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TeacherSideBar from "../../components/TeacherSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/meetings/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeetings(res.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMeetings();
  }, []);

  const handleMeetingNavigation = (meetingId) => {
    navigate(`/teacher/meeting-attendance/${meetingId}`);
  };

  const toggleDrawer = () => setSidebarOpen(!sidebarOpen);
  
  const isPastMeeting = (dateStr, timeStr) => {
    const meetingDate = new Date(`${dateStr}T${timeStr}`);
    return meetingDate < new Date();
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
          width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
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
            {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <TeacherSideBar open={sidebarOpen} />
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
        }}
      >
        <Toolbar />
        
        <Paper
          elevation={0}
          sx={{
            maxWidth: '1000px',
            width: '100%',
            margin: '0 auto',
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
              <CalendarTodayIcon sx={{ fontSize: 28 }} />
              <Typography variant="h4" sx={{
                fontSize: '28px',
                fontWeight: '700',
                mb: 1
              }}>
                Meeting Schedule
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, ml: 5 }}>
              View upcoming and past meetings and manage attendance
            </Typography>
          </Box>
          
          <Box sx={{ p: 3 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress sx={{ color: '#8E2DE2' }} />
              </Box>
            ) : meetings.length === 0 ? (
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
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No Meetings Found</Typography>
                <Typography>You haven't scheduled any meetings yet.</Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/teacher/arrange-meetings')}
                  sx={{
                    background: 'linear-gradient(to right, #FF6B6B, #8E2DE2)',
                    mt: 2,
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                      opacity: 0.9,
                    }
                  }}
                >
                  Schedule a Meeting
                </Button>
              </Box>
            ) : (
              <TableContainer sx={{ boxShadow: 'none' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        fontWeight: '600', 
                        color: '#4A5568',
                        fontSize: '14px',
                        borderBottom: '2px solid #E2E8F0',
                      }}>Agenda</TableCell>
                      <TableCell sx={{ 
                        fontWeight: '600', 
                        color: '#4A5568',
                        fontSize: '14px',
                        borderBottom: '2px solid #E2E8F0',
                      }}>Date</TableCell>
                      <TableCell sx={{ 
                        fontWeight: '600', 
                        color: '#4A5568',
                        fontSize: '14px',
                        borderBottom: '2px solid #E2E8F0',
                      }}>Time</TableCell>
                      <TableCell sx={{ 
                        fontWeight: '600', 
                        color: '#4A5568',
                        fontSize: '14px',
                        borderBottom: '2px solid #E2E8F0',
                      }}>Status</TableCell>
                      <TableCell sx={{ 
                        fontWeight: '600', 
                        color: '#4A5568',
                        fontSize: '14px',
                        borderBottom: '2px solid #E2E8F0',
                      }}>Attendance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {meetings.map((meeting) => {
                      const isPast = isPastMeeting(meeting.date, meeting.time);
                      
                      return (
                        <TableRow
                          key={meeting._id}
                          sx={{ 
                            '&:hover': { backgroundColor: 'rgba(142, 45, 226, 0.03)' },
                            transition: 'background-color 0.2s',
                          }}
                        >
                          <TableCell sx={{ color: '#2D3748', fontWeight: 500 }}>
                            {meeting.agenda}
                          </TableCell>
                          <TableCell sx={{ color: '#4A5568' }}>{meeting.date}</TableCell>
                          <TableCell sx={{ color: '#4A5568' }}>{meeting.time}</TableCell>
                          <TableCell>
                            <Chip 
                              label={isPast ? "Completed" : "Upcoming"} 
                              size="small"
                              sx={{
                                backgroundColor: isPast ? 'rgba(72, 187, 120, 0.1)' : 'rgba(66, 153, 225, 0.1)',
                                color: isPast ? '#2F855A' : '#2B6CB0',
                                fontWeight: 600,
                                fontSize: '12px',
                                border: `1px solid ${isPast ? 'rgba(72, 187, 120, 0.2)' : 'rgba(66, 153, 225, 0.2)'}`,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<VisibilityIcon />}
                              onClick={() => handleMeetingNavigation(meeting._id)}
                              sx={{
                                borderColor: '#8E2DE2',
                                color: '#8E2DE2',
                                borderRadius: '8px',
                                textTransform: 'none',
                                '&:hover': {
                                  borderColor: '#8E2DE2',
                                  backgroundColor: 'rgba(142, 45, 226, 0.04)',
                                }
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MeetingList;