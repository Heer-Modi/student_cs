import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Drawer,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminSideBar from "./../../components/AdminSideBar";

const drawerWidth = 240;

const UserManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [classToAdd, setClassToAdd] = useState("");
  const [teacherToAdd, setTeacherToAdd] = useState("");
  const [studentToAdd, setStudentToAdd] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  const styles = {
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: open ? drawerWidth : "70px",
        transition: "width 0.3s ease",
        overflowX: "hidden",
      },
    },
    pageWrapper: {
      display: "flex",
      minHeight: "100vh",
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
      transition: "margin-left 0.3s ease",
      marginLeft: open ? `${drawerWidth}px` : "70px",
    },
    rowContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      marginBottom: "30px",
      width: "100%",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "40px",
      width: "100%",
      maxWidth: "350px", // Smaller width for Add Teacher and Add Student
      backgroundColor: "#f6d673",
      borderRadius: "10px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      color: "#10184b",
    },
    addClassContainer: {
      maxWidth: "500px", // Larger container for Add Class
    },
    sectionTitle: {
      marginBottom: "20px",
      color: "#10184b",
    },
    formField: {
      marginBottom: "20px",
      width: "100%",
    },
    button: {
      backgroundColor: "#3f51b5",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#303f9f",
      },
    },
  };

  const handleAddTeacher = () => {
    if (teacherToAdd.trim()) {
      setTeachers([...teachers, teacherToAdd]);
      setTeacherToAdd("");
    }
  };

  const handleAddClass = () => {
    if (classToAdd.trim()) {
      setClasses([...classes, classToAdd]);
      setClassToAdd("");
    }
  };

  const handleAddStudent = () => {
    if (studentToAdd.trim() && selectedClass) {
      setStudents([...students, { name: studentToAdd, className: selectedClass }]);
      setStudentToAdd("");
    }
  };

  return (
    <Box sx={styles.pageWrapper}>
      <CssBaseline />
      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <AdminSideBar open={open} />
      </Drawer>

      <Box sx={styles.contentWrapper}>
        {/* Row: Add Teacher and Add Student */}
        <Box sx={styles.rowContainer}>
          <Box sx={styles.container}>
            <Typography variant="h5" sx={styles.sectionTitle}>
              Add Teacher
            </Typography>
            <TextField
              label="Teacher's Name"
              value={teacherToAdd}
              onChange={(e) => setTeacherToAdd(e.target.value)}
              variant="outlined"
              sx={styles.formField}
            />
            <Button variant="contained" sx={styles.button} onClick={handleAddTeacher}>
              Add Teacher
            </Button>
            <Typography variant="h6" sx={{ marginTop: "20px" }}>
              Teachers List
            </Typography>
            <ul>
              {teachers.map((teacher, index) => (
                <li key={index}>{teacher}</li>
              ))}
            </ul>
          </Box>

          <Box sx={styles.container}>
            <Typography variant="h5" sx={styles.sectionTitle}>
              Add Student
            </Typography>
            <TextField
              label="Student's Name"
              value={studentToAdd}
              onChange={(e) => setStudentToAdd(e.target.value)}
              variant="outlined"
              sx={styles.formField}
            />
            <TextField
              select
              SelectProps={{ native: true }}
              label="Select Class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              variant="outlined"
              sx={styles.formField}
            >
              <option value="">None</option>
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </TextField>
            <Button variant="contained" sx={styles.button} onClick={handleAddStudent}>
              Add Student
            </Button>
            <Typography variant="h6" sx={{ marginTop: "20px" }}>
              Students List
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Class</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.className}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>

        {/* Add Class Section */}
        <Box sx={{ ...styles.container, ...styles.addClassContainer }}>
          <Typography variant="h5" sx={styles.sectionTitle}>
            Add Class
          </Typography>
          <TextField
            label="Class Name"
            value={classToAdd}
            onChange={(e) => setClassToAdd(e.target.value)}
            variant="outlined"
            sx={styles.formField}
          />
          <Button variant="contained" sx={styles.button} onClick={handleAddClass}>
            Add Class
          </Button>
          <Typography variant="h6" sx={{ marginTop: "20px" }}>
            Classes List
          </Typography>
          <ul>
            {classes.map((className, index) => (
              <li key={index}>{className}</li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagement;
