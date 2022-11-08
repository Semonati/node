const express = require("express");
const chalk = require("chalk");
const dotenv = require("dotenv");
const lodash = require("lodash");

const cors = require("./middlewares/cors");
const { handelError } = require("./utils/errorHandler");
const router = require("./router/router");
const logger = require("./logger/loggerService");

require("./utils/timeService");
const app = express();
dotenv.config();

app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.static("./public"));
app.use(router);

app.use((err, req, res, next) => {
  handelError(res, 500, err.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.yellow(`Listen to http://localhost:${PORT}`));
});

// const joi = require("joi");

// // const schema = joi.object({ name: joi.string() });
// const schema = joi.object({
//   name: joi.string(),
//   last: joi.string().required(),
// });

// const last = "Nati";
// const user = { last };
// const { error, value } = schema.validate(user);

// console.log(value);
