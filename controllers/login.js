const router = require('express').Router();

const bcrypt = require('bcrypt');

const User = require('../models/User')

router.get('/login', (_, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
        res.render('login', { no_inputs: true });
        return;
    }
    
    User.findOne({ username: username }, (err, obj) => {
        if (err) {
            console.log('Error while searching user on database:', err);
            res.render('login');
            return;
        }

        // Connect to website

        if (obj && bcrypt.compareSync(password, obj.password)) {
            req.session.loggedin = true;
            req.session.user = {
                username: obj.username,
                type: obj.type
            }
            res.locals.loggedin = true;
            return res.redirect('/');
        } else {
            res.render('login', { wrong_inputs: true });
            return;
        }
    }); 
});

module.exports = router;