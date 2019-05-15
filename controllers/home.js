const router = require('express').Router();

router.get('/', (_, res) => {
    res.render('home');
});

module.exports = router;