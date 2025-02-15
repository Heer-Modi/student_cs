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
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminSideBar from "../../components/AdminSideBar";
import axios from "axios";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const AdminNoticeManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state
  const [notices, setNotices] = useState([]); // List of notices
  const [newNotice, setNewNotice] = useState(""); // State for new notice input

  const toggleDrawer = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close

  // Fetch notices from the backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notices");
        const data = await response.json();
        setNotices(data.notices);
      } catch (error) {
        console.error("Error fetching notices:", error);
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

    // Optional: Backend deletion logic can be added here
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
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
          backgroundColor: "#f6f7f9",
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Admin Notice Management
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Create and manage notices for all users.
        </Typography>

        {/* Form for Creating New Notices */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              value={newNotice}
              onChange={(e) => setNewNotice(e.target.value)}
              label="Write a new notice"
              variant="outlined"
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Publish
            </Button>
          </Box>
        </form>

        {/* Notices Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Notice</strong></TableCell>
                <TableCell><strong>Published On</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
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
      </Box>
    </Box>
  );
};

export default AdminNoticeManagement;
