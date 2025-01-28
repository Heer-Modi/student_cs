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
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminSideBar from "../../components/AdminSideBar";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const ComplaintsManagement = () => {
  const [complaints, setComplaints] = useState([]); // State for storing complaints
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog state for resolution
  const [selectedComplaint, setSelectedComplaint] = useState(null); // Complaint being resolved
  const [resolutionText, setResolutionText] = useState(""); // Resolution text

  const toggleDrawer = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar open/closed

  // Mock complaints data
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        student: "John Doe",
        to: "Mr. Smith",
        complaint: "Unable to access study materials.",
        resolvedByTeacher: false,
        adminResolved: false,
      },
      {
        id: 2,
        student: "Emily Johnson",
        to: "Mrs. Brown",
        complaint: "Issue with grading system.",
        resolvedByTeacher: true,
        adminResolved: false,
      },
    ];
    setComplaints(mockData);
  }, []);

  // Function to update complaint resolution by admin
  const handleResolve = () => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === selectedComplaint.id
          ? { ...complaint, adminResolved: true }
          : complaint
      )
    );
    setDialogOpen(false);
    setResolutionText(""); // Reset resolution text
  };

  // Function to delete complaint
  const handleDelete = (id) => {
    setComplaints((prev) => prev.filter((complaint) => complaint.id !== id));
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

        {/* Complaints Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Student</strong></TableCell>
                <TableCell><strong>To</strong></TableCell>
                <TableCell><strong>Complaint</strong></TableCell>
                <TableCell><strong>Resolved by Teacher</strong></TableCell>
                <TableCell><strong>Resolved by Admin</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.student}</TableCell>
                  <TableCell>{complaint.to}</TableCell>
                  <TableCell>{complaint.complaint}</TableCell>
                  <TableCell>{complaint.resolvedByTeacher ? "Yes" : "No"}</TableCell>
                  <TableCell>{complaint.adminResolved ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {!complaint.adminResolved && (
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
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(complaint.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Resolution Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Resolve Complaint</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide a resolution for the complaint submitted by{" "}
            <strong>{selectedComplaint?.student}</strong> to{" "}
            <strong>{selectedComplaint?.to}</strong>.
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
