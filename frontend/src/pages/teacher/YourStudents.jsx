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
  Collapse,
  Avatar,
  Paper,
  CircularProgress,
  InputAdornment,
  Chip,
  Divider
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import TeacherSideBar from "../../components/TeacherSidebar";
import axios from "axios";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const YourStudents = () => {
  const [open, setOpen] = useState(true);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDetails, setOpenDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/teachers/counseling-students", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setStudents(response.data.students);
        }
      } catch (error) {
        console.log("Error fetching students:", error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  // Toggle student profile details
  const toggleDetails = (studentId) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId],
    }));
  };

  // Handle refresh
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/teachers/counseling-students", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setStudents(response.data.students);
      }
    } catch (error) {
      console.log("Error refreshing students:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Filter students based on search input
  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            maxWidth: '1000px',
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
              <PeopleIcon sx={{ fontSize: 28 }} />
              <Typography variant="h4" sx={{
                fontSize: '28px',
                fontWeight: '700',
                mb: 1
              }}>
                Your Students
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, ml: 5 }}>
              View and manage students assigned to you for counseling
            </Typography>
          </Box>
          
          <Box sx={{ p: 4 }}>
            {/* Search Bar */}
            <Box sx={{ mb: 4 }}>
              <TextField
                placeholder="Search by name, ID or department"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#8E2DE2' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#8E2DE2',
                    },
                  }
                }}
              />
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress sx={{ color: '#8E2DE2' }} />
              </Box>
            ) : students.length === 0 ? (
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
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No Students Assigned</Typography>
                <Typography>You don't have any students allocated for counseling yet.</Typography>
              </Box>
            ) : filteredStudents.length === 0 ? (
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
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No Matching Results</Typography>
                <Typography>No students found matching "{searchQuery}".</Typography>
              </Box>
            ) : (
              <List sx={{ width: '100%' }}>
                {filteredStudents.map((student) => (
                  <Paper
                    key={student.rollNumber || student._id}
                    elevation={0}
                    sx={{
                      mb: 3,
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                      }
                    }}
                  >
                    <ListItem sx={{ 
                      p: 0, 
                      display: 'block',
                    }}>
                      <Box sx={{ 
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        position: 'relative',
                      }}>
                        <Avatar 
                          src={student.photo} 
                          alt={student.name}
                          sx={{ 
                            width: 60, 
                            height: 60,
                            border: '2px solid white',
                            boxShadow: '0 4px 12px rgba(142, 45, 226, 0.15)',
                          }}
                        >
                          {!student.photo && <PersonIcon sx={{ fontSize: 32 }} />}
                        </Avatar>
                        
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              color: '#2D3748',
                              mb: 0.5,
                            }}
                          >
                            {student.name || "Name not available"}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <SchoolIcon sx={{ fontSize: 16, color: '#8E2DE2' }} />
                              <Typography variant="body2" sx={{ color: '#718096' }}>
                                ID: {student.rollNumber || "Not available"}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <SchoolIcon sx={{ fontSize: 16, color: '#8E2DE2' }} />
                              <Typography variant="body2" sx={{ color: '#718096' }}>
                                Department: {student.department || "Not available"}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        
                        <IconButton 
                          onClick={() => toggleDetails(student.rollNumber || student._id)}
                          sx={{
                            width: 36,
                            height: 36,
                            backgroundColor: openDetails[student.rollNumber || student._id] ? 'rgba(142, 45, 226, 0.1)' : 'transparent',
                            color: '#8E2DE2',
                            '&:hover': {
                              backgroundColor: 'rgba(142, 45, 226, 0.1)',
                            }
                          }}
                        >
                          {openDetails[student.rollNumber || student._id] ? 
                            <KeyboardArrowUpIcon /> : 
                            <KeyboardArrowDownIcon />
                          }
                        </IconButton>
                      </Box>

                      <Collapse in={openDetails[student.rollNumber || student._id]} timeout="auto" unmountOnExit>
                        <Divider />
                        <Box sx={{ p: 3, backgroundColor: '#F7FAFC' }}>
                          <Typography variant="subtitle2" sx={{ color: '#4A5568', mb: 2, fontWeight: 600 }}>
                            Student Details
                          </Typography>
                          
                          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                              <Box 
                                sx={{ 
                                  width: 36, 
                                  height: 36, 
                                  borderRadius: '50%', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  backgroundColor: 'rgba(142, 45, 226, 0.1)',
                                  color: '#8E2DE2',
                                  flexShrink: 0,
                                  mt: 0.5
                                }}
                              >
                                <EmailIcon sx={{ fontSize: 18 }} />
                              </Box>
                              <Box>
                                <Typography variant="body2" sx={{ color: '#718096' }}>
                                  Email
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                                  {student.email || "Not available"}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                              <Box 
                                sx={{ 
                                  width: 36, 
                                  height: 36, 
                                  borderRadius: '50%', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  backgroundColor: 'rgba(142, 45, 226, 0.1)',
                                  color: '#8E2DE2',
                                  flexShrink: 0,
                                  mt: 0.5
                                }}
                              >
                                <PhoneIcon sx={{ fontSize: 18 }} />
                              </Box>
                              <Box>
                                <Typography variant="body2" sx={{ color: '#718096' }}>
                                  Phone
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                                  {student.phone || "Not available"}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                              <Box 
                                sx={{ 
                                  width: 36, 
                                  height: 36, 
                                  borderRadius: '50%', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  backgroundColor: 'rgba(142, 45, 226, 0.1)',
                                  color: '#8E2DE2',
                                  flexShrink: 0,
                                  mt: 0.5
                                }}
                              >
                                <PersonIcon sx={{ fontSize: 18 }} />
                              </Box>
                              <Box>
                                <Typography variant="body2" sx={{ color: '#718096' }}>
                                  Parents' Name
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                                  {student.parentsName || "Not available"}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                              <Box 
                                sx={{ 
                                  width: 36, 
                                  height: 36, 
                                  borderRadius: '50%', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  backgroundColor: 'rgba(142, 45, 226, 0.1)',
                                  color: '#8E2DE2',
                                  flexShrink: 0,
                                  mt: 0.5
                                }}
                              >
                                <PhoneIcon sx={{ fontSize: 18 }} />
                              </Box>
                              <Box>
                                <Typography variant="body2" sx={{ color: '#718096' }}>
                                  Parents' Phone
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                                  {student.parentsPhone || "Not available"}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mt: 3 }}>
                            <Box 
                              sx={{ 
                                width: 36, 
                                height: 36, 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                backgroundColor: 'rgba(142, 45, 226, 0.1)',
                                color: '#8E2DE2',
                                flexShrink: 0,
                                mt: 0.5
                              }}
                            >
                              <HomeIcon sx={{ fontSize: 18 }} />
                            </Box>
                            <Box>
                              <Typography variant="body2" sx={{ color: '#718096' }}>
                                Address
                              </Typography>
                              <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                                {student.address || "Not available"}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Collapse>
                    </ListItem>
                  </Paper>
                ))}
              </List>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={refreshing ? <CircularProgress size={20} /> : <RefreshIcon />}
                onClick={handleRefresh}
                disabled={refreshing}
                sx={{
                  borderColor: '#8E2DE2',
                  color: '#8E2DE2',
                  borderRadius: '8px',
                  padding: '8px 24px',
                  '&:hover': {
                    borderColor: '#8E2DE2',
                    backgroundColor: 'rgba(142, 45, 226, 0.05)',
                  }
                }}
              >
                {refreshing ? 'Refreshing...' : 'Refresh List'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default YourStudents;