const Notice = require("../models/Notice");

// Create a new notice
exports.createNotice = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Notice content is required" });
    }

    const notice = new Notice({ content });
    await notice.save();

    res.status(201).json({ message: "Notice created successfully", notice });
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all notices
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json({ notices });
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const {id} = req.params;
    const notice = await Notice.findById(id)
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    await Notice.findByIdAndDelete(id);
    res.status(200).json({ message: "Notice deleted successfully by admin" });
  } catch (error) {
    console.error("Error canceling notice by admin:", error);
    res.status(500).json({ message: "Error canceling notice" });
  }
}