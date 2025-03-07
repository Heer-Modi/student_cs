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
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import StudentSideBar from "../../components/StudentSideBar";

const drawerWidth = 240;

const StudentProfile = ({ refreshProfilePhoto }) => {
  const [profile, setProfile] = useState({});
  const [isEditable, setIsEditable] = useState(false); // Default to display mode
  const [open, setOpen] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/students/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.student);
        console.log("Profile data:", response.data);
        if (response.data.photo) setPhotoUrl(response.data.photo);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const {
    name = "",
    firstName = "",
    middleName = "",
    lastName = "",
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

    // Only allow numbers and max length of 10 for phone and parentsPhone fields
    if ((name === "phone" || name === "parentsPhone") && (!/^\d*$/.test(value) || value.length > 10)) {
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

    if (profile.phone === profile.parentsPhone) {
      alert("Phone number and parent's phone number can't be the same.");
      return;
    }

    if (profile.phone.length !== 10 || profile.parentsPhone.length !== 10) {
      alert("Phone numbers must be exactly 10 digits.");
      return;
    }

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
        const newPhotoUrl = `${response.data.student.photo}`;
        localStorage.setItem("profilePhoto", newPhotoUrl);
        setPhotoUrl(newPhotoUrl);
        refreshProfilePhoto(newPhotoUrl);
      }
      alert("Profile saved successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error saving profile:", error);
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
      backgroundColor: "#e3f2fd",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      marginTop: "20px",
      textAlign: "center",
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
    nameInput: {
      marginBottom: "20px",
    },
    button: {
      gridColumn: "span 2",
      padding: "12px",
      backgroundColor: "#545eb5",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "20px",
    },
    cancelButton: {
      gridColumn: "span 2",
      padding: "12px",
      backgroundColor: "#ff4d4d", // ✅ Red color for Cancel button
      color: "#fff",
      border: "none",
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
    formTitle: {
      color: "#545eb5",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "600",
      textAlign: "center",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <StudentSideBar open={open} />
      </Drawer>

      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" component="h2" style={styles.formTitle}>
            Student Profile
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

              <div style={styles.nameInput}>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                {/* <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                /> */}
              </div>

              <div style={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Roll Number"
                  name="rollNumber"
                  value={rollNumber}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <input
                  type="text"
                  placeholder="department"
                  name="department"
                  value={department}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  style={styles.input}
                  required
                  pattern="\d{10}"
                  title="Must be exactly 10 digits"
                />
              </div>

              <div style={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Parents' Name"
                  name="parentsName"
                  value={parentsName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <input
                  type="text"
                  placeholder="Parents' Phone"
                  name="parentsPhone"
                  value={parentsPhone}
                  onChange={handleChange}
                  style={styles.input}
                  required
                  pattern="\d{10}"
                  title="Must be exactly 10 digits"
                />
              </div>

              <div style={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.buttonContainer}>
                <button type="submit" style={styles.button}>
                  Save Profile
                </button>
                <button onClick={handleCancelEditing} style={styles.cancelButton}>
                  Cancel
                </button>

              </div>
            </form>
          ) : (
            <div style={styles.summaryContainer}>
              <Avatar src={photo} style={styles.photo} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {name}
              </Typography>
              <Typography>Roll Number: {rollNumber}</Typography>
              <Typography>Department: {department}</Typography>
              <Typography>Phone: {phone}</Typography>
              <Typography>Parents' Name: {parentsName}</Typography>
              <Typography>Parents' Phone: {parentsPhone}</Typography>
              <Typography>Address: {address}</Typography>
              <Button
                onClick={() => setIsEditable(true)}
                style={{
                  ...styles.button,
                  backgroundColor: "#007bff",
                  marginTop: "15px",
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

export default StudentProfile;
