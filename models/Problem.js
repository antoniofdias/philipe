const mongoose = require("mongoose");

const problemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ["RACKET", "PROLOG"],
    default: "RACKET"
  }
});

module.exports = mongoose.model("Problem", problemSchema, "problem");
