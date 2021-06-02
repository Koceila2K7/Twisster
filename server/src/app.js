const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const router = require('./routes.js');
app.use(cors());
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use('/', router);

module.exports = app;