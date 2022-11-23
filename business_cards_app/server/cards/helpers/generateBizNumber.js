const lodash = require("lodash");

const { handleBadRequest } = require("../../utils/handleErrors");
const Card = require("../models/mongodb/Card");

const generateBizNumber = async () => {
  const random = lodash.random(100_000_000, 900_000_000);
  const card = await Card.find({ bizNumber: { $eq: random } });
  console.log(card);
};

module.exports = generateBizNumber;