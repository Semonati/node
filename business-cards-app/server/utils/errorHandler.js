const chalk = require("chalk");

const handelError = (res,status,message) => {
    console.log(chalk.redBright(res.status(status).send(message)));
    chalk.redBright(res.status(status).send(message));
};

module.exports = handelError;