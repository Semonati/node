const User = require("./mongodb/User");
const lodash = require("lodash");
const { handleBadRequest } = require("../../utils/handleErrors");

const DB = process.env.DB || "MONGODB";

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const email = normalizedUser.email;
      let user = await User.findOne({ email: email });
      if (user) throw new Error("User already registered");
      user = new User(normalizedUser);
      user = await user.save();
      user = lodash.pick(user, ["_id", "email", "name"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      handleBadRequest("Mongoose", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user created not in mongodb");
};

const loginUser = async ({ email, password }) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findOne({ email: email });
      if (!user) throw new Error("Invalid email or password");
      if (user.password !== password)
        throw new Error("Invalid email or password");
      return Promise.resolve("user is logged in");
    } catch (error) {
      error.status = 400;
      handleBadRequest("Mongoose", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user created not in mongodb");
};

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await User.find({}, { __v: 0, password: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      handleBadRequest("Mongoose", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve([]);
};

const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findById(
        { _id: userId },
        { __v: 0, password: 0 }
      );
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      handleBadRequest("Mongoose", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve({});
};

const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findByIdAndUpdate(userId, normalizedUser, {
        new: true,
      }).select(["-__v", "-password"]);

      console.log(user);
      if (!user)
        throw new Error(
          "Could not update user because a user with this ID cannot found in the database"
        );
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      handleBadRequest("Mongoose", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user update not in mongodb");
};

const changeUserBusinessStatus = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const pipeline = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
      const user = await User.findByIdAndUpdate(userId, pipeline, {
        new: true,
      }).select(["-__v", "-password"]);
      if (!user)
        throw new Error(
          "Could not cahnge user isBusiness because a user with this ID cannot found in the database"
        );
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      handleBadRequest("Mongoose", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card update!");
};

const deleteUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findByIdAndDelete(userId, {
        __v: 0,
        password: 0,
      });
      if (!user)
        throw new Error(
          "Could not delete this user because a user with this ID cannot found in the database"
        );
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      handleBadRequest("Mongoose", error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user deleted not in mongodb");
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
