import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Drawer,
  Toolbar,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminSideBar from "../../components/AdminSideBar";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const UserManagement = () => {
  const [classes, setClasses] = useState([]); // List of classes
  const [students, setStudents] = useState([]); // List of students
  const [teachers, setTeachers] = useState(["Mr. Smith", "Mrs. Brown"]); // List of teachers
  const [className, setClassName] = useState(""); // Class input
  const [studentName, setStudentName] = useState(""); // Student name input
  const [studentId, setStudentId] = useState(""); // Student ID input
  const [selectedClass, setSelectedClass] = useState(""); // Selected class for allocation
  const [allocatedTeacher, setAllocatedTeacher] = useState(""); // Teacher to be allocated
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state

  const toggleDrawer = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar open/closed

  // Create a new class
  const handleCreateClass = () => {
    if (className.trim() && !classes.includes(className)) {
      setClasses([...classes, className]);
      setClassName("");
    }
  };

  // Add a student to a class
  const handleAddStudent = () => {
    if (studentName.trim() && studentId.trim() && selectedClass) {
      setStudents([
        ...students,
        { id: studentId, name: studentName, className: selectedClass },
      ]);
      setStudentName("");
      setStudentId("");
    }
  };

  // Allocate a teacher to all students in a class
  const handleAllocateTeacher = () => {
    if (allocatedTeacher && selectedClass) {
      setStudents((prev) =>
        prev.map((student) =>
          student.className === selectedClass
            ? { ...student, teacher: allocatedTeacher }
            : student
        )
      );
      setAllocatedTeacher("");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
            transition: "width 0.3s ease",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <AdminSideBar open={sidebarOpen} />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f6f7f9",
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>

        {/* Create Class Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Create Class</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              label="Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleCreateClass}>
              Create
            </Button>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Classes: {classes.length > 0 ? classes.join(", ") : "No classes created yet."}
          </Typography>
        </Box>

        {/* Add Student Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Add Student</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              label="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Select Class</InputLabel>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleAddStudent}>
              Add Student
            </Button>
          </Box>
        </Box>

        {/* Allocate Teacher Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Allocate Teacher</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Select Class</InputLabel>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Select Teacher</InputLabel>
              <Select
                value={allocatedTeacher}
                onChange={(e) => setAllocatedTeacher(e.target.value)}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher} value={teacher}>
                    {teacher}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleAllocateTeacher}>
              Allocate Teacher
            </Button>
          </Box>
        </Box>

        {/* Students List */}
        <Box>
          <Typography variant="h6">Students List</Typography>
          <List>
            {students.map((student, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`${student.name} (ID: ${student.id})`}
                    secondary={`Class: ${student.className} | Teacher: ${
                      student.teacher || "Not Allocated"
                    }`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagement;
