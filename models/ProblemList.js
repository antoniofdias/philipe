const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.ObjectId;

const problemListSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  problems: {
    type: [ObjectId]
  },
  dates: {
    begin: {
      type: Date,
      default: Date.now
    },
    end: {
      type: Date,
      default: Date.now
    }
  },
  language: {
    type: String,
    enum: ["RACKET", "PROLOG"],
    default: "RACKET"
  }
});

module.exports = mongoose.model("ProblemList", problemListSchema);
