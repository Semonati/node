const chalk = require("chalk");
const currentTime = require("./timeService");

const handelError = (res, status, message = "") => {
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};

exports.handelError = handelError;
