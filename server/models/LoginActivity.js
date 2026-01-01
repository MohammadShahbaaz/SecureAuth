const mongoose = require("mongoose");

const LoginActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    loginTime: {
      type: Date,
      default: Date.now,
    },
     // 🔥 NEW FIELDS
    riskScore: {
      type: Number,
      default: 0,
    },
    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoginActivity", LoginActivitySchema);
