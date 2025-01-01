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
import AdminSidebar from "./../../components/AdminSideBar"; // Sidebar component for Admin
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 240;

const AdminProfile = () => {
  const [profile, setProfile] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);

  // Fetch admin profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.admin);
        console.log(response.data.admin);
        if (response.data.admin.photo) setPhotoUrl(response.data.admin.photo);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
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
    formGroup: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "20px",
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
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <AdminSidebar open={open} />
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, padding: "24px", marginLeft: `${drawerWidth}px` }}
      >
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Admin Profile
          </Typography>
          {isEditable ? (
            <form onSubmit={handleSubmit}>
              <div style={styles.photoContainer}>
                <input
                  type="file"
                  id="photo-upload"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <label htmlFor="photo-upload">
                  {photo ? (
                    <img src={photoUrl} alt="Profile" style={styles.photo} />
                  ) : (
                    <PersonIcon style={{ fontSize: "120px", color: "#007bff" }} />
                  )}
                </label>
              </div>

              <div style={styles.formGroup}>
                <TextField
                  id="name"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="name"
                />
                <TextField
                  id="phone"
                  label="Phone"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="tel"
                />
              </div>
              <TextField
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                autoComplete="email"
              />
              <TextField
                id="address"
                label="Address"
                name="address"
                value={address}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                autoComplete="street-address"
              />
              <div style={styles.buttonContainer}>
                <Button type="submit" variant="contained">
                  Save Profile
                </Button>
                <Button onClick={handleCancelEditing} variant="contained" color="error">
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div style={styles.summaryContainer}>
              <Avatar src={photo} style={styles.photo} />
              <Typography variant="h6" sx={{ mt: 2, gridColumn: "span 2" }}>
                {name}
              </Typography>
              <Typography>Phone: {phone}</Typography>
              <Typography>Email: {email}</Typography>
              <Typography>Address: {address}</Typography>
              <Button
                onClick={() => setIsEditable(true)}
                variant="contained"
                sx={{ mt: 2, gridColumn: "span 2" }}
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

export default AdminProfile;
