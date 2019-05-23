const config = require('./config/config');

const express = require('express');
const path = require('path');

const app = express();

// ---- Set public folder -------------------------

app.use(express.static(path.join(__dirname, 'public')));

// ---- Handlebars --------------------------------

const exphbs = require('express-handlebars');

const hbs = exphbs.create({ defaultLayout: 'main' });

app.engine('handlebars', hbs.engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// ---- Database Conection (Mongoose) -------------

const mongoose = require('mongoose');

mongoose.connect(config.db.uri, { useNewUrlParser: true }, (err, db) => {
    if (err) {
        console.log(`**** Server: Couldn't connect to database. Err: `, err);
    } else {
        console.log('**** Server: Successfully connected to database!');
    }
})

// ---- Session -----------------------------------

const session = require('express-session');

app.use(session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true
}));

// ---- Middlewares -------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./middlewares/logger'));
app.use(require('./middlewares/session-credentials'));

// ---- Routes ------------------------------------

app.use(require('./controllers/home'));
app.use(require('./controllers/login'));
app.use(require('./controllers/register'));
app.use(require('./controllers/logout'));

// ---- Server Start ------------------------------

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`**** Server: Listening on port: ${PORT}`);
});