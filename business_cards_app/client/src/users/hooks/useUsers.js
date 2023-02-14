import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useAxios from "../../hooks/useAxios";
import { useSnackBar } from "../../providers/SnackBarProvifer";
import ROUTES from "../../routes/routerModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useUser } from "../providers/UserProviders";
import {
  getUser,
  removeToker,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import {
  deleteUser,
  editUser,
  getUserFromDB,
  getUsers,
  login,
  signup,
} from "../services/usersApiService";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const snack = useSnackBar();

  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();

  useAxios();

  const requestStatus = useCallback(
    (pending, errorMessage, users, user = null) => {
      setIsPending(pending);
      setError(errorMessage);
      setUsers(users);
      setUser(user);
    },
    [setUser]
  );

  const handleLogin = useCallback(async (user) => {
    try {
      const token = await login(user);
      setTokenInLocalStorage(token);
      setToken(token);
      const userFromLocalStorage = getUser();
      requestStatus(false, null, null, userFromLocalStorage);
      navigate(ROUTES.CARDS);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleLogout = useCallback(() => {
    removeToker();
    setUser(null);
  }, [setUser]);

  const handleSignup = useCallback(
    async (userFromClient) => {
      try {
        const normalizedUser = normalizeUser(userFromClient);
        await signup(normalizedUser);
        await handleLogin({
          email: userFromClient.email,
          password: userFromClient.password,
        });
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus, handleLogin]
  );

  const handleGetUsers = useCallback(async () => {
    try {
      setIsPending(true);
      const users = await getUsers();
      requestStatus(false, null, users);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetUser = useCallback(async (userId) => {
    try {
      setIsPending(true);
      const user = await getUserFromDB(userId);
      requestStatus(false, null, null, user);
      return user;
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleEditUser = useCallback(async (userId, userFromClient) => {
    try {
      setIsPending(true);
      const normelizedUser = normalizeUser(userFromClient);
      const user = await editUser(userId, normelizedUser);
      requestStatus(false, null, null, user);
      snack("success", "The user was seccessfully updated");
      navigate(ROUTES.MY_CARDS);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleDeleteUser = useCallback(async (userId) => {
    try {
      setIsPending(true);
      const userDeleted = await deleteUser(userId);
      navigate(ROUTES.MY_CARDS);
      requestStatus(false, null, userDeleted);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const userValue = useMemo(() => {
    return { isPending, error, user, users };
  }, [isPending, error, user, users]);

  return {
    userValue,
    handleLogin,
    handleLogout,
    handleSignup,
    handleGetUsers,
    handleGetUser,
    handleEditUser,
    handleDeleteUser,
  };
};

export default useUsers;
