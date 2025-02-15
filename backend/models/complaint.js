const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  complaintBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Student who filed the complaint
  complaintTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Teacher the complaint is directed to
  description: { type: String, required: true }, // Complaint details
  response: { type: String, default: "" }, // Admin's response
  status: { type: String, enum: ["Pending", "Cancelled", "Resolved"], default: "Pending" }, // Complaint status
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
