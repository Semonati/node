const DB = process.env.DB || "MONGODB";

const find = async () => {
  if (DB === "MONGODB") {
    try {
      // throw new Error("get cards faild")
      return Promise.resolve([{ cards: "in mongodb" }]);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("not in mongodb");
};

const findOne = async (id) => {
  if (DB === "MONGODB") {
    try {
      // throw new Error("get card faild");
      return Promise.resolve(`card no. ${id}`);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get card faild");
};

const create = async (card) => {
  if (DB === "MONGODB") {
    try {
      // throw new Error("create card faild")
      card.id = "18616";
      return Promise.resolve(
        `card no. ${card.id} created ad ${card.createdAt}`
      );
    } catch (error) {
      error.status = 400;
      console.log(error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("post card faild");
};

const update = async (card, id) => {
  if (DB === "MONGODB") {
    try {
      // throw new Error("update card faild")
      return Promise.resolve(`card no. ${id} update!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("update card faild");
};

const like = async (userId, cardId) => {
  if (DB === "MONGODB") {
    try {
      // throw new Error("like card faild")
      return Promise.resolve(`user ${userId} with card no. ${cardId} liked`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("like card faild");
};

const remove = async (id) => {
  if (DB === "MONGODB") {
    try {
      // throw new Error("delete card faild");
      return Promise.resolve(`card no. ${id} deleted!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("delete card faild");
};

exports.find = find;
exports.findOne = findOne;
exports.create = create;
exports.remove = remove;
exports.update = update;
exports.like = like;
