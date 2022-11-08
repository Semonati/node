const express = require("express");

const { handelError } = require("../../utils/errorHandler");
const {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  isBusiness,
  deleteUser,
  updateUser,
} = require("../services/userService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await getUser(userId);
    return res.send(users);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await updateUser(req.body, userId);
    return res.status(201).send(user);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  const cardId = "123456";
  try {
    const user = await isBusiness(userId, cardId);
    return res.status(201).send(user);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await deleteUser(userId);
    return res.status(410).send(user);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

module.exports = router;
