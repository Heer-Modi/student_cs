import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useParams, useNavigate } from "react-router-dom";
import TeacherSideBar from "../../components/TeacherSidebar";
import axios from "axios";

const drawerWidth = 240;

const RespondToQuery = () => {
  const [open, setOpen] = useState(true);
  const [response, setResponse] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { queryId } = useParams();
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  // Fetch complaint details
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`/api/complaints/${queryId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setComplaint(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaint details:", error);
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [queryId]);

  // Submit response to backend
  const handleResponseSubmit = async () => {
    try {
      await axios.post(
        `/api/complaints/respond`,
        { complaintId: queryId, response },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setOpenSnackbar(true);
      navigate("/teacher/queries");
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  // Styles applied from your previous file
  const styles = {
    container: {
      margin: "0 auto",
      maxWidth: "700px",
      width: "90%",
      padding: "40px",
      backgroundColor: "#f5f7fb",
      borderRadius: "10px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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
        {loading ? (
          <Typography>Loading query details...</Typography>
        ) : (
          <Box style={styles.container}>
            <Typography variant="h4" gutterBottom>
              Respond to Query
            </Typography>
            <Typography variant="body1">
              <strong>Student:</strong> {complaint?.complaintBy?.name} ({complaint?.complaintBy?.email})
            </Typography>
            <Typography variant="body1">
              <strong>Complaint:</strong> {complaint?.description}
            </Typography>

            <TextField
              label="Your Response"
              multiline
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
            />

            <Button variant="contained" sx={styles.button} onClick={handleResponseSubmit}>
              Submit Response
            </Button>
          </Box>
        )}
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">Response submitted successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default RespondToQuery;
