const express = require("express");
const router = express.Router();
const { createNotice, getNotices } = require("../controllers/noticeController");

// Route to create a new notice
router.post("/", createNotice);

// Route to get all notices
router.get("/", getNotices);

module.exports = router;
