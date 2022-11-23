const Joi = require("joi");

const validateCardWithJoi = (card) => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  const titleAndSub = Joi.string().min(2).max(256).required();
  const streetValues = Joi.string().required();

  const schema = Joi.object({
    title: titleAndSub,
    subTitle: titleAndSub,
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string()
      .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
      .rule({ message: 'card "phone" mast be a valid phone number' })
      .required(),
    email: Joi.string()
      .ruleset.pattern(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: 'card "mail" mast be a valid mail' })
      .required(),

    web: Joi.string()
      .ruleset.regex(urlRegex)
      .rule({ message: 'card "web" mast be a valid url' }),

    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(urlRegex)
          .rule({ message: 'card.image "url" mast be a valid url' })
          .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
      })
      .required(),
    address: Joi.object()
      .keys({
        state: Joi.string().allow(""),
        country: streetValues,
        city: streetValues,
        street: streetValues,
        houseNumber: Joi.number().required(),
        zip: Joi.number(),
      })
      .required(),
    bizNumber: Joi.number().allow(""),
    user_id: Joi.string().allow(""),
  });
  return schema.validate(card);
};

module.exports = validateCardWithJoi;