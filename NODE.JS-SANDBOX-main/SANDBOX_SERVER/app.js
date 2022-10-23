const chalk = require("chalk");
const express = require("express");

const PORT = process.env.PORT || 5000;
const app = express();


app.get("/headers", (req, res, next) => {
    const headers = req.headers;
    console.log("request headers: ", headers);
    res.send(headers)
    next();
});

app.get("/params/:id", (req, res, next) => {
    const params = req.params;
    console.log("request params: ", params);
    res.send(params)
    next();
});

app.get("/query", (req, res, next) => {
    const query = req.query;
    console.log("request query params: ", query);
    res.send(query)
    next();
});

app.get("/body", (req, res, next) => {
    const body = req.body;
    console.log("request body: ", body);
    res.json(body)
    next();
});

app.get("/custom", (req, res) => {
    req.user = { name: "Nati", _id: 123123 };
    console.log("request custom user: ", req.user);
    res.send(req.user)
});

app.listen(PORT, () => {
  console.log(chalk.yellow(`Listen to http://localhost:${PORT}`));
});