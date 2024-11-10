
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  complaintBy: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  complaintTo: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);