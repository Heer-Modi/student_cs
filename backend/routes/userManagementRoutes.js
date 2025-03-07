const express = require("express");
const router = express.Router();
const { allocateStudentsToCounselor } = require("../controllers/userManagementController");

// Route to allocate students to a counselor
router.post("/allocate-students", allocateStudentsToCounselor);

module.exports = router;
