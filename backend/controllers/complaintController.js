const Complaint = require("../models/complaint");
const User = require("../models/User");

// 🟢 Student submits a complaint
exports.submitComplaint = async (req, res) => {
  const { teacherEmail, description } = req.body;

  try {
    const teacher = await User.findOne({ email: teacherEmail, role: "teacher" });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const newComplaint = new Complaint({
      complaintBy: req.user._id,
      complaintTo: teacher._id,
      description,  
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully", complaint: newComplaint });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ message: "Error submitting complaint" });
  }
};

// 🟡 Teacher fetches assigned complaints
exports.getTeacherComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ complaintTo: req.user._id, status: "Pending" })
      .populate("complaintBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching teacher complaints:", error);
    res.status(500).json({ message: "Error fetching complaints" });
  }
};


exports.respondToComplaint = async (req, res) => {
  try {
    const { complaintId, response } = req.body;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    if (complaint.complaintTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to respond to this complaint" });
    }

    // ✅ Save teacher's response instead of deleting the complaint
    complaint.response = response;
    complaint.status = "Resolved";
    await complaint.save();

    res.status(200).json({ message: "Response submitted successfully", complaint });
  } catch (error) {
    console.error("Error responding to complaint:", error);
    res.status(500).json({ message: "Error responding to complaint" });
  }
};
// 🔴 Admin fetches all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("complaintBy", "name email")
      .populate("complaintTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

// 🟢 Admin resolves a complaint
exports.resolveComplaint = async (req, res) => {
  try {
    const { response } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.response = response;
    complaint.status = "Resolved";
    await complaint.save();

    res.status(200).json({ message: "Complaint resolved successfully", complaint });
  } catch (error) {
    console.error("Error resolving complaint:", error);
    res.status(500).json({ message: "Error resolving complaint" });
  }
};

// ✅ Fetch complaints submitted by a student
exports.getStudentComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ complaintBy: req.user._id })
      .populate("complaintTo", "name email") // Fetch teacher details
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching student complaints:", error);
    res.status(500).json({ message: "Error fetching complaints" });
  }
};


// ✅ Student Cancels a Complaint
exports.cancelStudentComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    // Ensure the complaint exists and belongs to the student
    const complaint = await Complaint.findOne({ _id: complaintId, complaintBy: req.user._id });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found or not authorized to delete" });
    }

    // Delete the complaint
    await Complaint.findByIdAndDelete(complaintId);

    res.status(200).json({ message: "Query canceled successfully" });
  } catch (error) {
    console.error("Error canceling complaint:", error);
    res.status(500).json({ message: "Error canceling complaint" });
  }
};

// ✅ Teacher Cancels a Complaint
exports.cancelTeacherComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.complaintTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this complaint" });
    }

    // await Complaint.findByIdAndDelete(complaintId);

    complaint.status = "Cancelled";
    complaint.response = "The query was cancelled"
    await complaint.save();

    res.status(200).json({ message: "Query canceled successfully" });
  } catch (error) {
    console.error("Error canceling complaint:", error);
    res.status(500).json({ message: "Error canceling complaint" });
  }
};
// ✅ Admin Cancels a Complaint
exports.cancelAdminComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // ✅ Admin can delete any complaint
    await Complaint.findByIdAndDelete(complaintId);

    res.status(200).json({ message: "Complaint deleted successfully by admin" });
  } catch (error) {
    console.error("Error canceling complaint by admin:", error);
    res.status(500).json({ message: "Error canceling complaint" });
  }
};

