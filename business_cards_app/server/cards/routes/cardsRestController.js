const express = require("express");

const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const normalizeCard = require("../helpers/normalizeCard");
const {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
  updateCardNumber,
} = require("../models/cardsAccessDataService");
const validateCard = require("../validations/cardValidationService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = { _id: "638799b85ad2be73423d010d" };
    const { isBusiness } = req.user;
    if (!isBusiness)
      throw new Error("Authorization Error: Only business can find this card");
    const card = await getMyCards(userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let card = req.body;
    const user = req.user;
    if (!user.isBusiness)
      return handleError(res, 403, "Authentication Error: Unauthorize user");

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    card = await normalizeCard(card, user._id);
    card = await createCard(card);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let card = req.body;
    const cardId = req.params.id;
    const { isBusiness, _id } = req.user;
    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    if (_id !== card.user_id || !isBusiness)
      throw new Error(
        "Authorization Error: Only business owner user can update the card"
      );
    card = await normalizeCard(card);
    card = await updateCard(cardId, card);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const { _id } = req.user;
    const card = await likeCard(cardId, _id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/update-card-number/:id", auth, async (req, res) => {
  try {
    const cardId = req.params;
    const { newBizNumber } = req.body;
    const { isAdmin } = req.user;
    if (!isAdmin)
      return handleError(
        res,
        401,
        "Authorization Error: only admin can update card business number"
      );
    const changeCardNumber = await updateCardNumber(cardId.id, newBizNumber);
    return res.send(changeCardNumber);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const { isAdmin, _id } = req.user;
    const user = { _id: "6388f0854e7c5ed16d03a8ec" };
    if (_id !== user._id && !isAdmin)
      throw new Error(
        "Authorization Error: You must be an admin or card owner to delete the card"
      );
    const card = await deleteCard(cardId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
