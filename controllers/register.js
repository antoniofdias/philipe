const router = require("express").Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/api/register", (req, res) => {
  const { username, password, email, type } = req.body;

  const feedback = {
    error: null,
    message: null
  };

  if (!username || !password || !email) {
    feedback.error = "blank";
    feedback.message = "Fields left blank!";
    return res.json(feedback);
  }

  User.findOne(
    { $or: [{ username: username }, { email: email }] },
    (err, obj) => {
      if (err) {
        feedback.error = "database-error";
        feedback.message = err;
        return res.json(feedback);
      }

      if (obj) {
        feedback.error = "already-exists";
        feedback.message = "Username or email already exists!";

        return res.json(feedback);
      } else {
        const newUser = new User();

        newUser.username = username;
        newUser.password = bcrypt.hashSync(password, saltRounds);
        newUser.email = email;
        newUser.type = type;

        newUser.save((err, savedUser) => {
          if (err) {
            feedback.error = "database-error";
            feedback.message = err;
          } else {
            feedback.error = null;
            feedback.message = "Successfully created user!";
          }

          return res.json(feedback);
        });
      }
    }
  );
});

module.exports = router;
