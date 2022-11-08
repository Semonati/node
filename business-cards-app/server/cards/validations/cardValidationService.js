const validateCard = require("./joi/validateCardWithJoi");

const validator = undefined || "Joi";

const cardValidator = (card) => {
  if (validator === "Joi") {
    return validateCard(card);
  }
};

module.exports = cardValidator;
