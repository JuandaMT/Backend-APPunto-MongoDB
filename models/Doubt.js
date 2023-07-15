const mongoose = require("mongoose");

const DoubtSchema = new mongoose.Schema(
  {
    topic: String,

    question: String,
  },
  { timestamps: true }
);

const Doubt = mongoose.model("User", DoubtSchema);

module.exports = Doubt;
