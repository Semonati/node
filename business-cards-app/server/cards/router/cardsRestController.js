const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

router.get("/:id", (req, res) => {
  const id = req.params;
  console.log(req.body);
  console.log(id);
  res.status(200).send(req.body);
});

router.post("/", (req, res) => {
  return res.status(201).send(req.body);
});

router.put("/:id", (req, res) => {
  const id = req.params;
  const body = req.body;
  console.log(id);
  console.log(body);
  res.status(202).send(body);
});

router.patch("/:id", (req, res) => {
  const id = req.params;
  const body = req.body;
  console.log(id);
  console.log(body);
  res.status(203).send(body);
});

router.delete("/:id", (req, res) => {
  const card_id = req.params;
  console.log("In cards delete!");
  console.log(card_id);
  res.status(500).send(`card delete: ${card_id.id}`);
});

module.exports = router;
