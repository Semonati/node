const chalk = require("chalk");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const cardRouter = require("./cards/routers/cardsRestController");
const userRouter = require("./cards/routers/usersRestController");
const { handelError } = require("./utils/errorHandler");
const { corsAccess } = require("./middelwares/cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: corsAccess.DNS,
    optionsSuccessStatus: corsAccess.status,
  })
);

app.use(express.json());
app.use(express.static("./public"));
app.use((err, req, res, next) => {
  handelError(res, 500, err.message);
});
app.use("/cards", cardRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(chalk.yellow(`Listen to http://localhost:${PORT}`));
});
