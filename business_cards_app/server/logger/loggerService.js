const express = require("express");

const morganLogger = require("./loggers/morganLogger");

const app = express();

const LOGGER = "morgan";

if (LOGGER === "morgan") app.use(morganLogger);

module.exports = app;
