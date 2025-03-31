const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const { verifyToken, isTeacher, isStudent } = require("../middlewares/authMiddleware");

// ✅ Create Meeting & Notify Allocated Students
router.post("/", verifyToken, isTeacher, meetingController.createMeeting);

// ✅ Fetch Notifications for a Student Dashboard
router.get("/notifications", verifyToken, isStudent, meetingController.getStudentNotifications);


// ✅ Get Meeting & Student List
router.get("/:meetingId", verifyToken, isTeacher, meetingController.getMeetingDetails);

// ✅ Save Attendance
router.post("/attendance", verifyToken, isTeacher, meetingController.saveAttendance);

// ✅ Download Attendance as Excel
router.get("/download/:meetingId", verifyToken, isTeacher, meetingController.downloadAttendanceExcel);

module.exports = router;
