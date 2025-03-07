import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Drawer,
  Toolbar,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminSideBar from "../../components/AdminSideBar";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state
  const [studentIdFrom, setStudentIdFrom] = useState(""); // Starting Student ID
  const [studentIdTo, setStudentIdTo] = useState(""); // Ending Student ID
  const [teacherEmail, setTeacherEmail] = useState(""); // Counselor's Email
  const [message, setMessage] = useState(""); // Success/Error message

  const toggleDrawer = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar open/closed

  // Function to Allocate Students to a Counselor (Connects to Backend)
  const handleAllocateStudentsToCounselor = async () => {
    if (!studentIdFrom || !studentIdTo || !teacherEmail) {
      setMessage("Please fill in all fields before allocating students.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user-management/allocate-students",
        { studentIdFrom, studentIdTo, teacherEmail }
      );

      setMessage(response.data.message);
      setStudentIdFrom("");
      setStudentIdTo("");
      setTeacherEmail("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error allocating students.");
    }
  };

  // Styles (Using Previously Provided CSS)
  const styles = {
    container: {
      margin: "0 auto",
      maxWidth: "600px",
      width: "90%",
      padding: "40px",
      backgroundColor: "#f5f7fb",
      borderRadius: "10px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      padding: "12px",
      backgroundColor: "#545eb5",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#3d4a9b",
    },
    message: {
      color: "#d32f2f",
      textAlign: "center",
      marginTop: "10px",
    },
    mainContent: {
      flexGrow: 1,
      padding: "24px",
      backgroundColor: "#f6f7f9",
      transition: "margin-left 0.3s ease",
      marginLeft: sidebarOpen ? `${drawerWidth}px` : "70px",
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: sidebarOpen ? drawerWidth : "70px",
        transition: "width 0.3s ease",
        overflowX: "hidden",
      },
    },
    formTitle: {
      color: "#545eb5",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "600",
      textAlign: "center",
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <AdminSideBar open={sidebarOpen} />
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" component="h2" style={styles.formTitle}>
            Allocate Students to Counselor
          </Typography>

          <form onSubmit={(e) => e.preventDefault()}>
            <div style={styles.formGroup}>
              <TextField
                label="Student ID From"
                variant="outlined"
                fullWidth
                value={studentIdFrom}
                onChange={(e) => setStudentIdFrom(e.target.value)}
                required
              />
              <TextField
                label="Student ID To"
                variant="outlined"
                fullWidth
                value={studentIdTo}
                onChange={(e) => setStudentIdTo(e.target.value)}
                required
              />
              <TextField
                label="Counselor's Email"
                variant="outlined"
                fullWidth
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              style={styles.button}
              onClick={handleAllocateStudentsToCounselor}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#545eb5")}
            >
              Allocate Students
            </button>

            {message && <Typography style={styles.message}>{message}</Typography>}
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default UserManagement;
