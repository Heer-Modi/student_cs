// routes/teacherRoutes.js
const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { verifyToken } = require("../middlewares/verifyToken"); // ✅ Fix here
const { upload } = require("../middlewares/multermiddleware");

// ✅ Route to save/update teacher profile
router.post("/profile", upload.single("photo"), teacherController.saveTeacherProfile);

// ✅ Route to fetch teacher profile
router.get("/profile", verifyToken, teacherController.fetchTeacherProfile);

// ✅ Route to fetch all counseling students assigned to a teacher
router.get("/counseling-students", verifyToken, teacherController.fetchCounselingStudents);

// ✅ New Route: Fetch an individual student's profile
router.get("/student-profile/:rollNumber", verifyToken, teacherController.fetchStudentProfile);

module.exports = router;
