import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton,
  Paper,
  CircularProgress,
  Switch,
  FormControlLabel,
  Chip,
  Card,
  CardContent,
  Divider,
  Alert,
  Snackbar
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SubjectIcon from "@mui/icons-material/Subject";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TeacherSideBar from "../../components/TeacherSidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const MeetingAttendancePage = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/meetings/${meetingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeeting(res.data);
      } catch (error) {
        console.error("Error fetching meeting details:", error);
        setSnackbar({
          open: true,
          message: "Failed to load meeting details",
          severity: "error"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMeeting();
  }, [meetingId]);

  const toggleDrawer = () => setOpen(!open);

  const handleAttendanceChange = (studentId) => {
    if (!meeting) return;
    
    const updatedAttendance = meeting.attendance.map((s) =>
      s._id === studentId
        ? {
            ...s,
            status: s.status === "Present" ? "Absent" : "Present",
          }
        : s
    );
    
    setMeeting({ ...meeting, attendance: updatedAttendance });
  };
  
  const saveAttendance = async () => {
    if (!meeting) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/meetings/update-attendance/${meetingId}`,
        { attendance: meeting.attendance },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSnackbar({
        open: true,
        message: "Attendance saved successfully",
        severity: "success"
      });
    } catch (error) {
      console.error("Error saving attendance:", error);
      setSnackbar({
        open: true,
        message: "Failed to save attendance",
        severity: "error"
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleGoBack = () => {
    navigate('/teacher/meetings');
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
        
        {/* Back to Meetings Button at top */}
        <Box sx={{ maxWidth: '800px', margin: '0 auto', mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{
              borderColor: '#8E2DE2',
              color: '#8E2DE2',
              borderRadius: '8px',
              '&:hover': {
                borderColor: '#8E2DE2',
                backgroundColor: 'rgba(142, 45, 226, 0.05)',
              }
            }}
          >
            Back to Meetings
          </Button>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress sx={{ color: '#8E2DE2' }} />
          </Box>
        ) : !meeting ? (
          <Paper
            elevation={0}
            sx={{
              maxWidth: '800px',
              width: '100%',
              margin: '0 auto',
              p: 4,
              borderRadius: '16px',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Typography variant="h5" sx={{ color: '#4A5568', mb: 2 }}>
              Meeting not found
            </Typography>
            <Typography variant="body1" sx={{ color: '#718096' }}>
              The meeting you're looking for doesn't exist or you don't have permission to view it.
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              sx={{
                mt: 3,
                background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
                borderRadius: '8px',
                '&:hover': {
                  opacity: 0.9,
                }
              }}
            >
              Back to Meetings
            </Button>
          </Paper>
        ) : (
          <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
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
                background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
                color: 'white',
                padding: '24px 32px',
              }}>
                <Typography variant="h4" sx={{
                  fontSize: '28px',
                  fontWeight: '700',
                  mb: 1
                }}>
                  Meeting Attendance
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Mark and save attendance for this meeting
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Card sx={{ 
                  mb: 4, 
                  backgroundColor: 'rgba(142, 45, 226, 0.05)',
                  border: '1px solid rgba(142, 45, 226, 0.1)',
                  boxShadow: 'none',
                  borderRadius: '12px'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon sx={{ color: '#8E2DE2' }} />
                        <Typography sx={{ color: '#4A5568', fontWeight: 500 }}>
                          Date: {meeting.date}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon sx={{ color: '#8E2DE2' }} />
                        <Typography sx={{ color: '#4A5568', fontWeight: 500 }}>
                          Time: {meeting.time}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 2 }}>
                      <SubjectIcon sx={{ color: '#8E2DE2', mt: 0.5 }} />
                      <Typography sx={{ color: '#4A5568' }}>
                        <strong>Agenda:</strong> {meeting.agenda}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                
                <Typography variant="h6" sx={{ mb: 2, color: '#4A5568', fontWeight: 600 }}>
                  Student Attendance
                </Typography>
                
                <Box sx={{ 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  mb: 3
                }}>
                  <Box sx={{ backgroundColor: '#F7FAFC', p: 2, borderBottom: '1px solid #E2E8F0' }}>
                    <Typography sx={{ fontWeight: 600, color: '#4A5568' }}>
                      Mark students present or absent
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  {meeting.attendance.map((student, index) => (
                    <Box key={student._id}>
                      <Box sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: index % 2 === 0 ? 'white' : '#F7FAFC',
                      }}>
                        <Box>
                          <Typography sx={{ fontWeight: 500, color: '#2D3748' }}>
                            {student.student.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#718096' }}>
                            Roll Number: {student.student.rollNumber}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Chip 
                            label={student.status}
                            size="small"
                            sx={{
                              backgroundColor: student.status === "Present" 
                                ? 'rgba(72, 187, 120, 0.1)' 
                                : 'rgba(245, 101, 101, 0.1)',
                              color: student.status === "Present" 
                                ? '#2F855A' 
                                : '#C53030',
                              fontWeight: 600,
                              fontSize: '12px',
                              border: `1px solid ${student.status === "Present" 
                                ? 'rgba(72, 187, 120, 0.2)' 
                                : 'rgba(245, 101, 101, 0.2)'}`,
                            }}
                          />
                          
                          <FormControlLabel
                            control={
                              <Switch 
                                checked={student.status === "Present"}
                                onChange={() => handleAttendanceChange(student._id)}
                                color="secondary"
                                sx={{
                                  '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: '#8E2DE2',
                                  },
                                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#8E2DE2',
                                  },
                                }}
                              />
                            }
                            label=""
                          />
                        </Box>
                      </Box>
                      {index < meeting.attendance.length - 1 && <Divider />}
                    </Box>
                  ))}
                </Box>
                
                {/* Action Buttons - only Save Attendance and Back to Meetings */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: 3,
                  flexWrap: 'wrap'
                }}>
                  <Button
                    variant="outlined"
                    onClick={handleGoBack}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      borderColor: '#718096',
                      color: '#718096',
                      borderRadius: '8px',
                      padding: '10px 24px',
                      '&:hover': {
                        borderColor: '#4A5568',
                        backgroundColor: 'rgba(74, 85, 104, 0.05)',
                      }
                    }}
                  >
                    Back to Meetings
                  </Button>
                  
                  <Button
                    variant="contained"
                    onClick={saveAttendance}
                    disabled={saving}
                    startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
                      borderRadius: '8px',
                      padding: '10px 24px',
                      '&:hover': {
                        opacity: 0.9,
                        boxShadow: '0 4px 12px rgba(142, 45, 226, 0.2)'
                      }
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Attendance'}
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
        
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
    </Box>
  );
};

export default MeetingAttendancePage;