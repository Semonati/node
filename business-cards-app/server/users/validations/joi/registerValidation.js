const joi = require("joi");

const registerValidation = (user) => {
  const schema = joi.object({
    name: joi.object().keys({
      first: joi.string().min(2).max(256).required(),
      middle: joi.string().min(2).max(256).allow(""),
      last: joi.string().min(2).max(256).required(),
    }),
    isBusiness: joi.boolean().required(),
    phone: joi
      .string()
      .min(9)
      .max(10)
      .required()
      .ruleset.regex(/^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/)
      .rule({ message: "Please enter valid phone" }),
    email: joi
      .string()
      .ruleset.regex(/.+@.+\..{2,}/)
      .rule({ message: "Please enter valid email" })
      .required(),
    password: joi
      .string()
      .ruleset.regex(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
      )
      .rule({
        message:
          "The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-",
      })
      .required(),
    image: joi.object().keys({
      url: joi
        .string()
        .ruleset.regex(/^http[s]?\:\/\/.{1,}.(jpg|png|jpeg)$/)
        .rule({ message: "Please enter valid picture" })
        .allow(""),
      alt: joi.string().min(2).max(256).allow(""),
    }),
    address: joi.object().keys({
      state: joi.string().min(2).max(256).allow(""),
      country: joi.string().min(2).max(256).required(),
      city: joi.string().min(2).max(256).required(),
      street: joi.string().min(2).max(256).required(),
      houseNumber: joi.number().min(1).max(256).required(),
      zip: joi.number().min(4),
    }),
  });

  return schema.validate(user);
};

module.exports = registerValidation;
