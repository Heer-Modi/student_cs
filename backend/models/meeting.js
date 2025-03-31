const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  agenda: { type: String, required: true },
  attendance: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ["Present", "Absent"], default: "Absent" },
    },
  ],
});

module.exports = mongoose.model("Meeting", meetingSchema);
