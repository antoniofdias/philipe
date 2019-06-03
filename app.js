const config = require("./config/config");

const express = require("express");
const path = require("path");

const app = express();

// ---- Database Conection (Mongoose) -------------

const mongoose = require("mongoose");

mongoose.connect(config.db.uri, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log(`**** Server: Couldn't connect to database. Err: `, err);
  } else {
    console.log("**** Server: Successfully connected to database!");
  }
});

// ---- Middlewares -------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./middlewares/logger"));

// ---- Routes ------------------------------------

app.use(require("./controllers/login"));
app.use(require("./controllers/register"));
app.use(require("./controllers/problem"));
app.use(require("./controllers/problemlist"));

// ---- Server Start ------------------------------

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`**** Server: Listening on port: ${PORT}`);
});
