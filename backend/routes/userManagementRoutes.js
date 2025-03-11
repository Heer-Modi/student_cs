const express = require("express");
const router = express.Router();
const { allocateStudentsToCounselor } = require("../controllers/userManagementController");
const { getCounselingStudents } = require("../controllers/userManagementController");
const { verifyToken, isTeacher } = require("../middlewares/authMiddleware");

// Route to allocate students to a counselor
router.post("/allocate-students", allocateStudentsToCounselor);


// ✅ Route for teacher to get allocated students
router.get("/teacher/counseling-students", verifyToken, isTeacher, getCounselingStudents);

module.exports = router;



