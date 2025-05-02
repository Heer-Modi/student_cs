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
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [resolutionText, setResolutionText] = useState("");

  const toggleDrawer = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/complaints/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const filteredComplaints = response.data.filter((complaint)=>complaint.status === "Pending")
        setComplaints(filteredComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

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

      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === selectedComplaint._id
            ? { ...complaint, status: "Resolved", response: resolutionText }
            : complaint
        )
      );

      alert("Complaint resolved successfully!");
      setDialogOpen(false);
      setResolutionText("");
    } catch (error) {
      console.error("Error resolving complaint:", error);
      alert("Failed to resolve complaint.");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
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
            background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
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
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }
          }}>
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
          width: `calc(100% - ${sidebarOpen ? drawerWidth : collapsedDrawerWidth}px)`,
          transition: 'margin-left 0.3s ease, width 0.3s ease',
          marginLeft: 0,
          backgroundImage: "radial-gradient(circle at 75% 25%, rgba(76, 43, 135, 0.1) 0%, transparent 45%), radial-gradient(circle at 25% 75%, rgba(76, 43, 135, 0.08) 0%, transparent 45%)",
        }}
      >
        <Toolbar />
        
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            mb: 4
          }}
        >
          <Box sx={{
            background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
            color: 'white',
            padding: '24px 32px',
          }}>
            <Typography variant="h4" sx={{
              fontSize: '28px',
              fontWeight: '700',
              mb: 1
            }}>
              Complaints Management
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              View and manage complaints submitted by students
            </Typography>
          </Box>
          
          <Box sx={{ p: 3 }}>
            {/* Show loading spinner while fetching complaints */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress sx={{ color: '#4C2B87' }} />
              </Box>
            ) : complaints.length === 0 ? (
              <Box sx={{ 
                textAlign: 'center', 
                padding: '40px', 
                backgroundColor: 'rgba(76, 43, 135, 0.03)',
                borderRadius: '8px'
              }}>
                <Typography variant="h6" sx={{ color: '#4A5568', mb: 1 }}>No complaints found</Typography>
                <Typography variant="body2" sx={{ color: '#718096' }}>
                  All complaints have been resolved or no complaints have been submitted yet.
                </Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ 
                boxShadow: 'none', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px'
              }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#F7FAFC' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Student</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>To</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Complaint</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Response</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint._id}>
                        <TableCell>{complaint.complaintBy?.name || "Unknown"}</TableCell>
                        <TableCell>{complaint.complaintTo?.name || "Unknown"}</TableCell>
                        <TableCell>{complaint.description}</TableCell>
                        <TableCell>
                          <Box sx={{
                            display: 'inline-block',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            backgroundColor: complaint.status === "Pending" ? 'rgba(246, 173, 85, 0.1)' : 'rgba(72, 187, 120, 0.1)',
                            color: complaint.status === "Pending" ? '#D97706' : '#2F855A',
                            border: complaint.status === "Pending" ? '1px solid rgba(246, 173, 85, 0.2)' : '1px solid rgba(72, 187, 120, 0.2)',
                          }}>
                            {complaint.status}
                          </Box>
                        </TableCell>
                        <TableCell>{complaint.response || "No response yet"}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            {complaint.status === "Pending" && (
                              <Button
                                variant="contained"
                                onClick={() => {
                                  setSelectedComplaint(complaint);
                                  setDialogOpen(true);
                                }}
                                sx={{
                                  background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
                                  borderRadius: '8px',
                                  textTransform: 'none',
                                  '&:hover': {
                                    opacity: 0.9,
                                    boxShadow: '0 4px 12px rgba(76, 43, 135, 0.2)'
                                  }
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
        </Paper>
      </Box>

      {/* Resolution Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
          color: 'white',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          Resolve Complaint
        </DialogTitle>
        <DialogContent sx={{ pt: 3, px: 3 }}>
          <DialogContentText sx={{ mb: 2, color: '#4A5568' }}>
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
            multiline
            rows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#4C2B87',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#4C2B87',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button 
            onClick={() => setDialogOpen(false)} 
            sx={{ 
              color: '#718096',
              fontWeight: 500,
              borderRadius: '8px',
              px: 2
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleResolve}
            variant="contained"
            disabled={!resolutionText.trim()}
            sx={{
              background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
              borderRadius: '8px',
              '&:hover': {
                opacity: 0.9,
                boxShadow: '0 4px 12px rgba(76, 43, 135, 0.2)'
              },
              px: 2
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ComplaintsManagement;