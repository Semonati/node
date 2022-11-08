const joi = require("joi");

const loginValidation = (user) => {
  const schema = joi.object({
    email: joi
      .string()
      .ruleset.regex(/.+@.+\..{2,}/)
      .rule({ message: "The email and password don't match. please try again" })
      .required(),
    password: joi
      .string()
      .min(9)
      .ruleset.regex(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
      ) 
      .rule({ message: "The email and password don't match. please try again" })
      .required(),
  });

  return schema.validate(user);
};

module.exports = loginValidation;
