const { handleBadRequest } = require("../../utils/handleErrors");
const Card = require("./mongodb/Card");

const DB = process.env.DB || "MONGODB";

const getCards = async () => {
  if (DB === "MONGODB") {
    try {
      // throw new Error("Opss... i did it again!");
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      console.log(error);
      handleBadRequest("MONGODB", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve([]);
};

const getMyCards = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find({ user_id: { $eq: userId } });
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
      error.status = 404;
      handleBadRequest("MONGODB", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

const likeCard = async (cardId, userId) => {
  console.log(cardId);
  console.log(userId);
  if (DB === "MONGODB") {
    try {
      const card = await Card.findById({ _id: cardId });
      if (!card)
        throw new Error(
          "Could not change card likes because a card with this ID cannot be founf in the database"
        );

      if (!card.likes.length)
        await Card.findByIdAndUpdate(
          { _id: cardId },
          { $push: { likes: userId } }
        );

      if (card.likes.length) {
        const foundId = card.likes.find((id) => id === userId._id);
        console.log(foundId);

        if (!foundId) {
          await Card.findByIdAndUpdate(
            { _id: cardId },
            { $push: { likes: userId._id } }
          );
        } else {
          await Card.findByIdAndUpdate(
            { _id: cardId },
            { $pull: { likes: userId._id } }
          );
        }
      }
      return Promise.resolve("work");
    } catch (error) {
      error.status = 400;
      handleBadRequest("MONGODB", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card update!");
};

const deleteCard = async (cardId, user) => {
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

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
