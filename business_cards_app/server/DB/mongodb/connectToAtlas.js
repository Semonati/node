const mongoose = require("mongoose");
const chalk = require("chalk");

const currentTime = require("../../utils/timeService");

const { hours, minutes, seconds } = currentTime();
mongoose
  .connect(
    "mongodb+srv://businessCardApp:businessCardApp@businesscardapp.slp4shd.mongodb.net/?retryWrites=true&w=majority/natan_business_card_app"
  )
  .then(() =>
    console.log(
      chalk.magentaBright(
        `connect successfully to mongoDB Atlas at ${hours}:${minutes}:${seconds}!`
      )
    )
  )
  .catch((error) =>
    console.log(
      chalk.redBright.bold(
        `Mongodb Connection Error: could not connect to mongoDB ${error}`
      )
    )
  );
