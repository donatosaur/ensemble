import express from "express";
import db from "../database/db_connector.mjs";

let venues = express.Router();

/**
 * CREATE  POST    /api/Venues
 * READ    GET     /api/Venues
 * UPDATE  PUT     /api/Venues?id=...
 * DELETE  DELETE  /api/Venues?id=...
 */

// CREATE
venues.post("/", function (req, res) {
  // destructure body params
  const createQuery =
    "INSERT INTO Venues (capacity, name, street, city, state, zip) VALUES (?, ?, ?, ?, ?, ?);";
  let { capacity, name, street, city, state, zip } = req.body;

  db.query(createQuery, [capacity, name, street, city, state, zip], (error) => {
    if (error) {
      // send back a description of the error as well as the error status
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(201).json({status: "Created"});
    }
  });
});

// READ
venues.get("/", (req, res) => {
  db.query(`SELECT * FROM Venues;`, (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(500).json({error: error});
    } else {
      res.status(200).json(rows);
    }
  });
});

// UPDATE
venues.put("/", function (req, res) {
  let id = req.query.id;

  let { capacity, name, street, city, state, zip } = req.body;

  // parse
  id = parseInt(id);
  id = isNaN(id) ? null : id;
  const updateQuery =
    "UPDATE Venues SET capacity = ?, name = ?, street = ?, city = ?, state = ?, zip = ? WHERE id = ?;";

  db.query(
    updateQuery,
    [capacity, name, street, city, state, zip, id],
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

// Delete
venues.delete("/", function (req, res) {
  let id = req.query.id;
  // parse
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  // Define query
  const deleteQuery = "DELETE FROM Venues WHERE id = ?;";
  db.query(deleteQuery, [id], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default venues;
