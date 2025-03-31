const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const { isTeacher, isStudent } = require("../middlewares/authMiddleware");
const { verifyToken } = require("../middlewares/verifyToken");

// ✅ Create Meeting & Notify Allocated Students
router.post("/create-meeting", verifyToken, meetingController.createMeeting);

// ✅ Fetch Notifications for a Student Dashboard
router.get("/notifications", verifyToken, meetingController.getStudentNotifications);


// ✅ Get Meeting & Student List
router.get("/:meetingId", verifyToken, meetingController.getMeetingDetails);

// ✅ Save Attendance
router.post("/attendance", verifyToken, isTeacher, meetingController.saveAttendance);

// ✅ Download Attendance as Excel
router.get("/download/:meetingId", verifyToken, isTeacher, meetingController.downloadAttendanceExcel);

module.exports = router;
