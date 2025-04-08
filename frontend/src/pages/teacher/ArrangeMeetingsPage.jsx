import React, { useState } from "react";
import { Box, TextField, CssBaseline, Toolbar, Drawer, Snackbar, Alert, Typography, IconButton, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TeacherSideBar from "../../components/TeacherSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

const ArrangeMeetingsPage = () => {
  const [open, setOpen] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [agenda, setAgenda] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);
  const handleCloseNotification = () => setNotificationOpen(false);

  const handleArrangeMeeting = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/meetings/create-meeting", { date, time, agenda }, {
        headers: { Authorization: `Bearer ${token}` },
      });

       navigate(`/teacher/meeting-attendance/${response.data.meetingId}`);
      console.log("Meeting arranged successfully:", response.data);
      
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
    }
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
      <Box component="main" sx={styles.mainContent(open)}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" style={styles.heading}>
            Arrange Meeting
          </Typography>
          <form style={styles.form}>
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Agenda"
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" sx={styles.button} onClick={handleArrangeMeeting}>
              Schedule Meeting
            </Button>
          </form>
        </div>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleCloseNotification} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleCloseNotification} severity="success">
          Meeting arranged successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ArrangeMeetingsPage;

// ✅ Styles
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
  mainContent: (open) => ({
    flexGrow: 1,
    padding: "24px",
    backgroundColor: "#f6f7f9",
    transition: "margin-left 0.3s ease",
    marginLeft: open ? `${drawerWidth}px` : "70px",
  }),
  drawerStyled: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      transition: "width 0.3s ease",
      overflowX: "hidden",
    },
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
  },
  heading: {
    color: "#545eb5",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
};
