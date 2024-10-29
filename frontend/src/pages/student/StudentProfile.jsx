import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, CssBaseline, Toolbar, Drawer, IconButton, Typography, Button, Avatar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import StudentSideBar from '../../components/StudentSideBar';

const drawerWidth = 240;

const StudentProfile = ({ refreshProfilePhoto }) => {
  const [profile, setProfile] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    class: '',
    parentsName: '',
    parentsPhone: '',
    address: '',
    phone: '',
    photo: null,
  });
  const [isEditable, setIsEditable] = useState(false); // Default to display mode
  const [open, setOpen] = useState(true);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/students/profile');
        if (data.student) {
          setProfile(data.student);
          setIsEditable(false);
        }
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'phone' || name === 'parentsPhone') && (value.length > 10 || isNaN(value))) return;
    setProfile({ ...profile, [name]: value });
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

    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }

    try {
      const response = await axios.post('/api/students/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile saved successfully!');
      setIsEditable(false);

      if (response.data?.student?.photo) {
        const newPhotoUrl = `/uploads/${response.data.student.photo}`;
        localStorage.setItem('profilePhoto', newPhotoUrl);
        refreshProfilePhoto(newPhotoUrl);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const toggleDrawer = () => setOpen(!open);

  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '700px',
      width: '90%',
      padding: '40px',
      backgroundColor: '#f5f7fb',
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    summaryContainer: {
      backgroundColor: '#e3f2fd',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      marginTop: '20px',
      textAlign: 'center',
    },
    formGroup: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      gridColumn: 'span 2',
      padding: '12px',
      backgroundColor: '#545eb5',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    photoContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: '30px',
    },
    photo: {
      borderRadius: '50%',
      width: '120px',
      height: '120px',
      objectFit: 'cover',
      cursor: 'pointer',
      border: '3px solid #f6d673',
    },
    profileIcon: {
      fontSize: '120px',
      color: '#007bff',
    },
    mainContent: {
      flexGrow: 1,
      padding: '24px',
      backgroundColor: '#f6f7f9',
      transition: 'margin-left 0.3s ease',
      marginLeft: open ? `${drawerWidth}px` : '70px',
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : '70px',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
      },
    },
    formTitle: {
      color: '#545eb5',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: '600',
      textAlign: 'center',
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
                  style={{ display: 'none' }}
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  {profile.photo ? (
                    <img src={URL.createObjectURL(profile.photo)} alt="Profile" style={styles.photo} />
                  ) : (
                    <PersonIcon style={styles.profileIcon} />
                  )}
                </label>
              </div>

              <div style={styles.formGroup}>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Class"
                  name="class"
                  value={profile.class}
                  onChange={handleChange}
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Parents' Name"
                  name="parentsName"
                  value={profile.parentsName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <input
                  type="text"
                  placeholder="Parents' Phone"
                  name="parentsPhone"
                  value={profile.parentsPhone}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <button type="submit" style={styles.button}>
                Save Profile
              </button>
            </form>
          ) : (
            <div style={styles.summaryContainer}>
              <Avatar src={profile.photo ? `/uploads/${profile.photo}` : undefined} style={styles.photo} />
              <Typography variant="h6" sx={{ mt: 2 }}>{profile.firstName} {profile.lastName}</Typography>
              <Typography>Class: {profile.class}</Typography>
              <Typography>Phone: {profile.phone}</Typography>
              <Typography>Parents' Name: {profile.parentsName}</Typography>
              <Typography>Parents' Phone: {profile.parentsPhone}</Typography>
              <Typography>Address: {profile.address}</Typography>
              <Button onClick={() => setIsEditable(true)} style={{ ...styles.button, backgroundColor: '#007bff', marginTop: '15px' }}>
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
