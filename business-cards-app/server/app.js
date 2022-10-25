const chalk = require("chalk");
const express = require("express");
const dotenv = require("dotenv");

const cardRouter = require("./cards/router/cardsRestController");
const userRouter = require("./cards/router/usersRestController");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("./public"));
app.use("/cards", cardRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(chalk.yellow(`Listen to http://localhost:${PORT}`));
});
