const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      expires: 259200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);
