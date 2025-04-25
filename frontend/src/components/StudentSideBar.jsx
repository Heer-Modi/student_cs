import React from "react";
import { ListItemButton, ListItemIcon, ListItemText, List } from "@mui/material"; // Use ListItemButton
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import NotificationsIcon from "@mui/icons-material/Notifications";

const StudentSideBar = ({ open }) => {
  return (
    <List sx={open ? styles.drawerOpen : styles.drawerClosed}>
      {/* Dashboard */}
      <ListItemButton component={Link} to="/student/dashboard" sx={styles.listItem}>
        <ListItemIcon>
          <HomeIcon sx={styles.icon} />
        </ListItemIcon>
        {open && <ListItemText primary="Dashboard" sx={styles.text} />}
      </ListItemButton>

      {/* Profile */}
      <ListItemButton component={Link} to="/student/profile" sx={styles.listItem}>
        <ListItemIcon>
          <PersonIcon sx={styles.icon} />
        </ListItemIcon>
        {open && <ListItemText primary="Profile" sx={styles.text} />}
      </ListItemButton>

      {/* Add Query */}
      <ListItemButton component={Link} to="/complaints/add" sx={styles.listItem}>
        <ListItemIcon>
          <ReportProblemIcon sx={styles.icon} />
        </ListItemIcon>
        {open && <ListItemText primary="Add Query" sx={styles.text} />}
      </ListItemButton>

      {/* View Response */}
      <ListItemButton component={Link} to="/complaints/view" sx={styles.listItem}>
        <ListItemIcon>
          <ReportProblemIcon sx={styles.icon} />
        </ListItemIcon>
        {open && <ListItemText primary="View Response" sx={styles.text} />}
      </ListItemButton>

      {/* Notifications */}
      <ListItemButton component={Link} to="/notifications" sx={styles.listItem}>
        <ListItemIcon>
          <NotificationsIcon sx={styles.icon} />
        </ListItemIcon>
        {open && <ListItemText primary="Notifications" sx={styles.text} />}
      </ListItemButton>
    </List>
  );
};

// Styles
const styles = {
  drawerOpen: {
    background: 'linear-gradient(180deg, #38bdf8 0%, #0c4a6e 100%)', // Matching gradient from header/footer
    color: "white",
    width: "240px",
    transition: "width 0.3s ease", // Smooth transition
    paddingTop: "20px",
    height: '100%'
  },
  drawerClosed: {
    background: 'linear-gradient(180deg, #38bdf8 0%, #0c4a6e 100%)', // Matching gradient
    color: "white",
    width: "70px",
    transition: "width 0.3s ease", // Smooth transition when closed
    paddingTop: "20px",
    height: '100%'
  },
  icon: {
    color: "white", // White icons for better contrast
    fontSize: "1.5rem",
  },
  text: {
    color: "#ffffff", // White text for readability
    fontWeight: 500,
    transition: "opacity 0.3s ease",
  },
  listItem: {
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Lighter on hover with transparency
      borderRadius: "8px",
      margin: "0 8px"
    },
  },
};

export default StudentSideBar;