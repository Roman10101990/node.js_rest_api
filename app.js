const express = require("express");
const app = express();
let port = process.env.port || 3000;
const Joi = require("joi");

app.use(express.json());

let users = [
  {
    id: 1,
    name: "Jack"
  },
  {
    id: 2,
    name: "Bob"
  }
];

app.get("/users", (req, res) => {
  res.send(users);
});
app.get("/users/:id", (req, res) => {
  let userFind = users.find(user => user.id === parseInt(req.params.id));
  if (!userFind) res.send("Not existing user");
  res.send(userFind);
});
app.post("/users", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }

  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.send(user);
});

app.put("/users/:id", (req, res) => {
  let userFind = users.find(user => user.id === parseInt(req.params.id));
  if (!userFind) res.send("Not existing user");

  const schema = Joi.object({
    name: Joi.string().required()
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }
  userFind.name = req.body.name;
  res.send(userFind);
});

const start = async () => {
  app.listen(port, async () => {
    console.log("Server is running");
  });
};

start();
