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
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TeacherSideBar from "../../components/TeacherSidebar";
import axios from "axios";

const drawerWidth = 240;

const TeacherQueries = () => {
  const [open, setOpen] = useState(true);
  const [queries, setQueries] = useState([]);
  const [activeQuery, setActiveQuery] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("/api/complaints/teacher-complaints", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setQueries(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleSubmitResponse = async (queryId) => {
    try {
      await axios.post(
        "/api/complaints/respond",
        { complaintId: queryId, response: responseText },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setQueries((prevQueries) => prevQueries.filter((query) => query._id !== queryId));
      setActiveQuery(null);
      setResponseText("");
      setSnackbarMessage("Query responded successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  const handleCancelComplaint = async (queryId) => {
    try {
      await axios.delete(`/api/complaints/cancel/teacher/${queryId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setSnackbarMessage("Query canceled successfully!");
      setOpenSnackbar(true);

      setQueries((prevQueries) => prevQueries.filter((query) => query._id !== queryId));
    } catch (error) {
      console.error("Error canceling complaint:", error);
    }
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
    responseContainer: {
      marginTop: "10px",
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
      width: "100%",
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
            Student Queries
          </Typography>

          {loading ? (
            <Typography>Loading student Queries...</Typography>
          ) : queries.length === 0 ? (
            <Typography>No pending Queries.</Typography>
          ) : (
            <List>
              {queries.map((query) => (
                <Paper key={query._id} sx={styles.listItem}>
                  <ListItem>
                    <ListItemText
                      primary={<strong>Student:</strong>}
                      secondary={`${query.complaintBy.name} (${query.complaintBy.email})`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Query:" secondary={query.description} />
                  </ListItem>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      sx={styles.button}
                      onClick={() => setActiveQuery(query)}
                    >
                      Respond
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#d32f2f", color: "#fff" }}
                      onClick={() => handleCancelComplaint(query._id)}
                    >
                      Cancel
                    </Button>
                  </Box>

                  {activeQuery?._id === query._id && (
                    <Box sx={styles.responseContainer}>
                      <TextField
                        label="Your Response"
                        multiline
                        rows={3}
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        fullWidth
                      />
                      <Button
                        variant="contained"
                        sx={{ ...styles.button, marginTop: "10px" }}
                        onClick={() => handleSubmitResponse(query._id)}
                      >
                        Submit Response
                      </Button>
                    </Box>
                  )}
                </Paper>
              ))}
            </List>
          )}
        </div>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default TeacherQueries;
