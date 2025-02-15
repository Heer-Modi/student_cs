import React, { useState } from "react";
import { 
  Box, 
  CssBaseline, 
  Toolbar, 
  Drawer, 
  Snackbar, 
  Alert, 
  Typography, 
  IconButton, 
  TextField, 
  Button 
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StudentSideBar from "./StudentSideBar";
import axios from "axios";

const drawerWidth = 240;

const ComplaintForm = () => {
  const [open, setOpen] = useState(true);
  const [complaint, setComplaint] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    const complaintData = {
      teacherEmail,  // Email of the teacher
      description: complaint, // Complaint description
    };

    try {
      const response = await axios.post("/api/complaints/submit", complaintData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Ensure token is sent
        },
      });

      console.log("Complaint submitted:", response.data);
      setComplaint("");
      setTeacherEmail("");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert(error.response?.data?.message || "Error submitting complaint");
    }
  };

  const toggleDrawer = () => setOpen(!open);

  const styles = {
    container: {
      margin: "0 auto",
      maxWidth: "700px",
      width: "90%",
      padding: "40px",
      backgroundColor: "#f5f7fb",
      borderRadius: "10px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    textarea: {
      width: "100%",
      height: "150px",
      padding: "12px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "20px",
      transition: "border-color 0.3s ease",
      boxSizing: "border-box",
    },
    button: {
      padding: "12px 20px",
      backgroundColor: "#545eb5",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginTop: "20px",
      "&:hover": {
        backgroundColor: "#3d4a9b",
      },
    },
    mainContent: {
      flexGrow: 1,
      padding: "24px",
      backgroundColor: "#f6f7f9",
      transition: "margin-left 0.3s ease",
      marginLeft: open ? `${drawerWidth}px` : "70px",
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: open ? drawerWidth : "70px",
        transition: "width 0.3s ease",
        overflowX: "hidden",
      },
    },
    heading: {
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
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <StudentSideBar open={open} />
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" component="h2" style={styles.heading}>
            Submit Your Query
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Input for Teacher Email */}
            <TextField
              label="Query to (Teacher's Email)"
              variant="outlined"
              fullWidth
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              placeholder="Enter teacher's email"
              required
              style={{ marginBottom: "20px" }}
            />
            {/* Textarea for complaint description */}
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Describe your issue"
              style={styles.textarea}
              required
            />
            <Button type="submit" sx={styles.button}>
              Submit
            </Button>
          </form>
        </div>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success">
          Your counselor will soon contact you according to your query requirement.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComplaintForm;
