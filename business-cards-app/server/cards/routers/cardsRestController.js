const express = require("express");

const { handelError } = require("../../utils/errorHandler");
const {
  getCards,
  getCard,
  creatCard,
  updateCard,
  likeCard,
  deleteCard,
} = require("../service/cardService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const card = await creatCard(req.body);
    return res.status(201).send(card);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const card = await updateCard(req.body, id);
    return res.status(201).send(card);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = "123456";
  try {
    const card = await likeCard(userId, id);
    return res.status(201).send(card);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const card_id = req.params.id;
  try {
    const card = await deleteCard(card_id);
    return res.status(410).send(card);
  } catch (error) {
    return handelError(res, error.status || 500, error.message);
  }
});

module.exports = router;
