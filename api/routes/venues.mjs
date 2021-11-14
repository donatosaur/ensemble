import express from "express";
import db from "../database/db_connector.mjs";

let venues = express.Router();

/**
 * CREATE  POST    /api/Venues
 * READ    GET     /api/Venues
 * UPDATE  PUT     /api/Venues?venueID=...
 * DELETE  DELETE  /api/Venues?venueID=...
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
      res.status(400).json({
        error: error,
      });
    } else {
      res.status(201).json({
        status: "Created",
      });
    }
  });
});

// READ
venues.get("/", (req, res) => {
  db.query(`SELECT * FROM Venues;`, (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(500).json({
        error: error,
      });
    } else {
      res.status(200).json({
        status: "ok",
        data: rows,
      });
    }
  });
});

// UPDATE
venues.put("/", function (req, res) {
  let venueID = req.query.venueID;

  let { capacity, name, street, city, state, zip } = req.body;

  // parse
  venueID = parseInt(venueID);
  venueID = isNaN(venueID) ? null : venueID;
  const updateQuery =
    "UPDATE Venues SET capacity = ?, name = ?, street = ?, city = ?, state = ?, zip = ? WHERE venueID = ?;";

  db.query(
    updateQuery,
    [capacity, name, street, city, state, zip, venueID],
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
  let venueID = req.query.venueID;
  // parse
  venueID = parseInt(venueID);
  venueID = isNaN(venueID) ? null : venueID;

  // Define query
  const deleteQuery = "DELETE FROM Venues WHERE venueID = ?;";
  db.query(deleteQuery, [venueID], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default venues;
