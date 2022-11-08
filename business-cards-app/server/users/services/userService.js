const {
  find,
  findOne,
  create,
  update,
  remove,
  changelsBizStatus,
  login,
} = require("../models/usersAccessDataService");
const valid = require("../validations/userValidationService");


const getUsers = async () => {
  try {
    const users = await find();
    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUser = async (id) => {
  try {
    const user = await findOne(id);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const loginUser = async (rawUser) => {
  const { error } = valid.validateLogin(rawUser);
  try {
    if (error) {
      throw new Error();
    } else {
      let user = { ...rawUser };
      user = await login(user);
      return Promise.resolve(user);
    }
  } catch (err) {
    return Promise.reject(error);
  }
};

const registerUser = async (rawUser) => {
  const { error } = valid.validateRegistaration(rawUser);
  try {
    if (error) {
      throw new Error();
    } else {
      let user = { ...rawUser };
      user = await create(user);
      return Promise.resolve(user);
    }
  } catch (err) {
    return Promise.reject(error);
  }
};

const updateUser = async (rawUser, id) => {
  try {
    let user = { ...rawUser };
    user = await update(user, id);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const isBusiness = async (userId, cardId) => {
  try {
    const user = await changelsBizStatus(userId, cardId);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await remove(id);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.updateUser = updateUser;
exports.isBusiness = isBusiness;
exports.deleteUser = deleteUser;
