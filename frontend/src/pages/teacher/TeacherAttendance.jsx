// TeacherAttendance.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TeacherSideBar from "../../components/TeacherSidebar";

const drawerWidth = 240;

const TeacherAttendance = () => {
  const [open, setOpen] = useState(true);
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");
  const [studentId, setStudentId] = useState("");
  const [students, setStudents] = useState([]);

  const toggleDrawer = () => setOpen(!open);

  const handleAddStudent = () => {
    if (studentId.trim()) {
      setStudents([...students, { studentId, status: "Present" }]);
      setStudentId("");
    }
  };

  const handleAttendanceChange = (id, status) => {
    setStudents(students.map((s) => (s.studentId === id ? { ...s, status } : s)));
  };

  const handleSaveAttendance = async () => {
    // Add backend save logic here
    alert("Attendance saved successfully!");
  };

  const styles = {
    container: {
      margin: "0 auto",
      maxWidth: "700px",
      padding: "40px",
      backgroundColor: "#f5f7fb",
      borderRadius: "10px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    heading: {
      color: "#2a9d8f",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "600",
    },
    listItem: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "start",
      backgroundColor: "#e3f2fd",
      margin: "10px 0",
      padding: "15px",
      borderRadius: "8px",
      border: "2px solid #f6d673",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    button: {
      backgroundColor: "#2a9d8f",
      color: "#fff",
      alignSelf: "flex-end",
      "&:hover": {
        backgroundColor: "#21867a",
      },
      marginTop: "10px",
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
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <TeacherSideBar open={open} />
      </Drawer>

      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" style={styles.heading}>
            Attendance
          </Typography>

          <TextField
            label="Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <TextField
              label="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              fullWidth
            />
            <Button variant="contained" sx={styles.button} onClick={handleAddStudent}>
              Add Student
            </Button>
          </div>

          <List>
            {students.map((student) => (
              <ListItem key={student.studentId} style={styles.listItem}>
                <ListItemText primary={`Student ID: ${student.studentId}`} />
                <RadioGroup
                  row
                  value={student.status}
                  onChange={(e) => handleAttendanceChange(student.studentId, e.target.value)}
                >
                  <FormControlLabel value="Present" control={<Radio />} label="Present" />
                  <FormControlLabel value="Absent" control={<Radio />} label="Absent" />
                </RadioGroup>
              </ListItem>
            ))}
          </List>

          <Button variant="contained" sx={{ ...styles.button, marginTop: "20px" }} onClick={handleSaveAttendance}>
            Save Attendance
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default TeacherAttendance;
