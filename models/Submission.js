const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  list_id: {
    type: String,
    required: true
  },
  problem_id: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },  
});

module.exports = mongoose.model("Submission", submissionSchema, "submission");
