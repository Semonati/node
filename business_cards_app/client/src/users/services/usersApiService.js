import axios from "axios";
import getStatus from "../helpers/blockPage";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/users`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const getUserFromDB = async (userId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const login = async (user) => {
  try {
    const { data, status } = await axios.post(`${apiUrl}/users/login`, user);
    getStatus(status);
    return data;
  } catch (error) {
    getStatus(error.response.status);
    return Promise.reject(error.message);
  }
};

export const signup = async (normalizedUser) => {
  try {
    const { data } = await axios.post(`${apiUrl}/users`, normalizedUser);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const editUser = async (userId, normelizedUser) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/users/${userId}`,
      normelizedUser
    );
    console.log(data);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
