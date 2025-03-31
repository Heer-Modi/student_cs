import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CssBaseline, Toolbar, Drawer, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TeacherSideBar from "../../components/TeacherSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

const MeetingAttendancePage = () => {
  const { meetingId } = useParams();
  const [open, setOpen] = useState(true);
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    axios.get(`/api/meetings/${meetingId}`).then((res) => setMeeting(res.data));
  }, [meetingId]);

  const toggleDrawer = () => setOpen(!open);

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
            Meeting Attendance
          </Typography>
          {meeting && (
            <>
              <Typography>Date: {meeting.date} | Time: {meeting.time}</Typography>
              <Typography>Agenda: {meeting.agenda}</Typography>
              <Button variant="contained" sx={styles.button} href={`/api/meetings/download/${meetingId}`} download>
                Download Attendance Excel
              </Button>
            </>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default MeetingAttendancePage;

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
    marginTop: "20px",
    backgroundColor: "#545eb5",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#303f9f",
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
