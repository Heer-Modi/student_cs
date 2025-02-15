const express = require("express");
const router = express.Router();

const {
  createClass,
  addStudent,
  allocateTeacher,
  getStudents,
} = require("../controllers/userManagementController");

// Routes
router.post("/class", createClass); // Create a class
router.post("/student", addStudent); // Add a student
router.post("/allocate-teacher", allocateTeacher); // Allocate teacher
router.get("/students", getStudents); // Get all students

module.exports = router;
