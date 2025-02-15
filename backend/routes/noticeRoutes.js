const express = require("express");
const router = express.Router();
const { createNotice, getNotices, deleteNotice } = require("../controllers/noticeController");
const { protect, checkRole } = require("../middlewares/authMiddleware");

// Route to create a new notice
router.post("/", createNotice);

// Route to get all notices
router.get("/", getNotices);

// Route to delete a notice
router.delete("/cancel/admin/:id", protect, checkRole(["admin"]), deleteNotice);

module.exports = router;
