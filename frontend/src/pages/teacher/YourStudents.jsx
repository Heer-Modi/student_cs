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
        setStudents([])
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

  console.log(students);

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
          <Typography variant="h4" gutterBottom>
            Your Students
          </Typography>

          {/* Search Bar */}
          <TextField
            label="Search by Name or ID"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Student List */}
          <List sx={{ width: "100%" }}>
            {(students && students.length > 0 && filteredStudents.length && filteredStudents.length > 0) ? (
              filteredStudents.map((student, index) => (
                <ListItem key={index} disableGutters sx={styles.listItem}>
                  <Avatar src={student.photo} sx={styles.avatar} />
                  <ListItemText
                    primary={`${student.name} (ID: ${student.rollNumber})`}
                    secondary={`Class: ${student.Class}`}
                  />
                  <IconButton onClick={() => toggleDetails(student.rollNumber)}>
                    {openDetails[student.rollNumber] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                  {/* Expandable Student Details */}
                  <Collapse
                    in={openDetails[student.rollNumber]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box sx={styles.studentDetails}>
                      <Typography>
                        <strong>Email:</strong> {student.email}
                      </Typography>
                      <Typography>
                        <strong>Phone:</strong> {student.phone}
                      </Typography>
                      <Typography>
                        <strong>Parents' Name:</strong> {student.parentsName}
                      </Typography>
                      <Typography>
                        <strong>Parents' Phone:</strong> {student.parentsPhone}
                      </Typography>
                      <Typography>
                        <strong>Address:</strong> {student.address}
                      </Typography>
                    </Box>
                  </Collapse>
                </ListItem>
              ))
            ) : (
              <div>
                <Typography>No students found.</Typography>
              </div>
            )}
          </List>

          {/* Button to refresh student list */}
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={styles.button}
          >
            Refresh List
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default YourStudents;

// Styles
const styles = {
  container: {
    margin: "0 auto",
    maxWidth: "800px",
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
    marginLeft: drawerWidth,
  },
  drawerStyled: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      transition: "width 0.3s ease",
      overflowX: "hidden",
    },
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
  },
  studentDetails: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  avatar: {
    width: "50px",
    height: "50px",
    marginRight: "15px",
  },
};
