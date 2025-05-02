import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminSidebar from "./../../components/AdminSideBar";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const AdminProfile = () => {
  const [profile, setProfile] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch admin profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.admin);
        if (response.data.admin.photo) setPhotoUrl(response.data.admin.photo);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const { name = "", phone = "", email = "", address = "", photo = "" } = profile;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleCancelEditing = () => setIsEditable(false);

  const handleFileChange = (e) => {
    setProfile({ ...profile, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id } = profile;
    
    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }
    formData.append("_id", _id);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/admin/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      });
      setPhotoUrl(response.data.admin.photo);
      alert("Profile updated successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
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
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <AdminSidebar open={open} />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)`,
          transition: 'margin-left 0.3s ease, width 0.3s ease',
          marginLeft: 0,
          backgroundImage: "radial-gradient(circle at 75% 25%, rgba(76, 43, 135, 0.1) 0%, transparent 45%), radial-gradient(circle at 25% 75%, rgba(76, 43, 135, 0.08) 0%, transparent 45%)",
        }}
      >
        <Toolbar />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress sx={{ color: '#4C2B87' }} />
          </Box>
        ) : (
          <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
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
                  Admin Profile
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Manage your personal information and profile picture
                </Typography>
              </Box>
              
              <Box sx={{ p: 4 }}>
                {isEditable ? (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      mb: 4 
                    }}>
                      <input
                        type="file"
                        id="photo-upload"
                        name="photo"
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="photo-upload">
                        <Box 
                          sx={{ 
                            width: 120, 
                            height: 120, 
                            borderRadius: '50%',
                            border: '3px solid #4C2B87',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            backgroundColor: 'rgba(76, 43, 135, 0.1)',
                            boxShadow: '0 4px 12px rgba(76, 43, 135, 0.2)',
                            mb: 2
                          }}
                        >
                          {photo ? (
                            <img 
                              src={photoUrl} 
                              alt="Profile" 
                              style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover' 
                              }} 
                            />
                          ) : (
                            <PersonIcon sx={{ fontSize: 60, color: "#4C2B87" }} />
                          )}
                        </Box>
                      </label>
                      <Typography variant="body2" sx={{ color: '#718096', mt: 1 }}>
                        Click to upload a new profile picture
                      </Typography>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="name"
                          label="Name"
                          name="name"
                          value={name}
                          onChange={handleChange}
                          fullWidth
                          autoComplete="name"
                          sx={{
                            mb: 3,
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="phone"
                          label="Phone"
                          name="phone"
                          value={phone}
                          onChange={handleChange}
                          fullWidth
                          autoComplete="tel"
                          sx={{
                            mb: 3,
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
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="email"
                          label="Email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          fullWidth
                          autoComplete="email"
                          sx={{
                            mb: 3,
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
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="address"
                          label="Address"
                          name="address"
                          value={address}
                          onChange={handleChange}
                          fullWidth
                          autoComplete="street-address"
                          sx={{
                            mb: 3,
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
                      </Grid>
                    </Grid>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      gap: 3,
                      mt: 2
                    }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
                          borderRadius: '8px',
                          padding: '10px 24px',
                          '&:hover': {
                            opacity: 0.9,
                            boxShadow: '0 4px 12px rgba(76, 43, 135, 0.2)'
                          }
                        }}
                      >
                        Save Profile
                      </Button>
                      <Button 
                        onClick={handleCancelEditing} 
                        variant="outlined"
                        sx={{
                          borderColor: '#718096',
                          color: '#718096',
                          borderRadius: '8px',
                          padding: '10px 24px',
                          '&:hover': {
                            borderColor: '#4A5568',
                            backgroundColor: 'rgba(74, 85, 104, 0.05)',
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </form>
                ) : (
                  <Box>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      mb: 4 
                    }}>
                      <Box 
                        sx={{ 
                          width: 140, 
                          height: 140, 
                          borderRadius: '50%',
                          border: '3px solid #4C2B87',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          backgroundColor: 'rgba(76, 43, 135, 0.1)',
                          boxShadow: '0 4px 12px rgba(76, 43, 135, 0.2)',
                          mb: 2
                        }}
                      >
                        {photo ? (
                          <img 
                            src={photoUrl} 
                            alt="Profile" 
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover' 
                            }} 
                          />
                        ) : (
                          <PersonIcon sx={{ fontSize: 70, color: "#4C2B87" }} />
                        )}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: '#2D3748', mt: 1 }}>
                        {name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#718096' }}>
                        Administrator
                      </Typography>
                    </Box>

                    <Grid container spacing={3} sx={{ mt: 2 }}>
                      <Grid item xs={12} md={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: '12px',
                            backgroundColor: 'rgba(76, 43, 135, 0.04)',
                            height: '100%'
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ color: '#718096', mb: 1 }}>
                            Email
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                            {email}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: '12px',
                            backgroundColor: 'rgba(76, 43, 135, 0.04)',
                            height: '100%'
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ color: '#718096', mb: 1 }}>
                            Phone
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                            {phone}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: '12px',
                            backgroundColor: 'rgba(76, 43, 135, 0.04)'
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ color: '#718096', mb: 1 }}>
                            Address
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                            {address}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      mt: 4
                    }}>
                      <Button
                        onClick={() => setIsEditable(true)}
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
                          borderRadius: '8px',
                          padding: '10px 24px',
                          '&:hover': {
                            opacity: 0.9,
                            boxShadow: '0 4px 12px rgba(76, 43, 135, 0.2)'
                          }
                        }}
                      >
                        Edit Profile
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminProfile;