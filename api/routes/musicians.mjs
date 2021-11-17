import express from "express";
import db from "../database/db_connector.mjs";

let musicians = express.Router();

/**
 * CREATE  POST    /api/Musicians
 * READ    GET     /api/Musicians
 * UPDATE  PUT     /api/Musicians?id=...
 * DELETE  DELETE  /api/Musicians?id=...
 * FILTER  GET     /api/Musicians/filter?field=...&value=...
 */

// CREATE
musicians.post("/", function (req, res) {
  // get body params
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

  // query
  const createQuery =
    "INSERT INTO Musicians (firstName, lastName, birthdate, email, phoneNumber, street, city, " +
    "state, zip, inEnsemble, active) VALUES (?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?);";

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
        res.status(400).json(error);
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
      res.status(500).json(error);
    } else {
      res.status(200).json(rows);
    }
  });
});

// UPDATE
musicians.put("/", function (req, res) {
  // get params
  let id = req.query.id;
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

  // parse
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  // query
  const updateQuery =
    "UPDATE Musicians SET firstName = ?, lastName = ?, birthdate = ?, email = ?, phoneNumber= ?, " +
    "street= ?, city = ?, state = ?, zip = ?, inEnsemble = ?, active = ? WHERE id = ?";

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
      id,
    ],
    (error) => {
      if (error) {
        console.log(error);
        res.status(400).json(error);
      } else {
        res.status(200).json({ status: "OK" });
      }
    }
  );
});

musicians.delete("/", function (req, res) {
  // get query param
  let id = req.query.id;

  // parse
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  // query
  const deleteQuery = "DELETE FROM Musicians WHERE id = ?;";

  db.query(deleteQuery, [id], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

// FILTER
musicians.get("/filter", (req, res) => {
  // destructure the query
  let { field, value } = req.query;
  value = isNaN(value) ? value : parseInt(value);
  /**
   * int/bit columns birthdate, phoneNumber, zip, inEnsemble, active -> requires '=' operator for query
   * varchar columns firstName, lastName, birthdate, email, street, city, state -> requires 'LIKE' operator for query
   * determine correct operator:
   */
  const operator = Number.isInteger(value) ? "=" : "LIKE";
  const filterQuery = `SELECT * FROM Musicians WHERE ?? ${operator} ?`;

  db.query(filterQuery, [field, value], (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(500).json(error);
    } else {
      res.status(200).json({ status: "ok", data: rows });
    }
  });
});

export default musicians;
