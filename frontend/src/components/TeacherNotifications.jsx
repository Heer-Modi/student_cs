import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import TeacherSideBar from "./TeacherSidebar"; // Import Sidebar
import axios from "axios"; // For API requests

const drawerWidth = 240; // Default sidebar width

const TeacherNotification = () => {
  const [open, setOpen] = useState(true); // Sidebar state for toggling
  const [notifications, setNotifications] = useState([]); // State to store fetched notifications
  const [loading, setLoading] = useState(true); // Loading state for notices
  const [error, setError] = useState(null); // Error state for API calls

  // Fetch notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token
        const response = await axios.get("/api/notices", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        });
        setNotifications(response.data.notices); // Set the fetched notifications
        setLoading(false); // Stop loading spinner
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications.");
        setLoading(false); // Stop spinner on error
      }
    };

    fetchNotifications();
  }, []);

  // Remove a notification locally when deleted
  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification._id !== id));

    // Optionally send delete request to the backend (if supported)
    axios
      .delete(`/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .catch((err) => console.error("Error deleting notification:", err));
  };

  // Toggle sidebar open/close state
  const toggleDrawer = () => setOpen(!open);

  const styles = {
    mainContent: {
      backgroundColor: "#f6f7f9", // Light gray background for the main content
      flexGrow: 1,
      height: "100vh",
      padding: "24px",
      transition: "margin-left 0.3s ease",
      marginLeft: open ? `${drawerWidth}px` : "70px", // Sidebar margin adjustment
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: open ? drawerWidth : "70px",
        transition: "width 0.3s ease",
        overflowX: "hidden", // Prevent overflow in sidebar
      },
    },
    closeButton: {
      color: "#f44336", // Red color for close button
    },
    container: {
      margin: "0 auto",
      maxWidth: "90%",
      padding: "20px",
      textAlign: "center",
    },
    heading: {
      marginBottom: "20px",
      fontWeight: "bold",
      color: "#10184b", // Dark blue heading for consistency
    },
    list: {
      listStyleType: "none",
      padding: 0,
      width: "100%",
    },
    listItem: {
      backgroundColor: "#f6d673", // Light yellow background for notices
      margin: "10px 0",
      padding: "15px",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#10184b", // Dark blue text for notices
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <TeacherSideBar open={open} />
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" style={styles.heading}>
            Notifications
          </Typography>

          {/* Loading Spinner */}
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : notifications.length === 0 ? (
            <Typography>No notifications available.</Typography>
          ) : (
            <ul style={styles.list}>
              {notifications.map((notification) => (
                <li key={notification._id} style={styles.listItem}>
                  {notification.content}
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(notification._id)}
                    sx={styles.closeButton}
                  >
                    <CloseIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default TeacherNotification;
