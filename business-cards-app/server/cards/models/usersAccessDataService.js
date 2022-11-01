const DB = process.env.DB || "MONGODB";

const find = async () => {
  if (DB === "MONGODB") {
    try {
    //   throw new Error("get users faild")
      return Promise.resolve([{ users: "in mongodb" }]);
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
    //   throw new Error("get user faild");
      return Promise.resolve(`get user no. ${id}`);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get user faild");
};

const login = async (user) => {
  if (DB === "MONGODB") {
    try {
    //   throw new Error("login user faild");
      return Promise.resolve(`user no. ${user.id}`);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get user faild");
};

const create = async (user) => {
  if (DB === "MONGODB") {
    try {
      // throw new Error("register user faild")
      return Promise.resolve(`user no. ${user.id}`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("post user faild");
};

const update = async (user, id) => {
  if (DB === "MONGODB") {
    try {
      // throw new Error("update user faild")
      return Promise.resolve(`user no. ${id} update!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("update user faild");
};

const changelsBizStatus = async (userId, cardId) => {
  if (DB === "MONGODB") {
    try {
    //   throw new Error("change to isBusiness faild")
      return Promise.resolve(`user ${userId} make card no. ${cardId} isBusiness`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("like user faild");
};

const remove = async (id) => {
  if (DB === "MONGODB") {
    try {
    //   throw new Error("delete user faild");
      return Promise.resolve(`user no. ${id} deleted!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("delete user faild");
};

exports.find = find;
exports.findOne = findOne;
exports.login = login;
exports.create = create;
exports.update = update;
exports.changelsBizStatus = changelsBizStatus;
exports.remove = remove;
