const router = require("express").Router();

const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const feedback = {
    error: null,
    message: null
  };

  if (!username || !password) {
    feedback.error = "blank";
    feedback.message = "Fields left blank!";
    return res.json(feedback);
  }

  User.findOne({ username: username }, (err, obj) => {
    if (err) {
      console.log("Error while searching user on database:", err);

      feedback.error = "database-error";
      feedback.message = null;

      return res.json(feedback);
    }

    // Connect to website

    if (obj && bcrypt.compareSync(password, obj.password)) {
      feedback.error = null;
      feedback.message = "Successfully logged in!";

      return res.json(feedback);
    } else {
      feedback.error = "wrong-credentials";
      feedback.message = "Wrong username or password";

      return res.json(feedback);
    }
  });
});

module.exports = router;
