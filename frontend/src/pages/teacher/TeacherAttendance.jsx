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
  IconButton,
  Collapse,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TeacherSideBar from "../../components/TeacherSidebar";
import CustomPieChart from "../../components/CustomPieChart";
import { calculateAttendancePercentages } from "../../components/attendanceUtils"; // Utility file

const drawerWidth = 240;

const TeacherAttendance = () => {
  const [open, setOpen] = useState(true);
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");
  const [studentId, setStudentId] = useState("");
  const [students, setStudents] = useState([]);
  const [openDetails, setOpenDetails] = useState({});
  
  const toggleDrawer = () => setOpen(!open);

  const handleAddStudent = () => {
    if (studentId.trim()) {
      setStudents([...students, { studentId, status: "Present", attendanceDetails: [] }]);
      setStudentId("");
    }
  };

  const handleAttendanceChange = (id, status) => {
    setStudents(
      students.map((student) =>
        student.studentId === id ? { ...student, status } : student
      )
    );
  };

  const handleSaveAttendance = async () => {
    alert("Attendance saved successfully!");
  };

  const toggleDetails = (studentId) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId],
    }));
  };

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
    button: {
      backgroundColor: "#3f51b5",
      color: "#fff",
      marginTop: "20px",
      "&:hover": {
        backgroundColor: "#303f9f",
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
  };

  const overallAttendance = calculateAttendancePercentages(students);

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
          <Typography variant="h4" gutterBottom>Attendance</Typography>
          
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
          <TextField
            label="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" onClick={handleAddStudent} sx={styles.button}>
            Add Student
          </Button>

          <List sx={{ marginTop: 2 }}>
            {students.map((student, index) => (
              <ListItem key={index} disableGutters style={styles.listItem}>
                <ListItemText primary={`Student ID: ${student.studentId}`} />
                <RadioGroup
                  row
                  value={student.status}
                  onChange={(e) => handleAttendanceChange(student.studentId, e.target.value)}
                >
                  <FormControlLabel value="Present" control={<Radio />} label="Present" />
                  <FormControlLabel value="Absent" control={<Radio />} label="Absent" />
                </RadioGroup>
                <IconButton onClick={() => toggleDetails(student.studentId)}>
                  {openDetails[student.studentId] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <Collapse in={openDetails[student.studentId]} timeout="auto" unmountOnExit>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {student.attendanceDetails.map((attendance, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{attendance.date}</TableCell>
                          <TableCell align="right">{attendance.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Collapse>
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            onClick={handleSaveAttendance}
            sx={{ ...styles.button, marginTop: 2 }}
          >
            Save Attendance
          </Button>

          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">Overall Attendance</Typography>
            <CustomPieChart data={[
              { name: "Present", value: overallAttendance.present },
              { name: "Absent", value: overallAttendance.absent },
            ]} />
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default TeacherAttendance;
