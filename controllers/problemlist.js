const router = require("express").Router();

const ProblemList = require("../models/ProblemList");

router.get("/api/problemlist/:language?", (req, res) => {
  const feedback = {
    error: null,
    problemlists: []
  };

  const conditions = req.params.language
    ? { language: req.params.language.toUpperCase() }
    : {};

  ProblemList.find(conditions, (err, obj) => {
    if (err) {
      feedback.error = err;
      console.log("Error while searching user on database:", err);
    } else {
      feedback.problemlists = obj;
    }

    return res.json(feedback);
  });
});

router.post("/api/problemlist", (req, res) => {
  const feedback = {
    error: null,
    message: null
  };

  let { title, description, language, problems, dates } = req.body;

  if (!title) {
    feedback.error = "missing-inputs";
    feedback.message = "Missing title or description!";

    return res.json(feedback);
  }

  if (!language) {
    language = "PROLOG";
  }

  ProblemList.findOne({ title: title, language: language }, (err, obj) => {
    if (err) {
      feedback.error = "database-error";
      feedback.message = err;
      return res.json(feedback);
    }

    const attributes = {
      title,
      description: description ? description : "",
      language,
      problems
    };

    if (obj) {
      ProblemList.update({ _id: obj._id }, attributes, (err, _) => {
        if (err) {
          feedback.error = "database-error";
          feedback.message = err;
        } else {
          feedback.error = null;
          feedback.message = "Successfully updated problem list!";
        }

        return res.json(feedback);
      });
    } else {
      const newProblemList = new ProblemList(attributes);

      newProblemList.save((err, savedProblemList) => {
        if (err) {
          feedback.error = "database-error";
          feedback.message = err;
        } else {
          feedback.error = null;
          feedback.message = "Successfully created problem list!";
        }

        return res.json(feedback);
      });
    }
  });
});

module.exports = router;
