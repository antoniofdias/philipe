const router = require("express").Router();

const Submission = require("../models/Submission");

router.get("/api/submissions/:username&:list_id", (req, res) => {
    const feedback = {
        error: null,
        submissions: null
    };

    const conditions = {
        username: req.params.username, 
        list_id: req.params.list_id, 
    }

    Submission.find(conditions, (err, obj) => {
        if (err) {
            feedback.error = err;
            console.log("Error while searching user on database:", err);
        } else {
            feedback.submissions = obj;
        }

        return res.json(feedback);
    });
});

router.post("/api/submissions", (req, res) => {
    const feedback = {
        error: null,
        message: null
    };

    let { username, problem, problem_id, list_id, code } = req.body;

    const attributes = {
        username: username,
        problem: problem,
        problem_id: problem_id,
        list_id: list_id,
        code: code,
        result: "queue"
    };

    if (!username || !problem || !problem_id || !code) {
        feedback.error = "missing-info";
        feedback.message = "Missing info!";
        return res.json(feedback);        
    }

    const newSubmission = new Submission(attributes);

    newSubmission.save((err, savedProblem) => {
        if (err) {
            feedback.error = "database-error";
            feedback.message = err;
        } else {
            feedback.error = null;
            feedback.message = "Successfully created submission!";
        }

        return res.json(feedback);
    });
});

module.exports = router;
