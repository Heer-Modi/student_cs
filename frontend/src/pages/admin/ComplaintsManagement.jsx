import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CssBaseline,
  Drawer,
  Toolbar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  CircularProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminSideBar from "../../components/AdminSideBar";
import axios from "axios";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const ComplaintsManagement = () => {
  const [complaints, setComplaints] = useState([]); // Store complaints from API
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog state for resolution
  const [selectedComplaint, setSelectedComplaint] = useState(null); // Complaint being resolved
  const [resolutionText, setResolutionText] = useState(""); // Resolution text

  const toggleDrawer = () => setSidebarOpen(!sidebarOpen);

  // 🔥 Fetch complaints from the backend API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/complaints/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const filteredComplaints = response.data.filter((complaint)=>complaint.status === "Pending")
        setComplaints(filteredComplaints); // Store fetched complaints
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchComplaints();
  }, []);

  // 🔹 Admin resolves a complaint
  const handleResolve = async () => {
    if (!selectedComplaint || !resolutionText.trim()) return;

    try {
      const response = await axios.put(
        `/api/complaints/resolve/${selectedComplaint._id}`,
        { response: resolutionText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // ✅ Update the UI after successful resolution
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === selectedComplaint._id
            ? { ...complaint, status: "Resolved", response: resolutionText }
            : complaint
        )
      );

      alert("Complaint resolved successfully!");
      setDialogOpen(false);
      setResolutionText(""); // Reset resolution text
    } catch (error) {
      console.error("Error resolving complaint:", error);
      alert("Failed to resolve complaint.");
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
          Complaints Management
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          View and manage complaints submitted by students.
        </Typography>

        {/* Show loading spinner while fetching complaints */}
        {loading ? (
          <CircularProgress />
        ) : complaints.length === 0 ? (
          <Typography>No complaints found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Student</strong></TableCell>
                  <TableCell><strong>To</strong></TableCell>
                  <TableCell><strong>Complaint</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Response</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint._id}>
                    <TableCell>{complaint.complaintBy?.name || "Unknown"}</TableCell>
                    <TableCell>{complaint.complaintTo?.name || "Unknown"}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>{complaint.status}</TableCell>
                    <TableCell>{complaint.response || "No response yet"}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {complaint.status === "Pending" && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setSelectedComplaint(complaint);
                              setDialogOpen(true);
                            }}
                          >
                            Resolve
                          </Button>
                        )}                        
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Resolution Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Resolve Complaint</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide a resolution for the complaint submitted by{" "}
            <strong>{selectedComplaint?.complaintBy?.name}</strong> to{" "}
            <strong>{selectedComplaint?.complaintTo?.name}</strong>.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Resolution"
            fullWidth
            value={resolutionText}
            onChange={(e) => setResolutionText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleResolve}
            color="primary"
            variant="contained"
            disabled={!resolutionText.trim()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ComplaintsManagement;
