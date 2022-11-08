const express = require("express");

const cardsRestController = require("../cards/routes/cardsRestController");
const usersRestController = require("../users/routes/usersRestController");
const { handelError } = require("../utils/errorHandler");

const router = express.Router();

router.use("/cards", cardsRestController);
router.use("/users", usersRestController);

router.use((req, res) => {
  handelError(res, 404, "Page not found!");
});

module.exports = router;
