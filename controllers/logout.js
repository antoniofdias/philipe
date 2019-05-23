const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    
    req.session.loggedin = false;
    res.locals.session = req.session;
    res.redirect('/');
});

module.exports = router;