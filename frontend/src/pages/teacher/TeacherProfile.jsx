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
  Alert,
  Divider
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TeacherSideBar from "../../components/TeacherSidebar";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const TeacherProfile = () => {
  const [profile, setProfile] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto'));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const refreshProfilePhoto = (newPhotoUrl) => {
    if (newPhotoUrl) {
      localStorage.setItem('profilePhoto', newPhotoUrl);
      setProfilePhoto(newPhotoUrl);
    }
  };

  // Updated useEffect for profile loading
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/teachers/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data.teacher);

        // First check if there's a stored profile photo in localStorage
        const storedPhotoUrl = localStorage.getItem("profilePhoto");
        if (storedPhotoUrl) {
          setPhotoUrl(storedPhotoUrl);
          setProfilePhoto(storedPhotoUrl);
        }
        // If not in localStorage but available in the response, use it and store it
        else if (response.data.teacher?.photo) {
          const newPhotoUrl = response.data.teacher.photo;
          localStorage.setItem("profilePhoto", newPhotoUrl);
          setPhotoUrl(newPhotoUrl);
          setProfilePhoto(newPhotoUrl);
        }
      } catch (error) {
        console.error("Error fetching teacher profile:", error);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const {
    name = "",
    designation = "",
    phone = "",
    email = "",
    address = "",
    department = "",
    photo = ""
  } = profile;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }
    setProfile({ ...profile, [name]: value });
  };

  const handleCancelEditing = () => {
    setIsEditable(false);
    setError("");
    setSuccess("");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setProfile({ ...profile, photo: e.target.files[0] });

      // Show preview of selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Fix for the TeacherProfile.jsx component's handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const { _id } = profile;
    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }
    formData.append("_id", _id);

    try {
      const response = await axios.post("/api/teachers/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // If a new photo was uploaded and returned in the response
      if (response.data?.teacher?.photo) {
        // Get the photo URL from the response
        const newPhotoUrl = response.data.teacher.photo;
        // Save it to localStorage for persistence
        localStorage.setItem("profilePhoto", newPhotoUrl);
        // Update state variables
        setPhotoUrl(newPhotoUrl);
        setProfilePhoto(newPhotoUrl);

        // Manually trigger a storage event to notify other components
        window.dispatchEvent(new Event('storage'));
      }

      // Update the profile state with the returned data
      setProfile(response.data.teacher);
      setSuccess("Profile updated successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const toggleDrawer = () => setOpen(!open);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: "#f8f9fa",
        backgroundImage: "radial-gradient(circle at 75% 25%, rgba(255, 107, 107, 0.1) 0%, transparent 45%), radial-gradient(circle at 25% 75%, rgba(66, 153, 225, 0.08) 0%, transparent 45%)",
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
              background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
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
          <TeacherSideBar open={open} />
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress sx={{ color: '#8E2DE2' }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: "#f8f9fa",
      backgroundImage: "radial-gradient(circle at 75% 25%, rgba(255, 107, 107, 0.1) 0%, transparent 45%), radial-gradient(circle at 25% 75%, rgba(66, 153, 225, 0.08) 0%, transparent 45%)",
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
            background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
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
        <TeacherSideBar open={open} />
      </Drawer>

      {/* Main content for Teacher Profile */}
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
            maxWidth: '800px',
            width: '100%',
            margin: '0 auto',
            mt: 4,
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden'
          }}
        >
          <Box sx={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
            color: 'white',
            padding: '24px 32px',
          }}>
            <Typography variant="h4" sx={{
              fontSize: '28px',
              fontWeight: '700',
              mb: 1
            }}>
              Profile Information
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {isEditable ? "Edit your personal details below" : "View and manage your personal information"}
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            {error && (
              <Alert
                severity="error"
                sx={{ mb: 3, borderRadius: '8px' }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                sx={{ mb: 3, borderRadius: '8px' }}
                onClose={() => setSuccess("")}
              >
                {success}
              </Alert>
            )}

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4
            }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={photoUrl}
                  alt={name || "Profile"}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '4px solid white',
                    boxShadow: '0 4px 12px rgba(142, 45, 226, 0.2)',
                    mb: 2
                  }}
                >
                  {!photoUrl && <PersonIcon sx={{ fontSize: 80 }} />}
                </Avatar>

                {isEditable && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 0,
                      backgroundColor: '#8E2DE2',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#7b26c9',
                      },
                      boxShadow: '0 2px 8px rgba(142, 45, 226, 0.3)',
                    }}
                    component="label"
                  >
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 600, color: '#2D3748' }}>
                {name || "Teacher Name"}
              </Typography>

              {!isEditable && (
                <Typography variant="body1" sx={{ color: '#718096' }}>
                  {designation || "Teacher Designation"}
                </Typography>
              )}
            </Box>

            {isEditable ? (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Full Name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '&.Mui-focused fieldset': {
                            borderColor: '#8E2DE2',
                          },
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Designation"
                      name="designation"
                      value={designation}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '&.Mui-focused fieldset': {
                            borderColor: '#8E2DE2',
                          },
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Department"
                      name="department"
                      value={department}
                      onChange={handleChange}
                      fullWidth
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '&.Mui-focused fieldset': {
                            borderColor: '#8E2DE2',
                          },
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Phone Number"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      fullWidth
                      required
                      inputProps={{
                        pattern: "\\d{10}",
                        title: "Must be exactly 10 digits",
                      }}
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '&.Mui-focused fieldset': {
                            borderColor: '#8E2DE2',
                          },
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '&.Mui-focused fieldset': {
                            borderColor: '#8E2DE2',
                          },
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Home Address"
                      name="address"
                      value={address}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={2}
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '&.Mui-focused fieldset': {
                            borderColor: '#8E2DE2',
                          },
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mt: 4
                }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancelEditing}
                    startIcon={<CancelIcon />}
                    sx={{
                      borderRadius: '8px',
                      padding: '10px 24px',
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                    startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    sx={{
                      background: 'linear-gradient(to right, #FF6B6B, #8E2DE2)',
                      borderRadius: '8px',
                      padding: '10px 24px',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        opacity: '0.9',
                        boxShadow: '0 4px 12px rgba(142, 45, 226, 0.3)'
                      }
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </form>
            ) : (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 3
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(142, 45, 226, 0.1)',
                          color: '#8E2DE2'
                        }}
                      >
                        <WorkIcon />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#718096' }}>
                          Designation
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                          {designation || "Not specified"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 3
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(142, 45, 226, 0.1)',
                          color: '#8E2DE2'
                        }}
                      >
                        <SchoolIcon />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#718096' }}>
                          Department
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                          {department || "Not specified"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 3
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(142, 45, 226, 0.1)',
                          color: '#8E2DE2'
                        }}
                      >
                        <PhoneIcon />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#718096' }}>
                          Phone
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                          {phone || "Not specified"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 3
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(142, 45, 226, 0.1)',
                          color: '#8E2DE2'
                        }}
                      >
                        <EmailIcon />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#718096' }}>
                          Email
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                          {email || "Not specified"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    mb: 3
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(142, 45, 226, 0.1)',
                      color: '#8E2DE2'
                    }}
                  >
                    <HomeIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#718096' }}>
                      Home Address
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#2D3748', fontWeight: 500 }}>
                      {address || "Not specified"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button
                    onClick={() => setIsEditable(true)}
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{
                      background: 'linear-gradient(to right, #FF6B6B, #8E2DE2)',
                      borderRadius: '8px',
                      padding: '10px 24px',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        opacity: '0.9',
                        boxShadow: '0 4px 12px rgba(142, 45, 226, 0.3)'
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TeacherProfile;