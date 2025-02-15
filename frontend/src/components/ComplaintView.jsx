import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Drawer,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StudentSideBar from "./StudentSideBar";
import axios from "axios";

const drawerWidth = 240;

const ComplaintView = () => {
  const [open, setOpen] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  // Fetch student complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/complaints/student-complaints", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setComplaints(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Function to cancel a complaint
  const handleCancelComplaint = async (complaintId) => {
    try {
      await axios.delete(`/api/complaints/cancel/student/${complaintId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // ✅ Remove complaint from the state after successful deletion
      setComplaints(complaints.filter((complaint) => complaint._id !== complaintId));
      alert("Query canceled successfully.");
    } catch (error) {
      console.error("Error canceling complaint:", error);
      alert("Failed to cancel complaint.");
    }
  };

  const styles = {
    container: {
      margin: "0 auto",
      maxWidth: open ? "90%" : "95%", // Expand content when sidebar is closed
      padding: "20px",
      textAlign: "center",
    },
    heading: {
      marginBottom: "20px",
      fontWeight: "bold",
      color: "#10184b",
    },
    tableContainer: {
      marginTop: "20px",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      width: open ? "100%" : "95%", // Expand table when sidebar is closed
      transition: "width 0.3s ease",
    },
    tableHeader: {
      backgroundColor: "#f6d673",
      fontWeight: "bold",
      color: "#10184b",
    },
    tableCell: {
      color: "#10184b",
      fontWeight: "500",
    },
    statusPending: {
      color: "#d32f2f",
      fontWeight: "bold",
    },
    statusResolved: {
      color: "#2e7d32",
      fontWeight: "bold",
    },
    cancelButton: {
      backgroundColor: "#d32f2f",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#b71c1c",
      },
    },
    mainContent: {
      backgroundColor: "#f6f7f9",
      flexGrow: 1,
      padding: "24px",
      overflow: "auto",
      transition: "margin-left 0.3s ease, width 0.3s ease",
      marginLeft: open ? `${drawerWidth}px` : "70px",
      width: open ? `calc(100% - ${drawerWidth}px)` : "calc(100% - 70px)", // Expand content when sidebar is closed
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
      {/* Sidebar */}
      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <StudentSideBar open={open} />
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" style={styles.heading}>
            View Your Queries
          </Typography>

          {loading ? (
            <Typography>Loading Queries...</Typography>
          ) : complaints.length === 0 ? (
            <Typography>No queries submitted yet.</Typography>
          ) : (
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={styles.tableHeader}>Query</TableCell>
                    <TableCell sx={styles.tableHeader}>To</TableCell>
                    <TableCell sx={styles.tableHeader}>Status</TableCell>
                    <TableCell sx={styles.tableHeader}>Teacher Response</TableCell>
                    <TableCell sx={styles.tableHeader}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow key={complaint._id}>
                      <TableCell sx={styles.tableCell}>{complaint.description}</TableCell>
                      <TableCell sx={styles.tableCell}>
                        {complaint.complaintTo?.name || "Unknown"}
                      </TableCell>
                      <TableCell sx={complaint.status === "Resolved" ? styles.statusResolved : styles.statusPending}>
                        {complaint.status}
                      </TableCell>
                      <TableCell>
                        {complaint.response === "" ? (
                          <Typography sx={styles.statusPending}>No response yet</Typography>
                        ) :
                        complaint.status === "Cancelled" ?
                        (
                          <Typography sx={styles.statusPending}><strong>{complaint.response}</strong></Typography>
                        )
                      : (
                        <Typography sx={styles.statusResolved}><strong>{complaint.response}</strong></Typography>
                      )
                      }
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          sx={styles.cancelButton}
                          onClick={() => handleCancelComplaint(complaint._id)}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default ComplaintView;
