import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton,
  Typography,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import StudentSideBar from "../../components/StudentSideBar";

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const StudentProfile = ({ refreshProfilePhoto }) => {
  const [profile, setProfile] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Inside the useEffect hook that fetches profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Check if we have a stored profile photo in localStorage first
        const storedPhotoUrl = localStorage.getItem("profilePhoto");
        if (storedPhotoUrl) {
          setPhotoUrl(storedPhotoUrl);
        }

        const response = await axios.get("/api/students/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data.student);

        // Only update photo URL if we get one from the API and don't already have one
        if (response.data.photo && !storedPhotoUrl) {
          setPhotoUrl(response.data.photo);
        }
      } catch (error) {
        console.error("Error fetching student profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);


  const {
    name = "",
    rollNumber = "",
    department = "",
    parentsName = "",
    parentsPhone = "",
    address = "",
    phone = "",
    photo = "",
  } = profile;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers and max length of 10 for phone fields
    if ((name === "phone" || name === "parentsPhone") && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }

    setProfile({ ...profile, [name]: value });
  };

  const handleCancelEditing = () => {
    setIsEditable(false);
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

  // Update the handleSubmit function to properly store the photo URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profile.phone === profile.parentsPhone) {
      alert("Phone number and parent's phone number can't be the same.");
      return;
    }
    if (profile.phone.length !== 10 || profile.parentsPhone.length !== 10) {
      alert("Phone numbers must be exactly 10 digits.");
      return;
    }
    setSaving(true);
    const { _id } = profile;
    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }
    formData.append("_id", _id);
    try {
      const response = await axios.post("/api/students/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.student?.photo) {
        // Store the exact photo URL returned from the server
        const newPhotoUrl = response.data.student.photo;

        // Save to localStorage for persistence
        localStorage.setItem("profilePhoto", newPhotoUrl);

        // Update state
        setPhotoUrl(newPhotoUrl);

        // Call the refreshProfilePhoto callback if it exists
        if (typeof refreshProfilePhoto === 'function') {
          refreshProfilePhoto(newPhotoUrl);
        }
      }

      setIsEditable(false);
      showToast("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      showToast("Failed to save profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const toggleDrawer = () => setOpen(!open);

  // Toast notification function (simplified version)
  const showToast = (message, type = "success") => {
    alert(message); // Replace with a proper toast library in production
  };

  // Modern UI Styles inspired by the login page
  const styles = {
    pageContainer: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(66, 153, 225, 0.1) 0%, transparent 45%), radial-gradient(circle at 75% 75%, rgba(237, 100, 166, 0.1) 0%, transparent 45%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    contentWrapper: {
      display: 'flex',
      flexGrow: 1,
      transition: 'all 0.3s ease',
    },
    drawerStyled: {
      width: open ? drawerWidth : collapsedDrawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : collapsedDrawerWidth,
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
        backgroundColor: 'white',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
        borderRight: 'none',
      },
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '8px',
      borderBottom: '1px solid #E2E8F0',
    },
    toggleButton: {
      backgroundColor: '#EBF8FF',
      color: '#3182CE',
      borderRadius: '50%',
      padding: '8px',
      '&:hover': {
        backgroundColor: '#BEE3F8',
      },
    },
    mainContent: {
      flexGrow: 1,
      padding: '24px',
      transition: 'margin-left 0.3s ease, width 0.3s ease',
      marginLeft: 0,
      width: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)`,
    },
    profileCard: {
      maxWidth: '800px',
      width: '100%',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
      marginTop: '20px',
      marginBottom: '40px',
    },
    cardHeader: {
      background: 'linear-gradient(135deg, #38bdf8 0%, #0c4a6e 100%)',
      color: 'white',
      padding: '24px 32px',
      borderBottom: '1px solid #E2E8F0',
    },
    cardTitle: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '8px',
    },
    cardSubtitle: {
      fontSize: '16px',
      opacity: '0.9',
    },
    cardBody: {
      padding: '32px',
    },
    photoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '30px',
      position: 'relative',
    },
    photoWrapper: {
      position: 'relative',
      marginBottom: '12px',
    },
    photo: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '4px solid white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      backgroundColor: '#f0f4f8',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: isEditable ? 'pointer' : 'default',
    },
    photoEditIcon: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      backgroundColor: '#3182CE',
      color: 'white',
      borderRadius: '50%',
      padding: '6px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      zIndex: 1,
      display: isEditable ? 'block' : 'none',
    },
    profileName: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a365d',
      marginBottom: '4px',
      textAlign: 'center',
    },
    profileDetail: {
      fontSize: '14px',
      color: '#718096',
      marginBottom: '4px',
      textAlign: 'center',
    },
    form: {
      marginTop: '24px',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginBottom: '24px',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    formLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#4A5568',
      marginBottom: '4px',
    },
    formInput: {
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1.5px solid #E2E8F0',
      fontSize: '15px',
      transition: 'all 0.3s ease',
      outline: 'none',
      width: '100%',
      '&:focus': {
        borderColor: '#3182CE',
        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.15)',
      },
      '&:disabled': {
        backgroundColor: '#F7FAFC',
        color: '#4A5568',
        cursor: 'not-allowed',
      },
    },
    viewField: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      marginBottom: '16px',
    },
    viewLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#718096',
    },
    viewValue: {
      fontSize: '16px',
      color: '#1a365d',
      fontWeight: '500',
    },
    divider: {
      height: '1px',
      backgroundColor: '#E2E8F0',
      margin: '24px 0',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      marginTop: '24px',
    },
    primaryButton: {
      backgroundColor: '#3182CE',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#2B6CB0',
        transform: 'translateY(-2px)',
      },
    },
    secondaryButton: {
      backgroundColor: '#E2E8F0',
      color: '#4A5568',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#CBD5E0',
      },
    },
    dangerButton: {
      backgroundColor: '#FEB2B2',
      color: '#9B2C2C',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#FC8181',
      },
    },
    loadingWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
    },
    infoSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
    },
  };

  if (loading) {
    return (
      <Box sx={styles.pageContainer}>
        <CssBaseline />
        <Drawer variant="permanent" sx={styles.drawerStyled}>
          <Toolbar sx={styles.drawerHeader}>
            <IconButton onClick={toggleDrawer} sx={styles.toggleButton}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <StudentSideBar open={open} />
        </Drawer>
        <Box component="main" sx={styles.mainContent} style={{ marginLeft: open ? `${drawerWidth}px` : `${collapsedDrawerWidth}px` }}>
          <Toolbar />
          <div style={styles.loadingWrapper}>
            <CircularProgress sx={{ color: '#3182CE' }} />
          </div>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={styles.pageContainer}>
      <CssBaseline />
      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar sx={styles.drawerHeader}>
          <IconButton onClick={toggleDrawer} sx={styles.toggleButton}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <StudentSideBar open={open} />
      </Drawer>

      <Box
        component="main"
        sx={styles.mainContent}
        style={{ marginLeft: open ? `${drawerWidth}px` : `${collapsedDrawerWidth}px` }}
      >
        <Toolbar />
        <Box sx={styles.profileCard}>
          <Box sx={styles.cardHeader}>
            <Typography sx={styles.cardTitle}>Profile Information</Typography>
            <Typography sx={styles.cardSubtitle}>
              {isEditable ? "Edit your personal details below" : "View and manage your personal information"}
            </Typography>
          </Box>

          <Box sx={styles.cardBody}>
            {/* Photo Section */}
            <Box sx={styles.photoContainer}>
              <Box sx={styles.photoWrapper}>
                {photoUrl ? (
                  <Avatar src={photoUrl} sx={styles.photo} />
                ) : (
                  <Avatar sx={styles.photo}>
                    <PersonIcon fontSize="large" />
                  </Avatar>
                )}
                {isEditable && (
                  <label htmlFor="photo-upload">
                    <Box component="span" sx={styles.photoEditIcon}>
                      <EditIcon fontSize="small" />
                    </Box>
                    <input
                      type="file"
                      id="photo-upload"
                      name="photo"
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </Box>
              <Typography sx={styles.profileName}>{name}</Typography>
              <Typography sx={styles.profileDetail}>{department} • Roll No: {rollNumber}</Typography>
            </Box>

            {isEditable ? (
              /* Edit Mode */
              <form onSubmit={handleSubmit} style={styles.form}>
                <Box sx={styles.formGrid}>
                  <Box sx={styles.formGroup}>
                    <label style={styles.formLabel}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      style={styles.formInput}
                      required
                    />
                  </Box>

                  <Box sx={styles.formGroup}>
                    <label style={styles.formLabel}>Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={rollNumber}
                      onChange={handleChange}
                      style={styles.formInput}
                      required
                    />
                  </Box>

                  <Box sx={styles.formGroup}>
                    <label style={styles.formLabel}>Department</label>
                    <input
                      type="text"
                      name="department"
                      value={department}
                      onChange={handleChange}
                      style={styles.formInput}
                      required
                    />
                  </Box>

                  <Box sx={styles.formGroup}>
                    <label style={styles.formLabel}>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      style={styles.formInput}
                      required
                      placeholder="10-digit number"
                      maxLength={10}
                    />
                  </Box>

                  <Box sx={styles.formGroup}>
                    <label style={styles.formLabel}>Parents' Name</label>
                    <input
                      type="text"
                      name="parentsName"
                      value={parentsName}
                      onChange={handleChange}
                      style={styles.formInput}
                      required
                    />
                  </Box>

                  <Box sx={styles.formGroup}>
                    <label style={styles.formLabel}>Parents' Phone</label>
                    <input
                      type="text"
                      name="parentsPhone"
                      value={parentsPhone}
                      onChange={handleChange}
                      style={styles.formInput}
                      required
                      placeholder="10-digit number"
                      maxLength={10}
                    />
                  </Box>
                </Box>

                <Box sx={styles.formGroup}>
                  <label style={styles.formLabel}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    style={styles.formInput}
                    required
                  />
                </Box>

                <Box sx={styles.buttonContainer}>
                  <button type="submit" disabled={saving} style={styles.primaryButton}>
                    {saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon fontSize="small" />}
                    Save Changes
                  </button>
                  <button type="button" onClick={handleCancelEditing} style={styles.dangerButton}>
                    <CloseIcon fontSize="small" />
                    Cancel
                  </button>
                </Box>
              </form>
            ) : (
              /* View Mode */
              <Box>
                <Box sx={styles.divider} />
                <Box sx={styles.infoSection}>
                  <Box sx={styles.viewField}>
                    <Typography sx={styles.viewLabel}>Full Name</Typography>
                    <Typography sx={styles.viewValue}>{name || "Not provided"}</Typography>
                  </Box>

                  <Box sx={styles.viewField}>
                    <Typography sx={styles.viewLabel}>Roll Number</Typography>
                    <Typography sx={styles.viewValue}>{rollNumber || "Not provided"}</Typography>
                  </Box>

                  <Box sx={styles.viewField}>
                    <Typography sx={styles.viewLabel}>Department</Typography>
                    <Typography sx={styles.viewValue}>{department || "Not provided"}</Typography>
                  </Box>

                  <Box sx={styles.viewField}>
                    <Typography sx={styles.viewLabel}>Phone Number</Typography>
                    <Typography sx={styles.viewValue}>{phone || "Not provided"}</Typography>
                  </Box>

                  <Box sx={styles.viewField}>
                    <Typography sx={styles.viewLabel}>Parents' Name</Typography>
                    <Typography sx={styles.viewValue}>{parentsName || "Not provided"}</Typography>
                  </Box>

                  <Box sx={styles.viewField}>
                    <Typography sx={styles.viewLabel}>Parents' Phone</Typography>
                    <Typography sx={styles.viewValue}>{parentsPhone || "Not provided"}</Typography>
                  </Box>
                </Box>

                <Box sx={styles.viewField}>
                  <Typography sx={styles.viewLabel}>Address</Typography>
                  <Typography sx={styles.viewValue}>{address || "Not provided"}</Typography>
                </Box>

                <Box sx={styles.buttonContainer}>
                  <button onClick={() => setIsEditable(true)} style={styles.primaryButton}>
                    <EditIcon fontSize="small" />
                    Edit Profile
                  </button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentProfile;