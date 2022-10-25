const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const body = req.body;
  console.log(body);
  res.status(200).send(body);
});

router.get("/:id", (req, res) => {
  const body = req.body;
  const id = req.params;
  console.log(body);
  console.log(id);
  res.status(200).send(body);
});

router.post("/", (req, res) => {
  return res.status(201).send(req.body);
});

router.post("/login", (req, res) => {
  const body = req.body;
  return res.status(201).send(body);
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
  const user_id = req.params;
  console.log("In user delete!");
  console.log(user_id);
  res.status(500).send(`user delete: ${user_id.id}`);
});

module.exports = router;
