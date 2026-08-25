const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
    required: true,
  },
  commentText: {
    type: String,
    required: [true, "Comment text is required"],
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalesAgent",
    required: [true, "Author is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);