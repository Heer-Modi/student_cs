import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton,
  Collapse,
  Avatar,
  Paper,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TeacherSideBar from "../../components/TeacherSidebar";
import axios from "axios";

const drawerWidth = 240;

const YourStudents = () => {
  const [open, setOpen] = useState(true);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDetails, setOpenDetails] = useState({});

  const toggleDrawer = () => setOpen(!open);

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/teachers/counseling-students", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setStudents(response.data.students);
        }
      } catch (error) {
        console.log("Error fetching students:", error);
        setStudents([]);
      }
    };
    fetchStudents();
  }, []);

  // Toggle student profile details
  const toggleDetails = (studentId) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId],
    }));
  };

  // Filter students based on search input
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={styles.pageContainer}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer variant="permanent" sx={styles.drawerStyled(open)}>
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

        <Paper sx={styles.contentWrapper}>
          <Typography variant="h4" gutterBottom sx={styles.title}>
            Your Students
          </Typography>

          {/* Search Bar */}
          <TextField
            label="Search by Name or ID"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={styles.searchInput}
          />

          {/* Student List */}
          <Box sx={styles.studentListContainer}>
            {students.length === 0 ? (
              <Typography sx={styles.noStudentsText}>No Allocated Student</Typography>
            ) : (
              <List sx={{ width: "100%" }}>
                {filteredStudents.map((student, index) => (
                  <ListItem key={index} sx={styles.listItem}>
                    <Avatar src={student.photo} sx={styles.avatar} />
                    <ListItemText
                      primary={student.name}
                      secondary={`ID: ${student.rollNumber} | Class: ${student.Class}`}
                      sx={styles.listText}
                    />
                    <IconButton onClick={() => toggleDetails(student.rollNumber)}>
                      {openDetails[student.rollNumber] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>

                    {/* Expandable Student Details */}
                    <Collapse in={openDetails[student.rollNumber]} timeout="auto" unmountOnExit>
                      <Box sx={styles.studentDetails}>
                        <Typography><strong>Email:</strong> {student.email}</Typography>
                        <Typography><strong>Phone:</strong> {student.phone}</Typography>
                        <Typography><strong>Parents' Name:</strong> {student.parentsName}</Typography>
                        <Typography><strong>Parents' Phone:</strong> {student.parentsPhone}</Typography>
                        <Typography><strong>Address:</strong> {student.address}</Typography>
                      </Box>
                    </Collapse>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Refresh Button */}
          <Button variant="contained" onClick={() => window.location.reload()} sx={styles.button}>
            Refresh List
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default YourStudents;

// ✅ Updated Styles for Sidebar and Layout
const styles = {
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f6f7f9",
  },
  drawerStyled: (open) => ({
    width: open ? drawerWidth : "70px",
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: open ? drawerWidth : "70px",
      transition: "width 0.3s ease",
      overflowX: "hidden",
    },
  }),
  mainContent: (open) => ({
    flexGrow: 1,
    display: "flex",
    justifyContent: open ? "flex-start" : "center", // Moves left when sidebar is open
    alignItems: "center",
    height: "100vh",
    paddingLeft: open ? `${drawerWidth}px` : "90px",
    transition: "padding-left 0.3s ease",
  }),
  contentWrapper: {
    width: "75%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    color: "#10184b",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  searchInput: {
    marginBottom: "20px",
  },
  studentListContainer: {
    width: "100%",
    maxHeight: "400px",
    overflowY: "auto",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    margin: "10px 0",
    padding: "15px",
    borderRadius: "8px",
    border: "2px solid #f6d673",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
  },
  listText: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#333",
  },
  studentDetails: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  avatar: {
    width: "60px",
    height: "60px",
    marginRight: "15px",
    border: "2px solid #f6d673",
  },
  noStudentsText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#ff0000",
    textAlign: "center",
    marginTop: "20px",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#3f51b5",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#303f9f",
    },
  },
};
