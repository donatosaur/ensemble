import express from "express";
import db from "../database/db_connector.mjs";

let musicians = express.Router();

/**
 * CREATE  POST    /api/Musicians
 * READ    GET     /api/Musicians
 * UPDATE  PUT     /api/Musicians?musicianID=...
 * DELETE  DELETE  /api/Musicians?musicianID=...
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
      res.status(200).json({ status: "ok", data: rows });
    }
  });
});

// UPDATE
musicians.put("/", function (req, res) {
  let musicianID = req.query.musicianID;
  // parse
  musicianID = parseInt(musicianID);
  musicianID = isNaN(musicianID) ? null : musicianID;

  const updateQuery =
    "UPDATE Musicians SET firstName = ?, lastName = ?, birthdate = ?, email = ?, phoneNumber= ?, street= ?, city = ?, state = ?, zip = ?, inEnsemble = ?, active = ? WHERE musicianID = ?";
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
      musicianID
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
  let musicianID = req.query.musicianID;
  musicianID = parseInt(musicianID);
  musicianID = isNaN(musicianID) ? null : musicianID;

  const deleteQuery = "DELETE FROM Musicians WHERE musicianID = ?;";
  db.query(deleteQuery, [musicianID], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default musicians;
