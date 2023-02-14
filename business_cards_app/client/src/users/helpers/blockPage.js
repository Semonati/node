import {
  getNumAttempts,
  removeAttempts,
  setCountAttempts,
} from "../services/localStorageService";

const blockAccount = getNumAttempts();

const getStatus = (status) => {
    console.log(status);
  if (blockAccount === 11111) return console.log("this acount block for 24 hour");
  if (status < 400) return removeAttempts();
  if (blockAccount < 3) return setCountAttempts(blockAccount);
};

export default getStatus;
