const router = require("express").Router();

const ProblemList = require("../models/ProblemList");

router.get("/api/problemlist/find/:id", (req, res) => {
    const feedback = {
        error: null,
        problemlist: null
    };

    const id = req.params.id;

    ProblemList.findById(id, (err, obj) => {
        if (err) {
            feedback.error = err;
            console.log("Error while searching on database:", err);
        } else {
            feedback.problemlist = obj;
        }

        return res.json(feedback);
    });
});

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
            console.log("Error while searching on database:", err);
        } else {
            feedback.problemlists = obj;
        }

        return res.json(feedback);
    });
});

router.delete("/api/problemlist", (req, res) => {
    const { _id } = req.body;

    ProblemList.findByIdAndRemove(_id, (err, data) => {
        if (err) {
            console.log(`Error while deleting ${err}`);
        }
    });

    res.json({});
});

router.post("/api/problemlist", (req, res) => {
    const feedback = {
        error: null,
        message: null
    };

    let { _id, title, description, language, problems, dates } = req.body;

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

    ProblemList.findOne(condition, (err, obj) => {
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
