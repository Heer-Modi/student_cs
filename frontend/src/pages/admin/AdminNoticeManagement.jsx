import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminSidebar from "./../../components/AdminSideBar";

const drawerWidth = 240;

const AdminNoticeManagement = () => {
  const [open, setOpen] = useState(true);
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");

  const toggleDrawer = () => setOpen(!open);

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
      alert("Notice content cannot be empty");
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

  const styles = {
    container: {
      margin: "0 auto",
      maxWidth: "800px",
      width: "90%",
      padding: "40px",
      backgroundColor: "#f5f7fb",
      borderRadius: "10px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    },
    listContainer: {
      marginTop: "20px",
      backgroundColor: "#e3f2fd",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    },
    formGroup: {
      display: "flex",
      gap: "10px",
    },
    noticeInput: {
      flexGrow: 1,
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <AdminSidebar open={open} />
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, padding: "24px", marginLeft: `${drawerWidth}px` }}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" gutterBottom>
            Admin Notice Management
          </Typography>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <TextField
                value={newNotice}
                onChange={(e) => setNewNotice(e.target.value)}
                label="Write a new notice"
                fullWidth
                style={styles.noticeInput}
              />
              <Button type="submit" variant="contained" color="primary">
                Publish
              </Button>
            </div>
          </form>
          <div style={styles.listContainer}>
            <Typography variant="h6">Published Notices:</Typography>
            <List>
              {notices.map((notice, index) => (
                <ListItem key={index}>
                  <ListItemText primary={notice.content} secondary={new Date(notice.createdAt).toLocaleString()} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default AdminNoticeManagement;
