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
import StudentSideBar from "./StudentSideBar"; // Import Sidebar
import axios from "axios"; // For API requests

const drawerWidth = 240; // Sidebar width

const Notifications = () => {
  const [open, setOpen] = useState(true); // Sidebar open/close state
  const [notifications, setNotifications] = useState([]); // State to store notices
  const [loading, setLoading] = useState(true); // Loading state for fetching notices
  const [error, setError] = useState(null); // State to handle errors

  // Fetch notices from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token
        const response = await axios.get("/api/notices", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers for authentication
          },
        });

        setNotifications(response.data.notices); // Set fetched notices
        setLoading(false); // Stop the loading spinner
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications");
        setLoading(false); // Stop the spinner even on error
      }
    };

    fetchNotifications();
  }, []);

  // Remove a notification from the list
  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification._id !== id));
  };

  // Toggle the sidebar open/close state
  const toggleDrawer = () => setOpen(!open);

  const styles = {
    mainContent: {
      backgroundColor: "#f6f7f9", // Light gray background for the main content
      flexGrow: 1,
      height: "100vh",
      padding: "24px",
      transition: "margin-left 0.3s ease",
      marginLeft: open ? `${drawerWidth}px` : "70px", // Adjust margin for sidebar
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
      color: "#f44336", // Red color for the close button
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
        <StudentSideBar open={open} />
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" style={styles.heading}>
            Notifications
          </Typography>

          {/* Show loading spinner while fetching */}
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : notifications.length === 0 ? (
            <Typography>No notifications available</Typography>
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

export default Notifications;
