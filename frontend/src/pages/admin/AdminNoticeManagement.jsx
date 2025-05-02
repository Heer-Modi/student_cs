import React, { useState, useEffect } from "react";
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
  Button,
  CssBaseline,
  Drawer,
  Toolbar,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminSideBar from "../../components/AdminSideBar";
import axios from "axios";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const AdminNoticeManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleDrawer = () => setSidebarOpen(!sidebarOpen);

  // Fetch notices from the backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/notices");
        const data = await response.json();
        setNotices(data.notices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  // Handle notice submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNotice.trim()) {
      alert("Notice content cannot be empty.");
      return;
    }
    try {
      const response = await fetch("/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newNotice }),
      });
      const data = await response.json();
      setNotices((prev) => [data.notice, ...prev]);
      setNewNotice("");
      alert("Notice published successfully!");
    } catch (error) {
      console.error("Error publishing notice:", error);
    }
  };

  // Delete notice
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notices/cancel/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
      alert("Notice deleted successfully");
      setNotices((prev) => prev.filter((notice) => notice._id !== id));
    } catch (error) {
      console.log(error);
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
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
            transition: "width 0.3s ease",
            overflowX: "hidden",
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
              Notice Management
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Create and manage notices for all users
            </Typography>
          </Box>
          
          <Box sx={{ p: 3 }}>
            {/* Form for Creating New Notices */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  value={newNotice}
                  onChange={(e) => setNewNotice(e.target.value)}
                  label="Write a new notice"
                  variant="outlined"
                  fullWidth
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
                <Button 
                  type="submit" 
                  variant="contained" 
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
                  Publish
                </Button>
              </Box>
            </form>

            {/* Notices Table */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress sx={{ color: '#4C2B87' }} />
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ 
                boxShadow: 'none', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px'
              }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#F7FAFC' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Notice</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Published On</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notices.length > 0 ? (
                      notices.map((notice) => (
                        <TableRow key={notice._id}>
                          <TableCell>{notice.content}</TableCell>
                          <TableCell>
                            {new Date(notice.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDelete(notice._id)}
                              sx={{ borderRadius: '8px' }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No notices available.
                        </TableCell>
                      </TableRow>
                    )}
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

export default AdminNoticeManagement;