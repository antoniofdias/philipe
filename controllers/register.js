const router = require('express').Router();

const User = require('../models/User')

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/register', (_, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const type = req.body.type;

    if (!username || !password || !email) {
        res.render('register', { no_inputs: true });
        return;
    }

    User.findOne({ "$or": [{ username: username }, { email: email }] }, (err, obj) => {

        if (err) {
            console.log(err);
            res.render('register');
            return;
        }

        if (!obj) {
            let newUser = new User();
            newUser.username = username;
            newUser.password = bcrypt.hashSync(password, saltRounds);
            newUser.email = email;
            newUser.type = type;

            newUser.save((err, savedUser) => {

                if (err) {
                    console.log(err);
                    res.render('register');
                    return;
                }

                res.render('login', { sucess: true });
                return;
            })

            return;
        }

        res.render('register', { existing_inputs: true });
    });    
});

module.exports = router;