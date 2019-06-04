const router = require("express").Router();

const Problem = require("../models/Problem");

router.get("/api/problem/find/:id", (req, res) => {
    const feedback = {
        error: null,
        problem: null
    };

    const id = req.params.id;

    Problem.findById(id, (err, obj) => {
        if (err) {
            feedback.error = err;
            console.log("Error while searching on database:", err);
        } else {
            feedback.problem = obj;
        }

        return res.json(feedback);
    });
});

router.get("/api/problem/:language?", (req, res) => {
    const feedback = {
        error: null,
        problems: []
    };

    const conditions = req.params.language
        ? { language: req.params.language.toUpperCase() }
        : {};

    Problem.find(conditions, (err, obj) => {
        if (err) {
            feedback.error = err;
            console.log("Error while searching user on database:", err);
        } else {
            feedback.problems = obj;
        }

        return res.json(feedback);
    });
});

router.post("/api/problem", (req, res) => {
    const feedback = {
        error: null,
        message: null
    };

    let { title, description, language } = req.body;

    if (!title) {
        feedback.error = "missing-inputs";
        feedback.message = "Missing title or description!";

        return res.json(feedback);
    }

    if (!language) {
        language = "PROLOG";
    }

    Problem.findOne({ title: title, language: language }, (err, obj) => {
        if (err) {
            feedback.error = "database-error";
            feedback.message = err;
            return res.json(feedback);
        }

        const attributes = {
            title: title,
            description: description ? description : "-",
            language: language
        };

        if (obj) {
            Problem.updateOne({ _id: obj._id }, attributes, (err, _) => {
                if (err) {
                    feedback.error = "database-error";
                    feedback.message = err;
                } else {
                    feedback.error = null;
                    feedback.message = "Successfully updated problem!";
                }
                return res.json(feedback);
            });
        } else {
            const newProblem = new Problem(attributes);

            newProblem.save((err, savedProblem) => {
                if (err) {
                    feedback.error = "database-error";
                    feedback.message = err;
                } else {
                    feedback.error = null;
                    feedback.message = "Successfully created problem!";
                }

                return res.json(feedback);
            });
        }
    });
});

module.exports = router;
