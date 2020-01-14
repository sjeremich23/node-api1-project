/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
// implement your API here
const express = require("express");
const cors = require("cors");
const db = require("./data/db");

const server = express();
const port = 4000;
// eslint-disable-next-line no-console
server.listen(port, () => console.log(`\n ** API running on ${port} **\n`));

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send({ api: "up and running..." });
});

/**
|--------------------------------------------------
| GET User Database
|--------------------------------------------------
*/
server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log("error on GET /api/users", err);
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

/**
|--------------------------------------------------
| GET User ID
|--------------------------------------------------
*/
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id).then(user => {
    user
      ? res.status(200).json(user)
      : res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
  });
});

/**
|--------------------------------------------------
| POST Users
|--------------------------------------------------
*/
server.post("/api/users", (req, res) => {
  const { body } = req;
  !body.name || !body.bio
    ? res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." })
    : db
        .insert(body)
        .then(api => {
          res.status(201).json(api);
        })
        .catch(err => {
          console.log("error on POST /api/users", err);
          res.status(500).json({
            error: "There was an error while saving the user to the database"
          });
        });
});

/**
|--------------------------------------------------
| DELETE Users
|--------------------------------------------------
*/
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removed => {
      removed
        ? res
            .status(200)
            .json({ message: `user id ${id} removed successfully` })
        : res.status(404).json({
            message: `The user with the specified ID does not exist.`
          });
    })
    .catch(err => {
      console.error(`error on DELETE /api/users`, err);
      res.status(500).json({
        error: `There was an error while removing the user from the database`
      });
    });
});

/**
|--------------------------------------------------
| PUT Update Users
|--------------------------------------------------
*/
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  !body.name || !body.bio
    ? res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." })
    : db
        .update(id, body)
        .then(user => {
          user
            ? res.status(200).json({ message: "User updated successfully" })
            : res.status(404).json({
                message: "The user with the specified ID does not exist."
              });
        })
        .catch(err => {
          console.log("error on PUT /users/:id", err);
          res
            .status(500)
            .json({ error: "The user information could not be modified." });
        });
});
