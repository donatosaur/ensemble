import express from "express";
import db from "../database/db_connector.mjs";

let musicians = express.Router();

/**
 * CREATE  POST    /api/Musicians
 * READ    GET     /api/Musicians
 * UPDATE  PUT     /api/Musicians?id=...
 * DELETE  DELETE  /api/Musicians?id=...
 */

// CREATE
musicians.post("/", function (req, res) {
  const createQuery =
    "INSERT INTO Musicians (firstName, lastName, birthdate, email, phoneNumber, street, city, state, zip, inEnsemble, active) VALUES (?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?);";
  let {
    firstName,
    lastName,
    birthdate,
    email,
    phoneNumber,
    street,
    city,
    state,
    zip,
    inEnsemble,
    active,
  } = req.body;
  db.query(
    createQuery,
    [
      firstName,
      lastName,
      birthdate,
      email,
      phoneNumber,
      street,
      city,
      state,
      zip,
      inEnsemble,
      active,
    ],
    (error) => {
      if (error) {
        // send back a description of the error as well as the error status
        console.log(error);
        res.status(400).json({ error: error });
      } else {
        res.status(201).json({ status: "Created" });
      }
    }
  );
});

// READ
musicians.get("/", (req, res) => {
  db.query("SELECT * FROM Musicians;", (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(500).json({ error: error });
    } else {
      res.status(200).json(rows);
    }
  });
});

// UPDATE
musicians.put("/", function (req, res) {
  let id = req.query.id;
  // parse
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  const updateQuery =
    "UPDATE Musicians SET firstName = ?, lastName = ?, birthdate = ?, email = ?, phoneNumber= ?, street= ?, city = ?, state = ?, zip = ?, inEnsemble = ?, active = ? WHERE id = ?";
  let {
    firstName,
    lastName,
    birthdate,
    email,
    phoneNumber,
    street,
    city,
    state,
    zip,
    inEnsemble,
    active,
  } = req.body;
  db.query(
    updateQuery,
    [
      firstName,
      lastName,
      birthdate,
      email,
      phoneNumber,
      street,
      city,
      state,
      zip,
      inEnsemble,
      active,
      id
    ],
    (error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: error });
      } else {
        res.status(200).json({ status: "OK" });
      }
    }
  );
});

musicians.delete("/", function (req, res) {
  let id = req.query.id;
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  const deleteQuery = "DELETE FROM Musicians WHERE id = ?;";
  db.query(deleteQuery, [id], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default musicians;
