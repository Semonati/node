const joi = require("joi");

const validateCard = (card) => {
  const schema = joi.object({
    title: joi.string().min(2).max(256).required(),
    subTitle: joi.string().min(2).max(256).required(),
    description: joi.string().min(2).max(1024).required(),
    phone: joi
      .string()
      .min(9)
      .max(10)
      .required()
      .ruleset.regex(/^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/)
      .rule({ message: "Please enter valid phone" }),
    web: joi
      .string()
      .ruleset.regex(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
      )
      .rule({ message: "Please enter valid web link" }),
    email: joi
      .string()
      .ruleset.regex(/.+@.+\..{2,}/)
      .rule({ message: "Please enter valid email" })
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
    bizNumber: joi.number().positive().allow(""),
    user_id: joi.string().allow(""),
  });
  return schema.validate(card);
};

module.exports = validateCard;
