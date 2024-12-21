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
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TeacherSideBar from "../../components/TeacherSidebar";
import PersonIcon from "@mui/icons-material/Person";
const drawerWidth = 240;

const TeacherProfile = ({ refreshProfilePhoto }) => {
  const [profile, setProfile] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/teachers/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.teacher);
        console.log("Profile data:", response.data);
        if (response.data.photo) setPhotoUrl(response.data.photo);
      } catch (error) {
        console.error("Error fetching teacher profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const { name = "", designation = "", phone = "", email = "", address = "", department = "", photo="", } = profile;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }
    setProfile({ ...profile, [name]: value });
  };

  const handleCancelEditing = () => { 
    setIsEditable(false); 
  };

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
      const response = await axios.post("/api/teachers/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.teacher?.photo) {
        const newPhotoUrl = `${response.data.photo}`;
        localStorage.setItem("profilePhoto", newPhotoUrl);
        setPhotoUrl(newPhotoUrl);
        refreshProfilePhoto(newPhotoUrl);
      }
      alert("Profile updated successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const toggleDrawer = () => setOpen(!open);

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
    summaryContainer: {
      backgroundColor: "#f0f4f8",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
      color: "#1d3557",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
      alignItems: "center",
    },
    leftColumn: {
      textAlign: "left",
      paddingLeft: "20px",
    },
    rightColumn: {
      textAlign: "right",
      paddingRight: "20px",
    },
    formGroup: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      padding: "12px 20px",
      backgroundColor: "#457b9d",
      color: "#fff",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "20px",
    },
    photoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: "30px",
    },
    photo: {
      borderRadius: "50%",
      width: "120px",
      height: "120px",
      objectFit: "cover",
      cursor: "pointer",
      border: "3px solid #f6d673",
    },
    profileIcon: {
      fontSize: "120px",
      color: "#007bff",
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
    heading: {
      color: "#2a9d8f",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "600",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
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
        <TeacherSideBar open={open} />
      </Drawer>

      {/* Main content for Teacher Profile */}
      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" style={styles.heading}>
            Teacher Profile
          </Typography>

          {isEditable ? (
            <form onSubmit={handleSubmit}>
              <div style={styles.photoContainer}>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  {photo ? (
                    <img src={photoUrl} alt="Profile" style={styles.photo} />
                  ) : (
                    <PersonIcon style={styles.profileIcon} />
                  )}
                </label>
              </div>

              <div style={styles.formGroup}>
                <TextField
                  label="Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <TextField
                  label="Designation"
                  name="designation"
                  value={designation}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <TextField
                  label="Department"
                  name="department"
                  value={department}
                  onChange={handleChange}
                  style={styles.input}
                />
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  style={styles.input}
                  required
                  inputProps={{
                    pattern: "\\d{10}",
                    title: "Must be exactly 10 digits",
                  }}
                />
              </div>

              <TextField
                label="Email"
                name="email"
                value={email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <TextField
                label="Home Address"
                name="address"
                value={address}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />

              <div style={styles.buttonContainer}>
                <Button type="submit" variant="contained" sx={styles.button}>
                  Save Profile
                </Button>
                <Button
                  onClick={handleCancelEditing}
                  variant="contained"
                  sx={{ ...styles.button, backgroundColor: "#e57373" }}
                >
                  Update
                </Button>
              </div>
            </form>
          ) : (
            <div style={styles.summaryContainer}>
              <Avatar src={photo} style={styles.photo} />
              <Typography variant="h6" sx={{ mt: 2, gridColumn: "span 2" }}>{name}</Typography>
              <div style={styles.leftColumn}>
                <Typography>Designation: {designation}</Typography>
                <Typography>Department: {department}</Typography>
                <Typography>Phone: {phone}</Typography>
              </div>
              <div style={styles.rightColumn}>
                <Typography>Email: {email}</Typography>
                <Typography>Home Address: {address}</Typography>
              </div>
              <Button
                onClick={() => setIsEditable(true)}
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  backgroundColor: "#2a9d8f",
                  color: "#ffffff",
                  gridColumn: "span 2",
                }}
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default TeacherProfile;
