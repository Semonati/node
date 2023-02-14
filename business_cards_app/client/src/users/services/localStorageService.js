import jwtDecode from "jwt-decode";

const TOKEN = "token";
const ATTEMPTS = "attempts";

export const setTokenInLocalStorage = (encryptedToken) =>
  localStorage.setItem(TOKEN, encryptedToken);

export const getUser = () => {
  try {
    const user = localStorage.getItem(TOKEN);
    return jwtDecode(user);
  } catch (error) {
    return null;
  }
};

export const removeToker = () => localStorage.removeItem(TOKEN);

export const getToken = () => localStorage.getItem(TOKEN);

export const setCountAttempts = () => {
  let temp = localStorage.getItem(ATTEMPTS);
  console.log(temp.length);
  if (!temp) {
    return localStorage.setItem(ATTEMPTS, 1);
  }
  localStorage.removeItem(ATTEMPTS);
  localStorage.setItem(ATTEMPTS, temp + 1);
};

export const getNumAttempts = () => localStorage.getItem(ATTEMPTS);

export const removeAttempts = () => localStorage.removeItem(ATTEMPTS);
