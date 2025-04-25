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
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelIcon from "@mui/icons-material/Cancel";
import StudentSideBar from "./StudentSideBar";
import axios from "axios";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const ComplaintView = () => {
  const [open, setOpen] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");

  const toggleDrawer = () => setOpen(!open);

  // Fetch student complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/complaints/student-complaints", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setError("Failed to load queries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Function to handle dialog open
  const handleOpenCancelDialog = (complaintId) => {
    setConfirmDialog({ open: true, id: complaintId });
  };

  // Function to handle dialog close
  const handleCloseCancelDialog = () => {
    setConfirmDialog({ open: false, id: null });
  };

  // Function to cancel a complaint
  const handleCancelComplaint = async () => {
    try {
      setCancelling(true);
      await axios.delete(`/api/complaints/cancel/student/${confirmDialog.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Remove complaint from the state after successful deletion
      setComplaints(complaints.filter((complaint) => complaint._id !== confirmDialog.id));
      handleCloseCancelDialog();
    } catch (error) {
      console.error("Error canceling complaint:", error);
      setError("Failed to cancel query. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(66, 153, 225, 0.1) 0%, transparent 45%), radial-gradient(circle at 75% 75%, rgba(237, 100, 166, 0.1) 0%, transparent 45%)',
    }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedDrawerWidth,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
            borderRight: 'none',
          },
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          padding: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <IconButton onClick={toggleDrawer} sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }
          }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <StudentSideBar open={open} />
      </Drawer>

      {/* Main content */}
      <Box 
        component="main" 
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)`,
          transition: 'margin-left 0.3s ease, width 0.3s ease',
          marginLeft: 0,
        }}
      >
        <Toolbar />
        
        <Paper 
          elevation={0}
          sx={{
            width: '100%',
            margin: '0 auto',
            mt: 2,
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden'
          }}
        >
          <Box sx={{
            background: 'linear-gradient(135deg, #38bdf8 0%, #0c4a6e 100%)',
            color: 'white',
            padding: '24px 32px',
            borderBottom: '1px solid #E2E8F0',
          }}>
            <Typography variant="h4" sx={{
              fontSize: '28px',
              fontWeight: '700',
              mb: 1
            }}>
              Your Queries
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              View and manage all your submitted queries
            </Typography>
          </Box>
          
          <Box sx={{ p: 3 }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ mb: 3, borderRadius: '8px' }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress sx={{ color: '#3182CE' }} />
              </Box>
            ) : complaints.length === 0 ? (
              <Box 
                sx={{ 
                  backgroundColor: '#EBF8FF', 
                  p: 4, 
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: '#2C5282',
                  border: '1px dashed #90CDF4'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No Queries Found</Typography>
                <Typography>You haven't submitted any queries yet.</Typography>
              </Box>
            ) : (
              <TableContainer sx={{ boxShadow: 'none' }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: '#4A5568',
                        borderBottom: '2px solid #E2E8F0'
                      }}>
                        Query
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: '#4A5568',
                        borderBottom: '2px solid #E2E8F0'
                      }}>
                        To
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: '#4A5568',
                        borderBottom: '2px solid #E2E8F0' 
                      }}>
                        Status
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: '#4A5568',
                        borderBottom: '2px solid #E2E8F0' 
                      }}>
                        Response
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: '#4A5568',
                        borderBottom: '2px solid #E2E8F0' 
                      }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow 
                        key={complaint._id}
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': { backgroundColor: '#F7FAFC' },
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <TableCell sx={{ 
                          color: '#2D3748',
                          maxWidth: '250px',
                          whiteSpace: 'normal',
                          wordBreak: 'break-word'
                        }}>
                          {complaint.description}
                        </TableCell>
                        <TableCell sx={{ color: '#2D3748' }}>
                          {complaint.complaintTo?.name || "Unknown"}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={complaint.status} 
                            size="small"
                            sx={{
                              backgroundColor: complaint.status === "Resolved" 
                                ? '#C6F6D5' 
                                : complaint.status === "Cancelled"
                                ? '#FED7D7'
                                : '#FEFCBF',
                              color: complaint.status === "Resolved" 
                                ? '#22543D' 
                                : complaint.status === "Cancelled"
                                ? '#822727'
                                : '#744210',
                              fontWeight: 600,
                              fontSize: '12px'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ 
                          maxWidth: '250px',
                          whiteSpace: 'normal',
                          wordBreak: 'break-word'
                        }}>
                          {complaint.response === "" ? (
                            <Typography sx={{ 
                              color: '#A0AEC0',
                              fontStyle: 'italic',
                              fontSize: '14px'
                            }}>
                              No response yet
                            </Typography>
                          ) : (
                            <Typography sx={{ 
                              color: '#2D3748',
                              fontSize: '14px'
                            }}>
                              {complaint.response}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<CancelIcon />}
                            onClick={() => handleOpenCancelDialog(complaint._id)}
                            sx={{
                              borderRadius: '8px',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#FED7D7',
                              }
                            }}
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
          </Box>
        </Paper>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCloseCancelDialog}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: '20px', 
          fontWeight: 600,
          color: '#E53E3E',
          pb: 1
        }}>
          Cancel Query
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this query? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={handleCloseCancelDialog}
            sx={{ 
              textTransform: 'none',
              color: '#4A5568'
            }}
          >
            No, Keep It
          </Button>
          <Button 
            onClick={handleCancelComplaint}
            variant="contained"
            color="error"
            disabled={cancelling}
            startIcon={cancelling && <CircularProgress size={20} color="inherit" />}
            sx={{ 
              textTransform: 'none',
              borderRadius: '8px',
            }}
          >
            {cancelling ? 'Cancelling...' : 'Yes, Cancel Query'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ComplaintView;