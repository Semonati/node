const loginValidation = require("./joi/loginValidation.js");
const registerValidation = require("./joi/registerValidation");

const validator = "Joi" || undefined;

const validateLogin = (user) => {
  if (validator === "Joi") return loginValidation(user);
};
const validateRegistaration = (user) => {
  if (validator === "Joi") return registerValidation(user);
};

exports.validateRegistaration = validateRegistaration;
exports.validateLogin = validateLogin;
