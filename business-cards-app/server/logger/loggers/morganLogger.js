const morgan = require("morgan");
const chalk = require("chalk");
const currentTime = require("../../utils/timeService");

const morganLogger = morgan((tokens, req, res) => {
  const { year, month, day, hours, minutes, seconds } = currentTime();
  const currentDate = `[${day}/${month}/${year} ${hours}:${minutes}:${seconds}":]`;

  if (tokens.status(req, res) >= 400) {
    return chalk.redBright(
      [
        currentDate,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ")
    );
  } 
  return chalk.cyanBright(
    [
      currentDate,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ")
  );
});

module.exports = morganLogger;
