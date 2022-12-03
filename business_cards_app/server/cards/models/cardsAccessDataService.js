const { handleBadRequest } = require("../../utils/handleErrors");
const Card = require("./mongodb/Card");

const DB = process.env.DB || "MONGODB";

const getCards = async () => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      handleBadRequest("MONGODB", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve([]);
};

const getCard = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findById({ _id: cardId });
      if (!card) throw new Error("Could not find this card in the database");
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      handleBadRequest("MONGODB", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve([]);
};

const getMyCards = async (user_id) => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find({ user_id: user_id });
      if (!cards.length)
        throw new Error("Could not find any card in the database");
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      handleBadRequest("MONGODB", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve([]);
};

const createCard = async (normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      let card = new Card(normalizedCard);
      card = await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("createCard card not in mongodb");
};

const updateCard = async (cardId, normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findByIdAndUpdate(cardId, normalizedCard, {
        new: true,
      });
      if (!card)
        throw new Error(
          "Could not update this card because a card with this ID cannot be founf in the database"
        );
      return Promise.resolve({ ...normalizedCard, cardId });
    } catch (error) {
      error.status = 400;
      handleBadRequest("MONGODB", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

const likeCard = async (cardId, userId) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);
      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      const cardLikes = card.likes.find((id) => id === userId);
      if (!cardLikes) {
        card.likes.push(userId);
        card = await card.save();
        return Promise.resolve(card);
      }

      const cardFiltered = card.likes.filter((id) => id !== userId);
      card.likes = cardFiltered;
      card = await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      handleBadRequest("MONGODB", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card update!");
};

const deleteCard = async (_id, user) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findByIdAndDelete(cardId);
      if (!card)
        throw new Error(
          "could not delete this card because a card with this ID cannot be found in the database"
        );
      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      handleBadRequest("MONGODB", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card deleted not in mongodb!");
};

const updateCardNumber = async (_id, newBizBumber) => {
  try {
    const cards = await Card.find().select(["bizNumber"]);
    const cardToUpdate = await Card.findById(_id);
    cards.forEach((bizNumber) => {
      if (newBizBumber === bizNumber.bizNumber)
        throw new Error("This business number already taken");
    });
    cardToUpdate.bizNumber = newBizBumber;
    cardToUpdate.save();
    return Promise.resolve(cardToUpdate);
  } catch (error) {
    error.status = 400;
    handleBadRequest("MONGODB", error);
    return Promise.reject(error);
  }
};

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
exports.updateCardNumber = updateCardNumber;
