const express = require("express");
const router = express.Router();
const { 
  submitComplaint, 
  getTeacherComplaints, 
  getAllComplaints, 
  resolveComplaint,
  respondToComplaint,
  getStudentComplaints,
  cancelStudentComplaint,
  cancelTeacherComplaint,
  cancelAdminComplaint  // ✅ New function for admin cancellation
} = require("../controllers/complaintController");
const { protect, checkRole } = require("../middlewares/authMiddleware");

// 🟢 **Student submits a complaint**
router.post("/submit", protect, checkRole(["student"]), submitComplaint);

// 🟢 **Student fetches their own complaints**
router.get("/student-complaints", protect, checkRole(["student"]), getStudentComplaints);

// 🟡 **Teacher fetches complaints assigned to them**
router.get("/teacher-complaints", protect, checkRole(["teacher"]), getTeacherComplaints);

// 🟢 **Teacher responds to a complaint & marks it as resolved**
router.post("/respond", protect, checkRole(["teacher"]), respondToComplaint);

// 🔴 **Admin fetches all complaints**
router.get("/all", protect, checkRole(["admin"]), getAllComplaints);

// 🟢 **Admin resolves a complaint**
router.put("/resolve/:id", protect, checkRole(["admin"]), resolveComplaint);

// 🛑 **Teacher cancels a complaint**
router.delete("/cancel/teacher/:complaintId", protect, checkRole(["teacher"]), cancelTeacherComplaint);

// 🛑 **Student cancels a complaint**
router.delete("/cancel/student/:complaintId", protect, checkRole(["student"]), cancelStudentComplaint);

// 🛑 **Admin cancels a complaint**
router.delete("/cancel/admin/:complaintId", protect, checkRole(["admin"]), cancelAdminComplaint);

module.exports = router;
