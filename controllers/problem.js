const router = require("express").Router();

const Problem = require("../models/Problem");

router.get("/api/problem/find/:id", (req, res) => {
    const feedback = {
        error: null,
        problem: null
    };

    const id = req.params.id;

    if (id) {
        Problem.findById(id, (err, obj) => {
            if (err) {
                feedback.error = err;
                console.log("Error while searching on database:", err);
            } else {
                feedback.problem = obj;
            }

            return res.json(feedback);
        });
    } else {
        return res.json(feedback);
    }
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

router.delete("/api/problem", (req, res) => {
    const { _id } = req.body;

    Problem.findByIdAndRemove(_id, (err, data) => {
        if (err) {
            console.log(`Error while deleting ${err}`);
        }
    });

    res.json({});
});

router.post("/api/problem", (req, res) => {
    const feedback = {
        error: null,
        message: null
    };

    let { _id, title, description, language } = req.body;

    if (!title) {
        feedback.error = "missing-inputs";
        feedback.message = "Missing title or description!";

        return res.json(feedback);
    }

    if (!language) {
        language = "PROLOG";
    }

    let condition;

    if (_id) {
        condition = { $or: [{ _id }, { title: title, language: language }] };
    } else {
        condition = { title: title, language: language };
    }

    Problem.findOne(condition, (err, obj) => {
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
